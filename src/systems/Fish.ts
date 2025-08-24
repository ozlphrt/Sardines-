import * as THREE from 'three'

// ============================================================================
// PHASE 1 - CORE MOVEMENT SYSTEM
// ============================================================================

/**
 * Speed modes for realistic sardine behavior (Body Lengths per second)
 */
export enum SpeedMode {
  RESTING = 0.5,    // 0.5-1 BL/s - minimal movement
  CRUISING = 1.5,   // 1-2 BL/s - normal swimming
  ACTIVE = 2.5,     // 2-3 BL/s - active swimming, feeding
  BURST = 4.0       // 3-5 BL/s - maximum burst speed
}

/**
 * Core movement characteristics for Phase 1
 */
export interface CoreMovement {
  // UNDULATION (Body Wave Motion)
  undulation: {
    frequency: number      // 2-4 Hz - waves per second
    amplitude: number      // 0.1-0.3 body length - wave height
    phase: number         // Current wave phase (0 to 2π)
    speedMultiplier: number // How swimming speed affects undulation
  }
  
  // ROLL (Lateral Tilting)
  roll: {
    currentAngle: number   // Current roll angle in radians
    targetAngle: number    // Target roll angle for turns
    rollSpeed: number      // How fast fish can roll (2-5 rad/s)
    maxRollAngle: number   // Maximum roll angle (15-45° = 0.26-0.79 rad)
  }
  
  // SPEED VARIATION
  speed: {
    currentMode: SpeedMode // Current speed category
    targetSpeed: number    // Target speed to transition to
    currentSpeed: number   // Current actual speed
    acceleration: number   // How fast speed changes (2-4 BL/s²)
    lastModeChange: number // Time of last speed mode change
  }
  
  // DIRECTION CHANGES
  direction: {
    currentHeading: THREE.Vector3  // Current direction vector
    targetHeading: THREE.Vector3   // Target direction vector
    turnRate: number       // How fast fish can turn (max 90°/s = 1.57 rad/s)
    turnRadius: number     // Minimum turning radius (2-3 body lengths)
    lastDirectionChange: number // Time of last direction change
    isChangingDirection: boolean // Currently in a turn
  }
}

/**
 * Fish physics state
 */
export interface FishPhysics {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  velocity: THREE.Vector3
}

/**
 * Fish size characteristics affecting behavior
 */
export interface FishSize {
  scaleFactor: number      // Overall size multiplier (0.6 - 1.4)
  bodyLength: number       // Actual body length in world units
  speedMultiplier: number  // Speed boost for smaller fish (0.7 - 1.3)
  agilityMultiplier: number // Agility boost for smaller fish (0.7 - 1.3)
  turnRateMultiplier: number // Turn rate boost for smaller fish (0.7 - 1.3)
}

/**
 * Fish behavior configuration for Phase 1 + Flocking
 */
export interface FishBehavior {
  // Core movement parameters
  bodyLength: number        // Fish body length in world units
  maxTurnRate: number      // Maximum turn rate (rad/s)
  maxRollAngle: number     // Maximum roll angle (rad)
  rollSpeed: number        // Roll speed (rad/s)
  
  // Undulation parameters
  undulationFrequency: number  // Base frequency (Hz)
  undulationAmplitude: number  // Base amplitude (BL)
  
  // Speed parameters
  accelerationRate: number     // Speed change rate (BL/s²)
  
  // Direction change parameters
  directionChangeInterval: number // Seconds between direction changes
  turnSmoothness: number          // How smooth turns are (0-1)
  
  // Flocking parameters
  neighborRadius: number          // Detection radius for neighbors
  separationRadius: number        // Minimum distance to maintain
  cohesionStrength: number        // Attraction to group center (0-1)
  separationStrength: number      // Avoidance of crowding (0-1)
  alignmentStrength: number       // Velocity matching strength (0-1)
  
