import * as THREE from 'three'

// The exact interface shape required by the UI store
export interface FishBehavior {
  bodyLength: number
  maxTurnRate: number
  maxRollAngle: number
  rollSpeed: number
  undulationFrequency: number
  undulationAmplitude: number
  accelerationRate: number
  neighborRadius: number
  separationRadius: number
  collisionRadius: number
  cohesionStrength: number
  separationStrength: number
  alignmentStrength: number
  individualWeight: number
  socialWeight: number
  edgeSpeedMultiplier: number
  burstMultiplier: number
  compressionStrength: number
  baitBallDuration: number
  recoveryDuration: number
  seabedAvoidanceStrength: number
  obstacleLookAheadDistance: number
  preferredDepthBand: number
}

// Completely new Fish implementation focused on continuous force accumulation
export class Fish {
  // Required data structures for the FishRenderer
  public physics = {
    position: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(1, 1, 1)
  }

  public movement = {
    undulation: { phase: 0, amplitude: 0 },
    swimCycle: { thrustIntensity: 0 }
  }

  public behavior: FishBehavior
  public isLeader: boolean = false

  // Internal physical properties (DNA)
  private sizeMultiplier: number = 1.0
  private speedMultiplier: number = 1.0
  private agilityMultiplier: number = 1.0
  private acceleration: THREE.Vector3 = new THREE.Vector3()
  private terminalVelocity: number = 6.0
  private baseSpeed: number = 2.0

  // Predator memory
  private panicLevel: number = 0.0

  // Continuous wander angles
  private wanderAngleX: number = Math.random() * Math.PI * 2
  private wanderAngleY: number = Math.random() * Math.PI * 2

  constructor(spawnPosition: THREE.Vector3, behavior: FishBehavior) {
    this.physics.position.copy(spawnPosition)
    this.behavior = { ...behavior }

    // Randomize initial DNA (Physical traits)
    // Size: 0.4 to 1.1 range
    this.sizeMultiplier = 0.4 + Math.random() * 0.7
    this.physics.scale.setScalar(this.sizeMultiplier)

    // Speed DNA: 0.8 to 1.3 multiplier on base speed/top speed
    this.speedMultiplier = 0.8 + Math.random() * 0.5

    // Agility DNA: 0.7 to 1.4 multiplier on steering forces
    this.agilityMultiplier = 0.7 + Math.random() * 0.7

    this.isLeader = Math.random() < 0.05

    // Give an initial random nudge
    const randomDir = new THREE.Vector3(
      Math.random() - 0.5,
      (Math.random() - 0.5) * 0.2, // Flatter vertical start
      Math.random() - 0.5
    ).normalize()
    this.physics.velocity.copy(randomDir).multiplyScalar(this.baseSpeed * this.speedMultiplier)
  }

  // Pure data extraction for Renderer and Manager
  public getSpeed(): number { return this.physics.velocity.length() }
  public getSizeFactor(): number { return this.sizeMultiplier }
  public getPosition(): THREE.Vector3 { return this.physics.position }
  public dispose(): void { /* Cleanup if needed */ }

  /**
   * Completely new update loop based on Newtonian force accumulation
   */
  public update(
    dt: number,
    neighbors: Fish[],
    bounds: THREE.Box3,
    predatorPosition: THREE.Vector3 | null
  ): void {
    const safeDt = Math.min(dt, 0.1) // Prevent explosion on lag spikes

    // 1. Reset acceleration accumulator for this frame
    this.acceleration.set(0, 0, 0)

    // 2. Accumulate all environmental and social forces
    const hasNeighbors = this.applyFlockingForces(neighbors)
    this.applyWanderForce(safeDt, hasNeighbors)
    this.applyBoundaryForce(bounds)
    if (predatorPosition) {
      this.applyPredatorForce(predatorPosition)
    }

    // 3. Calm down panic over time
    if (this.panicLevel > 0) {
      this.panicLevel = Math.max(0, this.panicLevel - safeDt * 0.5)
    }

    // 4. Integrate Physics (Euler)
    this.integratePhysics(safeDt)

    // 5. Calculate visible animation parameters based directly on physics
    this.updateAnimations(safeDt)
  }

  // --- FORCE ACCUMULATORS (NEW LOGIC) ---

