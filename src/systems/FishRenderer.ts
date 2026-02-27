import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Fish } from './Fish.js'
import { useSimulationStore } from '../stores/simulationStore.js'

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
  private tempColor: THREE.Color = new THREE.Color()

  // Performance optimization properties
  private camera: THREE.Camera | null = null
  private visibleFishCount: number = 0
  private tempScale: THREE.Vector3 = new THREE.Vector3()
  private frustum: THREE.Frustum = new THREE.Frustum()
  private matrix: THREE.Matrix4 = new THREE.Matrix4()
  private sphere: THREE.Sphere = new THREE.Sphere()

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

      // Use Vite's BASE_URL for correct pathing on GitHub Pages
      const basePath = (import.meta as any).env.BASE_URL || '/'
      loader.setPath(`${basePath}assets/fish-model/`)

      console.log('Attempting to load scene.gltf...')
      const gltf = await loader.loadAsync('scene.gltf')
      console.log('GLTF model loaded successfully!')

      console.log('GLTF loaded, scene children:', gltf.scene.children.length)

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
        console.error('No mesh found in GLTF model, using fallback')
        console.log('Available children:', gltf.scene.children.map(child => ({ type: child.type, name: child.name })))
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

          // Realistic sardine appearance - reactive to store parameters
          if (this.material instanceof THREE.MeshStandardMaterial) {
            const r = useSimulationStore.getState().parameters.rendering
            this.material.metalness = r.metalness
            this.material.roughness = r.roughness
            this.material.envMapIntensity = r.envMapIntensity

            this.material.color.setHex(0xCCCCCC) // Standard neutral base for textures

            // Add emissive glow from store
            this.material.emissive.setHex(0xADDEFF)
            this.material.emissiveIntensity = r.emissiveIntensity
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

        // Enable instance colors for individual brightness variations
        this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
          new Float32Array(this.config.maxFishCount * 3), 3
        )

        // Add instance attributes for shader-based swimming animation
        this.instancedMesh.geometry.setAttribute('instanceWiggle', new THREE.InstancedBufferAttribute(
          new Float32Array(this.config.maxFishCount), 1
        ))

        this.setupCustomShader()

        console.log('InstancedMesh created for', this.config.maxFishCount, 'fish with instance colors and wiggle')
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
   * Create fallback geometry if model loading fails
   */
  private createFallbackGeometry(): void {
    // Create a more fish-like geometry that won't spin
    const fishGeometry = new THREE.ConeGeometry(0.8, 3, 12)
    fishGeometry.rotateX(Math.PI / 2) // Point forward
    fishGeometry.rotateZ(Math.PI) // Fix orientation to prevent spinning

    this.geometry = fishGeometry
    const r = useSimulationStore.getState().parameters.rendering
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x888888),
      metalness: r.metalness,
      roughness: r.roughness,
      envMapIntensity: r.envMapIntensity,
      emissive: new THREE.Color(0xB2E0FF),
      emissiveIntensity: r.emissiveIntensity,
      transparent: false,
      side: THREE.DoubleSide
    })

    this.instancedMesh = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      this.config.maxFishCount
    )

    // Enable instance colors for individual brightness variations
    this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(this.config.maxFishCount * 3), 3
    )

    // Add instance attributes for shader-based swimming animation
    this.instancedMesh.geometry.setAttribute('instanceWiggle', new THREE.InstancedBufferAttribute(
      new Float32Array(this.config.maxFishCount), 1
    ))

    this.setupCustomShader()

    this.instancedMesh.frustumCulled = this.config.enableFrustumCulling
    this.scene.add(this.instancedMesh)
    this.modelLoaded = true
    console.log('Using fallback fish geometry - Blue cones with instance colors')
  }

  /**
   * Set camera reference for frustum culling
   */
  public setCamera(camera: THREE.Camera): void {
    this.camera = camera
  }

  public updateFish(fish: Fish[]): void {
    if (!this.instancedMesh || !this.modelLoaded) {
      return
    }

    // Update frustum for culling once per frame
    if (this.config.enableFrustumCulling && this.camera) {
      this.frustum.setFromProjectionMatrix(
        this.matrix.multiplyMatrices(
          this.camera.projectionMatrix,
          this.camera.matrixWorldInverse
        )
      )
    }

    // Limit to max fish count for performance
    let renderedCount = 0

    // Batch update matrices for better performance
    for (let i = 0; i < fish.length && renderedCount < this.config.maxFishCount; i++) {
      const fishInstance = fish[i]

      // Frustum culling check
      if (this.config.enableFrustumCulling && this.camera) {
        this.sphere.set(fishInstance.physics.position, 2 * this.config.scale)
        if (!this.frustum.intersectsSphere(this.sphere)) continue
      }

      // Set position
      this.tempVector.copy(fishInstance.physics.position)

      // Use ONLY the physics rotation (no additional animations)
      const targetRotation = fishInstance.physics.rotation

      // Set rotation (convert Euler to Quaternion)
      this.tempQuaternion.setFromEuler(targetRotation)

      // Set scale (Uniform config scale * individual size variation)
      const instanceScale = this.config.scale * fishInstance.physics.scale.x
      this.tempScale.set(
        instanceScale,
        instanceScale,
        instanceScale
      )

      // Apply LOD scaling for distant fish (simplified for performance)
      if (this.config.enableLOD && this.camera) {
        const distance = this.tempVector.distanceTo(this.camera.position)
        if (distance > this.config.lodDistance) {
          const lodScale = Math.max(0.3, this.config.lodDistance / distance)
          this.tempScale.multiplyScalar(lodScale)
        }
      }

      // Update matrix
      this.matrix.compose(this.tempVector, this.tempQuaternion, this.tempScale)

      if (this.instancedMesh) {
        this.instancedMesh.setMatrixAt(renderedCount, this.matrix)

        // Apply individual brightness variation
        const brightness = fishInstance.appearance.brightnessVariation
        const colorVariation = fishInstance.appearance.colorVariation

        // Start with base sardine color and apply variations
        this.tempColor.setHex(0xFFFFFF) // Silvery white
        this.tempColor.multiplyScalar(brightness * colorVariation)

        // Set instance color
        this.instancedMesh.setColorAt(renderedCount, this.tempColor)

        // Set shader undulation (wiggle) state
        const wiggleAttr = this.instancedMesh.geometry.getAttribute('instanceWiggle') as THREE.InstancedBufferAttribute
        if (wiggleAttr) {
          const phase = fishInstance.getUndulationPhase()
          const amplitude = fishInstance.getUndulationAmplitude()
          // Compute the final wiggle offset for the shader 
          const wiggle = Math.sin(phase) * amplitude * 0.4
          wiggleAttr.setX(renderedCount, wiggle)
        }
      }

      renderedCount++
    }

    if (this.instancedMesh) {
      this.instancedMesh.count = renderedCount
      this.instancedMesh.instanceMatrix.needsUpdate = true
      if (this.instancedMesh.instanceColor) {
        this.instancedMesh.instanceColor.needsUpdate = true
      }
      const wiggleAttr = this.instancedMesh.geometry.getAttribute('instanceWiggle') as THREE.InstancedBufferAttribute
      if (wiggleAttr) {
        wiggleAttr.needsUpdate = true
      }
    }
    this.visibleFishCount = renderedCount
  }
  public updateMaterial(properties: Partial<THREE.MeshStandardMaterial>): void {
    if (this.material && this.material instanceof THREE.MeshStandardMaterial) {
      Object.assign(this.material, properties)
    }
  }

  /**
   * Inject procedural vertex bending for swimming animation
   */
  private setupCustomShader(): void {
    if (!this.material) return;

    this.material.onBeforeCompile = (shader) => {
      shader.vertexShader = `
        attribute float instanceWiggle;
        ${shader.vertexShader}
      `.replace(
        `#include <begin_vertex>`,
        `
        vec3 transformed = vec3( position );
        
        // Procedural swimming motion (S-curve bending)
        // position.z represents the spine. Local Z ~ 0.8 is the head, Z ~ -1.15 is the tail.
        // We anchor the head by calculating distance from headZ.
        float headZ = 0.8;
        float tailWeight = max(0.0, headZ - position.z);
        
        // Quadratic weight makes the head stable and the tail very flexible
        float waveIntensity = tailWeight * tailWeight * 1.8;
        transformed.x += instanceWiggle * waveIntensity;
        `
      );
    };

    // Explicitly flag material for update
    this.material.needsUpdate = true;
  }

  /**
   * Set fish scale in real-time
   */
  public setScale(scale: number): void {
    this.config.scale = scale
  }

  /**
   * Reset material to defaults from store 
   */
  public resetMaterial(): void {
    const r = useSimulationStore.getState().parameters.rendering
    this.updateMaterial({
      metalness: r.metalness,
      roughness: r.roughness,
      envMapIntensity: r.envMapIntensity,
      emissiveIntensity: r.emissiveIntensity
    })
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