  // Force balancing
  individualWeight: number        // Weight of individual behavior (0-1)
  socialWeight: number           // Weight of flocking behavior (0-1)
}

/**
 * Phase 1 Fish class with core movement systems + Size Variation
 */
export class Fish {
  public physics: FishPhysics
  public behavior: FishBehavior
  public movement: CoreMovement
  public size: FishSize
  private lastUpdateTime: number = 0

  constructor(position: THREE.Vector3, behavior: FishBehavior) {
    this.behavior = behavior
    this.lastUpdateTime = performance.now() * 0.001 // Convert to seconds
    
    // Initialize size characteristics with realistic distribution
    this.size = this.generateSizeCharacteristics(behavior.bodyLength)
    
    // Initialize physics with size-based scaling
    this.physics = {
      position: position.clone(),
      rotation: new THREE.Euler(0, Math.random() * Math.PI * 2, 0), // Random initial heading
      scale: new THREE.Vector3(this.size.scaleFactor, this.size.scaleFactor, this.size.scaleFactor),
      velocity: new THREE.Vector3(0, 0, 0)
    }
    
    // Initialize core movement systems with size-based scaling
    this.movement = {
      // Undulation system (faster for smaller fish)
      undulation: {
        frequency: this.behavior.undulationFrequency * this.size.agilityMultiplier,
        amplitude: this.behavior.undulationAmplitude,
        phase: Math.random() * Math.PI * 2, // Random starting phase
        speedMultiplier: 1.0
      },
      
      // Roll system (more agile for smaller fish)
      roll: {
        currentAngle: 0,
        targetAngle: 0,
        rollSpeed: this.behavior.rollSpeed * this.size.agilityMultiplier,
        maxRollAngle: this.behavior.maxRollAngle
      },
      
      // Speed system (faster base speeds for smaller fish)
      speed: {
        currentMode: SpeedMode.CRUISING,
        targetSpeed: SpeedMode.CRUISING * this.size.speedMultiplier,
        currentSpeed: SpeedMode.CRUISING * this.size.speedMultiplier,
        acceleration: this.behavior.accelerationRate * this.size.agilityMultiplier,
        lastModeChange: this.lastUpdateTime
      },
      
      // Direction system (more agile turning for smaller fish)
      direction: {
        currentHeading: new THREE.Vector3(0, 0, 1), // Start facing forward
        targetHeading: new THREE.Vector3(0, 0, 1),
        turnRate: this.behavior.maxTurnRate * this.size.turnRateMultiplier,
        turnRadius: 2.5 * this.size.bodyLength, // 2.5 body lengths (actual size)
        lastDirectionChange: this.lastUpdateTime,
        isChangingDirection: false
      }
    }
    
    // Set initial velocity based on starting speed
    this.updateVelocityFromHeading()
  }

  /**
   * Main update method - Phase 1 core movements + Flocking + Boundary Avoidance
   */
  public update(deltaTime: number, neighbors?: Fish[], bounds?: THREE.Box3): void {
    const currentTime = performance.now() * 0.001
    
    // Update all Phase 1 movement systems
    this.updateUndulation(deltaTime, currentTime)
    this.updateSpeedVariation(deltaTime, currentTime)
    this.updateDirectionChanges(deltaTime, currentTime)
    this.updateRoll(deltaTime, currentTime)
    
    // Apply boundary avoidance if bounds provided
    if (bounds) {
      this.updateBoundaryAvoidance(deltaTime, bounds)
    }
    
    // Apply flocking behaviors if neighbors provided
    if (neighbors && neighbors.length > 0) {
      this.updateFlockingBehavior(deltaTime, neighbors)
    }
    
    // Apply movement to physics
    this.updatePhysics(deltaTime)
    
    this.lastUpdateTime = currentTime
  }

