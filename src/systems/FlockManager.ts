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
  averageCohesion: number
  averageSeparation: number
  averageAlignment: number
  activeFish: number
}

export class FlockManager {
  private fish: Fish[] = []
  private config: FlockConfig
  private spatialGrid: Map<string, Fish[]> = new Map()
  private isPaused: boolean = false

  constructor(config: FlockConfig) {
    this.config = config
    this.initializeFish()
  }

  /**
   * Initialize fish with random positions within bounds
   */
  private initializeFish(): void {
    const bounds = this.config.bounds
    const behavior = this.config.behavior

    console.log('Initializing', this.config.fishCount, 'fish with bounds:', bounds)

    for (let i = 0; i < this.config.fishCount; i++) {
      const position = new THREE.Vector3(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
        bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
      )

      const fish = new Fish(i, position, behavior)
      this.fish.push(fish)
    }
    
    console.log('Created', this.fish.length, 'fish')
  }

  /**
   * Update spatial partitioning grid
   */
  private updateSpatialGrid(): void {
    if (!this.config.spatialPartitioning) return

    this.spatialGrid.clear()

    this.fish.forEach(fish => {
      if (!fish.isActive) return

      const gridX = Math.floor(fish.physics.position.x / this.config.partitionSize)
      const gridY = Math.floor(fish.physics.position.y / this.config.partitionSize)
      const gridZ = Math.floor(fish.physics.position.z / this.config.partitionSize)
      const key = `${gridX},${gridY},${gridZ}`

      if (!this.spatialGrid.has(key)) {
        this.spatialGrid.set(key, [])
      }
      this.spatialGrid.get(key)!.push(fish)
    })
  }

  /**
   * Find neighbors using spatial partitioning for performance
   */
  private findNeighborsOptimized(fish: Fish, radius: number): Fish[] {
    if (!this.config.spatialPartitioning) {
      return fish.findNeighbors(this.fish, radius)
    }

    const neighbors: Fish[] = []
    const gridX = Math.floor(fish.physics.position.x / this.config.partitionSize)
    const gridY = Math.floor(fish.physics.position.y / this.config.partitionSize)
    const gridZ = Math.floor(fish.physics.position.z / this.config.partitionSize)

    // Check current and adjacent grid cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const key = `${gridX + dx},${gridY + dy},${gridZ + dz}`
          const cellFish = this.spatialGrid.get(key) || []

          cellFish.forEach(otherFish => {
            if (otherFish.id !== fish.id && otherFish.isActive) {
              const distance = fish.distanceTo(otherFish)
              if (distance <= radius) {
                neighbors.push(otherFish)
              }
            }
          })
        }
      }
    }

    return neighbors
  }

  /**
   * Update all fish in the flock with enhanced physics
   */
  public update(deltaTime: number): void {
    if (this.isPaused) return

    // Update spatial grid for neighbor finding (every frame for consistent behavior)
    this.updateSpatialGrid()

    // Update each fish with enhanced physics
    this.fish.forEach(fish => {
      if (!fish.isActive) return

      // Use the enhanced Fish.update method that includes collision detection and environmental forces
      fish.update(deltaTime, this.fish, this.config.bounds)
    })
  }

  /**
   * Get all active fish
   */
  public getFish(): Fish[] {
    const activeFish = this.fish.filter(fish => fish.isActive)
    return activeFish
  }

  /**
   * Get fish by ID
   */
  public getFishById(id: number): Fish | undefined {
    return this.fish.find(fish => fish.id === id)
  }

  /**
   * Add fish to the flock
   */
  public addFish(position: THREE.Vector3, behavior?: FishBehavior): Fish {
    const newId = this.fish.length
    const fishBehavior = behavior || this.config.behavior
    const fish = new Fish(newId, position, fishBehavior)
    this.fish.push(fish)
    return fish
  }

  /**
   * Remove fish from the flock
   */
  public removeFish(id: number): boolean {
    const fish = this.getFishById(id)
    if (fish) {
      fish.isActive = false
      return true
    }
    return false
  }

  /**
   * Update behavior parameters for all fish
   */
  public updateBehavior(newBehavior: Partial<FishBehavior>): void {
    this.fish.forEach(fish => {
      Object.assign(fish.behavior, newBehavior)
    })
  }

  /**
   * Update behavior for specific fish
   */
  public updateFishBehavior(id: number, newBehavior: Partial<FishBehavior>): boolean {
    const fish = this.getFishById(id)
    if (fish) {
      Object.assign(fish.behavior, newBehavior)
      return true
    }
    return false
  }

  /**
   * Reset all fish to random positions
   */
  public resetPositions(): void {
    const bounds = this.config.bounds
    this.fish.forEach(fish => {
      fish.physics.position.set(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
        bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
      )
      fish.physics.velocity.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      )
      fish.physics.acceleration.set(0, 0, 0)
    })
  }

  /**
   * Pause/unpause the simulation
   */
  public setPaused(paused: boolean): void {
    this.isPaused = paused
  }

  /**
   * Get simulation statistics
   */
  public getStats(): FlockStats {
    const activeFish = this.fish.filter(fish => fish.isActive)
    const speeds = activeFish.map(fish => fish.getSpeed())
    const averageSpeed = speeds.length > 0 ? speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length : 0

    // Calculate average behavior metrics (simplified)
    const averageCohesion = activeFish.length > 0 ? 1.0 : 0.0 // Placeholder
    const averageSeparation = activeFish.length > 0 ? 1.0 : 0.0 // Placeholder
    const averageAlignment = activeFish.length > 0 ? 1.0 : 0.0 // Placeholder

    return {
      fishCount: this.fish.length,
      averageSpeed,
      averageCohesion,
      averageSeparation,
      averageAlignment,
      activeFish: activeFish.length
    }
  }

  /**
   * Get configuration
   */
  public getConfig(): FlockConfig {
    return { ...this.config }
  }

  /**
   * Update configuration
   */
  public updateConfig(newConfig: Partial<FlockConfig>): void {
    // Handle fish count changes
    if (newConfig.fishCount !== undefined && newConfig.fishCount !== this.config.fishCount) {
      const oldCount = this.fish.length
      const newCount = newConfig.fishCount
      
      if (newCount > oldCount) {
        // Add more fish
        const bounds = this.config.bounds
        for (let i = oldCount; i < newCount; i++) {
          const position = new THREE.Vector3(
            bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
            bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
            bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
          )
          const fish = new Fish(i, position, this.config.behavior)
          this.fish.push(fish)
        }
      } else if (newCount < oldCount) {
        // Remove fish (mark as inactive)
        for (let i = newCount; i < oldCount; i++) {
          if (this.fish[i]) {
            this.fish[i].isActive = false
          }
        }
      }
      
      console.log(`Fish count changed from ${oldCount} to ${newCount}`)
    }
    
    Object.assign(this.config, newConfig)
  }

  /**
   * Clear all fish
   */
  public clear(): void {
    this.fish = []
    this.spatialGrid.clear()
  }

  /**
   * Get spatial grid for debugging
   */
  public getSpatialGrid(): Map<string, Fish[]> {
    return new Map(this.spatialGrid)
  }
}
