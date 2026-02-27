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

interface SpeciesModel {
  geometry: THREE.BufferGeometry
  material: THREE.Material
  mesh: THREE.InstancedMesh
  baseScale: number
  loaded: boolean
}

export class FishRenderer {
  private scene: THREE.Scene
  private species: Map<string, SpeciesModel> = new Map()
  private currentSpeciesKey: string = 'sardine'
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
    const initialSpecies = useSimulationStore.getState().parameters.rendering.selectedSpecies || 'sardine'
    this.switchSpecies(initialSpecies)
  }

  /**
   * Switch the fish species model or enable 'mixed' mode
   */
  public async switchSpecies(speciesKey: string): Promise<void> {
    console.log(`FishRenderer: Switching to ${speciesKey}`)
    this.currentSpeciesKey = speciesKey

    // Hide all existing meshes first
    this.species.forEach(s => {
      s.mesh.visible = false
    })

    if (speciesKey === 'mixed') {
      await Promise.all([
        this.getOrLoadSpecies('sardine'),
        this.getOrLoadSpecies('tropical'),
        this.getOrLoadSpecies('school')
      ])
      this.species.forEach(s => s.mesh.visible = true)
    } else {
      const s = await this.getOrLoadSpecies(speciesKey)
      if (s) s.mesh.visible = true
    }
  }

  private async getOrLoadSpecies(key: string): Promise<SpeciesModel | null> {
    if (this.species.has(key)) return this.species.get(key)!

    try {
      const loader = new GLTFLoader()
      const basePath = (import.meta as any).env.BASE_URL || '/'

      let modelDir = ''
      let baseScale = 1.0

      switch (key) {
        case 'tropical':
          modelDir = 'models/animated_swimming_tropical_fish_school_loop/'
          baseScale = 0.0012 // Reduced from 0.003 to match sardine size better
          break
        case 'school':
          modelDir = 'models/school_of_fish/'
          baseScale = 0.0012 // Reduced from 0.003 to match sardine size better
          break
        case 'sardine':
        default:
          modelDir = 'assets/fish-model/'
          baseScale = 1.0
          break
      }

      loader.setPath(`${basePath}${modelDir}`)
      const gltf = await loader.loadAsync('scene.gltf')

      let fishMesh: THREE.Mesh | null = null
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && !fishMesh) fishMesh = child
      })

      if (!fishMesh) throw new Error(`No mesh found for ${key}`)

      const geometry = (fishMesh as THREE.Mesh).geometry.clone()
      const originalMaterial = (fishMesh as THREE.Mesh).material
      const material = Array.isArray(originalMaterial) ? originalMaterial[0].clone() : originalMaterial.clone()

      if (material instanceof THREE.MeshStandardMaterial) {
        const r = useSimulationStore.getState().parameters.rendering
        material.side = THREE.DoubleSide
        material.metalness = r.metalness
        material.roughness = r.roughness
        material.envMapIntensity = r.envMapIntensity
        material.emissive.setHex(key === 'sardine' ? 0xADDEFF : 0x000000)
        material.emissiveIntensity = r.emissiveIntensity
      }

      const instancedMesh = new THREE.InstancedMesh(geometry, material, this.config.maxFishCount)
      instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.config.maxFishCount * 3), 3)
      instancedMesh.geometry.setAttribute('instanceWiggle', new THREE.InstancedBufferAttribute(new Float32Array(this.config.maxFishCount), 1))

      this.setupCustomShader(material)

      instancedMesh.frustumCulled = this.config.enableFrustumCulling
      instancedMesh.castShadow = this.config.enableShadows
      instancedMesh.receiveShadow = this.config.enableShadows
      instancedMesh.visible = false // Start hidden

      this.scene.add(instancedMesh)

      const speciesModel: SpeciesModel = {
        geometry,
        material,
        mesh: instancedMesh,
        baseScale,
        loaded: true
      }

      this.species.set(key, speciesModel)
      this.updateTextureSettings(material)

      return speciesModel
    } catch (error) {
      console.error(`FishRenderer: Failed to load ${key}:`, error)
      return null
    }
  }

  public setCamera(_camera: THREE.Camera): void {
    // Kept for interface compatibility
  }

  public isLoaded(): boolean {
    let anyLoaded = false
    this.species.forEach(s => { if (s.loaded) anyLoaded = true })
    return anyLoaded
  }

  private setupCustomShader(material: THREE.Material): void {
    material.onBeforeCompile = (shader) => {
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
        float waveIntensity = tailWeight * tailWeight * 0.15;
        transformed.x += sin(instanceWiggle) * waveIntensity;
        `
      )
      material.userData.shader = shader
    }
    material.needsUpdate = true
  }

  public updateFish(fish: Fish[]): void {
    const totalCount = Math.min(fish.length, this.config.maxFishCount)
    this.visibleFishCount = 0

    const r = useSimulationStore.getState().parameters.rendering
    const speciesKeys = this.currentSpeciesKey === 'mixed'
      ? ['sardine', 'tropical', 'school']
      : [this.currentSpeciesKey]

    // Initialize counts for each mesh
    const speciesMeshes = speciesKeys.map(k => this.species.get(k)).filter(m => !!m) as SpeciesModel[]
    if (speciesMeshes.length === 0) return

    // Distribution logic
    const speciesCount = speciesMeshes.length
    const meshInstances = speciesMeshes.map(() => 0)

    for (let i = 0; i < totalCount; i++) {
      const fishInstance = fish[i]
      const speciesIndex = i % speciesCount
      const model = speciesMeshes[speciesIndex]
      const instanceIndex = meshInstances[speciesIndex]

      this.tempQuaternion.setFromEuler(fishInstance.physics.rotation)
      const scaleVal = r.modelScale * model.baseScale
      this.tempScale.set(scaleVal, scaleVal, scaleVal)

      this.matrix.compose(fishInstance.physics.position, this.tempQuaternion, this.tempScale)
      model.mesh.setMatrixAt(instanceIndex, this.matrix)

      const wiggleAttr = model.mesh.geometry.getAttribute('instanceWiggle') as THREE.InstancedBufferAttribute
      wiggleAttr.setX(instanceIndex, fishInstance.getUndulationPhase())

      // Base color logic
      const brightness = 0.8 + Math.random() * 0.4
      this.tempColor.setRGB(brightness, brightness, brightness)
      model.mesh.setColorAt(instanceIndex, this.tempColor)

      meshInstances[speciesIndex]++
      this.visibleFishCount++
    }

    // Update meshes and set effective count
    speciesMeshes.forEach((model, idx) => {
      model.mesh.count = meshInstances[idx]
      model.mesh.instanceMatrix.needsUpdate = true
      if (model.mesh.instanceColor) model.mesh.instanceColor.needsUpdate = true
      const wiggleAttr = model.mesh.geometry.getAttribute('instanceWiggle')
      if (wiggleAttr) wiggleAttr.needsUpdate = true
    })
  }

  public getPerformanceStats() {
    let isAnyLoaded = false
    this.species.forEach(s => { if (s.loaded) isAnyLoaded = true })

    return {
      visibleFishCount: this.visibleFishCount,
      totalFishCount: this.config.maxFishCount,
      isModelLoaded: isAnyLoaded
    }
  }

  public updateMaterial(params: { metalness?: number, roughness?: number, envMapIntensity?: number, emissiveIntensity?: number }): void {
    this.species.forEach(s => {
      if (s.material instanceof THREE.MeshStandardMaterial) {
        if (params.metalness !== undefined) s.material.metalness = params.metalness
        if (params.roughness !== undefined) s.material.roughness = params.roughness
        if (params.envMapIntensity !== undefined) s.material.envMapIntensity = params.envMapIntensity
        if (params.emissiveIntensity !== undefined) s.material.emissiveIntensity = params.emissiveIntensity
      }
    })
  }

  public updateAllTextureSettings(): void {
    this.species.forEach(s => this.updateTextureSettings(s.material))
  }

  public updateTextureSettings(material: THREE.Material): void {
    if (material instanceof THREE.MeshStandardMaterial) {
      if (material.map) material.map.anisotropy = 8
      if (material.normalMap) material.normalMap.anisotropy = 8
    }
  }

  public dispose(): void {
    this.species.forEach(s => {
      this.scene.remove(s.mesh)
      if (s.geometry) s.geometry.dispose()
      if (s.material) s.material.dispose()
    })
    this.species.clear()
  }
}