  /**
   * P1.1: UNDULATION - S-shaped body waves for propulsion
   */
  private updateUndulation(deltaTime: number, _currentTime: number): void {
    const undulation = this.movement.undulation
    
    // Update undulation frequency based on speed (faster = higher frequency)
    const speedRatio = this.movement.speed.currentSpeed / SpeedMode.BURST
    undulation.speedMultiplier = 1.0 + speedRatio * 1.5 // 1.0x to 2.5x frequency
    
    // Update undulation phase
    const effectiveFrequency = undulation.frequency * undulation.speedMultiplier
    undulation.phase += effectiveFrequency * Math.PI * 2 * deltaTime
    
    // Keep phase in range [0, 2π]
    if (undulation.phase > Math.PI * 2) {
      undulation.phase -= Math.PI * 2
    }
  }

  /**
   * P1.2: SPEED VARIATION - Different swimming modes
   */
  private updateSpeedVariation(deltaTime: number, currentTime: number): void {
    const speed = this.movement.speed
    
    // Change speed mode periodically (every 3-8 seconds)
    if (currentTime - speed.lastModeChange > 3 + Math.random() * 5) {
      this.changeSpeedMode()
      speed.lastModeChange = currentTime
    }
    
    // Smoothly transition to target speed
    const speedDifference = speed.targetSpeed - speed.currentSpeed
    if (Math.abs(speedDifference) > 0.01) {
      const maxSpeedChange = speed.acceleration * deltaTime
      const speedChange = Math.sign(speedDifference) * Math.min(Math.abs(speedDifference), maxSpeedChange)
      speed.currentSpeed += speedChange
    }
  }

  /**
   * P1.3: DIRECTION CHANGES - Steering and navigation
   */
  private updateDirectionChanges(deltaTime: number, currentTime: number): void {
    const direction = this.movement.direction
    
    // Initiate new direction changes periodically (every 2-6 seconds)
    if (!direction.isChangingDirection && 
        currentTime - direction.lastDirectionChange > 2 + Math.random() * 4) {
      this.initiateDirectionChange()
      direction.lastDirectionChange = currentTime
    }
    
    // Update current heading towards target
    if (direction.isChangingDirection) {
      const angleDifference = direction.currentHeading.angleTo(direction.targetHeading)
      
      if (angleDifference > 0.05) { // 3 degrees tolerance
        // Calculate turn rate (limited by max turn rate)
        const maxAngleChange = direction.turnRate * deltaTime
        const angleChange = Math.min(angleDifference, maxAngleChange)
        
        // Slerp towards target heading
        direction.currentHeading.lerp(direction.targetHeading, angleChange / angleDifference)
        direction.currentHeading.normalize()
        
        // Update roll target based on turn direction
        this.updateRollForTurn(direction.currentHeading, direction.targetHeading)
      } else {
        // Turn complete
        direction.currentHeading.copy(direction.targetHeading)
        direction.isChangingDirection = false
        this.movement.roll.targetAngle = 0 // Return to level
      }
    }
  }

  /**
   * P1.4: ROLL - Banking during turns like aircraft
   */
  private updateRoll(deltaTime: number, _currentTime: number): void {
    const roll = this.movement.roll
    
    // Smoothly transition to target roll angle
    const rollDifference = roll.targetAngle - roll.currentAngle
    if (Math.abs(rollDifference) > 0.01) {
      const maxRollChange = roll.rollSpeed * deltaTime
      const rollChange = Math.sign(rollDifference) * Math.min(Math.abs(rollDifference), maxRollChange)
      roll.currentAngle += rollChange
    }
    
    // Clamp roll angle to maximum
    roll.currentAngle = Math.max(-roll.maxRollAngle, Math.min(roll.maxRollAngle, roll.currentAngle))
  }

