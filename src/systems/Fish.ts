import * as THREE from 'three'

export interface FishBehavior {
  cohesionStrength: number
  separationStrength: number
  alignmentStrength: number
  cohesionRadius: number
  separationRadius: number
  alignmentRadius: number
  maxSpeed: number
  maxForce: number
  maxAcceleration: number
  collisionAvoidanceStrength: number
  edgeAvoidanceStrength: number
  environmentalForceStrength: number
}

export interface FishPhysics {
  position: THREE.Vector3
  velocity: THREE.Vector3
  acceleration: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  collisionRadius: number
  lastCollisionTime: number
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
    this.physics = {
      position: position.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ),
      acceleration: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      scale: new THREE.Vector3(1, 1, 1),
      collisionRadius: 2.0,
      lastCollisionTime: 0
    }
  }

  /**
   * Calculate cohesion force - move toward center of nearby neighbors
   */
  public calculateCohesion(neighbors: Fish[]): THREE.Vector3 {
    if (neighbors.length === 0) return new THREE.Vector3(0, 0, 0)

    const center = new THREE.Vector3()
    neighbors.forEach(neighbor => {
      center.add(neighbor.physics.position)
    })
    center.divideScalar(neighbors.length)

    const desired = center.sub(this.physics.position)
    const distance = desired.length()

    if (distance > 0) {
      desired.normalize().multiplyScalar(this.behavior.maxSpeed)
      return desired.sub(this.physics.velocity).clampLength(0, this.behavior.maxForce)
    }

    return new THREE.Vector3(0, 0, 0)
  }

  /**
   * Calculate separation force - avoid crowding within minimum distance
   */
  public calculateSeparation(neighbors: Fish[]): THREE.Vector3 {
    if (neighbors.length === 0) return new THREE.Vector3(0, 0, 0)

    const steering = new THREE.Vector3()
    let count = 0

    neighbors.forEach(neighbor => {
      const diff = this.physics.position.clone().sub(neighbor.physics.position)
      const distance = diff.length()

      if (distance > 0 && distance < this.behavior.separationRadius) {
        diff.normalize().divideScalar(distance)
        steering.add(diff)
        count++
      }
    })

    if (count > 0) {
      steering.divideScalar(count)
      steering.normalize().multiplyScalar(this.behavior.maxSpeed)
      return steering.sub(this.physics.velocity).clampLength(0, this.behavior.maxForce)
    }

    return new THREE.Vector3(0, 0, 0)
  }

  /**
   * Calculate alignment force - match velocity with neighbors
   */
  public calculateAlignment(neighbors: Fish[]): THREE.Vector3 {
    if (neighbors.length === 0) return new THREE.Vector3(0, 0, 0)

    const averageVelocity = new THREE.Vector3()
    neighbors.forEach(neighbor => {
      averageVelocity.add(neighbor.physics.velocity)
    })
    averageVelocity.divideScalar(neighbors.length)

    if (averageVelocity.length() > 0) {
      averageVelocity.normalize().multiplyScalar(this.behavior.maxSpeed)
      return averageVelocity.sub(this.physics.velocity).clampLength(0, this.behavior.maxForce)
    }

    return new THREE.Vector3(0, 0, 0)
  }

  /**
   * Calculate collision avoidance force
   */
  public calculateCollisionAvoidance(allFish: Fish[]): THREE.Vector3 {
    const avoidanceForce = new THREE.Vector3()
    let collisionCount = 0

    allFish.forEach(other => {
      if (other.id === this.id || !other.isActive) return

      const distance = this.distanceTo(other)
      const combinedRadius = this.physics.collisionRadius + other.physics.collisionRadius

      if (distance < combinedRadius && distance > 0) {
        // Collision detected - calculate avoidance force
        const diff = this.physics.position.clone().sub(other.physics.position)
        diff.normalize().multiplyScalar(combinedRadius - distance)
        avoidanceForce.add(diff)
        collisionCount++

        // Record collision time
        this.physics.lastCollisionTime = performance.now()
      }
    })

    if (collisionCount > 0) {
      avoidanceForce.divideScalar(collisionCount)
      avoidanceForce.normalize().multiplyScalar(this.behavior.maxSpeed)
      return avoidanceForce.sub(this.physics.velocity).clampLength(0, this.behavior.maxForce)
    }

    return new THREE.Vector3(0, 0, 0)
  }

  /**
   * Calculate edge avoidance force - gradual steering away from boundaries
   */
  public calculateEdgeAvoidance(bounds: THREE.Box3): THREE.Vector3 {
    const edgeForce = new THREE.Vector3()
    const pos = this.physics.position
    const margin = 20 // Distance from edge where avoidance starts

    // X-axis edge avoidance
    if (pos.x < bounds.min.x + margin) {
      const strength = (margin - (pos.x - bounds.min.x)) / margin
      edgeForce.x = strength * this.behavior.edgeAvoidanceStrength
    } else if (pos.x > bounds.max.x - margin) {
      const strength = (margin - (bounds.max.x - pos.x)) / margin
      edgeForce.x = -strength * this.behavior.edgeAvoidanceStrength
    }

    // Y-axis edge avoidance
    if (pos.y < bounds.min.y + margin) {
      const strength = (margin - (pos.y - bounds.min.y)) / margin
      edgeForce.y = strength * this.behavior.edgeAvoidanceStrength
    } else if (pos.y > bounds.max.y - margin) {
      const strength = (margin - (bounds.max.y - pos.y)) / margin
      edgeForce.y = -strength * this.behavior.edgeAvoidanceStrength
    }

    // Z-axis edge avoidance
    if (pos.z < bounds.min.z + margin) {
      const strength = (margin - (pos.z - bounds.min.z)) / margin
      edgeForce.z = strength * this.behavior.edgeAvoidanceStrength
    } else if (pos.z > bounds.max.z - margin) {
      const strength = (margin - (bounds.max.z - pos.z)) / margin
      edgeForce.z = -strength * this.behavior.edgeAvoidanceStrength
    }

    if (edgeForce.length() > 0) {
      edgeForce.normalize().multiplyScalar(this.behavior.maxSpeed)
      return edgeForce.sub(this.physics.velocity).clampLength(0, this.behavior.maxForce)
    }

    return new THREE.Vector3(0, 0, 0)
  }

  /**
   * Calculate environmental forces (currents, obstacles)
   */
  public calculateEnvironmentalForces(): THREE.Vector3 {
    const environmentalForce = new THREE.Vector3()

    // Simulate underwater currents
    const currentStrength = this.behavior.environmentalForceStrength * 0.1
    environmentalForce.x = Math.sin(this.physics.position.x * 0.01) * currentStrength
    environmentalForce.y = Math.cos(this.physics.position.y * 0.01) * currentStrength
    environmentalForce.z = Math.sin(this.physics.position.z * 0.01) * currentStrength

    // Add some randomness for more natural movement
    const randomForce = new THREE.Vector3(
      (Math.random() - 0.5) * this.behavior.environmentalForceStrength * 0.05,
      (Math.random() - 0.5) * this.behavior.environmentalForceStrength * 0.05,
      (Math.random() - 0.5) * this.behavior.environmentalForceStrength * 0.05
    )
    environmentalForce.add(randomForce)

    return environmentalForce.clampLength(0, this.behavior.maxForce * 0.5)
  }

  /**
   * Find neighbors within specified radius
   */
  public findNeighbors(fish: Fish[], radius: number): Fish[] {
    return fish.filter(other => {
      if (other.id === this.id || !other.isActive) return false
      const distance = this.physics.position.distanceTo(other.physics.position)
      return distance <= radius
    })
  }

  /**
   * Apply flocking forces and update physics
   */
  public update(deltaTime: number, allFish: Fish[], bounds: THREE.Box3): void {
    if (!this.isActive) return

    // Find neighbors for each behavior (optimized)
    const cohesionNeighbors = this.findNeighbors(allFish, this.behavior.cohesionRadius)
    const separationNeighbors = this.findNeighbors(allFish, this.behavior.separationRadius)
    const alignmentNeighbors = this.findNeighbors(allFish, this.behavior.alignmentRadius)

    // Calculate flocking forces
    const cohesionForce = this.calculateCohesion(cohesionNeighbors)
      .multiplyScalar(this.behavior.cohesionStrength)
    
    const separationForce = this.calculateSeparation(separationNeighbors)
      .multiplyScalar(this.behavior.separationStrength)
    
    const alignmentForce = this.calculateAlignment(alignmentNeighbors)
      .multiplyScalar(this.behavior.alignmentStrength)

    // Calculate advanced physics forces (simplified for performance)
    const collisionAvoidanceForce = this.calculateCollisionAvoidance(allFish)
      .multiplyScalar(this.behavior.collisionAvoidanceStrength)
    
    const edgeAvoidanceForce = this.calculateEdgeAvoidance(bounds)
      .multiplyScalar(this.behavior.edgeAvoidanceStrength)
    
    // Calculate environmental forces (simplified for performance)
    const environmentalForce = this.calculateEnvironmentalForces()
      .multiplyScalar(this.behavior.environmentalForceStrength)

    // Apply all forces
    this.physics.acceleration.add(cohesionForce)
    this.physics.acceleration.add(separationForce)
    this.physics.acceleration.add(alignmentForce)
    this.physics.acceleration.add(collisionAvoidanceForce)
    this.physics.acceleration.add(edgeAvoidanceForce)
    this.physics.acceleration.add(environmentalForce)

    // Clamp acceleration
    this.physics.acceleration.clampLength(0, this.behavior.maxAcceleration)

    // Update velocity
    this.physics.velocity.add(this.physics.acceleration.clone().multiplyScalar(deltaTime))

    // Clamp speed
    this.physics.velocity.clampLength(0, this.behavior.maxSpeed)

    // Update position
    this.physics.position.add(this.physics.velocity.clone().multiplyScalar(deltaTime))

    // Update rotation to face direction of movement (simplified for performance)
    if (this.physics.velocity.length() > 0.1) {
      const direction = this.physics.velocity.clone().normalize()
      this.physics.rotation.setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1), // Fish model forward direction
          direction
        )
      )
    }

    // Reset acceleration
    this.physics.acceleration.set(0, 0, 0)
  }

  /**
   * Apply boundary constraints
   */
  public applyBoundaries(bounds: THREE.Box3): void {
    const margin = 1
    const pos = this.physics.position

    // X-axis boundaries
    if (pos.x < bounds.min.x + margin) {
      pos.x = bounds.min.x + margin
      this.physics.velocity.x = Math.abs(this.physics.velocity.x) * 0.5
    } else if (pos.x > bounds.max.x - margin) {
      pos.x = bounds.max.x - margin
      this.physics.velocity.x = -Math.abs(this.physics.velocity.x) * 0.5
    }

    // Y-axis boundaries
    if (pos.y < bounds.min.y + margin) {
      pos.y = bounds.min.y + margin
      this.physics.velocity.y = Math.abs(this.physics.velocity.y) * 0.5
    } else if (pos.y > bounds.max.y - margin) {
      pos.y = bounds.max.y - margin
      this.physics.velocity.y = -Math.abs(this.physics.velocity.y) * 0.5
    }

    // Z-axis boundaries
    if (pos.z < bounds.min.z + margin) {
      pos.z = bounds.min.z + margin
      this.physics.velocity.z = Math.abs(this.physics.velocity.z) * 0.5
    } else if (pos.z > bounds.max.z - margin) {
      pos.z = bounds.max.z - margin
      this.physics.velocity.z = -Math.abs(this.physics.velocity.z) * 0.5
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
