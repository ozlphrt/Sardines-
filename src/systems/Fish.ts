import * as THREE from 'three'

export interface FishBehavior {
  // Basic movement parameters
  maxSpeed: number
  minSpeed: number
  acceleration: number
  turnSpeed: number
  
  // Natural swimming behavior
  swimFrequency: number
  swimAmplitude: number
  depthPreference: number
  depthVariation: number
  
  // Social behavior (simplified)
  neighborRadius: number
  neighborInfluence: number
  separationRadius: number
  separationStrength: number
  
  // Environmental response
  edgeAvoidanceRadius: number
  edgeAvoidanceStrength: number
}

export interface FishPhysics {
  position: THREE.Vector3
  velocity: THREE.Vector3
  targetDirection: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  
  // Individual fish characteristics
  personality: {
    speedMultiplier: number
    turnMultiplier: number
    socialMultiplier: number
  }
  
  // Swimming state
  swimPhase: number
  targetDepth: number
  lastDirectionChange: number
}

export class Fish {
  public physics: FishPhysics
  public behavior: FishBehavior
  public id: number
  public isActive: boolean = true

  constructor(
    id: number,
    position: THREE.Vector3,
    behavior: FishBehavior
  ) {
    this.id = id
    this.behavior = { ...behavior }
    
    // Initialize physics with natural starting state
    this.physics = {
      position: position.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * this.behavior.maxSpeed * 0.5,
        (Math.random() - 0.5) * this.behavior.maxSpeed * 0.3,
        (Math.random() - 0.5) * this.behavior.maxSpeed * 0.5
      ),
      targetDirection: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize(),
      rotation: new THREE.Euler(),
      scale: new THREE.Vector3(1, 1, 1),
      
      // Individual personality traits
      personality: {
        speedMultiplier: 0.8 + Math.random() * 0.4, // 0.8 to 1.2
        turnMultiplier: 0.7 + Math.random() * 0.6,  // 0.7 to 1.3
        socialMultiplier: 0.5 + Math.random() * 1.0  // 0.5 to 1.5
      },
      
      // Swimming state
      swimPhase: Math.random() * Math.PI * 2,
      targetDepth: this.behavior.depthPreference + (Math.random() - 0.5) * this.behavior.depthVariation,
      lastDirectionChange: 0
    }
  }

  /**
   * Update fish movement with natural swimming behavior
   */
  public update(deltaTime: number, allFish: Fish[], bounds: THREE.Box3): void {
    if (!this.isActive) return

    // Update swimming phase
    this.physics.swimPhase += this.behavior.swimFrequency * deltaTime
    
    // Calculate natural swimming motion
    const swimMotion = this.calculateSwimMotion(deltaTime)
    
    // Calculate social influences
    const socialForce = this.calculateSocialForce(allFish)
    
    // Calculate environmental responses
    const environmentalForce = this.calculateEnvironmentalForce(bounds)
    
    // Combine all forces
    const totalForce = new THREE.Vector3()
    totalForce.add(swimMotion)
    totalForce.add(socialForce)
    totalForce.add(environmentalForce)
    
    // Apply personality modifiers
    totalForce.multiplyScalar(this.physics.personality.speedMultiplier)
    
    // Update velocity with smooth acceleration
    const acceleration = totalForce.clone().multiplyScalar(this.behavior.acceleration * deltaTime)
    this.physics.velocity.add(acceleration)
    
    // Clamp speed to natural range
    const currentSpeed = this.physics.velocity.length()
    const targetSpeed = this.behavior.minSpeed + (this.behavior.maxSpeed - this.behavior.minSpeed) * 
                       (0.5 + Math.sin(this.physics.swimPhase) * 0.3)
    
    if (currentSpeed > 0) {
      this.physics.velocity.normalize().multiplyScalar(
        Math.max(this.behavior.minSpeed, Math.min(this.behavior.maxSpeed, targetSpeed))
      )
    }
    
    // Update position
    this.physics.position.add(this.physics.velocity.clone().multiplyScalar(deltaTime))
    
    // Update rotation to face movement direction
    this.updateRotation(deltaTime)
    
    // Apply boundaries
    this.applyBoundaries(bounds)
  }

  /**
   * Calculate natural swimming motion with undulation
   */
  private calculateSwimMotion(deltaTime: number): THREE.Vector3 {
    const force = new THREE.Vector3()
    
    // Forward swimming motion
    const forwardForce = this.physics.targetDirection.clone().multiplyScalar(
      this.behavior.maxSpeed * 0.1
    )
    force.add(forwardForce)
    
    // Natural undulation (side-to-side motion)
    const undulation = Math.sin(this.physics.swimPhase) * this.behavior.swimAmplitude
    const rightVector = new THREE.Vector3(1, 0, 0)
    rightVector.applyQuaternion(new THREE.Quaternion().setFromEuler(this.physics.rotation))
    force.add(rightVector.multiplyScalar(undulation))
    
    // Depth seeking behavior
    const depthDiff = this.physics.targetDepth - this.physics.position.y
    const depthForce = new THREE.Vector3(0, depthDiff * 0.1, 0)
    force.add(depthForce)
    
    return force
  }

  /**
   * Calculate social forces from nearby fish
   */
  private calculateSocialForce(allFish: Fish[]): THREE.Vector3 {
    const force = new THREE.Vector3()
    let neighborCount = 0
    
    allFish.forEach(other => {
      if (other.id === this.id || !other.isActive) return
      
      const distance = this.physics.position.distanceTo(other.physics.position)
      
      if (distance < this.behavior.neighborRadius && distance > 0) {
        // Separation force
        if (distance < this.behavior.separationRadius) {
          const separation = this.physics.position.clone().sub(other.physics.position)
          separation.normalize().multiplyScalar(
            (this.behavior.separationRadius - distance) * this.behavior.separationStrength
          )
          force.add(separation)
        }
        
        // Alignment force (subtle influence)
        if (distance < this.behavior.neighborRadius) {
          const alignment = other.physics.velocity.clone().normalize().multiplyScalar(
            this.behavior.neighborInfluence * 0.1
          )
          force.add(alignment)
          neighborCount++
        }
      }
    })
    
    // Apply social personality modifier
    force.multiplyScalar(this.physics.personality.socialMultiplier)
    
    return force
  }

  /**
   * Calculate environmental forces (boundaries, currents)
   */
  private calculateEnvironmentalForce(bounds: THREE.Box3): THREE.Vector3 {
    const force = new THREE.Vector3()
    const pos = this.physics.position
    
    // Edge avoidance
    const margin = this.behavior.edgeAvoidanceRadius
    
    // X-axis edge avoidance
    if (pos.x < bounds.min.x + margin) {
      force.x = (margin - (pos.x - bounds.min.x)) * this.behavior.edgeAvoidanceStrength
    } else if (pos.x > bounds.max.x - margin) {
      force.x = -(margin - (bounds.max.x - pos.x)) * this.behavior.edgeAvoidanceStrength
    }
    
    // Y-axis edge avoidance
    if (pos.y < bounds.min.y + margin) {
      force.y = (margin - (pos.y - bounds.min.y)) * this.behavior.edgeAvoidanceStrength
    } else if (pos.y > bounds.max.y - margin) {
      force.y = -(margin - (bounds.max.y - pos.y)) * this.behavior.edgeAvoidanceStrength
    }
    
    // Z-axis edge avoidance
    if (pos.z < bounds.min.z + margin) {
      force.z = (margin - (pos.z - bounds.min.z)) * this.behavior.edgeAvoidanceStrength
    } else if (pos.z > bounds.max.z - margin) {
      force.z = -(margin - (bounds.max.z - pos.z)) * this.behavior.edgeAvoidanceStrength
    }
    
    // Subtle underwater currents
    const currentStrength = 0.02
    force.x += Math.sin(pos.x * 0.01) * currentStrength
    force.y += Math.cos(pos.y * 0.01) * currentStrength * 0.5
    force.z += Math.sin(pos.z * 0.01) * currentStrength
    
    return force
  }

  /**
   * Update rotation to face movement direction with smooth turning
   */
  private updateRotation(deltaTime: number): void {
    if (this.physics.velocity.length() > 0.1) {
      const targetDirection = this.physics.velocity.clone().normalize()
      
      // Calculate target rotation
      const targetRotation = new THREE.Euler()
      targetRotation.setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1), // Fish forward direction
          targetDirection
        )
      )
      
      // Smooth rotation interpolation
      const turnSpeed = this.behavior.turnSpeed * this.physics.personality.turnMultiplier * deltaTime
      this.physics.rotation.x += (targetRotation.x - this.physics.rotation.x) * turnSpeed
      this.physics.rotation.y += (targetRotation.y - this.physics.rotation.y) * turnSpeed
      this.physics.rotation.z += (targetRotation.z - this.physics.rotation.z) * turnSpeed
      
      // Keep fish upright (no rolling)
      this.physics.rotation.z = Math.max(-0.2, Math.min(0.2, this.physics.rotation.z))
    }
  }

  /**
   * Apply boundary constraints with bounce
   */
  private applyBoundaries(bounds: THREE.Box3): void {
    const margin = 1
    const pos = this.physics.position
    const vel = this.physics.velocity
    
    // X-axis boundaries
    if (pos.x < bounds.min.x + margin) {
      pos.x = bounds.min.x + margin
      vel.x = Math.abs(vel.x) * 0.8
    } else if (pos.x > bounds.max.x - margin) {
      pos.x = bounds.max.x - margin
      vel.x = -Math.abs(vel.x) * 0.8
    }
    
    // Y-axis boundaries
    if (pos.y < bounds.min.y + margin) {
      pos.y = bounds.min.y + margin
      vel.y = Math.abs(vel.y) * 0.8
    } else if (pos.y > bounds.max.y - margin) {
      pos.y = bounds.max.y - margin
      vel.y = -Math.abs(vel.y) * 0.8
    }
    
    // Z-axis boundaries
    if (pos.z < bounds.min.z + margin) {
      pos.z = bounds.min.z + margin
      vel.z = Math.abs(vel.z) * 0.8
    } else if (pos.z > bounds.max.z - margin) {
      pos.z = bounds.max.z - margin
      vel.z = -Math.abs(vel.z) * 0.8
    }
  }

  /**
   * Occasionally change swimming direction for natural behavior
   */
  public changeDirection(): void {
    const now = performance.now()
    if (now - this.physics.lastDirectionChange > 2000 + Math.random() * 3000) { // 2-5 seconds
      this.physics.targetDirection.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize()
      
      this.physics.lastDirectionChange = now
    }
  }

  /**
   * Get current speed
   */
  public getSpeed(): number {
    return this.physics.velocity.length()
  }

  /**
   * Get distance to another fish
   */
  public distanceTo(other: Fish): number {
    return this.physics.position.distanceTo(other.physics.position)
  }

  /**
   * Clone fish with new position
   */
  public clone(newPosition: THREE.Vector3): Fish {
    return new Fish(this.id, newPosition, this.behavior)
  }
}
