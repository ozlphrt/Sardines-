import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export interface SeaFloorConfig {
  enabled: boolean
  scale: number
  position: THREE.Vector3
  rotation: THREE.Euler
  receiveShadows: boolean
  castShadows: boolean
}

export class SeaFloorModel {
  private scene: THREE.Scene
  private config: SeaFloorConfig
  private model: THREE.Group | null = null
  private loader: GLTFLoader
  private isLoading: boolean = false
  private loadError: string | null = null

  constructor(scene: THREE.Scene, config: SeaFloorConfig) {
    this.scene = scene
    this.config = config
    this.loader = new GLTFLoader()
  }

  public async loadModel(): Promise<void> {
    if (!this.config.enabled || this.isLoading || this.model) {
      return
    }

    this.isLoading = true
    this.loadError = null

    try {
      console.log('🌊 Loading external sea floor GLTF model...')
      
      const gltf = await this.loader.loadAsync('/Sardines-/models/underwater_terrain/scene.gltf')
      
      this.model = gltf.scene
      
      // Apply configuration
      this.model.scale.setScalar(this.config.scale)
      this.model.position.copy(this.config.position)
      this.model.rotation.copy(this.config.rotation)
      
      // Configure shadows
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.receiveShadow = this.config.receiveShadows
          child.castShadow = this.config.castShadows
        }
      })
      
      // Add to scene
      this.scene.add(this.model)
      
      console.log('✅ Sea floor model loaded successfully!')
      console.log('📊 Model info:', {
        children: this.model.children.length,
        scale: this.config.scale,
        position: this.config.position,
        rotation: this.config.rotation
      })
      console.log('🌊 Sea floor scaled to:', this.config.scale, 'x (ocean bottom coverage)')
      
    } catch (error) {
      this.loadError = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Failed to load sea floor model:', this.loadError)
    } finally {
      this.isLoading = false
    }
  }

  public updateConfig(newConfig: Partial<SeaFloorConfig>): void {
    this.config = { ...this.config, ...newConfig }
    
    if (this.model) {
      this.model.scale.setScalar(this.config.scale)
      this.model.position.copy(this.config.position)
      this.model.rotation.copy(this.config.rotation)
      
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.receiveShadow = this.config.receiveShadows
          child.castShadow = this.config.castShadows
        }
      })
    }
  }

  public getModel(): THREE.Group | null {
    return this.model
  }

  public getIsLoading(): boolean {
    return this.isLoading
  }

  public getLoadError(): string | null {
    return this.loadError
  }

  public isEnabled(): boolean {
    return this.config.enabled
  }

  public dispose(): void {
    if (this.model) {
      // Remove from scene
      this.scene.remove(this.model)
      
      // Dispose of geometries and materials
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      
      this.model = null
    }
    
    this.isLoading = false
    this.loadError = null
  }
}
