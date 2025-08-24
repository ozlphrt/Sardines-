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

  constructor(config: FlockConfig) {
    this.config = config
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
  public update(deltaTime: number): void {
    if (this.isPaused) return

    // Update each fish with access to all other fish for flocking and bounds for boundary avoidance
    this.fish.forEach(fish => {
      // Pass all other fish as potential neighbors and bounds for edge avoidance
      const otherFish = this.fish.filter(otherFish => otherFish !== fish)
      fish.update(deltaTime, otherFish, this.config.bounds)
    })
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
    this.fish.forEach(fish => {
      Object.assign(fish.behavior, newBehavior)
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
