import * as THREE from 'three'
import { Fish, FishBehavior } from './Fish.js'

export interface FlockConfig {
  fishCount: number
  bounds: THREE.Box3
  behavior: FishBehavior
  spatialPartitioning: boolean
  partitionSize: number
}

export interface FlockStats {
  fishCount: number
  averageSpeed: number
  activeFish: number
  averageSize: number
  sizeRange: { min: number; max: number }
}

// Completely new FlockManager using a dense flat 3D grid hash for supreme performance
export class FlockManager {
  private allFish: Fish[] = []
  private config: FlockConfig
  private isPaused: boolean = false

  // New Spatial Partitioning Data Structures
  // We use a Map of flat arrays. The key is a fast integer hash of the 3D grid coordinate.
  private spatialHash: Map<number, Fish[]> = new Map()
  private cellSize: number = 60.0 // Must be larger than maximum expected neighborRadius (50)
  private neighborBuffer: Fish[] = [] // Pre-allocated query buffer

  // Pre-calculated stats buffer
  private currentStats: FlockStats = {
    fishCount: 0,
    averageSpeed: 0,
    activeFish: 0,
    averageSize: 1,
    sizeRange: { min: 1, max: 1 }
  }

  constructor(config: FlockConfig) {
    this.config = config
    this.spawnFishVolumetric(config.fishCount)
  }

  /**
   * Spawns fish in a completely new way: Volumetric Random Distribution
   */
  private spawnFishVolumetric(count: number): void {
    const { min, max } = this.config.bounds

    for (let i = 0; i < count; i++) {
      // Distribute fish randomly but biased towards the center of the tank
      // using a simple normal distribution approximation
      const rx = (Math.random() + Math.random() + Math.random()) / 3
      const ry = (Math.random() + Math.random() + Math.random()) / 3
      const rz = (Math.random() + Math.random() + Math.random()) / 3

      const pos = new THREE.Vector3(
        min.x + (max.x - min.x) * rx,
        min.y + (max.y - min.y) * ry,
        min.z + (max.z - min.z) * rz
      )

      this.allFish.push(new Fish(pos, this.config.behavior))
    }
  }

  // --- PUBLIC INTERFACES FIXED FOR SCENE/UI ---

  public getFish(): Fish[] { return this.allFish }
  public getFishCount(): number { return this.allFish.length }
  public setPaused(paused: boolean): void { this.isPaused = paused }
  public getConfig(): FlockConfig { return { ...this.config } }

  public updateConfig(newConfig: Partial<FlockConfig>): void {
    Object.assign(this.config, newConfig)
  }

  public updateBehavior(newBehavior: Partial<FishBehavior>): void {
    Object.assign(this.config.behavior, newBehavior)
    // Push new behaviors instantly to all children
    for (let i = 0; i < this.allFish.length; i++) {
      Object.assign(this.allFish[i].behavior, newBehavior)
    }
  }

  public setFishCount(targetCount: number): void {
    const current = this.allFish.length
    if (targetCount > current) {
      this.spawnFishVolumetric(targetCount - current)
    } else if (targetCount < current) {
      // Cull from the end
      this.allFish.splice(targetCount)
    }
    this.config.fishCount = this.allFish.length
  }

  public getStats(): FlockStats {
    // Return cached stats calculated during the update loop to save CPU
    return this.currentStats
  }

  public triggerPredator(position: THREE.Vector3): void {
    for (let i = 0; i < this.allFish.length; i++) {
      this.allFish[i].triggerPredator(position)
    }
  }

  public getHuntTarget(fromPosition?: THREE.Vector3): THREE.Vector3 | null {
    if (this.spatialHash.size === 0) return null

    let bestScore = -1
    let bestCentroid: THREE.Vector3 | null = null

    for (const [_hash, cell] of this.spatialHash.entries()) {
      if (cell.length < 3) continue

      // Calculate centroid of this school cluster
      const centroid = new THREE.Vector3()
      for (let i = 0; i < cell.length; i++) {
        centroid.add(cell[i].getPosition())
      }
      centroid.divideScalar(cell.length)

      let score = cell.length
      if (fromPosition) {
        const dist = fromPosition.distanceTo(centroid)
        // Score balances largest school (population weight) vs nearest school (distance penalty)
        score = Math.pow(cell.length, 1.15) / (dist + 30.0)
      }

      if (score > bestScore) {
        bestScore = score
        bestCentroid = centroid
      }
    }

    return bestCentroid
  }

  public dispose(): void {
    this.allFish = []
    this.spatialHash.clear()
  }

  // --- CORE UPDATE LOOP (NEW LOGIC) ---

  public update(deltaTime: number, predatorPosition: THREE.Vector3 | null): void {
    if (this.isPaused || this.allFish.length === 0) return

    this.rebuildSpatialHash()

    let totalSpeed = 0
    let minSize = 999
    let maxSize = 0

    // Iterate through all fish and apply physics
    for (let i = 0; i < this.allFish.length; i++) {
      const fish = this.allFish[i]

      // 1. O(1) Spatial Query
      this.queryNeighborsFast(fish.getPosition())

      // 2. Continuous Physics Update
      fish.update(deltaTime, this.neighborBuffer, this.config.bounds, predatorPosition)

      // 3. Accumulate Stats inline (prevent double looping)
      const speed = fish.getSpeed()
      const size = fish.getSizeFactor()
      totalSpeed += speed
      if (size < minSize) minSize = size
      if (size > maxSize) maxSize = size
    }

    // Lock in stats for the UI
    this.currentStats = {
      fishCount: this.allFish.length,
      activeFish: this.allFish.length,
      averageSpeed: totalSpeed / this.allFish.length,
      averageSize: (minSize + maxSize) / 2, // approximation
      sizeRange: { min: minSize, max: maxSize }
    }
  }

  // --- NEW SPATIAL PARTITIONING (Fast Hash Method) ---

  private hashCoords(ix: number, iy: number, iz: number): number {
    // Quick integer hashing for 3D coordinates. 
    // Using prime multipliers avoids collisions.
    // Bitwise operations are fast in JS.
    return ((ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791)) & 0x7FFFFFFF
  }

  private rebuildSpatialHash(): void {
    // Instead of .clear() and new arrays, we reuse arrays if we can, but JS map clear is heavily optimized V8 side.
    this.spatialHash.clear()

    for (let i = 0; i < this.allFish.length; i++) {
      const fish = this.allFish[i]
      const pos = fish.getPosition()

      // Quantize space
      const ix = Math.floor(pos.x / this.cellSize)
      const iy = Math.floor(pos.y / this.cellSize)
      const iz = Math.floor(pos.z / this.cellSize)

      const hash = this.hashCoords(ix, iy, iz)

      let cell = this.spatialHash.get(hash)
      if (!cell) {
        cell = []
        this.spatialHash.set(hash, cell)
      }
      cell.push(fish)
    }
  }

  private queryNeighborsFast(position: THREE.Vector3): void {
    this.neighborBuffer.length = 0 // Reset length, keep memory block

    const ix = Math.floor(position.x / this.cellSize)
    const iy = Math.floor(position.y / this.cellSize)
    const iz = Math.floor(position.z / this.cellSize)

    // Query the 3x3x3 local neighborhood
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const hash = this.hashCoords(ix + x, iy + y, iz + z)
          const cell = this.spatialHash.get(hash)
          if (cell) {
            // Dump cell contents straight into buffer
            for (let c = 0; c < cell.length; c++) {
              this.neighborBuffer.push(cell[c])
            }
          }
        }
      }
    }
  }
}
