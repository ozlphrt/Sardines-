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

  // Prevent concurrent loads of the same species
  private loadingPromises: Map<string, Promise<SpeciesModel | null>> = new Map()

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
    if (this.loadingPromises.has(key)) return this.loadingPromises.get(key)!

    const loadPromise = (async () => {
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
          material.fog = true // Explicitly enable fog
        }

        const instancedMesh = new THREE.InstancedMesh(geometry, material, this.config.maxFishCount)
        instancedMesh.count = 0 // Start with zero instances to avoid "origin flash"
        instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

        // Initialize all instances with scale zero as a fail-safe
        const zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0)
        for (let i = 0; i < this.config.maxFishCount; i++) {
          instancedMesh.setMatrixAt(i, zeroMatrix)
        }
        instancedMesh.instanceMatrix.needsUpdate = true

        instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.config.maxFishCount * 3), 3)
        instancedMesh.geometry.setAttribute('instanceWiggle', new THREE.InstancedBufferAttribute(new Float32Array(this.config.maxFishCount), 1))
        instancedMesh.geometry.setAttribute('instanceThrust', new THREE.InstancedBufferAttribute(new Float32Array(this.config.maxFishCount), 1))

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
      } finally {
        this.loadingPromises.delete(key)
      }
    })()

    this.loadingPromises.set(key, loadPromise)
    return loadPromise
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
        attribute float instanceThrust;
        ${shader.vertexShader}
      `.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float headZ = 0.84;
        float tailZ = -1.16;
        float tailWeight = smoothstep(0.45, tailZ, position.z);
        float waveNumber = 2.4;
        float spinePhase = instanceWiggle + (position.z - headZ) * waveNumber;
        
        // Stillness factor from thrust (instanceThrust is 0 when still, 0.35 when cruising, up to 1.0 when fast)
        float stillFactor = smoothstep(0.04, 0.18, instanceThrust);
        float vigor = clamp((instanceThrust - 0.25) / 0.75, 0.0, 1.0);
        
        // Biomechanics: wider stroke when slower, narrower when faster
        float slowStroke = 0.40;
        float fastStroke = 0.16;
        float strokeAmp = mix(slowStroke, fastStroke, vigor) * stillFactor;
        float waveDisplacement = sin(spinePhase) * tailWeight * strokeAmp;
        float bodyBend = sin(spinePhase - 0.7) * tailWeight * mix(0.07, 0.025, vigor) * stillFactor;
        
        transformed.x += waveDisplacement + bodyBend;
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
      const scaleVal = r.modelScale * model.baseScale * fishInstance.getSizeFactor()
      this.tempScale.set(scaleVal, scaleVal, scaleVal)

      this.matrix.compose(fishInstance.physics.position, this.tempQuaternion, this.tempScale)
      model.mesh.setMatrixAt(instanceIndex, this.matrix)

      // Write undulation phase and thrust intensity per-instance
      const wiggleAttr = model.mesh.geometry.getAttribute('instanceWiggle') as THREE.InstancedBufferAttribute
      const undulPhase = fishInstance.movement.undulation.phase
      const thrustIntensity = fishInstance.movement.swimCycle.thrustIntensity
      wiggleAttr.setX(instanceIndex, undulPhase)
      const thrustAttr = model.mesh.geometry.getAttribute('instanceThrust') as THREE.InstancedBufferAttribute
      thrustAttr.setX(instanceIndex, thrustIntensity)

      // Base color logic
      const brightness = 0.8 + Math.random() * 0.4
      this.tempColor.setRGB(brightness, brightness, brightness)
      model.mesh.setColorAt(instanceIndex, this.tempColor)

      meshInstances[speciesIndex]++
      this.visibleFishCount++
    }

    // Explicitly zero-scale all unused slots in the buffer to guarantee they are invisible
    // This prevents "dead sardines" at the origin if count culling fails in WebGL
    const zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0)
    speciesMeshes.forEach((model, idx) => {
      const activeCount = meshInstances[idx]
      for (let i = activeCount; i < this.config.maxFishCount; i++) {
        model.mesh.setMatrixAt(i, zeroMatrix)
      }

      model.mesh.count = activeCount
      model.mesh.instanceMatrix.needsUpdate = true
      if (model.mesh.instanceColor) model.mesh.instanceColor.needsUpdate = true
      const wiggleAttr = model.mesh.geometry.getAttribute('instanceWiggle')
      if (wiggleAttr) wiggleAttr.needsUpdate = true
      const thrustAttr = model.mesh.geometry.getAttribute('instanceThrust')
      if (thrustAttr) thrustAttr.needsUpdate = true
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