  /**
   * BOUNDARY AVOIDANCE - Gradual turning away from edges
   */
  private updateBoundaryAvoidance(_deltaTime: number, bounds: THREE.Box3): void {
    const position = this.physics.position
    const avoidanceDistance = this.size.bodyLength * 5 // Start avoiding 5 body lengths from edge
    const urgentDistance = this.size.bodyLength * 2   // Urgent avoidance 2 body lengths from edge
    
    let avoidanceForce = new THREE.Vector3()
    let urgentAvoidance = false
    
    // Check each boundary and calculate avoidance force
    
    // X boundaries (left/right walls)
    if (position.x - bounds.min.x < avoidanceDistance) {
      const distance = position.x - bounds.min.x
      const strength = Math.max(0, (avoidanceDistance - distance) / avoidanceDistance)
      avoidanceForce.x += strength * 2.0 // Push away from left wall
      if (distance < urgentDistance) urgentAvoidance = true
    }
    if (bounds.max.x - position.x < avoidanceDistance) {
      const distance = bounds.max.x - position.x
      const strength = Math.max(0, (avoidanceDistance - distance) / avoidanceDistance)
      avoidanceForce.x -= strength * 2.0 // Push away from right wall
      if (distance < urgentDistance) urgentAvoidance = true
    }
    
    // Y boundaries (top/bottom)
    if (position.y - bounds.min.y < avoidanceDistance) {
      const distance = position.y - bounds.min.y
      const strength = Math.max(0, (avoidanceDistance - distance) / avoidanceDistance)
      avoidanceForce.y += strength * 2.0 // Push away from bottom
      if (distance < urgentDistance) urgentAvoidance = true
    }
    if (bounds.max.y - position.y < avoidanceDistance) {
      const distance = bounds.max.y - position.y
      const strength = Math.max(0, (avoidanceDistance - distance) / avoidanceDistance)
      avoidanceForce.y -= strength * 2.0 // Push away from top
      if (distance < urgentDistance) urgentAvoidance = true
    }
    
    // Z boundaries (front/back walls)
    if (position.z - bounds.min.z < avoidanceDistance) {
      const distance = position.z - bounds.min.z
      const strength = Math.max(0, (avoidanceDistance - distance) / avoidanceDistance)
      avoidanceForce.z += strength * 2.0 // Push away from back wall
      if (distance < urgentDistance) urgentAvoidance = true
    }
    if (bounds.max.z - position.z < avoidanceDistance) {
      const distance = bounds.max.z - position.z
      const strength = Math.max(0, (avoidanceDistance - distance) / avoidanceDistance)
      avoidanceForce.z -= strength * 2.0 // Push away from front wall
      if (distance < urgentDistance) urgentAvoidance = true
    }
    
    // Apply avoidance force if needed
    if (avoidanceForce.length() > 0) {
      avoidanceForce.normalize()
      
      // Blend avoidance direction with current heading
      const currentHeading = this.movement.direction.currentHeading.clone()
      const avoidanceWeight = urgentAvoidance ? 0.8 : 0.3 // Stronger influence when urgent
      
      // Create new target heading that blends current direction with avoidance
      const newHeading = currentHeading.multiplyScalar(1 - avoidanceWeight)
                                      .add(avoidanceForce.multiplyScalar(avoidanceWeight))
      newHeading.normalize()
      
      // Update target heading for gradual turning
      this.movement.direction.targetHeading.copy(newHeading)
      this.movement.direction.isChangingDirection = true
      
      // Increase turn rate for urgent avoidance
      if (urgentAvoidance) {
        this.movement.direction.turnRate = this.behavior.maxTurnRate * this.size.turnRateMultiplier * 1.5
      }
    }
    
    // Hard boundary enforcement (prevent fish from going outside)
    position.x = Math.max(bounds.min.x + 0.5, Math.min(bounds.max.x - 0.5, position.x))
    position.y = Math.max(bounds.min.y + 0.5, Math.min(bounds.max.y - 0.5, position.y))
    position.z = Math.max(bounds.min.z + 0.5, Math.min(bounds.max.z - 0.5, position.z))
  }

