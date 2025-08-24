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
   * Update all fish (does nothing for static fish)
   */
  public update(deltaTime: number): void {
    if (this.isPaused) return

    // Fish are static - no updates needed
    this.fish.forEach(fish => {
      fish.update(deltaTime)
    })
  }

  /**
   * Get all fish
   */
  public getFish(): Fish[] {
    return this.fish
  }

  /**
   * Get fish statistics
   */
  public getStats(): FlockStats {
    const totalSpeed = this.fish.reduce((sum, fish) => sum + fish.getSpeed(), 0)
    const averageSpeed = this.fish.length > 0 ? totalSpeed / this.fish.length : 0

    return {
      fishCount: this.fish.length,
      averageSpeed: averageSpeed,
      activeFish: this.fish.length
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
