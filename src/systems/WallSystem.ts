import * as THREE from 'three'

export interface WallConfig {
  showWalls: boolean
  showGridlines: boolean
  wallOpacity: number
  gridlineOpacity: number
  gridSize: number
  wallColor: number
  gridlineColor: number
  transparencyEnabled: boolean
  transparencyDistance: number
}

export class WallSystem {
  private scene: THREE.Scene
  private camera: THREE.Camera | null = null
  private config: WallConfig
  private wallGroup: THREE.Group
  private walls: THREE.Mesh[] = []
  private gridlines: THREE.LineSegments[] = []
  private bounds: THREE.Box3
  
  // Raycaster for fish-wall-camera intersection detection
  private raycaster: THREE.Raycaster = new THREE.Raycaster()
  private fishPositions: THREE.Vector3[] = []

  constructor(scene: THREE.Scene, bounds: THREE.Box3, config: WallConfig) {
    this.scene = scene
    this.bounds = bounds.clone()
    this.config = { ...config }
    
    this.wallGroup = new THREE.Group()
    this.wallGroup.name = 'WallSystem'
    this.scene.add(this.wallGroup)
    
    this.createWalls()
  }

  /**
   * Set camera reference for transparency calculations
   */
  public setCamera(camera: THREE.Camera): void {
    this.camera = camera
  }

  /**
   * Update fish positions for transparency calculations
   */
  public updateFishPositions(fishPositions: THREE.Vector3[]): void {
    this.fishPositions = fishPositions
    
    if (this.config.transparencyEnabled && this.camera) {
      this.updateWallTransparency()
    }
  }

  /**
   * Create wall boundaries with gridlines
   */
  private createWalls(): void {
    this.clearWalls()

    if (!this.config.showWalls) {
      return
    }

    const { min, max } = this.bounds
    
    // Wall dimensions and positions
    const wallConfigs = [
      // Left wall (X = min)
      {
        position: new THREE.Vector3(min.x, (min.y + max.y) / 2, (min.z + max.z) / 2),
        size: new THREE.Vector3(0.1, max.y - min.y, max.z - min.z),
        rotation: new THREE.Euler(0, 0, 0),
        normal: new THREE.Vector3(1, 0, 0)
      },
      // Right wall (X = max)
      {
        position: new THREE.Vector3(max.x, (min.y + max.y) / 2, (min.z + max.z) / 2),
        size: new THREE.Vector3(0.1, max.y - min.y, max.z - min.z),
        rotation: new THREE.Euler(0, 0, 0),
        normal: new THREE.Vector3(-1, 0, 0)
      },
      // Bottom wall (Y = min)
      {
        position: new THREE.Vector3((min.x + max.x) / 2, min.y, (min.z + max.z) / 2),
        size: new THREE.Vector3(max.x - min.x, 0.1, max.z - min.z),
        rotation: new THREE.Euler(0, 0, 0),
        normal: new THREE.Vector3(0, 1, 0)
      },
      // Top wall (Y = max)
      {
        position: new THREE.Vector3((min.x + max.x) / 2, max.y, (min.z + max.z) / 2),
        size: new THREE.Vector3(max.x - min.x, 0.1, max.z - min.z),
        rotation: new THREE.Euler(0, 0, 0),
        normal: new THREE.Vector3(0, -1, 0)
      },
      // Front wall (Z = min)
      {
        position: new THREE.Vector3((min.x + max.x) / 2, (min.y + max.y) / 2, min.z),
        size: new THREE.Vector3(max.x - min.x, max.y - min.y, 0.1),
        rotation: new THREE.Euler(0, 0, 0),
        normal: new THREE.Vector3(0, 0, 1)
      },
      // Back wall (Z = max)
      {
        position: new THREE.Vector3((min.x + max.x) / 2, (min.y + max.y) / 2, max.z),
        size: new THREE.Vector3(max.x - min.x, max.y - min.y, 0.1),
        rotation: new THREE.Euler(0, 0, 0),
        normal: new THREE.Vector3(0, 0, -1)
      }
    ]

    wallConfigs.forEach((wallConfig, index) => {
      const wall = this.createWall(wallConfig, index)
      this.walls.push(wall)
      this.wallGroup.add(wall)

      if (this.config.showGridlines) {
        const gridline = this.createGridlines(wallConfig, index)
        this.gridlines.push(gridline)
        this.wallGroup.add(gridline)
      }
    })

    console.log(`Created ${this.walls.length} walls with ${this.gridlines.length} gridline systems`)
  }

