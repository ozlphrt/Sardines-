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

export class FlockManager {
  private fish: Fish[] = []
  private config: FlockConfig
  private isPaused: boolean = false
  private grid: Map<number, Fish[]> = new Map()
  private gridCellSize: number = 30
  private nearbyFishBuffer: Fish[] = [] // Reusable buffer for nearby fish

  constructor(config: FlockConfig) {
    this.config = config
    this.gridCellSize = config.partitionSize || 30
    this.initializeFish()
  }

  /**
   * Initialize static fish with random positions within bounds
   */
  private initializeFish(): void {
    const bounds = this.config.bounds
    const behavior = this.config.behavior

    console.log('Initializing', this.config.fishCount, 'static fish')

    for (let i = 0; i < this.config.fishCount; i++) {
      const position = new THREE.Vector3(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
        bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
      )

      const fish = new Fish(position, behavior)
      this.fish.push(fish)
    }

    console.log('Created', this.fish.length, 'static fish')
  }

  /**
   * Update all fish with individual movement + flocking behavior + boundary avoidance
   */
  public update(deltaTime: number, predatorPosition: THREE.Vector3 | null = null): void {
    if (this.isPaused) return

    // Update spatial partitioning grid
    this.updateGrid()

    // Update each fish with access to potential neighbors in nearby grid cells
    this.fish.forEach(fish => {
      this.populateNearbyFish(fish)
      fish.update(deltaTime, this.nearbyFishBuffer, this.config.bounds, predatorPosition)
    })
  }

  private updateGrid(): void {
    this.grid.clear()
    this.fish.forEach(fish => {
      const key = this.getGridKey(fish.physics.position)
      let cell = this.grid.get(key)
      if (!cell) {
        cell = []
        this.grid.set(key, cell)
      }
      cell.push(fish)
    })
  }

  /**
   * Bit-packed numeric key for spatial partitioning
   * Assuming coordinates stay within -500 to 500 range
   * 10 bits each for x, y, z (total 30 bits)
   */
  private getGridKey(position: THREE.Vector3): number {
    const x = (Math.floor(position.x / this.gridCellSize) + 512) & 0x3FF
    const y = (Math.floor(position.y / this.gridCellSize) + 512) & 0x3FF
    const z = (Math.floor(position.z / this.gridCellSize) + 512) & 0x3FF
    return (x << 20) | (y << 10) | z
  }

