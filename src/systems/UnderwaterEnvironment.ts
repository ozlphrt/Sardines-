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
  private oceanFloor: THREE.Mesh
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

  private createOceanFloor(): void {
    // Create a detailed ocean floor with sand texture
    const floorGeometry = new THREE.PlaneGeometry(400, 400, 60, 60)
    
    // Add realistic sand dunes and variations
    const positionAttribute = floorGeometry.getAttribute('position')
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const z = positionAttribute.getZ(i)
      
      // Create sand dunes with multiple noise layers
      const noise1 = Math.sin(x * 0.03) * Math.cos(z * 0.02) * 4
      const noise2 = Math.sin(x * 0.08) * Math.cos(z * 0.05) * 2
      const noise3 = Math.sin(x * 0.015) * Math.cos(z * 0.01) * 6
      const y = noise1 + noise2 + noise3
      
      positionAttribute.setY(i, y)
    }
    positionAttribute.needsUpdate = true
    
    // Recalculate normals for proper lighting
    floorGeometry.computeVertexNormals()
    
    // Create bright sand texture material
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xF4E4BC), // Bright sand color
      roughness: 0.8,
      metalness: 0.0,
      side: THREE.DoubleSide
    })
    
    this.oceanFloor = new THREE.Mesh(floorGeometry, floorMaterial)
    this.oceanFloor.rotation.x = -Math.PI / 2 // Rotate to be horizontal
    this.oceanFloor.position.y = -45 // Position below swimming area
    this.oceanFloor.receiveShadow = false
    this.oceanFloor.name = 'OceanFloor'
    
    this.scene.add(this.oceanFloor)
    console.log('Bright ocean floor created at Y = -45, size: 400x400')
  }

  private createEnvironment(): void {
    this.createOceanFloor()
    if (this.config.enableCorals) this.createCorals()
    if (this.config.enableRocks) this.createRocks()
    if (this.config.enableSeaweed) this.createSeaweed()
    if (this.config.enablePlankton) this.createPlankton()
  }

  private createCorals(): void {
    for (let i = 0; i < this.config.coralCount; i++) {
      const coral = this.createComplexCoral()
      coral.position.set(
        (Math.random() - 0.5) * 150, // X: -75 to 75
        -43 + Math.random() * 3, // Y: Just above ocean floor
        (Math.random() - 0.5) * 150  // Z: -75 to 75
      )
      coral.rotation.y = Math.random() * Math.PI * 2
      coral.scale.setScalar(0.6 + Math.random() * 0.6)
      this.coralGroup.add(coral)
    }
  }

  private createComplexCoral(): THREE.Group {
    const coralGroup = new THREE.Group()
    
    // Create branching coral structure
    const createBranch = (height: number, radius: number, segments: number): THREE.Mesh => {
      const geometry = new THREE.ConeGeometry(radius, height, segments)
      geometry.rotateX(Math.PI / 2) // Point upward
      
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xFF6B6B), // Coral red
        roughness: 0.7,
        metalness: 0.1
      })
      
      return new THREE.Mesh(geometry, material)
    }
    
    // Main trunk
    const trunk = createBranch(12, 1.2, 8)
    coralGroup.add(trunk)
    
    // Add branches
    for (let i = 0; i < 3; i++) {
      const branch = createBranch(6 + Math.random() * 4, 0.6, 6)
      branch.position.y = 4 + i * 3
      branch.rotation.z = Math.random() * Math.PI * 2
      branch.rotation.y = Math.random() * Math.PI * 2
      coralGroup.add(branch)
      
      // Add smaller branches
      for (let j = 0; j < 2; j++) {
        const smallBranch = createBranch(3 + Math.random() * 2, 0.3, 4)
        smallBranch.position.y = 2 + j * 2
        smallBranch.rotation.z = Math.random() * Math.PI * 2
        smallBranch.rotation.y = Math.random() * Math.PI * 2
        branch.add(smallBranch)
      }
    }
    
    return coralGroup
  }

  private createRocks(): void {
    for (let i = 0; i < this.config.rockCount; i++) {
      const rock = this.createDetailedRock()
      rock.position.set(
        (Math.random() - 0.5) * 160, // X: -80 to 80
        -43 + Math.random() * 5, // Y: Just above ocean floor with variation
        (Math.random() - 0.5) * 160  // Z: -80 to 80
      )
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      rock.scale.setScalar(1.2 + Math.random() * 2.0)
      this.rockGroup.add(rock)
    }
  }

  private createDetailedRock(): THREE.Group {
    const rockGroup = new THREE.Group()
    
    // Create irregular rock shape using multiple geometries
    const rockTypes = [
      () => new THREE.DodecahedronGeometry(2, 1),
      () => new THREE.OctahedronGeometry(2, 1),
      () => new THREE.TetrahedronGeometry(2, 1)
    ]
    
    const selectedGeometry = rockTypes[Math.floor(Math.random() * rockTypes.length)]()
    
    // Add some deformation to make it more irregular
    const positionAttribute = selectedGeometry.getAttribute('position')
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const y = positionAttribute.getY(i)
      const z = positionAttribute.getZ(i)
      
      const noise = Math.sin(x * 10) * Math.cos(y * 10) * Math.sin(z * 10) * 0.3
      positionAttribute.setX(i, x + noise)
      positionAttribute.setY(i, y + noise)
      positionAttribute.setZ(i, z + noise)
    }
    positionAttribute.needsUpdate = true
    selectedGeometry.computeVertexNormals()
    
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x4A4A4A), // Dark gray
      roughness: 0.9,
      metalness: 0.0
    })
    
    const mainRock = new THREE.Mesh(selectedGeometry, rockMaterial)
    rockGroup.add(mainRock)
    
    // Add smaller rocks around the main one
    for (let i = 0; i < 3; i++) {
      const smallRock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.5, 0),
        rockMaterial
      )
      smallRock.position.set(
        (Math.random() - 0.5) * 4,
        -1 + Math.random() * 2,
        (Math.random() - 0.5) * 4
      )
      rockGroup.add(smallRock)
    }
    
    return rockGroup
  }

  private createSeaweed(): void {
    for (let i = 0; i < this.config.seaweedCount; i++) {
      const seaweed = this.createDetailedSeaweed()
      seaweed.position.set(
        (Math.random() - 0.5) * 140, // X: -70 to 70
        -43, // Y: Just above ocean floor
        (Math.random() - 0.5) * 140  // Z: -70 to 70
      )
      seaweed.userData = { 
        originalY: -43,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.3 + Math.random() * 0.4,
        segments: []
      }
      this.seaweedGroup.add(seaweed)
    }
  }

  private createDetailedSeaweed(): THREE.Group {
    const seaweedGroup = new THREE.Group()
    
    // Create segmented seaweed stalk
    const segmentCount = 8
    const segmentHeight = 2
    const segments: THREE.Mesh[] = []
    
    for (let i = 0; i < segmentCount; i++) {
      const radius = 0.15 - (i * 0.01) // Tapering from base to tip
      const geometry = new THREE.CylinderGeometry(radius, radius * 0.8, segmentHeight, 6)
      
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2D5A27), // Seaweed green
        roughness: 0.6,
        metalness: 0.0
      })
      
      const segment = new THREE.Mesh(geometry, material)
      segment.position.y = i * segmentHeight
      segment.userData = { segmentIndex: i }
      segments.push(segment)
      seaweedGroup.add(segment)
    }
    
    seaweedGroup.userData.segments = segments
    return seaweedGroup
  }

  private createPlankton(): void {
    for (let i = 0; i < this.config.planktonCount; i++) {
      const plankton = this.createDetailedPlankton()
      plankton.position.set(
        (Math.random() - 0.5) * 180, // X: -90 to 90
        (Math.random() - 0.5) * 60,  // Y: -30 to 30
        (Math.random() - 0.5) * 180  // Z: -90 to 90
      )
      plankton.userData = {
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.2 + Math.random() * 0.3,
        driftSpeed: 0.05 + Math.random() * 0.1,
        rotationSpeed: 0.1 + Math.random() * 0.2
      }
      this.planktonGroup.add(plankton)
    }
  }

  private createDetailedPlankton(): THREE.Group {
    const planktonGroup = new THREE.Group()
    
    // Create different types of plankton
    const planktonTypes = [
      // Small spherical plankton
      () => {
        const geometry = new THREE.SphereGeometry(0.2, 8, 6)
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x87CEEB), // Light blue
          roughness: 0.3,
          metalness: 0.0,
          transparent: true,
          opacity: 0.8
        })
        return new THREE.Mesh(geometry, material)
      },
      // Elongated plankton
      () => {
        const geometry = new THREE.CapsuleGeometry(0.1, 0.6, 4, 8)
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x98FB98), // Pale green
          roughness: 0.4,
          metalness: 0.0,
          transparent: true,
          opacity: 0.7
        })
        return new THREE.Mesh(geometry, material)
      },
      // Star-shaped plankton
      () => {
        const geometry = new THREE.OctahedronGeometry(0.15, 0)
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xFFB6C1), // Light pink
          roughness: 0.2,
          metalness: 0.0,
          transparent: true,
          opacity: 0.6
        })
        return new THREE.Mesh(geometry, material)
      }
    ]
    
    const selectedType = planktonTypes[Math.floor(Math.random() * planktonTypes.length)]
    const plankton = selectedType()
    planktonGroup.add(plankton)
    
    return planktonGroup
  }

  public update(deltaTime: number): void {
    this.seaweedAnimationTime += deltaTime
    this.planktonAnimationTime += deltaTime
    
    // Animate seaweed swaying with segmented movement
    this.seaweedGroup.children.forEach((seaweed) => {
      const userData = seaweed.userData
      const segments = userData.segments
      
      if (segments) {
        segments.forEach((segment: THREE.Mesh, index: number) => {
          const segmentOffset = userData.swayOffset + (index * 0.5)
          const sway = Math.sin(this.seaweedAnimationTime * userData.swaySpeed + segmentOffset) * 0.4
          const swayAmount = sway * (index + 1) * 0.1 // More sway at the top
          segment.rotation.z = swayAmount
        })
      }
    })
    
    // Animate plankton floating with rotation
    this.planktonGroup.children.forEach((plankton) => {
      const userData = plankton.userData
      
      // Gentle floating motion
      const floatY = Math.sin(this.planktonAnimationTime * userData.floatSpeed + userData.floatOffset) * 0.3
      plankton.position.y += floatY * deltaTime
      
      // Slow drift
      plankton.position.x += Math.sin(this.planktonAnimationTime * userData.driftSpeed) * deltaTime * 0.05
      plankton.position.z += Math.cos(this.planktonAnimationTime * userData.driftSpeed) * deltaTime * 0.05
      
      // Rotation
      plankton.rotation.y += userData.rotationSpeed * deltaTime
      plankton.rotation.x += userData.rotationSpeed * 0.5 * deltaTime
      
      // Keep plankton within bounds
      plankton.position.x = Math.max(-90, Math.min(90, plankton.position.x))
      plankton.position.y = Math.max(-43, Math.min(35, plankton.position.y))
      plankton.position.z = Math.max(-90, Math.min(90, plankton.position.z))
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
        } else if (child instanceof THREE.Group) {
          child.children.forEach(grandChild => {
            if (grandChild instanceof THREE.Mesh) {
              grandChild.geometry.dispose()
              if (Array.isArray(grandChild.material)) {
                grandChild.material.forEach(mat => mat.dispose())
              } else {
                grandChild.material.dispose()
              }
            }
          })
        }
      })
      this.scene.remove(group)
    })
    
    // Clean up ocean floor
    if (this.oceanFloor) {
      this.oceanFloor.geometry.dispose()
      this.oceanFloor.material.dispose()
      this.scene.remove(this.oceanFloor)
    }
  }
}