  /**
   * Create individual wall mesh
   */
  private createWall(wallConfig: any, index: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(wallConfig.size.x, wallConfig.size.y, wallConfig.size.z)
    
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.config.wallColor),
      transparent: true,
      opacity: this.config.wallOpacity,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.1
    })

    const wall = new THREE.Mesh(geometry, material)
    wall.position.copy(wallConfig.position)
    wall.rotation.copy(wallConfig.rotation)
    wall.name = `Wall_${index}`
    wall.userData = { 
      wallIndex: index, 
      normal: wallConfig.normal,
      originalOpacity: this.config.wallOpacity 
    }
    
    // Set render order to ensure walls render before fish
    wall.renderOrder = -2

    return wall
  }

  /**
   * Create gridlines for a wall
   */
  private createGridlines(wallConfig: any, index: number): THREE.LineSegments {
    const points: THREE.Vector3[] = []
    const { size } = wallConfig
    const gridSize = this.config.gridSize

    // Determine which dimensions to use for the grid based on wall orientation
    let width: number, height: number, widthAxis: string, heightAxis: string
    
    if (Math.abs(size.x) < 1) { // X-facing wall (left/right)
      width = size.z
      height = size.y
      widthAxis = 'z'
      heightAxis = 'y'
    } else if (Math.abs(size.y) < 1) { // Y-facing wall (top/bottom)
      width = size.x
      height = size.z
      widthAxis = 'x'
      heightAxis = 'z'
    } else { // Z-facing wall (front/back)
      width = size.x
      height = size.y
      widthAxis = 'x'
      heightAxis = 'y'
    }

    // Create horizontal lines
    const horizontalLines = Math.floor(height / gridSize)
    for (let i = 0; i <= horizontalLines; i++) {
      const y = (i / horizontalLines - 0.5) * height
      const start = new THREE.Vector3()
      const end = new THREE.Vector3()
      
      start[widthAxis as keyof THREE.Vector3] = -width / 2
      end[widthAxis as keyof THREE.Vector3] = width / 2
      start[heightAxis as keyof THREE.Vector3] = y
      end[heightAxis as keyof THREE.Vector3] = y
      
      points.push(start, end)
    }

    // Create vertical lines
    const verticalLines = Math.floor(width / gridSize)
    for (let i = 0; i <= verticalLines; i++) {
      const x = (i / verticalLines - 0.5) * width
      const start = new THREE.Vector3()
      const end = new THREE.Vector3()
      
      start[widthAxis as keyof THREE.Vector3] = x
      end[widthAxis as keyof THREE.Vector3] = x
      start[heightAxis as keyof THREE.Vector3] = -height / 2
      end[heightAxis as keyof THREE.Vector3] = height / 2
      
      points.push(start, end)
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(this.config.gridlineColor),
      transparent: true,
      opacity: this.config.gridlineOpacity,
      linewidth: 3, // Make lines thicker (where supported)
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    })

    console.log(`Wall ${index}: Created ${points.length / 2} grid lines (${horizontalLines + 1} horizontal, ${verticalLines + 1} vertical)`)

    const gridlines = new THREE.LineSegments(geometry, material)
    gridlines.position.copy(wallConfig.position)
    gridlines.rotation.copy(wallConfig.rotation)
    gridlines.name = `Gridlines_${index}`
    gridlines.userData = { 
      wallIndex: index,
      originalOpacity: this.config.gridlineOpacity 
    }

    // Position gridlines exactly on the wall surface
    // No offset needed - they should be coincident with the wall
    
    // Set render order to ensure gridlines render after walls but before fish
    gridlines.renderOrder = 0

    return gridlines
  }

  /**
   * Update wall transparency based on camera-fish-wall intersections
   */
  private updateWallTransparency(): void {
    if (!this.camera || this.fishPositions.length === 0) {
      return
    }

    // Reset all walls to original opacity
    this.walls.forEach((wall) => {
      const material = wall.material as THREE.MeshStandardMaterial
      material.opacity = wall.userData.originalOpacity
    })

    this.gridlines.forEach((gridline) => {
      const material = gridline.material as THREE.LineBasicMaterial
      material.opacity = gridline.userData.originalOpacity
    })

    const cameraPosition = this.camera.position

    // Check each fish for wall occlusion
    this.fishPositions.forEach((fishPosition) => {
      const direction = new THREE.Vector3().subVectors(fishPosition, cameraPosition).normalize()
      const distance = cameraPosition.distanceTo(fishPosition)

      // Only check fish within transparency distance
      if (distance > this.config.transparencyDistance) {
        return
      }

      this.raycaster.set(cameraPosition, direction)
      
      // Check intersection with each wall
      this.walls.forEach((wall, index) => {
        const intersections = this.raycaster.intersectObject(wall)
        
        if (intersections.length > 0) {
          const intersectionDistance = intersections[0].distance
          
          // If wall is between camera and fish, make it transparent
          if (intersectionDistance < distance) {
            const material = wall.material as THREE.MeshStandardMaterial
            const gridlineMaterial = this.gridlines[index]?.material as THREE.LineBasicMaterial
            
            // Calculate transparency based on distance
            const transparencyFactor = Math.max(0.1, 1 - (distance - intersectionDistance) / this.config.transparencyDistance)
            
            material.opacity = Math.min(material.opacity, transparencyFactor * 0.3) // Make very transparent
            if (gridlineMaterial) {
              gridlineMaterial.opacity = Math.min(gridlineMaterial.opacity, transparencyFactor * 0.5)
            }
          }
        }
      })
    })
  }

  /**
   * Update wall configuration
   */
  public updateConfig(newConfig: Partial<WallConfig>): void {
    const configChanged = JSON.stringify(this.config) !== JSON.stringify({ ...this.config, ...newConfig })
    
    Object.assign(this.config, newConfig)
    
    if (configChanged) {
      this.createWalls()
    }
  }

  /**
   * Update bounds and recreate walls
   */
  public updateBounds(newBounds: THREE.Box3): void {
    this.bounds.copy(newBounds)
    this.createWalls()
  }

  /**
   * Clear all walls and gridlines
   */
  private clearWalls(): void {
    this.walls.forEach(wall => {
      wall.geometry.dispose()
      if (wall.material instanceof THREE.Material) {
        wall.material.dispose()
      }
      this.wallGroup.remove(wall)
    })

    this.gridlines.forEach(gridline => {
      gridline.geometry.dispose()
      if (gridline.material instanceof THREE.Material) {
        gridline.material.dispose()
      }
      this.wallGroup.remove(gridline)
    })

    this.walls = []
    this.gridlines = []
  }

  /**
   * Get wall visibility
   */
  public getWallVisibility(): boolean {
    return this.config.showWalls
  }

  /**
   * Toggle wall visibility
   */
  public toggleWalls(): void {
    this.config.showWalls = !this.config.showWalls
    this.createWalls()
  }

  /**
   * Toggle gridlines
   */
  public toggleGridlines(): void {
    this.config.showGridlines = !this.config.showGridlines
    this.createWalls()
  }

  /**
   * Dispose of all resources
   */
  public dispose(): void {
    this.clearWalls()
    this.scene.remove(this.wallGroup)
  }
}
