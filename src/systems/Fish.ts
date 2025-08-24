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
 * Fish behavior configuration for Phase 1
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
}

/**
 * Phase 1 Fish class with core movement systems
 */
export class Fish {
  public physics: FishPhysics
  public behavior: FishBehavior
  public movement: CoreMovement
  private lastUpdateTime: number = 0

  constructor(position: THREE.Vector3, behavior: FishBehavior) {
    this.behavior = behavior
    this.lastUpdateTime = performance.now() * 0.001 // Convert to seconds
    
    // Initialize physics
    this.physics = {
      position: position.clone(),
      rotation: new THREE.Euler(0, Math.random() * Math.PI * 2, 0), // Random initial heading
      scale: new THREE.Vector3(1, 1, 1),
      velocity: new THREE.Vector3(0, 0, 0)
    }
    
    // Initialize core movement systems
    this.movement = {
      // Undulation system
      undulation: {
        frequency: this.behavior.undulationFrequency,
        amplitude: this.behavior.undulationAmplitude,
        phase: Math.random() * Math.PI * 2, // Random starting phase
        speedMultiplier: 1.0
      },
      
      // Roll system
      roll: {
        currentAngle: 0,
        targetAngle: 0,
        rollSpeed: this.behavior.rollSpeed,
        maxRollAngle: this.behavior.maxRollAngle
      },
      
      // Speed system
      speed: {
        currentMode: SpeedMode.CRUISING,
        targetSpeed: SpeedMode.CRUISING,
        currentSpeed: SpeedMode.CRUISING,
        acceleration: this.behavior.accelerationRate,
        lastModeChange: this.lastUpdateTime
      },
      
      // Direction system
      direction: {
        currentHeading: new THREE.Vector3(0, 0, 1), // Start facing forward
        targetHeading: new THREE.Vector3(0, 0, 1),
        turnRate: this.behavior.maxTurnRate,
        turnRadius: 2.5 * this.behavior.bodyLength, // 2.5 body lengths
        lastDirectionChange: this.lastUpdateTime,
        isChangingDirection: false
      }
    }
    
    // Set initial velocity based on starting speed
    this.updateVelocityFromHeading()
  }

  /**
   * Main update method - Phase 1 core movements
   */
  public update(deltaTime: number): void {
    const currentTime = performance.now() * 0.001
    
    // Update all Phase 1 movement systems
    this.updateUndulation(deltaTime, currentTime)
    this.updateSpeedVariation(deltaTime, currentTime)
    this.updateDirectionChanges(deltaTime, currentTime)
    this.updateRoll(deltaTime, currentTime)
    
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
        this.movement.speed.targetSpeed = modes[i] + (Math.random() - 0.5) * 0.3 // ±15% variation
        break
      }
    }
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
    this.physics.velocity.multiplyScalar(this.movement.speed.currentSpeed * this.behavior.bodyLength)
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