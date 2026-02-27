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
  private tempQuaternion: THREE.Quaternion = new THREE.Quaternion()
  private tempColor: THREE.Color = new THREE.Color()
  private tempScale: THREE.Vector3 = new THREE.Vector3()

  // Performance optimization properties
  private visibleFishCount: number = 0
  private matrix: THREE.Matrix4 = new THREE.Matrix4()

  constructor(scene: THREE.Scene, config: FishRenderConfig) {
    this.scene = scene
    this.config = config

    // Load initial species from store
    const species = useSimulationStore.getState().parameters.rendering.selectedSpecies || 'sardine'
    this.switchSpecies(species)
  }

  /**
   * Switch the fish species model
   */
  public async switchSpecies(species: string): Promise<void> {
    console.log(`FishRenderer: Switching species to ${species}`)
    this.modelLoaded = false

    if (this.instancedMesh) {
      this.scene.remove(this.instancedMesh)
    }

    try {
      const loader = new GLTFLoader()
      const basePath = (import.meta as any).env.BASE_URL || '/'

      let modelDir = ''
      let modelFile = 'scene.gltf'

      switch (species) {
        case 'tropical':
          modelDir = 'models/animated_swimming_tropical_fish_school_loop/'
          break
        case 'school':
          modelDir = 'models/school_of_fish/'
          break
        case 'sardine':
        default:
          modelDir = 'assets/fish-model/'
          break
      }

      loader.setPath(`${basePath}${modelDir}`)
      const gltf = await loader.loadAsync(modelFile)

      const model = gltf.scene
      let fishMesh: THREE.Mesh | null = null

      model.traverse((child) => {
        if (child instanceof THREE.Mesh && !fishMesh) {
          fishMesh = child
        }
      })

      if (!fishMesh) {
        throw new Error('No mesh found in GLTF model')
      }

      if (this.geometry) this.geometry.dispose()
      if (this.material) this.material.dispose()

      this.geometry = (fishMesh as THREE.Mesh).geometry.clone()

      const originalMaterial = (fishMesh as THREE.Mesh).material
      this.material = Array.isArray(originalMaterial) ? originalMaterial[0].clone() : originalMaterial.clone()

      if (this.material instanceof THREE.MeshStandardMaterial) {
        const r = useSimulationStore.getState().parameters.rendering
        this.material.side = THREE.DoubleSide
        this.material.metalness = r.metalness
        this.material.roughness = r.roughness
        this.material.envMapIntensity = r.envMapIntensity
        this.material.emissive.setHex(0xADDEFF)
        this.material.emissiveIntensity = r.emissiveIntensity
      }

      this.instancedMesh = new THREE.InstancedMesh(
        this.geometry,
        this.material,
        this.config.maxFishCount
      )

      this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(this.config.maxFishCount * 3), 3
      )

      this.instancedMesh.geometry.setAttribute('instanceWiggle', new THREE.InstancedBufferAttribute(
        new Float32Array(this.config.maxFishCount), 1
      ))

      this.setupCustomShader()

      this.instancedMesh.frustumCulled = this.config.enableFrustumCulling
      this.instancedMesh.castShadow = this.config.enableShadows
      this.instancedMesh.receiveShadow = this.config.enableShadows

      this.scene.add(this.instancedMesh)
      this.updateTextureSettings()

      this.modelLoaded = true
    } catch (error) {
      console.error('FishRenderer: Failed to switch species:', error)
      this.createFallbackGeometry()
    }
  }

  public setCamera(_camera: THREE.Camera): void {
    // Kept for interface compatibility
  }

  public isLoaded(): boolean {
    return this.modelLoaded
  }

  private createFallbackGeometry(): void {
    const fishGeometry = new THREE.ConeGeometry(0.8, 3, 12)
    fishGeometry.rotateX(Math.PI / 2)
    fishGeometry.rotateZ(Math.PI)

    this.geometry = fishGeometry
    const r = useSimulationStore.getState().parameters.rendering
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x888888),
      metalness: r.metalness,
      roughness: r.roughness,
      envMapIntensity: r.envMapIntensity,
      side: THREE.DoubleSide
    })

    if (this.instancedMesh) this.scene.remove(this.instancedMesh)

    this.instancedMesh = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      this.config.maxFishCount
    )

    this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(this.config.maxFishCount * 3), 3
    )

    this.instancedMesh.geometry.setAttribute('instanceWiggle', new THREE.InstancedBufferAttribute(
      new Float32Array(this.config.maxFishCount), 1
    ))

    this.setupCustomShader()
    this.scene.add(this.instancedMesh)
    this.modelLoaded = true
  }

  private setupCustomShader(): void {
    if (!this.material) return

    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 }

      shader.vertexShader = `
        attribute float instanceWiggle;
        ${shader.vertexShader}
      `.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float headZ = 0.8;
        float tailZ = -1.15;
        float tailWeight = clamp((headZ - position.z) / (headZ - tailZ), 0.0, 1.0);
        float waveIntensity = tailWeight * tailWeight * 2.5;
        float bend = instanceWiggle * waveIntensity;
        transformed.x += sin(bend) * tailWeight;
        `
      )

      this.material!.userData.shader = shader
    }

    this.material.needsUpdate = true
  }

  public updateFish(fish: Fish[]): void {
    if (!this.instancedMesh || !this.modelLoaded) return

    const count = Math.min(fish.length, this.config.maxFishCount)
    this.visibleFishCount = 0

    const r = useSimulationStore.getState().parameters.rendering
    this.tempScale.set(r.modelScale, r.modelScale, r.modelScale)

    for (let i = 0; i < count; i++) {
      const fishInstance = fish[i]

      this.tempQuaternion.setFromEuler(fishInstance.physics.rotation)

      this.matrix.compose(
        fishInstance.physics.position,
        this.tempQuaternion,
        this.tempScale
      )

      this.instancedMesh.setMatrixAt(i, this.matrix)

      const wiggleAttr = this.instancedMesh.geometry.getAttribute('instanceWiggle') as THREE.InstancedBufferAttribute
      wiggleAttr.setX(i, fishInstance.getUndulationPhase())

      const brightness = 0.8 + Math.random() * 0.4
      this.tempColor.setRGB(brightness, brightness, brightness)
      this.instancedMesh.setColorAt(i, this.tempColor)

      this.visibleFishCount++
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true
    if (this.instancedMesh.instanceColor) this.instancedMesh.instanceColor.needsUpdate = true
    this.instancedMesh.geometry.getAttribute('instanceWiggle').needsUpdate = true
  }

  public getPerformanceStats() {
    return {
      visibleFishCount: this.visibleFishCount,
      totalFishCount: this.config.maxFishCount,
      isModelLoaded: this.modelLoaded
    }
  }

  public updateMaterial(params: { metalness?: number, roughness?: number, envMapIntensity?: number, emissiveIntensity?: number }): void {
    if (this.material instanceof THREE.MeshStandardMaterial) {
      if (params.metalness !== undefined) this.material.metalness = params.metalness
      if (params.roughness !== undefined) this.material.roughness = params.roughness
      if (params.envMapIntensity !== undefined) this.material.envMapIntensity = params.envMapIntensity
      if (params.emissiveIntensity !== undefined) this.material.emissiveIntensity = params.emissiveIntensity
    }
  }

  public setScale(scale: number): void {
    this.config.scale = scale
  }

  public updateTextureSettings(): void {
    if (this.material instanceof THREE.MeshStandardMaterial) {
      if (this.material.map) this.material.map.anisotropy = 8
      if (this.material.normalMap) this.material.normalMap.anisotropy = 8
    }
  }

  public dispose(): void {
    if (this.instancedMesh) {
      this.scene.remove(this.instancedMesh)
    }
    if (this.geometry) this.geometry.dispose()
    if (this.material) this.material.dispose()
  }
}
