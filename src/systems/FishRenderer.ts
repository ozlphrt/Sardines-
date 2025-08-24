import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Fish } from './Fish.js'

export interface FishRenderConfig {
  modelPath: string
  maxFishCount: number
  scale: number
  enableShadows: boolean
  enableFrustumCulling: boolean
  enableLOD: boolean
  lodDistance: number
}

export class FishRenderer {
  private scene: THREE.Scene
  private instancedMesh: THREE.InstancedMesh | null = null
  private geometry: THREE.BufferGeometry | null = null
  private material: THREE.Material | null = null
  private modelLoaded: boolean = false
  private config: FishRenderConfig
  private tempVector: THREE.Vector3 = new THREE.Vector3()
  private tempQuaternion: THREE.Quaternion = new THREE.Quaternion()
  
  // Performance optimization properties
  private camera: THREE.Camera | null = null
  private visibleFishCount: number = 0
  private lastUpdateTime: number = 0
  private updateInterval: number = 16 // Update every 16ms (60fps) for smooth movement
  private frustum: THREE.Frustum = new THREE.Frustum()
  private matrix: THREE.Matrix4 = new THREE.Matrix4()
  private sphere: THREE.Sphere = new THREE.Sphere()
  
  // Test animation properties
  private testMixer: THREE.AnimationMixer | null = null

  constructor(scene: THREE.Scene, config: FishRenderConfig) {
    this.scene = scene
    this.config = config
    console.log('FishRenderer constructor called')
    
    // Load the GLTF model directly
    this.loadModel()
  }

  /**
   * Load the GLTF fish model
   */
  private async loadModel(): Promise<void> {
    try {
      console.log('Loading fish model from:', this.config.modelPath)
      const loader = new GLTFLoader()
      
      // Add error handling for the loader
      loader.setPath('')
      
      const gltf = await loader.loadAsync(this.config.modelPath)
      
      console.log('GLTF loaded, scene children:', gltf.scene.children.length)
      
      // Check for animations first
      if (gltf.animations && gltf.animations.length > 0) {
        console.log('Found animations:', gltf.animations.map(anim => anim.name))
        console.log('Animation duration:', gltf.animations[0].duration)
        console.log('Animation tracks:', gltf.animations[0].tracks.length)
      }
      
      // Get the first mesh from the model
      const model = gltf.scene
      let fishMesh: THREE.Mesh | null = null
      
      model.traverse((child) => {
        console.log('Traversing child:', child.type, child.name)
        if (child instanceof THREE.Mesh && !fishMesh) {
          fishMesh = child
          console.log('Found fish mesh:', child.name)
        }
      })

      if (!fishMesh) {
        console.warn('No mesh found in GLTF model, using fallback')
        this.createFallbackGeometry()
        return
      }

      // Clone geometry and material for instancing
      this.geometry = (fishMesh as THREE.Mesh).geometry.clone()
      console.log('Geometry cloned, vertices:', this.geometry.attributes.position.count)
      
      // Handle material cloning (could be single material or array)
      const originalMaterial = (fishMesh as THREE.Mesh).material
      if (Array.isArray(originalMaterial)) {
        this.material = originalMaterial[0].clone()
        console.log('Cloned material from array:', this.material.name)
      } else {
        this.material = originalMaterial.clone()
        console.log('Cloned single material:', this.material.name)
      }
      
      // Log material properties for debugging
      if (this.material) {
        console.log('Material type:', this.material.type)
        console.log('Material name:', this.material.name)
        if (this.material instanceof THREE.MeshStandardMaterial) {
          console.log('Has map:', !!this.material.map)
          console.log('Has normalMap:', !!this.material.normalMap)
          console.log('Has roughnessMap:', !!this.material.roughnessMap)
          console.log('Has metalnessMap:', !!this.material.metalnessMap)
        }
      }

      // Configure material for underwater rendering with textures
      if (this.material instanceof THREE.Material) {
        // Preserve original materials and textures
        if (this.material instanceof THREE.MeshStandardMaterial || 
            this.material instanceof THREE.MeshLambertMaterial ||
            this.material instanceof THREE.MeshPhongMaterial) {
          
          // Keep the original material but optimize for underwater rendering
          this.material.side = THREE.DoubleSide
          this.material.transparent = false
          
          // Add subtle underwater lighting adjustments
          if (this.material instanceof THREE.MeshStandardMaterial) {
            this.material.metalness = 0.1 // Reduce metalness for fish
            this.material.roughness = 0.8 // Increase roughness for natural look
            this.material.envMapIntensity = 0.3 // Reduce environment reflection
          }
          
          console.log('Using original material with textures:', this.material.name)
        } else {
          // Fallback for other material types
          this.material.side = THREE.DoubleSide
          this.material.transparent = false
        }
      }

      // Create instanced mesh
      if (this.geometry && this.material) {
        this.instancedMesh = new THREE.InstancedMesh(
          this.geometry,
          this.material,
          this.config.maxFishCount
        )
        console.log('InstancedMesh created for', this.config.maxFishCount, 'fish')
      }

      // Configure instanced mesh
      if (this.instancedMesh) {
        this.instancedMesh.frustumCulled = this.config.enableFrustumCulling
        this.instancedMesh.castShadow = this.config.enableShadows
        this.instancedMesh.receiveShadow = this.config.enableShadows

              // Add to scene
      this.scene.add(this.instancedMesh)
      console.log('InstancedMesh created for', this.config.maxFishCount, 'fish')
    }
    
    // Test animation with one fish if animations are available
    if (gltf.animations && gltf.animations.length > 0) {
      this.createTestAnimatedFish(gltf.scene, gltf.animations[0])
    }
    
    // Optimize textures for performance
    this.updateTextureSettings()
    
    this.modelLoaded = true
    console.log('Fish model loaded successfully with textures')
    } catch (error) {
      console.error('Failed to load fish model:', error)
      // Fallback to simple geometry
      this.createFallbackGeometry()
    }
  }