  /**
   * FLOCKING BEHAVIORS - Boids algorithm integration
   */
  private updateFlockingBehavior(deltaTime: number, neighbors: Fish[]): void {
    // Get nearby neighbors within detection radius
    const nearbyNeighbors = this.getNearbyNeighbors(neighbors)
    
    if (nearbyNeighbors.length === 0) return
    
    // Calculate flocking forces
    const cohesionForce = this.calculateCohesion(nearbyNeighbors)
    const separationForce = this.calculateSeparation(nearbyNeighbors)
    const alignmentForce = this.calculateAlignment(nearbyNeighbors)
    
    // Combine social forces
    const socialForce = new THREE.Vector3()
    socialForce.add(cohesionForce.multiplyScalar(this.behavior.cohesionStrength))
    socialForce.add(separationForce.multiplyScalar(this.behavior.separationStrength))
    socialForce.add(alignmentForce.multiplyScalar(this.behavior.alignmentStrength))
    
    // Apply social influence to individual behavior
    this.applySocialInfluence(socialForce, deltaTime)
  }

  /**
   * F1: COHESION - Attraction to group center
   */
  private calculateCohesion(neighbors: Fish[]): THREE.Vector3 {
    if (neighbors.length === 0) return new THREE.Vector3()
    
    // Calculate center of mass of neighbors
    const centerOfMass = new THREE.Vector3()
    neighbors.forEach(neighbor => {
      centerOfMass.add(neighbor.physics.position)
    })
    centerOfMass.divideScalar(neighbors.length)
    
    // Direction towards center of mass
    const cohesionDirection = centerOfMass.sub(this.physics.position)
    cohesionDirection.normalize()
    
    return cohesionDirection
  }

  /**
   * F2: SEPARATION - Avoidance of crowding
   */
  private calculateSeparation(neighbors: Fish[]): THREE.Vector3 {
    const separationForce = new THREE.Vector3()
    let separationCount = 0
    
    neighbors.forEach(neighbor => {
      const distance = this.physics.position.distanceTo(neighbor.physics.position)
      
      if (distance < this.behavior.separationRadius && distance > 0) {
        // Direction away from neighbor
        const awayDirection = this.physics.position.clone().sub(neighbor.physics.position)
        awayDirection.normalize()
        
        // Stronger force when closer
        const strength = (this.behavior.separationRadius - distance) / this.behavior.separationRadius
        awayDirection.multiplyScalar(strength)
        
        separationForce.add(awayDirection)
        separationCount++
      }
    })
    
    if (separationCount > 0) {
      separationForce.divideScalar(separationCount)
      separationForce.normalize()
    }
    
    return separationForce
  }

  /**
   * F3: ALIGNMENT - Velocity matching
   */
  private calculateAlignment(neighbors: Fish[]): THREE.Vector3 {
    if (neighbors.length === 0) return new THREE.Vector3()
    
    // Calculate average velocity of neighbors
    const averageVelocity = new THREE.Vector3()
    neighbors.forEach(neighbor => {
      averageVelocity.add(neighbor.physics.velocity)
    })
    averageVelocity.divideScalar(neighbors.length)
    
    // Direction towards average velocity
    averageVelocity.normalize()
    
    return averageVelocity
  }

  /**
   * F4: NEIGHBOR DETECTION - Efficient spatial awareness
   */
  private getNearbyNeighbors(allFish: Fish[]): Fish[] {
    const nearby: Fish[] = []
    const detectionRadius = this.behavior.neighborRadius
    
    allFish.forEach(otherFish => {
      if (otherFish !== this) {
        const distance = this.physics.position.distanceTo(otherFish.physics.position)
        if (distance <= detectionRadius) {
          nearby.push(otherFish)
        }
      }
    })
    
    return nearby
  }