  private populateNearbyFish(fish: Fish): void {
    this.nearbyFishBuffer.length = 0 // Clear without re-allocating
    const pos = fish.physics.position
    const radius = Math.ceil(this.config.behavior.neighborRadius / this.gridCellSize)

    const centerX = Math.floor(pos.x / this.gridCellSize)
    const centerY = Math.floor(pos.y / this.gridCellSize)
    const centerZ = Math.floor(pos.z / this.gridCellSize)

    for (let x = centerX - radius; x <= centerX + radius; x++) {
      for (let y = centerY - radius; y <= centerY + radius; y++) {
        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
          // Optimized key generation inside loop
          const kx = (x + 512) & 0x3FF
          const ky = (y + 512) & 0x3FF
          const kz = (z + 512) & 0x3FF
          const key = (kx << 20) | (ky << 10) | kz

          const cellFish = this.grid.get(key)
          if (cellFish) {
            for (let i = 0; i < cellFish.length; i++) {
              const otherFish = cellFish[i]
              if (otherFish !== fish) {
                this.nearbyFishBuffer.push(otherFish)
              }
            }
          }
        }
      }
    }
  }

  /**
   * Get all fish
   */
  public getFish(): Fish[] {
    return this.fish
  }

  /**
   * Get fish statistics including size variation
   */
  public getStats(): FlockStats {
    if (this.fish.length === 0) {
      return {
        fishCount: 0,
        averageSpeed: 0,
        activeFish: 0,
        averageSize: 1.0,
        sizeRange: { min: 1.0, max: 1.0 }
      }
    }

    // Calculate speed statistics
    const totalSpeed = this.fish.reduce((sum, fish) => sum + fish.getSpeed(), 0)
    const averageSpeed = totalSpeed / this.fish.length

    // Calculate size statistics
    const sizes = this.fish.map(fish => fish.getSizeFactor())
    const totalSize = sizes.reduce((sum, size) => sum + size, 0)
    const averageSize = totalSize / this.fish.length
    const minSize = Math.min(...sizes)
    const maxSize = Math.max(...sizes)

    return {
      fishCount: this.fish.length,
      averageSpeed: averageSpeed,
      activeFish: this.fish.length,
      averageSize: averageSize,
      sizeRange: { min: minSize, max: maxSize }
    }
  }

  /**
   * Update behavior parameters for all fish
   */
  public updateBehavior(newBehavior: Partial<FishBehavior>): void {
    Object.assign(this.config.behavior, newBehavior)
    this.fish.forEach(fish => {
      Object.assign(fish.behavior, newBehavior)

      // Preserve specialized leader settings
      if (fish.isLeader) {
        fish.behavior.cohesionStrength = 0.05
        fish.behavior.individualWeight = 0.8
      }
    })
  }

  /**
   * Update flock configuration
   */
  public updateConfig(newConfig: Partial<FlockConfig>): void {
    Object.assign(this.config, newConfig)
  }

  /**
   * Pause/unpause flock updates
   */
  public setPaused(paused: boolean): void {
    this.isPaused = paused
  }

  /**
   * Get flock configuration
   */
  public getConfig(): FlockConfig {
    return { ...this.config }
  }

  /**
   * Get fish count
   */
  public getFishCount(): number {
    return this.fish.length
  }

  /**
   * Add fish to the flock
   */
  public addFish(count: number): void {
    const bounds = this.config.bounds
    const behavior = this.config.behavior

    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
        bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
      )

      const fish = new Fish(position, behavior)
      this.fish.push(fish)
    }
  }

  /**
   * Remove fish from the flock
   */
  public removeFish(count: number): void {
    const removeCount = Math.min(count, this.fish.length)
    this.fish.splice(-removeCount)
  }

  /**
   * Set exact fish count (add or remove as needed)
   */
  public setFishCount(targetCount: number): void {
    const currentCount = this.fish.length

    if (targetCount > currentCount) {
      // Add fish
      const addCount = targetCount - currentCount
      this.addFish(addCount)
      console.log(`Added ${addCount} fish. Total: ${this.fish.length}`)
    } else if (targetCount < currentCount) {
      // Remove fish
      const removeCount = currentCount - targetCount
      this.removeFish(removeCount)
      console.log(`Removed ${removeCount} fish. Total: ${this.fish.length}`)
    }

    // Update config to reflect new count
    this.config.fishCount = this.fish.length
  }

  /**
   * Trigger a predator event for all fish
   */
  public triggerPredator(position: THREE.Vector3): void {
    const currentTime = performance.now() * 0.001
    this.fish.forEach(fish => fish.triggerPredator(position, currentTime))
    console.log('🦈 Predator event triggered at', position)
  }

  /**
   * Find the most densely populated area for hunting
   */
  public getHuntTarget(): THREE.Vector3 | null {
    if (this.grid.size === 0) return null

    let bestCell: Fish[] | null = null
    let maxCount = 0

    this.grid.forEach((cell) => {
      if (cell.length > maxCount) {
        maxCount = cell.length
        bestCell = cell
      }
    })

    if (!bestCell || bestCell.length === 0) return null

    // Calculate center of this cell
    const center = new THREE.Vector3()
    bestCell.forEach(f => center.add(f.physics.position))
    center.divideScalar(bestCell.length)

    return center
  }

  /**
   * Clear all fish
   */
  public clearFish(): void {
    this.fish = []
  }

  /**
   * Dispose of flock resources
   */
  public dispose(): void {
    this.fish.forEach(fish => fish.dispose())
    this.fish = []
  }
}
