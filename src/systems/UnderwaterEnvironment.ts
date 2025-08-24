import * as THREE from 'three'

export interface UnderwaterConfig {
  enableCorals: boolean
  enableRocks: boolean
  enableSeaweed: boolean
  enablePlankton: boolean
  coralCount: number
  rockCount: number
  seaweedCount: number
  planktonCount: number
}

export class UnderwaterEnvironment {
  private scene: THREE.Scene
  private config: UnderwaterConfig
  private coralGroup: THREE.Group
  private rockGroup: THREE.Group
  private seaweedGroup: THREE.Group
  private planktonGroup: THREE.Group
  private seaweedAnimationTime: number = 0
  private planktonAnimationTime: number = 0

  constructor(scene: THREE.Scene, config: UnderwaterConfig) {
    this.scene = scene
    this.config = config
    
    // Create groups for organization
    this.coralGroup = new THREE.Group()
    this.rockGroup = new THREE.Group()
    this.seaweedGroup = new THREE.Group()
    this.planktonGroup = new THREE.Group()
    
    this.coralGroup.name = 'Corals'
    this.rockGroup.name = 'Rocks'
    this.seaweedGroup.name = 'Seaweed'
    this.planktonGroup.name = 'Plankton'
    
    this.scene.add(this.coralGroup)
    this.scene.add(this.rockGroup)
    this.scene.add(this.seaweedGroup)
    this.scene.add(this.planktonGroup)
    
    this.createEnvironment()
  }

  private createEnvironment(): void {
    if (this.config.enableCorals) this.createCorals()
    if (this.config.enableRocks) this.createRocks()
    if (this.config.enableSeaweed) this.createSeaweed()
    if (this.config.enablePlankton) this.createPlankton()
  }

  private createCorals(): void {
    for (let i = 0; i < this.config.coralCount; i++) {
      const coral = this.createCoral()
      coral.position.set(
        (Math.random() - 0.5) * 80, // X: -40 to 40
        -25, // Y: Ocean floor
        (Math.random() - 0.5) * 80  // Z: -40 to 40
      )
      coral.rotation.y = Math.random() * Math.PI * 2
      coral.scale.setScalar(0.5 + Math.random() * 0.5)
      this.coralGroup.add(coral)
    }
  }

  private createCoral(): THREE.Mesh {
    // Create branching coral structure
    const coralGeometry = new THREE.ConeGeometry(0.5, 8, 8)
    coralGeometry.rotateX(Math.PI / 2) // Point upward
    
    const coralMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xFF6B6B), // Coral red
      roughness: 0.8,
      metalness: 0.1
    })
    
    return new THREE.Mesh(coralGeometry, coralMaterial)
  }

  private createRocks(): void {
    for (let i = 0; i < this.config.rockCount; i++) {
      const rock = this.createRock()
      rock.position.set(
        (Math.random() - 0.5) * 100, // X: -50 to 50
        -25 + Math.random() * 2, // Y: Ocean floor with slight variation
        (Math.random() - 0.5) * 100  // Z: -50 to 50
      )
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      rock.scale.setScalar(1 + Math.random() * 2)
      this.rockGroup.add(rock)
    }
  }

  private createRock(): THREE.Mesh {
    // Create irregular rock shape
    const rockGeometry = new THREE.DodecahedronGeometry(2, 0)
    
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x4A4A4A), // Dark gray
      roughness: 0.9,
      metalness: 0.0
    })
    
    return new THREE.Mesh(rockGeometry, rockMaterial)
  }

  private createSeaweed(): void {
    for (let i = 0; i < this.config.seaweedCount; i++) {
      const seaweed = this.createSeaweedStalk()
      seaweed.position.set(
        (Math.random() - 0.5) * 90, // X: -45 to 45
        -25, // Y: Ocean floor
        (Math.random() - 0.5) * 90  // Z: -45 to 45
      )
      seaweed.userData = { 
        originalY: -25,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.5 + Math.random() * 0.5
      }
      this.seaweedGroup.add(seaweed)
    }
  }

  private createSeaweedStalk(): THREE.Mesh {
    // Create long, thin seaweed stalk
    const seaweedGeometry = new THREE.CylinderGeometry(0.1, 0.05, 12, 8)
    
    const seaweedMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x2D5A27), // Seaweed green
      roughness: 0.7,
      metalness: 0.0
    })
    
    return new THREE.Mesh(seaweedGeometry, seaweedMaterial)
  }

  private createPlankton(): void {
    for (let i = 0; i < this.config.planktonCount; i++) {
      const plankton = this.createPlanktonParticle()
      plankton.position.set(
        (Math.random() - 0.5) * 120, // X: -60 to 60
        (Math.random() - 0.5) * 40,  // Y: -20 to 20
        (Math.random() - 0.5) * 120  // Z: -60 to 60
      )
      plankton.userData = {
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.4,
        driftSpeed: 0.1 + Math.random() * 0.2
      }
      this.planktonGroup.add(plankton)
    }
  }

  private createPlanktonParticle(): THREE.Mesh {
    // Create small plankton particle
    const planktonGeometry = new THREE.SphereGeometry(0.3, 6, 6)
    
    const planktonMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x87CEEB), // Light blue
      roughness: 0.3,
      metalness: 0.0,
      transparent: true,
      opacity: 0.7
    })
    
    return new THREE.Mesh(planktonGeometry, planktonMaterial)
  }

  public update(deltaTime: number): void {
    this.seaweedAnimationTime += deltaTime
    this.planktonAnimationTime += deltaTime
    
    // Animate seaweed swaying
    this.seaweedGroup.children.forEach((seaweed) => {
      const userData = seaweed.userData
      const sway = Math.sin(this.seaweedAnimationTime * userData.swaySpeed + userData.swayOffset) * 0.3
      seaweed.rotation.z = sway
    })
    
    // Animate plankton floating
    this.planktonGroup.children.forEach((plankton) => {
      const userData = plankton.userData
      
      // Gentle floating motion
      const floatY = Math.sin(this.planktonAnimationTime * userData.floatSpeed + userData.floatOffset) * 0.5
      plankton.position.y = plankton.position.y + floatY * deltaTime
      
      // Slow drift
      plankton.position.x += Math.sin(this.planktonAnimationTime * userData.driftSpeed) * deltaTime * 0.1
      plankton.position.z += Math.cos(this.planktonAnimationTime * userData.driftSpeed) * deltaTime * 0.1
      
      // Keep plankton within bounds
      plankton.position.x = Math.max(-60, Math.min(60, plankton.position.x))
      plankton.position.y = Math.max(-25, Math.min(25, plankton.position.y))
      plankton.position.z = Math.max(-60, Math.min(60, plankton.position.z))
    })
  }

  public dispose(): void {
    // Clean up all geometry and materials
    const groups = [this.coralGroup, this.rockGroup, this.seaweedGroup, this.planktonGroup]
    
    groups.forEach(group => {
      group.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      this.scene.remove(group)
    })
  }
}