  /**
   * F5: BALANCE INDIVIDUAL VS SOCIAL FORCES
   */
  private applySocialInfluence(socialForce: THREE.Vector3, deltaTime: number): void {
    if (socialForce.length() === 0) return
    
    // Blend social force with individual direction
    const currentHeading = this.movement.direction.currentHeading.clone()
    const socialHeading = socialForce.normalize()
    
    // Weight the forces based on behavior settings
    const individualForce = currentHeading.multiplyScalar(this.behavior.individualWeight)
    const weightedSocialForce = socialHeading.multiplyScalar(this.behavior.socialWeight)
    
    // Combine and normalize
    const combinedDirection = individualForce.add(weightedSocialForce)
    combinedDirection.normalize()
    
    // Apply social influence to target heading (gradual change)
    const influenceStrength = 0.3 // How quickly social forces affect individual behavior
    this.movement.direction.targetHeading.lerp(combinedDirection, influenceStrength * deltaTime)
    this.movement.direction.targetHeading.normalize()
    
    // Trigger direction change if social force is strong
    if (socialForce.length() > 0.5) {
      this.movement.direction.isChangingDirection = true
    }
  }

  /**
   * Apply movement to physics system
   */
  private updatePhysics(deltaTime: number): void {
    // Update velocity from current heading and speed
    this.updateVelocityFromHeading()
    
    // Update position
    this.physics.position.add(
      this.physics.velocity.clone().multiplyScalar(deltaTime)
    )
    
    // Update rotation to face movement direction
    this.updateRotationFromMovement()
  }