  private applyWanderForce(dt: number, hasNeighbors: boolean): void {
    // Slowly change wander angles for continuous, smooth turning
    this.wanderAngleX += (Math.random() - 0.5) * 4.0 * dt
    this.wanderAngleY += (Math.random() - 0.5) * 1.5 * dt

    const forward = this.physics.velocity.clone().normalize()
    if (forward.lengthSq() === 0) forward.set(0, 0, 1) // Safe default

    // Add a very weak pull toward the center of the tank to prevent permanent stragglers
    const centerPull = this.physics.position.clone().negate().normalize().multiplyScalar(0.05)

    const steer = new THREE.Vector3(
      Math.cos(this.wanderAngleX),
      Math.sin(this.wanderAngleY) * 0.4, // Less vertical wandering
      Math.sin(this.wanderAngleX)
    ).normalize().add(centerPull).normalize()

    // Balanced base thrust to maintain cruising speed against fluid drag
    const baseThrustValue = Math.max(0.5, this.behavior.individualWeight)
    const thrustForce = 15.0 * baseThrustValue * this.speedMultiplier

    forward.multiplyScalar(thrustForce)

    // Steering force: influenced by agility DNA
    const baseSteerForce = hasNeighbors ? thrustForce * 0.1 : thrustForce * 0.8
    const steerForce = baseSteerForce * this.agilityMultiplier
    steer.multiplyScalar(steerForce)

    this.acceleration.add(forward).add(steer)
  }

  private applyFlockingForces(neighbors: Fish[]): boolean {
    if (neighbors.length === 0) return false

    const cohesionCenter = new THREE.Vector3()
    const alignmentHeading = new THREE.Vector3()
    const separationForce = new THREE.Vector3()

    let cohesionCount = 0
    let alignmentCount = 0
    let separationCount = 0
    let processedNeighbors = 0

    const myPos = this.physics.position
    const MAX_NEIGHBORS = 30 // Biological limit: fish only track immediate peers, not the entire ocean

    for (let i = 0; i < neighbors.length; i++) {
      if (processedNeighbors >= MAX_NEIGHBORS) break

      const neighbor = neighbors[i]
      const toNeighbor = neighbor.physics.position.clone().sub(myPos)
      const distSq = toNeighbor.lengthSq()

      // Avoid square roots where possible for performance
      if (distSq > 0.0001 && distSq < this.behavior.neighborRadius * this.behavior.neighborRadius) {
        processedNeighbors++

        // Cohesion: Gather centers
        cohesionCenter.add(neighbor.physics.position)
        cohesionCount++

        // Alignment: Gather velocities
        alignmentHeading.add(neighbor.physics.velocity)
        alignmentCount++

        // Separation: Push away strongly if too close
        const sepRadSq = this.behavior.separationRadius * this.behavior.separationRadius
        if (distSq < sepRadSq) {
          const dist = Math.sqrt(distSq)
          const pushStrength = (this.behavior.separationRadius - dist) / this.behavior.separationRadius
          const pushVector = toNeighbor.normalize().negate().multiplyScalar(pushStrength)
          separationForce.add(pushVector)
          separationCount++
        }
      }
    }

    // Apply accumulated forces weighted by store parameters
    // High multiplier guarantees schooling overcomes inertia
    const forceMultiplier = 40.0

    if (cohesionCount > 0) {
      cohesionCenter.divideScalar(cohesionCount)
      const cohesionDir = cohesionCenter.sub(myPos).normalize()
      this.acceleration.add(cohesionDir.multiplyScalar(this.behavior.cohesionStrength * this.behavior.socialWeight * forceMultiplier))
    }

    if (alignmentCount > 0) {
      alignmentHeading.divideScalar(alignmentCount).normalize()
      this.acceleration.add(alignmentHeading.multiplyScalar(this.behavior.alignmentStrength * this.behavior.socialWeight * forceMultiplier))
    }

    if (separationCount > 0) {
      separationForce.divideScalar(separationCount)
      // Separation is also affected by agility (how fast they can dodge peers)
      this.acceleration.add(separationForce.multiplyScalar(this.behavior.separationStrength * this.behavior.socialWeight * forceMultiplier * 3.0 * this.agilityMultiplier))
    }

    return true
  }

