import * as THREE from 'three'

// ============================================================================
// PHASE 1 - CORE MOVEMENT SYSTEM
// ============================================================================

export enum FishState {
  CRUISE = 'CRUISE',
  BURST = 'BURST',
  BAIT_BALL = 'BAIT_BALL',
  RECOVER = 'RECOVER'
}

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

  // MICRO-CORRECTIONS
  drift: {
    noiseOffset: number // Random starting value for noise
    verticalPhase: number // Random starting phase for vertical oscillation
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
  scaleFactor: number      // Overall size multiplier (0.4 - 1.6)
  bodyLength: number       // Actual body length in world units
  speedMultiplier: number  // Speed boost for smaller fish (0.6 - 1.4)
  agilityMultiplier: number // Agility boost for smaller fish (0.6 - 1.4)
  turnRateMultiplier: number // Turn rate boost for smaller fish (0.6 - 1.4)
}

export interface FishAppearance {
  brightnessVariation: number // Individual brightness multiplier (0.8-1.2)
  colorVariation: number      // Subtle color variation (0.95-1.05)
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
  collisionRadius: number         // Emergency collision avoidance radius (smaller than separation)
  cohesionStrength: number        // Attraction to group center (0-1)
  separationStrength: number      // Avoidance of crowding (0-1)
  alignmentStrength: number       // Velocity matching strength (0-1)

  // Force balancing
  individualWeight: number        // Weight of individual behavior (0-1)
  socialWeight: number           // Weight of flocking behavior (0-1)

  // Elasticity
  waveDelayFactor: number
  clusterBias: number
  edgeSpeedMultiplier: number

  // Predator
  burstMultiplier: number
  compressionStrength: number
  baitBallDuration: number
  recoveryDuration: number

  // Environment
  seabedAvoidanceStrength: number
  obstacleLookAheadDistance: number
  preferredDepthBand: number
}

/**
 * Phase 1 Fish class with core movement systems + Size Variation
 */
export class Fish {
  public physics: FishPhysics
  public behavior: FishBehavior
  public movement: CoreMovement
  public size: FishSize
  public appearance: FishAppearance
  public isLeader: boolean
  public state: FishState
  public predatorSource: THREE.Vector3 | null = null
  public predatorEventStartTime: number = 0
  private lastUpdateTime: number = 0

  constructor(position: THREE.Vector3, behavior: FishBehavior) {
    // Clone behavior so each fish can have individualized parameter overrides
    this.behavior = { ...behavior }
    this.lastUpdateTime = performance.now() * 0.001 // Convert to seconds

    // Initialize size characteristics with realistic distribution
    this.size = this.generateSizeCharacteristics(this.behavior.bodyLength)

    // Initialize appearance characteristics for visual variety
    this.appearance = this.generateAppearanceCharacteristics()

    // 2% chance for a fish to be a leader
    this.isLeader = Math.random() < 0.02

    // Leaders have stronger individual will and less social cohesion
    if (this.isLeader) {
      this.behavior.cohesionStrength = 0.05
      this.behavior.individualWeight = 0.8
    }

    this.state = FishState.CRUISE

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
      },