  /**
   * Create a test animated fish to verify animation works
   */
  private createTestAnimatedFish(model: THREE.Group, animation: THREE.AnimationClip): void {
    try {
      console.log('Creating test animated fish...')
      
      // Clone the model for the test fish
      const testFish = model.clone()
      
      // Position it away from the flock
      testFish.position.set(50, 0, 50)
      testFish.scale.setScalar(this.config.scale)
      
      // Create animation mixer for this fish
      const mixer = new THREE.AnimationMixer(testFish)
      
      // Play the animation
      const action = mixer.clipAction(animation)
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.play()
      
      // Store mixer for updates
      this.testMixer = mixer
      
      // Add to scene
      this.scene.add(testFish)
      
      console.log('Test animated fish created and added to scene')
    } catch (error) {
      console.error('Failed to create test animated fish:', error)
    }
  }

  /**
   * Create fallback geometry if model loading fails
   */
  private createFallbackGeometry(): void {
    // Create a more fish-like geometry
    const fishGeometry = new THREE.ConeGeometry(0.8, 3, 12)
    fishGeometry.rotateX(Math.PI / 2) // Point forward
    
    this.geometry = fishGeometry
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x4A90E2), // Blue fish color
      metalness: 0.1,
      roughness: 0.8,
      transparent: false,
      side: THREE.DoubleSide
    })

    this.instancedMesh = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      this.config.maxFishCount
    )

    this.instancedMesh.frustumCulled = this.config.enableFrustumCulling
    this.scene.add(this.instancedMesh)
    this.modelLoaded = true
    console.log('Using fallback fish geometry - Blue cones')
  }

  /**
   * Set camera reference for frustum culling
   */
  public setCamera(camera: THREE.Camera): void {
    this.camera = camera
  }

  /**
   * Update fish positions and rotations with performance optimizations
   */
  public updateFish(fish: Fish[]): void {
    if (!this.instancedMesh || !this.modelLoaded) {
      return
    }

    // Throttle updates for performance
    const currentTime = performance.now()
    if (currentTime - this.lastUpdateTime < this.updateInterval) {
      return
    }
    this.lastUpdateTime = currentTime

    // Update test animation if it exists
    if (this.testMixer) {
      const deltaTime = (currentTime - this.lastUpdateTime) / 1000
      this.testMixer.update(deltaTime)
    }

    // Update frustum for culling
    if (this.config.enableFrustumCulling && this.camera) {
      this.frustum.setFromProjectionMatrix(
        this.matrix.multiplyMatrices(
          this.camera.projectionMatrix,
          this.camera.matrixWorldInverse
        )
      )
    }

    // Determine visible fish count based on frustum culling
    let visibleFish = fish
    if (this.config.enableFrustumCulling && this.camera) {
      visibleFish = this.getVisibleFish(fish)
    }

    // Limit to max fish count for performance
    const fishToRender = visibleFish.slice(0, Math.min(this.config.maxFishCount, 500)) // Hard limit for performance
    this.instancedMesh.count = fishToRender.length

    // Batch update matrices for better performance
    fishToRender.forEach((fishInstance, index) => {
      // Set position
      this.tempVector.copy(fishInstance.physics.position)
      
      // Set rotation (convert Euler to Quaternion)
      this.tempQuaternion.setFromEuler(fishInstance.physics.rotation)
      
      // Set scale with LOD optimization
      let scale = fishInstance.physics.scale.clone().multiplyScalar(this.config.scale)
      
      // Apply LOD scaling for distant fish (simplified for performance)
      if (this.config.enableLOD && this.camera) {
        const distance = this.tempVector.distanceTo(this.camera.position)
        if (distance > this.config.lodDistance) {
          const lodScale = Math.max(0.3, this.config.lodDistance / distance)
          scale.multiplyScalar(lodScale)
        }
      }
      
      // Update matrix
      this.matrix.compose(this.tempVector, this.tempQuaternion, scale)
      
      // Set instance matrix
      this.instancedMesh.setMatrixAt(index, this.matrix)
    })

    // Mark instances as needing update
    this.instancedMesh.instanceMatrix.needsUpdate = true
    this.visibleFishCount = fishToRender.length
  }

  /**
   * Get fish visible within camera frustum (optimized)
   */
  private getVisibleFish(fish: Fish[]): Fish[] {
    if (!this.camera) return fish

    return fish.filter(fishInstance => {
      // Reuse sphere object for better performance
      this.sphere.set(fishInstance.physics.position, 2 * this.config.scale)
      return this.frustum.intersectsSphere(this.sphere)
    })
  }

  /**
   * Set fish count (for performance optimization)
   */
  public setFishCount(count: number): void {
    if (this.instancedMesh) {
      this.instancedMesh.count = Math.min(count, this.config.maxFishCount)
    }
  }

  /**
   * Update material properties
   */
  public updateMaterial(properties: Partial<THREE.Material>): void {
    if (this.material) {
      Object.assign(this.material, properties)
    }
  }

  /**
   * Update texture properties for better performance
   */
  public updateTextureSettings(): void {
    if (this.material instanceof THREE.MeshStandardMaterial) {
      // Optimize texture settings for performance
      if (this.material.map) {
        this.material.map.generateMipmaps = true
        this.material.map.minFilter = THREE.LinearMipmapLinearFilter
        this.material.map.magFilter = THREE.LinearFilter
        this.material.map.wrapS = THREE.ClampToEdgeWrapping
        this.material.map.wrapT = THREE.ClampToEdgeWrapping
        console.log('Optimized base color texture')
      }
      
      if (this.material.normalMap) {
        this.material.normalMap.generateMipmaps = true
        this.material.normalMap.minFilter = THREE.LinearMipmapLinearFilter
        this.material.normalMap.magFilter = THREE.LinearFilter
        console.log('Optimized normal map texture')
      }
    }
  }

  /**
   * Get current fish count
   */
  public getFishCount(): number {
    return this.instancedMesh?.count || 0
  }

  /**
   * Get performance statistics
   */
  public getPerformanceStats(): { visibleFish: number; totalFish: number; cullingEnabled: boolean } {
    return {
      visibleFish: this.visibleFishCount,
      totalFish: this.instancedMesh?.count || 0,
      cullingEnabled: this.config.enableFrustumCulling
    }
  }

  /**
   * Check if model is loaded
   */
  public isLoaded(): boolean {
    return this.modelLoaded
  }

  /**
   * Dispose of resources
   */
  public dispose(): void {
    if (this.geometry) {
      this.geometry.dispose()
    }
    if (this.material) {
      this.material.dispose()
    }
    if (this.instancedMesh) {
      this.scene.remove(this.instancedMesh)
      this.instancedMesh.dispose()
    }
  }
}
