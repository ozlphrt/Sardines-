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
   * Initialize fish with random positions within bounds
   */
  private initializeFish(): void {
    const bounds = this.config.bounds
    const behavior = this.config.behavior

    console.log('Initializing', this.config.fishCount, 'fish with natural movement behavior')

    for (let i = 0; i < this.config.fishCount; i++) {
      const position = new THREE.Vector3(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
        bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
      )

      const fish = new Fish(i, position, behavior)
      this.fish.push(fish)
    }
    
    console.log('Created', this.fish.length, 'fish with individual personalities')
  }

  /**
   * Update all fish with natural movement
   */
  public update(deltaTime: number): void {
    if (this.isPaused) return

    // Update each fish individually
    this.fish.forEach(fish => {
      if (fish.isActive) {
        // Update fish movement
        fish.update(deltaTime, this.fish, this.config.bounds)
        
        // Occasionally change direction for natural behavior
        fish.changeDirection()
      }
    })
  }

  /**
   * Get all active fish
   */
  public getFish(): Fish[] {
    return this.fish.filter(fish => fish.isActive)
  }

  /**
   * Get fish statistics
   */
  public getStats(): FlockStats {
    const activeFish = this.fish.filter(fish => fish.isActive)
    const totalSpeed = activeFish.reduce((sum, fish) => sum + fish.getSpeed(), 0)
    const averageSpeed = activeFish.length > 0 ? totalSpeed / activeFish.length : 0

    return {
      fishCount: this.fish.length,
      averageSpeed: averageSpeed,
      activeFish: activeFish.length
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
   * Set pause state
   */
  public setPaused(paused: boolean): void {
    this.isPaused = paused
  }

  /**
   * Reset all fish to random positions
   */
  public reset(): void {
    const bounds = this.config.bounds
    
    this.fish.forEach(fish => {
      const position = new THREE.Vector3(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
        bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
      )
      
      fish.physics.position.copy(position)
      fish.physics.velocity.set(
        (Math.random() - 0.5) * fish.behavior.maxSpeed * 0.5,
        (Math.random() - 0.5) * fish.behavior.maxSpeed * 0.3,
        (Math.random() - 0.5) * fish.behavior.maxSpeed * 0.5
      )
    })
  }

  /**
   * Add new fish
   */
  public addFish(count: number = 1): void {
    const bounds = this.config.bounds
    const behavior = this.config.behavior
    
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y),
        bounds.min.z + Math.random() * (bounds.max.z - bounds.min.z)
      )
      
      const newId = this.fish.length
      const fish = new Fish(newId, position, behavior)
      this.fish.push(fish)
    }
  }

  /**
   * Remove fish
   */
  public removeFish(count: number = 1): void {
    const activeFish = this.fish.filter(fish => fish.isActive)
    const toRemove = Math.min(count, activeFish.length)
    
    for (let i = 0; i < toRemove; i++) {
      activeFish[i].isActive = false
    }
  }

  /**
   * Get configuration
   */
  public getConfig(): FlockConfig {
    return { ...this.config }
  }
}