      // Micro-corrections system
      drift: {
        noiseOffset: Math.random() * 1000,
        verticalPhase: Math.random() * Math.PI * 2
      }
    }

    // Set initial velocity based on starting speed
    this.updateVelocityFromHeading()
  }

  /**
   * Main update method - Phase 1 core movements + Flocking + Boundary Avoidance
   */
  public update(deltaTime: number, neighbors?: Fish[], bounds?: THREE.Box3, activePredatorPosition: THREE.Vector3 | null = null): void {
    const currentTime = performance.now() * 0.001

    // Update real-time predator interaction
    if (activePredatorPosition) {
      this.predatorSource = activePredatorPosition.clone()

      // Auto-trigger burst or bait ball if shark gets too close and we're not already reacting
      const distToShark = this.physics.position.distanceTo(activePredatorPosition)
      const triggersThreshold = this.behavior.neighborRadius * 1.5

      if (distToShark < triggersThreshold && this.state === FishState.CRUISE) {
        this.triggerPredator(activePredatorPosition, currentTime)
      }
    }

    // State machine logic
    this.updateStateLogic(deltaTime, currentTime)

    // Update all Phase 1 movement systems
    this.updateUndulation(deltaTime, currentTime)
    this.updateSpeedVariation(deltaTime, currentTime)
    this.updateDirectionChanges(deltaTime, currentTime)
    this.updateRoll(deltaTime, currentTime)

    // Apply micro-corrections (drift, vertical oscillation)
    this.updateMicroCorrections(deltaTime, currentTime)

    // Apply boundary avoidance if bounds provided
    if (bounds) {
      this.updateBoundaryAvoidance(deltaTime, bounds)
    }

    // Apply flocking behaviors if neighbors provided
    if (neighbors && neighbors.length > 0) {
      this.updateFlockingBehavior(deltaTime, neighbors)
    }

    // Apply movement to physics with inertia
    this.updatePhysics(deltaTime)

    this.lastUpdateTime = currentTime
  }

  private updateStateLogic(_deltaTime: number, currentTime: number): void {
    if (this.state === FishState.CRUISE) return

    const timeSinceEvent = currentTime - this.predatorEventStartTime

    // Phase timings
    const shockDuration = 1.0
    const baitBallDuration = shockDuration + (this.behavior.baitBallDuration / 1000)
    const escapeDuration = baitBallDuration + 2.0
    const recoverDuration = escapeDuration + (this.behavior.recoveryDuration / 1000)

    if (timeSinceEvent < shockDuration) {
      // Phase 1: Shock / Burst
      this.state = FishState.BURST
      this.movement.speed.targetSpeed = SpeedMode.BURST * this.size.speedMultiplier * this.behavior.burstMultiplier
    } else if (timeSinceEvent < baitBallDuration) {
      // Phase 2: Bait Ball
      this.state = FishState.BAIT_BALL
      this.movement.speed.targetSpeed = SpeedMode.ACTIVE * this.size.speedMultiplier
    } else if (timeSinceEvent < escapeDuration) {
      // Phase 3: Escape Burst
      this.state = FishState.BURST // Reuse burst speed
      this.movement.speed.targetSpeed = SpeedMode.BURST * this.size.speedMultiplier * this.behavior.burstMultiplier
    } else if (timeSinceEvent < recoverDuration) {
      // Phase 4: Recover
      this.state = FishState.RECOVER
      // Interpolate speed back down
      this.movement.speed.targetSpeed = SpeedMode.CRUISING * this.size.speedMultiplier
    } else {
      // Event over
      this.state = FishState.CRUISE
      this.predatorSource = null
    }
  }

  public triggerPredator(position: THREE.Vector3, currentTime: number): void {
    const distSq = this.physics.position.distanceToSquared(position)
    // Only react if within ~150 units
    if (distSq < 150 * 150) {
      this.predatorSource = position.clone()
      this.predatorEventStartTime = currentTime
      this.state = FishState.BURST
      this.movement.speed.targetSpeed = SpeedMode.BURST * this.size.speedMultiplier * this.behavior.burstMultiplier
    }
  }

  private updateMicroCorrections(deltaTime: number, currentTime: number): void {
    if (this.state !== FishState.CRUISE) return

    const drift = this.movement.drift
    const direction = this.movement.direction

    // Perlin-like Heading Drift
    const timeOffset = currentTime + drift.noiseOffset
    // Combine sine waves for pseudo-random organic drift
    const noise = Math.sin(timeOffset * 0.5) + Math.sin(timeOffset * 1.3) * 0.5 + Math.sin(timeOffset * 2.7) * 0.25

    // Apply tiny drift to target heading
    const driftStrength = 0.05 * deltaTime

    // Create a perpendicular vector for horizontal drift
    const up = new THREE.Vector3(0, 1, 0)
    const right = new THREE.Vector3().crossVectors(direction.currentHeading, up).normalize()

    if (right.lengthSq() > 0.01) {
      direction.targetHeading.addScaledVector(right, noise * driftStrength)
    }

    // Vertical micro-oscillation
    const verticalNoise = Math.sin(timeOffset * 0.8 + drift.verticalPhase) * 0.1 * deltaTime
    direction.targetHeading.y += verticalNoise

    direction.targetHeading.normalize()
  }

  /**
   * P1.1: UNDULATION - S-shaped body waves for propulsion
   */
  private updateUndulation(deltaTime: number, _currentTime: number): void {
    const undulation = this.movement.undulation

    // Update undulation frequency based on speed (proportional tail wagging)
    const speedRatio = this.movement.speed.currentSpeed / SpeedMode.BURST
    undulation.speedMultiplier = 0.05 + speedRatio * 1.2 // Reduced from 3.5 for more graceful motion

    // Scale amplitude significantly based on speed to prevent excessive wagging when slow
    const amplitudeScale = 0.1 + speedRatio * 1.2 // Wider range: 0.1 to 1.3
    undulation.amplitude = this.behavior.undulationAmplitude * amplitudeScale * 0.8

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
        // Calculate dynamic turn rate proportional to swimming speed
        const speedRatio = this.movement.speed.currentSpeed / SpeedMode.BURST
        const proportionalTurnRate = direction.turnRate * (0.1 + speedRatio * 0.9) // Much slower turning when moving slowly

        const maxAngleChange = proportionalTurnRate * deltaTime
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
    const velocity = this.physics.velocity

    // Enhanced predictive boundary avoidance with multiple zones
    // Horizontal boundaries (X, Z) - larger distances for wall avoidance
    const horizontalEarlyWarning = this.size.bodyLength * 12  // Start gentle turning 12 body lengths away
    const horizontalAvoidance = this.size.bodyLength * 8      // Moderate avoidance 8 body lengths from edge
    const horizontalUrgent = this.size.bodyLength * 3        // Urgent avoidance 3 body lengths from edge

    // Vertical boundaries (Y - depth) - smaller distances to allow natural depth distribution
    const verticalEarlyWarning = this.size.bodyLength * 6    // Reduced for depth - 6 body lengths
    const verticalAvoidance = this.size.bodyLength * 4       // Reduced for depth - 4 body lengths  
    const verticalUrgent = this.size.bodyLength * 2          // Reduced for depth - 2 body lengths

    let avoidanceForce = new THREE.Vector3()
    let urgentAvoidance = false
    let earlyWarning = false

    // Check each boundary and calculate avoidance force

    // X boundaries (left/right walls) - Enhanced predictive avoidance with collision angle detection
    const leftDistance = position.x - bounds.min.x
    const rightDistance = bounds.max.x - position.x

    // Predictive component: consider where fish will be based on current velocity
    const futureX = position.x + velocity.x * 2.0 // Look ahead 2 seconds
    const leftFutureDistance = futureX - bounds.min.x
    const rightFutureDistance = bounds.max.x - futureX

    // Collision angle detection - check if fish is heading toward wall
    const isHeadingTowardLeftWall = velocity.x < -0.1 // Moving left with significant speed
    const isHeadingTowardRightWall = velocity.x > 0.1 // Moving right with significant speed

    // Left wall avoidance
    if (leftDistance < horizontalEarlyWarning || leftFutureDistance < horizontalEarlyWarning) {
      const currentDist = Math.min(leftDistance, leftFutureDistance)
      let strength = 0

      // Calculate collision angle multiplier - stronger avoidance when heading directly toward wall
      const collisionAngleMultiplier = isHeadingTowardLeftWall ? 2.0 : 1.0

      if (currentDist < horizontalUrgent) {
        strength = 3.0 * collisionAngleMultiplier // Much stronger when heading toward wall
        urgentAvoidance = true
      } else if (currentDist < horizontalAvoidance) {
        strength = Math.max(0, (horizontalAvoidance - currentDist) / horizontalAvoidance) * 2.0 * collisionAngleMultiplier
      } else {
        // Early warning - more aggressive when heading toward wall
        const baseStrength = Math.max(0, (horizontalEarlyWarning - currentDist) / horizontalEarlyWarning) * 0.5
        strength = baseStrength * collisionAngleMultiplier
        earlyWarning = true
      }

      avoidanceForce.x += strength
    }

    // Right wall avoidance
    if (rightDistance < horizontalEarlyWarning || rightFutureDistance < horizontalEarlyWarning) {
      const currentDist = Math.min(rightDistance, rightFutureDistance)
      let strength = 0

      // Calculate collision angle multiplier - stronger avoidance when heading directly toward wall
      const collisionAngleMultiplier = isHeadingTowardRightWall ? 2.0 : 1.0

      if (currentDist < horizontalUrgent) {
        strength = 3.0 * collisionAngleMultiplier // Much stronger when heading toward wall
        urgentAvoidance = true
      } else if (currentDist < horizontalAvoidance) {
        strength = Math.max(0, (horizontalAvoidance - currentDist) / horizontalAvoidance) * 2.0 * collisionAngleMultiplier
      } else {
        // Early warning - more aggressive when heading toward wall
        const baseStrength = Math.max(0, (horizontalEarlyWarning - currentDist) / horizontalEarlyWarning) * 0.5
        strength = baseStrength * collisionAngleMultiplier
        earlyWarning = true
      }

      avoidanceForce.x -= strength
    }

    // Y boundaries (top/bottom) - Enhanced predictive avoidance with collision angle detection
    // Treat the seabed as bounds.min.y, but apply a strong organic steering force
    // Treat preferred depth as a soft attractive zone

    // 1. Seabed Avoidance
    const heightAboveSeabed = position.y - bounds.min.y
    const futureHeight = position.y + velocity.y * 2.0
    const isHeadingDown = velocity.y < -0.1

    if (heightAboveSeabed < verticalEarlyWarning * 2 || futureHeight < verticalEarlyWarning * 2) {
      const currentDist = Math.min(heightAboveSeabed, futureHeight)
      let strength = 0

      const collisionAngleMultiplier = isHeadingDown ? 2.5 : 1.0

      if (currentDist < verticalUrgent) {
        strength = 4.0 * collisionAngleMultiplier * this.behavior.seabedAvoidanceStrength // Extreme push up
        urgentAvoidance = true
      } else if (currentDist < verticalAvoidance * 1.5) {
        strength = Math.max(0, ((verticalAvoidance * 1.5) - currentDist) / (verticalAvoidance * 1.5)) * 2.5 * collisionAngleMultiplier * this.behavior.seabedAvoidanceStrength
      } else {
        const baseStrength = Math.max(0, ((verticalEarlyWarning * 2) - currentDist) / (verticalEarlyWarning * 2)) * 0.8
        strength = baseStrength * collisionAngleMultiplier * this.behavior.seabedAvoidanceStrength
        earlyWarning = true
      }

      avoidanceForce.y += strength
    }

    // 2. Surface / Top Avoidance
    const depthBelowSurface = bounds.max.y - position.y
    const futureY = position.y + velocity.y * 2.0
    const futureDepth = bounds.max.y - futureY
    const isHeadingUp = velocity.y > 0.1

    if (depthBelowSurface < verticalEarlyWarning || futureDepth < verticalEarlyWarning) {
      const currentDist = Math.min(depthBelowSurface, futureDepth)
      let strength = 0

      const collisionAngleMultiplier = isHeadingUp ? 2.0 : 1.0

      if (currentDist < verticalUrgent) {
        strength = 3.0 * collisionAngleMultiplier
        urgentAvoidance = true
      } else if (currentDist < verticalAvoidance) {
        strength = Math.max(0, (verticalAvoidance - currentDist) / verticalAvoidance) * 1.5 * collisionAngleMultiplier
      } else {
        const baseStrength = Math.max(0, (verticalEarlyWarning - currentDist) / verticalEarlyWarning) * 0.5
        strength = baseStrength * collisionAngleMultiplier
        earlyWarning = true
      }

      avoidanceForce.y -= strength
    }

    // 3. Preferred Depth Band (Soft correction when not in urgent boundary avoidance)
    if (!urgentAvoidance) {
      const targetDepth = bounds.min.y + this.behavior.preferredDepthBand

      const distToTarget = position.y - targetDepth
      // Only apply correction if outside the band core
      if (Math.abs(distToTarget) > verticalAvoidance) {
        // Gentle steering towards target, strength increases with distance
        const depthStrength = Math.min(Math.abs(distToTarget) / (bounds.max.y - bounds.min.y), 1.0) * 0.2
        avoidanceForce.y -= Math.sign(distToTarget) * depthStrength
      }
    }

    // Z boundaries (front/back walls) - Enhanced predictive avoidance with collision angle detection
    const backDistance = position.z - bounds.min.z
    const frontDistance = bounds.max.z - position.z
    const futureZ = position.z + velocity.z * 2.0
    const backFutureDistance = futureZ - bounds.min.z
    const frontFutureDistance = bounds.max.z - futureZ

    // Collision angle detection for Z boundaries
    const isHeadingTowardBack = velocity.z < -0.1 // Moving backward with significant speed
    const isHeadingTowardFront = velocity.z > 0.1 // Moving forward with significant speed

    // Back boundary avoidance
    if (backDistance < horizontalEarlyWarning || backFutureDistance < horizontalEarlyWarning) {
      const currentDist = Math.min(backDistance, backFutureDistance)
      let strength = 0

      // Calculate collision angle multiplier - stronger avoidance when heading directly toward wall
      const collisionAngleMultiplier = isHeadingTowardBack ? 2.0 : 1.0

      if (currentDist < horizontalUrgent) {
        strength = 3.0 * collisionAngleMultiplier
        urgentAvoidance = true
      } else if (currentDist < horizontalAvoidance) {
        strength = Math.max(0, (horizontalAvoidance - currentDist) / horizontalAvoidance) * 2.0 * collisionAngleMultiplier
      } else {
        const baseStrength = Math.max(0, (horizontalEarlyWarning - currentDist) / horizontalEarlyWarning) * 0.5
        strength = baseStrength * collisionAngleMultiplier
        earlyWarning = true
      }

      avoidanceForce.z += strength
    }

    // Front boundary avoidance
    if (frontDistance < horizontalEarlyWarning || frontFutureDistance < horizontalEarlyWarning) {
      const currentDist = Math.min(frontDistance, frontFutureDistance)
      let strength = 0

      // Calculate collision angle multiplier - stronger avoidance when heading directly toward wall
      const collisionAngleMultiplier = isHeadingTowardFront ? 2.0 : 1.0

      if (currentDist < horizontalUrgent) {
        strength = 3.0 * collisionAngleMultiplier
        urgentAvoidance = true
      } else if (currentDist < horizontalAvoidance) {
        strength = Math.max(0, (horizontalAvoidance - currentDist) / horizontalAvoidance) * 2.0 * collisionAngleMultiplier
      } else {
        const baseStrength = Math.max(0, (horizontalEarlyWarning - currentDist) / horizontalEarlyWarning) * 0.5
        strength = baseStrength * collisionAngleMultiplier
        earlyWarning = true
      }

      avoidanceForce.z -= strength
    }

    // Apply avoidance force if needed
    if (avoidanceForce.length() > 0) {
      avoidanceForce.normalize()

      // Blend avoidance direction with current heading based on warning level
      const currentHeading = this.movement.direction.currentHeading.clone()
      let avoidanceWeight = 0.1 // Default gentle influence
      let turnRateMultiplier = 1.0

      if (urgentAvoidance) {
        // Emergency avoidance - strong influence
        avoidanceWeight = 0.9
        turnRateMultiplier = 2.0
      } else if (earlyWarning) {
        // Early warning - gentle but noticeable influence
        avoidanceWeight = 0.2
        turnRateMultiplier = 1.2
      } else {
        // Normal avoidance - moderate influence
        avoidanceWeight = 0.5
        turnRateMultiplier = 1.5
      }

      // Create new target heading that blends current direction with avoidance
      const newHeading = currentHeading.multiplyScalar(1 - avoidanceWeight)
        .add(avoidanceForce.multiplyScalar(avoidanceWeight))
      newHeading.normalize()

      // Update target heading for gradual turning
      this.movement.direction.targetHeading.copy(newHeading)
      this.movement.direction.isChangingDirection = true

      // Adjust turn rate based on urgency AND speed (faster fish turn faster to avoid congestion)
      const speedFactor = this.movement.speed.currentSpeed / 10.0
      this.movement.direction.turnRate = this.behavior.maxTurnRate * this.size.turnRateMultiplier * turnRateMultiplier * (1.0 + speedFactor)
    }

    // Hard boundary enforcement (prevent fish from going outside)
    position.x = Math.max(bounds.min.x + 0.5, Math.min(bounds.max.x - 0.5, position.x))
    position.y = Math.max(bounds.min.y + 0.5, Math.min(bounds.max.y - 0.5, position.y))
    position.z = Math.max(bounds.min.z + 0.5, Math.min(bounds.max.z - 0.5, position.z))
  }

  /**
   * FLOCKING BEHAVIORS - Boids algorithm integration (Phase 2 Upgrade)
   */
  private updateFlockingBehavior(deltaTime: number, neighbors: Fish[]): void {
    const position = this.physics.position
    const maxNeighbors = 10 // Realistic game-feel spec: 6-10 nearest
    const neighborRadius = this.behavior.neighborRadius
    const neighborRadiusSq = neighborRadius * neighborRadius

    // 1. Find nearest neighbors efficiently
    interface NeighborData { fish: Fish; distSq: number; distance: number }
    const nearby: NeighborData[] = []

    // Also calculate global center of mass for soft tethering
    const globalCenter = new THREE.Vector3()
    let globalCount = 0

    for (let i = 0; i < neighbors.length; i++) {
      const other = neighbors[i]
      const distSq = position.distanceToSquared(other.physics.position)

      if (distSq < neighborRadiusSq * 4) { // Look a bit further for global context
        globalCenter.add(other.physics.position)
        globalCount++
      }

      if (distSq > 0.001 && distSq < neighborRadiusSq) {
        nearby.push({ fish: other, distSq, distance: Math.sqrt(distSq) })
      }
    }

    if (nearby.length === 0) return

    // Sort to get closest (sub-cluster formation)
    nearby.sort((a, b) => a.distSq - b.distSq)
    const closestNeighbors = nearby.slice(0, maxNeighbors)

    // 2. Initialize force vectors
    const cohesionForce = new THREE.Vector3()
    const separationForce = new THREE.Vector3()
    const alignmentForce = new THREE.Vector3()
    const overlapPullout = new THREE.Vector3()

    let totalCohesionWeight = 0
    let totalAlignmentWeight = 0

    // 3. Process closest neighbors with smooth falloff curves
    for (let i = 0; i < closestNeighbors.length; i++) {
      const data = closestNeighbors[i]
      const other = data.fish
      const dist = data.distance

      // Normalized distance (0 = touching, 1 = at edge of perception)
      const distNorm = dist / neighborRadius

      // ALIGNMENT: Strong weight, decays linearly
      // If leader, massive alignment influence
      let alignWeight = Math.max(0, 1.0 - distNorm)
      if (other.isLeader) alignWeight *= 15.0
      if (this.state === FishState.BAIT_BALL) alignWeight *= 0.1 // Break alignment during bait ball

      // Density Waves Delay: Apply a slight simulated delay by mixing past headings if available, 
      // but for performance, we just strongly bias towards immediate velocity
      alignmentForce.add(other.physics.velocity.clone().normalize().multiplyScalar(alignWeight))
      totalAlignmentWeight += alignWeight

      // COHESION: Moderate weight, peaks in the middle distance
      // Gaussian-like falloff for soft clustering
      let cohesionWeight = Math.sin(distNorm * Math.PI)
      if (other.isLeader) cohesionWeight *= 20.0

      const toNeighbor = other.physics.position.clone().sub(position)
      cohesionForce.add(toNeighbor.clone().normalize().multiplyScalar(cohesionWeight))
      totalCohesionWeight += cohesionWeight

      // SEPARATION: Soft separation, exponential decay
      const separationRadius = this.behavior.separationRadius
      if (dist < separationRadius) {
        // Smooth falloff curve, not hard cutoff: 1 at center, 0 at edge of separation radius
        const sepNorm = 1.0 - (dist / separationRadius)
        // Ease-out quad curve for softer separation
        const sepWeight = sepNorm * sepNorm
        const pushDir = toNeighbor.clone().normalize().negate()
        separationForce.add(pushDir.multiplyScalar(sepWeight))
      }

      // URGENT ANTI-OVERLAP (Hard Repulsion)
      const hardLimit = this.behavior.collisionRadius + 2.0
      if (dist < hardLimit) {
        const pushDir = toNeighbor.clone().normalize().negate()
        // Exponential push to resolve extreme overlaps instantly
        const pushStrength = Math.pow((hardLimit - dist) / hardLimit, 3) * 10.0
        overlapPullout.add(pushDir.multiplyScalar(pushStrength))
      }
    }

    // 4. Finalize vectors
    if (totalAlignmentWeight > 0) alignmentForce.normalize()
    if (totalCohesionWeight > 0) cohesionForce.normalize()

    // Add soft tether to main group center if we have global context
    if (globalCount > 0) {
      globalCenter.divideScalar(globalCount)
      const tetherDir = globalCenter.sub(position).normalize()
      // Mix local sub-cluster cohesion with global tether
      cohesionForce.lerp(tetherDir, 0.3).normalize()

      // Edge Speed Multiplier: Check if fish is at the edge of the global school
      const distToGlobalCenter = position.distanceTo(globalCenter)
      if (distToGlobalCenter > neighborRadius * 1.5) {
        // Increase target speed to catch up (rubber-banding)
        this.movement.speed.targetSpeed = SpeedMode.CRUISING * this.size.speedMultiplier * this.behavior.edgeSpeedMultiplier
      }
    }

    // 5. Apply Predator Forces (Phase 4)
    const predatorForce = new THREE.Vector3()
    if (this.predatorSource) {
      const toPredator = this.predatorSource.clone().sub(position)
      const distToPredator = toPredator.length()
      const fearRadius = 80.0 // Distance at which fish start to flee

      if (distToPredator < fearRadius) {
        // Always flee when predator is close!
        toPredator.y *= 0.2 // Escape mostly horizontally
        if (toPredator.lengthSq() > 0) {
          toPredator.normalize().negate()
          // Inverse square fear model: closer predator = much stronger fear
          const fearStrength = Math.pow((fearRadius - distToPredator) / fearRadius, 2) * this.behavior.compressionStrength * 4.0
          predatorForce.add(toPredator.multiplyScalar(fearStrength))

          // Also trigger escape mode if very close
          if (distToPredator < 30.0) {
            this.state = FishState.BURST
            this.predatorEventStartTime = performance.now() * 0.001
          }
        }
      } else if (this.state === FishState.BAIT_BALL && distToPredator > 0) {
        toPredator.normalize()
        // Tangent for circling (cross product with Up)
        const up = new THREE.Vector3(0, 1, 0)
        const tangent = new THREE.Vector3().crossVectors(toPredator, up).normalize()
        // Reverse tanget for half the fish to create disorganized ball
        if (this.movement.drift.noiseOffset > 500) tangent.negate()

        // Target ball radius = 20-30
        const targetRadius = 25.0
        const radialForceStr = (distToPredator - targetRadius) * this.behavior.compressionStrength * 0.05

        predatorForce.add(toPredator.clone().multiplyScalar(radialForceStr)) // Pull in / Push out
        predatorForce.add(tangent.multiplyScalar(this.behavior.compressionStrength * 0.5)) // Orbit
      }
    }

    // 6. Combine all social forces
    const socialForce = new THREE.Vector3()
    socialForce.add(cohesionForce.multiplyScalar(this.behavior.cohesionStrength))
    socialForce.add(separationForce.multiplyScalar(this.behavior.separationStrength))
    socialForce.add(alignmentForce.multiplyScalar(this.behavior.alignmentStrength))
    socialForce.add(overlapPullout) // Unmitigated overlap priority
    socialForce.add(predatorForce) // Predator survival priority


    // Apply social influence to individual behavior
    this.applySocialInfluence(socialForce, deltaTime)
  }

  /**
   * F5: BALANCE INDIVIDUAL VS SOCIAL FORCES
   */
  private applySocialInfluence(socialForce: THREE.Vector3, deltaTime: number): void {
    if (socialForce.lengthSq() === 0) return

    // Blend social force with individual direction
    const currentHeading = this.movement.direction.currentHeading.clone()
    const socialHeading = socialForce.clone().normalize()

    // Weight the forces based on behavior settings
    const individualForce = currentHeading.multiplyScalar(this.behavior.individualWeight)
    const weightedSocialForce = socialHeading.multiplyScalar(this.behavior.socialWeight)

    // Combine and normalize
    const combinedDirection = individualForce.add(weightedSocialForce).normalize()

    // Apply social influence to target heading (gradual change)
    const influenceStrength = 10.0 // Maximum social response speed
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
    // Calculate target velocity vector
    const targetVelocity = this.movement.direction.currentHeading.clone()
    targetVelocity.multiplyScalar(this.movement.speed.currentSpeed * this.size.bodyLength)

    // Inertia: Smoothly interpolate current velocity towards target
    // The larger the lerp factor, the quicker the acceleration (less inertia)
    const inertiaSmoothing = this.movement.speed.acceleration * 1.5
    this.physics.velocity.lerp(targetVelocity, Math.min(1.0, inertiaSmoothing * deltaTime))

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
    const weights = [0.2, 0.5, 0.25, 0.05]

    let random = Math.random()
    for (let i = 0; i < modes.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        this.movement.speed.currentMode = modes[i]
        const baseSpeed = modes[i] + (Math.random() - 0.5) * 0.3
        this.movement.speed.targetSpeed = baseSpeed * this.size.speedMultiplier
        break
      }
    }
  }

  private generateSizeCharacteristics(baseBodyLength: number): FishSize {
    const sizeVariation = this.generateNormalRandom(0, 0.3)
    const scaleFactor = Math.max(0.4, Math.min(1.6, 1.0 + sizeVariation))
    const actualBodyLength = baseBodyLength * scaleFactor
    const speedMultiplier = Math.max(0.6, Math.min(1.4, 2.0 - scaleFactor))
    const agilityMultiplier = Math.max(0.6, Math.min(1.4, 2.0 - scaleFactor))
    const turnRateMultiplier = Math.max(0.6, Math.min(1.4, 2.0 - scaleFactor))

    return {
      scaleFactor,
      bodyLength: actualBodyLength,
      speedMultiplier,
      agilityMultiplier,
      turnRateMultiplier
    }
  }

  private generateAppearanceCharacteristics(): FishAppearance {
    const brightnessVariation = this.generateNormalRandom(0, 0.1)
    const brightnessMultiplier = Math.max(0.8, Math.min(1.2, 1.0 + brightnessVariation))
    const colorVariation = this.generateNormalRandom(0, 0.02)
    const colorMultiplier = Math.max(0.95, Math.min(1.05, 1.0 + colorVariation))

    return {
      brightnessVariation: brightnessMultiplier,
      colorVariation: colorMultiplier
    }
  }

  private generateNormalRandom(mean: number, stdDev: number): number {
    let u = 0, v = 0
    while (u === 0) u = Math.random()
    while (v === 0) v = Math.random()
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z * stdDev + mean
  }

  private initiateDirectionChange(): void {
    const direction = this.movement.direction
    const currentAngle = Math.atan2(direction.currentHeading.x, direction.currentHeading.z)
    const turnAngle = (Math.random() - 0.5) * Math.PI
    const newAngle = currentAngle + turnAngle

    direction.targetHeading.set(
      Math.sin(newAngle),
      0,
      Math.cos(newAngle)
    ).normalize()

    direction.isChangingDirection = true
  }

  private updateRollForTurn(current: THREE.Vector3, target: THREE.Vector3): void {
    const cross = new THREE.Vector3().crossVectors(current, target)
    const turnDirection = Math.sign(cross.y)
    const turnAngle = current.angleTo(target)
    const rollIntensity = Math.min(turnAngle / (Math.PI / 4), 1.0)
    // Banking is proportional to turning intensity AND swimming speed
    const speedRatio = this.movement.speed.currentSpeed / SpeedMode.BURST
    this.movement.roll.targetAngle = -turnDirection * rollIntensity * this.movement.roll.maxRollAngle * (0.2 + speedRatio * 0.8)
  }

  private updateVelocityFromHeading(): void {
    // Kept for backward compatibility if called elsewhere, but unused in main loop now
    this.physics.velocity.copy(this.movement.direction.currentHeading)
    this.physics.velocity.multiplyScalar(this.movement.speed.currentSpeed * this.size.bodyLength)
  }

  private updateRotationFromMovement(): void {
    const heading = this.movement.direction.currentHeading
    this.physics.rotation.y = Math.atan2(heading.x, heading.z)
    this.physics.rotation.z = this.movement.roll.currentAngle
    // Undulation effect is now applied via vertex shader in FishRenderer 
    // to prevent the entire body from rotating like a solid stick
  }

  public getPosition(): THREE.Vector3 { return this.physics.position.clone() }
  public getRotation(): THREE.Euler { return this.physics.rotation.clone() }
  public getVelocity(): THREE.Vector3 { return this.physics.velocity.clone() }
  public getScale(): THREE.Vector3 { return this.physics.scale.clone() }
  public getSpeed(): number { return this.movement.speed.currentSpeed }
  public getSpeedMode(): SpeedMode { return this.movement.speed.currentMode }
  public getUndulationPhase(): number { return this.movement.undulation.phase }
  public getUndulationAmplitude(): number { return this.movement.undulation.amplitude }
  public getRollAngle(): number { return this.movement.roll.currentAngle }
  public getHeading(): THREE.Vector3 { return this.movement.direction.currentHeading.clone() }
  public isMoving(): boolean { return this.movement.speed.currentSpeed > 0.1 }
  public isChangingDirection(): boolean { return this.movement.direction.isChangingDirection }
  public getSizeFactor(): number { return this.size.scaleFactor }
  public getActualBodyLength(): number { return this.size.bodyLength }
  public getSpeedMultiplier(): number { return this.size.speedMultiplier }
  public getAgilityMultiplier(): number { return this.size.agilityMultiplier }
  public getDistanceTo(otherFish: Fish): number { return this.physics.position.distanceTo(otherFish.physics.position) }
  public getDirectionTo(otherFish: Fish): THREE.Vector3 { return otherFish.physics.position.clone().sub(this.physics.position).normalize() }
  public setPosition(position: THREE.Vector3): void { this.physics.position.copy(position) }
  public setRotation(rotation: THREE.Euler): void { this.physics.rotation.copy(rotation) }
  public dispose(): void { }
}