  /**
   * Helper methods
   */
  private changeSpeedMode(): void {
    const modes = [SpeedMode.RESTING, SpeedMode.CRUISING, SpeedMode.ACTIVE, SpeedMode.BURST]
    const weights = [0.2, 0.5, 0.25, 0.05] // Weighted random selection
    
    let random = Math.random()
    for (let i = 0; i < modes.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        this.movement.speed.currentMode = modes[i]
        // Apply size-based speed scaling
        const baseSpeed = modes[i] + (Math.random() - 0.5) * 0.3 // ±15% variation
        this.movement.speed.targetSpeed = baseSpeed * this.size.speedMultiplier
        break
      }
    }
  }

  /**
   * Generate realistic size characteristics with bell curve distribution
   */
  private generateSizeCharacteristics(baseBodyLength: number): FishSize {
    // Generate size factor using normal distribution (bell curve)
    // Most fish will be average size, few will be very small or very large
    const sizeVariation = this.generateNormalRandom(0, 0.2) // Mean=0, StdDev=0.2
    const scaleFactor = Math.max(0.6, Math.min(1.4, 1.0 + sizeVariation)) // Clamp to 0.6-1.4
    
    // Calculate actual body length
    const actualBodyLength = baseBodyLength * scaleFactor
    
    // Inverse relationship: smaller fish are faster and more agile
    // Size factor 0.6 -> Speed/Agility multiplier ~1.3 (30% faster)
    // Size factor 1.4 -> Speed/Agility multiplier ~0.7 (30% slower)
    const speedMultiplier = Math.max(0.7, Math.min(1.3, 2.0 - scaleFactor))
    const agilityMultiplier = Math.max(0.7, Math.min(1.3, 2.0 - scaleFactor))
    const turnRateMultiplier = Math.max(0.7, Math.min(1.3, 2.0 - scaleFactor))
    
    return {
      scaleFactor,
      bodyLength: actualBodyLength,
      speedMultiplier,
      agilityMultiplier,
      turnRateMultiplier
    }
  }

  /**
   * Generate normally distributed random numbers (Box-Muller transform)
   */
  private generateNormalRandom(mean: number, stdDev: number): number {
    let u = 0, v = 0
    while(u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z * stdDev + mean
  }

  private initiateDirectionChange(): void {
    const direction = this.movement.direction
    
    // Generate new target heading (±90 degrees from current)
    const currentAngle = Math.atan2(direction.currentHeading.x, direction.currentHeading.z)
    const turnAngle = (Math.random() - 0.5) * Math.PI // ±90 degrees
    const newAngle = currentAngle + turnAngle
    
    direction.targetHeading.set(
      Math.sin(newAngle),
      0, // Keep in horizontal plane for now
      Math.cos(newAngle)
    ).normalize()
    
    direction.isChangingDirection = true
  }

  private updateRollForTurn(current: THREE.Vector3, target: THREE.Vector3): void {
    // Calculate cross product to determine turn direction
    const cross = new THREE.Vector3().crossVectors(current, target)
    const turnDirection = Math.sign(cross.y)
    
    // Set roll angle proportional to turn angle (banking into turn)
    const turnAngle = current.angleTo(target)
    const rollIntensity = Math.min(turnAngle / (Math.PI / 4), 1.0) // Normalize to max at 45° turn
    
    this.movement.roll.targetAngle = -turnDirection * rollIntensity * this.movement.roll.maxRollAngle
  }

  private updateVelocityFromHeading(): void {
    this.physics.velocity.copy(this.movement.direction.currentHeading)
    this.physics.velocity.multiplyScalar(this.movement.speed.currentSpeed * this.size.bodyLength)
  }

  private updateRotationFromMovement(): void {
    // Update Y rotation (yaw) to face movement direction
    const heading = this.movement.direction.currentHeading
    this.physics.rotation.y = Math.atan2(heading.x, heading.z)
    
    // Apply roll (Z rotation)
    this.physics.rotation.z = this.movement.roll.currentAngle
    
    // Apply undulation to Y rotation (tail wagging effect)
    const undulationEffect = Math.sin(this.movement.undulation.phase) * 
                            this.movement.undulation.amplitude * 0.3 // 30% of amplitude
    this.physics.rotation.y += undulationEffect
  }

  /**
   * Getter methods for external access
   */
  public getPosition(): THREE.Vector3 {
    return this.physics.position.clone()
  }

  public getRotation(): THREE.Euler {
    return this.physics.rotation.clone()
  }

  public getVelocity(): THREE.Vector3 {
    return this.physics.velocity.clone()
  }

  public getScale(): THREE.Vector3 {
    return this.physics.scale.clone()
  }

  public getSpeed(): number {
    return this.movement.speed.currentSpeed
  }

  public getSpeedMode(): SpeedMode {
    return this.movement.speed.currentMode
  }

  public getUndulationPhase(): number {
    return this.movement.undulation.phase
  }

  public getUndulationAmplitude(): number {
    return this.movement.undulation.amplitude
  }

  public getRollAngle(): number {
    return this.movement.roll.currentAngle
  }

  public getHeading(): THREE.Vector3 {
    return this.movement.direction.currentHeading.clone()
  }

  public isMoving(): boolean {
    return this.movement.speed.currentSpeed > 0.1
  }

  public isChangingDirection(): boolean {
    return this.movement.direction.isChangingDirection
  }

  public getSizeFactor(): number {
    return this.size.scaleFactor
  }

  public getActualBodyLength(): number {
    return this.size.bodyLength
  }

  public getSpeedMultiplier(): number {
    return this.size.speedMultiplier
  }

  public getAgilityMultiplier(): number {
    return this.size.agilityMultiplier
  }

  /**
   * Utility methods
   */
  public getDistanceTo(otherFish: Fish): number {
    return this.physics.position.distanceTo(otherFish.physics.position)
  }

  public getDirectionTo(otherFish: Fish): THREE.Vector3 {
    return otherFish.physics.position.clone().sub(this.physics.position).normalize()
  }

  public setPosition(position: THREE.Vector3): void {
    this.physics.position.copy(position)
  }

  public setRotation(rotation: THREE.Euler): void {
    this.physics.rotation.copy(rotation)
  }

  public dispose(): void {
    // No resources to dispose for Phase 1
  }
}