  private applyBoundaryForce(bounds: THREE.Box3): void {
    const pos = this.physics.position
    const minCenterDist = 60.0 // Distance from edge where turning begins
    const boundsForce = 30.0

    // Soft bounce - pushing back towards center when nearing edges
    const centerObj = new THREE.Vector3()
    bounds.getCenter(centerObj)

    if (pos.x < bounds.min.x + minCenterDist) this.acceleration.x += (bounds.min.x + minCenterDist - pos.x) * boundsForce / minCenterDist
    if (pos.x > bounds.max.x - minCenterDist) this.acceleration.x -= (pos.x - (bounds.max.x - minCenterDist)) * boundsForce / minCenterDist

    if (pos.y < bounds.min.y + minCenterDist) this.acceleration.y += (bounds.min.y + minCenterDist - pos.y) * boundsForce * 1.5 / minCenterDist // Stronger floor avoid
    if (pos.y > bounds.max.y - minCenterDist) this.acceleration.y -= (pos.y - (bounds.max.y - minCenterDist)) * boundsForce / minCenterDist

    if (pos.z < bounds.min.z + minCenterDist) this.acceleration.z += (bounds.min.z + minCenterDist - pos.z) * boundsForce / minCenterDist
    if (pos.z > bounds.max.z - minCenterDist) this.acceleration.z -= (pos.z - (bounds.max.z - minCenterDist)) * boundsForce / minCenterDist

    // HARD CLAMP: Literally forbid fish from existing outside the box 
    // This prevents them from flying into infinity if physics explode for 1 frame
    if (pos.x < bounds.min.x) { pos.x = bounds.min.x; this.physics.velocity.x *= -0.5 }
    if (pos.x > bounds.max.x) { pos.x = bounds.max.x; this.physics.velocity.x *= -0.5 }
    if (pos.y < bounds.min.y) { pos.y = bounds.min.y; this.physics.velocity.y *= -0.5 }
    if (pos.y > bounds.max.y) { pos.y = bounds.max.y; this.physics.velocity.y *= -0.5 }
    if (pos.z < bounds.min.z) { pos.z = bounds.min.z; this.physics.velocity.z *= -0.5 }
    if (pos.z > bounds.max.z) { pos.z = bounds.max.z; this.physics.velocity.z *= -0.5 }
  }

  private applyPredatorForce(predatorPos: THREE.Vector3): void {
    const toPredator = this.physics.position.clone().sub(predatorPos)
    const distSq = toPredator.lengthSq()
    const panicRadius = 150.0

    if (distSq < panicRadius * panicRadius) {
      const dist = Math.sqrt(distSq)
      // Exponential panic curve
      const urgency = Math.pow(1.0 - (dist / panicRadius), 2.0)

      this.panicLevel = Math.max(this.panicLevel, urgency)

      // Flee directly away
      const fleeForce = toPredator.normalize().multiplyScalar(urgency * 20.0)

      // Also scramble vertically a bit to break lock
      fleeForce.y += (Math.random() - 0.5) * 5.0 * urgency

      this.acceleration.add(fleeForce)
    }
  }

  public triggerPredator(pos: THREE.Vector3): void {
    // External manual trigger
    this.applyPredatorForce(pos)
    this.panicLevel = 1.0 // Max panic
  }

  // --- PHYSICS INTEGRATION (NEW LOGIC) ---

