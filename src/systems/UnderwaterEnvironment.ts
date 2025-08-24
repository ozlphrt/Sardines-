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
    // Create a detailed ocean floor with sand texture - expanded to match swimming area
    const floorGeometry = new THREE.PlaneGeometry(250, 250, 40, 40)
    
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
      color: new THREE.Color(0xF5DEB3), // Wheat sand color - more visible
      roughness: 0.7,
      metalness: 0.0,
      side: THREE.DoubleSide
    })
    
    this.oceanFloor = new THREE.Mesh(floorGeometry, floorMaterial)
    this.oceanFloor.rotation.x = -Math.PI / 2 // Rotate to be horizontal
    this.oceanFloor.position.y = -42 // Position closer to swimming area
    this.oceanFloor.receiveShadow = false
    this.oceanFloor.name = 'OceanFloor'
    
    this.scene.add(this.oceanFloor)
    console.log('Visible ocean floor created at Y = -42, size: 250x250')
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
        (Math.random() - 0.5) * 200, // X: -100 to 100 (match swimming area)
        -43 + Math.random() * 3, // Y: Just above ocean floor
        (Math.random() - 0.5) * 200  // Z: -100 to 100 (match swimming area)
      )
      coral.rotation.y = Math.random() * Math.PI * 2
      coral.scale.setScalar(0.6 + Math.random() * 0.6)
      this.coralGroup.add(coral)
    }
  }

  private createComplexCoral(): THREE.Group {
    const coralGroup = new THREE.Group()
    
    // Create natural coral structure with varied colors
    const coralColors = [
      0x8B4513, // Saddle brown
      0xCD853F, // Peru
      0xD2691E, // Chocolate
      0xDEB887, // Burlywood
      0xF4A460, // Sandy brown
      0xBC8F8F, // Rosy brown
      0xDDA0DD, // Plum
      0x98FB98  // Pale green
    ]
    
    const createBranch = (height: number, radius: number, segments: number, color: number): THREE.Mesh => {
      const geometry = new THREE.CylinderGeometry(radius * 0.3, radius, height, segments)
      
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.8,
        metalness: 0.0
      })
      
      return new THREE.Mesh(geometry, material)
    }
    
    // Main trunk
    const trunkColor = coralColors[Math.floor(Math.random() * coralColors.length)]
    const trunk = createBranch(8 + Math.random() * 6, 0.8, 8, trunkColor)
    coralGroup.add(trunk)
    
    // Add natural branches
    const branchCount = 2 + Math.floor(Math.random() * 4)
    for (let i = 0; i < branchCount; i++) {
      const branchColor = coralColors[Math.floor(Math.random() * coralColors.length)]
      const branch = createBranch(4 + Math.random() * 3, 0.4, 6, branchColor)
      branch.position.y = 2 + i * 2
      branch.rotation.z = Math.random() * Math.PI * 2
      branch.rotation.y = Math.random() * Math.PI * 2
      coralGroup.add(branch)
      
      // Add smaller branches occasionally
      if (Math.random() > 0.5) {
        const smallColor = coralColors[Math.floor(Math.random() * coralColors.length)]
        const smallBranch = createBranch(2 + Math.random() * 2, 0.2, 4, smallColor)
        smallBranch.position.y = 1 + Math.random() * 2
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
        (Math.random() - 0.5) * 200, // X: -100 to 100 (match swimming area)
        -43 + Math.random() * 5, // Y: Just above ocean floor with variation
        (Math.random() - 0.5) * 200  // Z: -100 to 100 (match swimming area)
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
        (Math.random() - 0.5) * 200, // X: -100 to 100 (match swimming area)
        -43, // Y: Just above ocean floor
        (Math.random() - 0.5) * 200  // Z: -100 to 100 (match swimming area)
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
        (Math.random() - 0.5) * 200, // X: -100 to 100 (match swimming area)
        (Math.random() - 0.5) * 80,  // Y: -40 to 40 (match swimming area)
        (Math.random() - 0.5) * 200  // Z: -100 to 100 (match swimming area)
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
      plankton.position.x = Math.max(-100, Math.min(100, plankton.position.x))
      plankton.position.y = Math.max(-43, Math.min(40, plankton.position.y))
      plankton.position.z = Math.max(-100, Math.min(100, plankton.position.z))
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