  private integratePhysics(dt: number): void {
    // Apply mass/inertia (larger fish accelerate slightly slower)
    const exactAccel = this.acceleration.clone().divideScalar(this.sizeMultiplier)

    // NaN Protection: If forces exactly cancel, avoid NaN pollution
    if (isNaN(exactAccel.x) || isNaN(exactAccel.y) || isNaN(exactAccel.z)) {
      exactAccel.set(0, 0, 0)
    }

    // Update velocity
    this.physics.velocity.add(exactAccel.multiplyScalar(dt))

    // Apply fluid drag (framerate independent)
    // Math.pow(0.1, dt) means losing 90% of speed per second if no thrust is applied
    const dragCoefficient = Math.pow(0.5, dt)
    this.physics.velocity.multiplyScalar(dragCoefficient)

    // Determine speed limit based on panic and speed DNA
    const currentMaxSpeed = this.terminalVelocity * this.speedMultiplier * (1.0 + (this.panicLevel * this.behavior.burstMultiplier))

    // Strictly clamp maximum speed
    if (this.physics.velocity.lengthSq() > currentMaxSpeed * currentMaxSpeed) {
      this.physics.velocity.normalize().multiplyScalar(currentMaxSpeed)
    }

    // Enforce minimum speed to prevent stalling
    const currentMinSpeed = this.baseSpeed * this.speedMultiplier * 0.6
    if (this.physics.velocity.lengthSq() < currentMinSpeed * currentMinSpeed) {
      if (this.physics.velocity.lengthSq() === 0) {
        this.physics.velocity.set(1, 0, 0) // Break dead stop
      }
      this.physics.velocity.normalize().multiplyScalar(currentMinSpeed)
    }

    // Update position
    this.physics.position.add(this.physics.velocity.clone().multiplyScalar(dt))

    // Update rotation to face velocity
    // Assuming model looks down +Z axis
    let heading = this.physics.velocity.clone().normalize()
    if (isNaN(heading.x) || isNaN(heading.y) || isNaN(heading.z) || heading.lengthSq() === 0) {
      heading.set(0, 0, 1) // Safe default heading
    }

    // Pitch (X), Yaw (Y)
    this.physics.rotation.y = Math.atan2(heading.x, heading.z)
    this.physics.rotation.x = -Math.asin(Math.max(-1, Math.min(1, heading.y)))

    // Roll (Z) - Bank into turns based on horizontal acceleration
    const localAccelX = this.acceleration.x * heading.z - this.acceleration.z * heading.x
    let targetRoll = Math.max(-this.behavior.maxRollAngle, Math.min(this.behavior.maxRollAngle, localAccelX * 0.1))
    if (isNaN(targetRoll)) targetRoll = 0

    // Smooth roll application
    this.physics.rotation.z += (targetRoll - this.physics.rotation.z) * dt * this.behavior.rollSpeed

    // Final NaN sanitize on position just in case
    if (isNaN(this.physics.position.x)) this.physics.position.x = (Math.random() - 0.5) * 10
    if (isNaN(this.physics.position.y)) this.physics.position.y = (Math.random() - 0.5) * 10
    if (isNaN(this.physics.position.z)) this.physics.position.z = (Math.random() - 0.5) * 10

    // Origin kick: if perfectly at 0,0,0, knock it away so it isn't mistaken for a dead ghost mesh
    if (this.physics.position.lengthSq() === 0) {
      this.physics.position.set(0.1, 0.1, 0.1)
    }
  }

  // --- ANIMATION MAPPING (NEW LOGIC) ---

  private updateAnimations(dt: number): void {
    const speed = this.getSpeed()

    // Stillness threshold: completely motionless when stopped
    const stillFactor = THREE.MathUtils.smoothstep(speed, 0.08, 0.4)

    // Wandering cadence vs fast swimming & acceleration burst
    const accelMag = this.acceleration.length()
    const speedNorm = Math.max(0.0, Math.min(1.0, (speed - this.baseSpeed) / 10.0))
    const accelNorm = Math.min(accelMag / 25.0, 1.0)
    const vigor = Math.min(1.0, speedNorm + accelNorm * 0.7)

    // Dynamic tail frequency:
    // Calm wandering: ~2.5 Hz (15.5 rad/s)
    // High-speed sprint / burst acceleration: up to ~7.0 Hz (44.0 rad/s)
    const freqMultiplier = Math.max(this.behavior.undulationFrequency / 3.2, 0.2)
    const baseWagFreq = 15.5 * freqMultiplier
    const maxWagFreq = 44.0 * freqMultiplier
    const currentFreq = THREE.MathUtils.lerp(baseWagFreq, maxWagFreq, Math.pow(vigor, 1.25)) * stillFactor

    this.movement.undulation.phase += dt * currentFreq

    // Visual thrust for shader amplitude (wandering = 0.35, burst = 1.0, still = 0.0)
    const targetThrust = stillFactor * (0.35 + 0.65 * vigor)
    const prevThrust = this.movement.swimCycle.thrustIntensity
    this.movement.swimCycle.thrustIntensity += (targetThrust - prevThrust) * dt * 5.0
  }
}
