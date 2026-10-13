import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlockManager } from './FlockManager.js'
import { FishBehavior } from './Fish.js'
import { FishRenderer } from './FishRenderer.js'
import { GPUFlockManager } from './GPUFlockManager.js'
import { UnderwaterEnvironment, UnderwaterConfig } from './UnderwaterEnvironment.js'
// Wall system removed
import { SeaFloorModel, SeaFloorConfig } from './SeaFloorModel.js'
import { SharkRenderer } from './SharkRenderer.js'
import { useSimulationStore } from '../stores/simulationStore.js'

export interface SceneStats {
  fps: number
  memory: number
  fishCount: number
  averageSpeed: number
  visibleFish: number
  cullingEnabled: boolean
  averageSize: number
  sizeRange: { min: number; max: number }
}

export class SardinesScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private gpuFlockManager: GPUFlockManager | null = null
  private flockManager: FlockManager | null = null
  private fishRenderer: FishRenderer | null = null
  private sharkRenderer: SharkRenderer | null = null
  private underwaterEnvironment: UnderwaterEnvironment | null = null
  // Wall system removed
  private seaFloorModel: SeaFloorModel | null = null
  private swimmableAreaGroup: THREE.Group | null = null

  private isPaused: boolean = false
  private lastTime: number = 0
  private currentCameraMode: string = 'action'

  // Smooth cinematic camera tracking vectors (framerate-independent low-pass filters)
  private smoothCameraPos: THREE.Vector3 = new THREE.Vector3(35, 22, 55)
  private smoothCameraTarget: THREE.Vector3 = new THREE.Vector3(0, 20, 0)
  private smoothForward: THREE.Vector3 = new THREE.Vector3(0, 0, 1)
  private smoothRight: THREE.Vector3 = new THREE.Vector3(1, 0, 0)
  private targetCameraQuaternion: THREE.Quaternion = new THREE.Quaternion()
  private isCameraInitialized: boolean = false

  private frameTimeHistory: number[] = []
  private lastSharkUpdateTime: number = 0

  private raycaster: THREE.Raycaster = new THREE.Raycaster()
  private mouse: THREE.Vector2 = new THREE.Vector2()
  private unsubscribes: (() => void)[] = []
  private lastWhirlpoolTrigger: number = 0

  constructor(container: HTMLElement) {
    // Scene initialization
    this.scene = new THREE.Scene()

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75, // FOV
      container.clientWidth / container.clientHeight,
      0.1, // Near plane
      2000 // Far plane
    )
    this.camera.position.set(35, 22, 55) // Centered on sardine school with dynamic action cam

    // Renderer configuration
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    const initialResScale = useSimulationStore.getState().parameters.rendering?.resolutionScale ?? 1.0
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0) * initialResScale)
    this.renderer.shadowMap.enabled = false // Disable shadows to avoid shader issues

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 20, 0) // Focused on the school
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.04
    this.controls.rotateSpeed = 0.45 // Slower, more cinematic user orbit control
    this.controls.zoomSpeed = 0.55 // Slower, more gradual zoom
    this.controls.panSpeed = 0.55
    this.controls.maxDistance = 200
    this.controls.minDistance = 5

    // Allow looking down to see the floor
    this.controls.maxPolarAngle = Math.PI // Allow full 180 degree rotation
    this.controls.minPolarAngle = 0 // Allow looking straight up
    this.controls.enabled = false // Action cam is default; enabled dynamically in 'default' mode
    this.lastTime = performance.now()



    // Add to container
    container.appendChild(this.renderer.domElement)

    // Setup lighting
    this.setupLighting()

    // Setup environment
    this.setupEnvironment()

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this))

    // Initialize flock manager
    this.initializeFlockManager()

    // Initialize fish renderer
    this.initializeFishRenderer()

    // Initialize shark renderer
    this.sharkRenderer = new SharkRenderer(this.scene)

    // Setup click listener for predator event
    window.addEventListener('click', this.onClick.bind(this))

    // Wall system removed - no walls or grids

    // Initialize sea floor model
    this.initializeSeaFloorModel()

    // Subscribe to store changes for live parameter updates
    this.subscribeToStoreChanges()

    // Subscribe to sea floor parameter changes
    this.subscribeToSeaFloorChanges()
  }

  private onClick(event: MouseEvent): void {
    // Only trigger predator event on Ctrl+Click
    if ((!this.flockManager && !this.gpuFlockManager) || !event.ctrlKey) return

    // Calculate mouse position in normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)

    // Intersect with a horizontal plane at Y=0 (mid-water)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const target = new THREE.Vector3()

    this.raycaster.ray.intersectPlane(plane, target)

    if (target) {
      if (this.flockManager) {
        this.flockManager.triggerPredator(target)
      }

      // Update store for shark renderer
      useSimulationStore.setState({
        predatorVisible: true,
        predatorPosition: { x: target.x, y: target.y, z: target.z }
      })

      // Hide shark after duration (matching bait ball duration)
      const duration = useSimulationStore.getState().parameters.behavior.baitBallDuration * 1000
      setTimeout(() => {
        useSimulationStore.setState({ predatorVisible: false })
      }, duration)
    }
  }

  private setupLighting(): void {
    // 1. Ambient oceanic light (filtered deep blue)
    const ambientLight = new THREE.AmbientLight(0x0a2a4a, 1.0)
    ambientLight.name = 'ambientLight'
    this.scene.add(ambientLight)

    // 2. High-performance Hemisphere light: blends deep water cyan above with warm golden sand bounce below
    // Zero distance attenuation loops, mathematically optimal for 25,000 PBR fish!
    const hemiLight = new THREE.HemisphereLight(0x4fc3f7, 0xe0c088, 1.2)
    hemiLight.name = 'hemiLight'
    this.scene.add(hemiLight)

    // 3. Main directional sunlight through the water surface
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4)
    directionalLight.name = 'mainLight'
    directionalLight.position.set(50, 200, 50)
    directionalLight.castShadow = false
    this.scene.add(directionalLight)

    // 4. Secondary directional fill light
    const fillLight = new THREE.DirectionalLight(0x80deea, 0.6)
    fillLight.name = 'fillLight'
    fillLight.position.set(-60, 100, -60)
    this.scene.add(fillLight)

    // 5. Lateral metallic shine light for glistening sardine scales
    const shineLight = new THREE.DirectionalLight(0xe1f5fe, 0.8)
    shineLight.name = 'shineLight'
    shineLight.position.set(120, 20, 0)
    this.scene.add(shineLight)

    // 6. Upward directional light simulating sand seafloor albedo bounce
    const floorBounce = new THREE.DirectionalLight(0xfff8dc, 0.7)
    floorBounce.name = 'floorBounce'
    floorBounce.position.set(0, -60, 0)
    floorBounce.target.position.set(0, 50, 0)
    this.scene.add(floorBounce)
    this.scene.add(floorBounce.target)

    console.log('Optimized directional & hemisphere lighting setup for maximum 60 FPS performance')
  }

  private initializeFlockManager(): void {
    const bounds = new THREE.Box3(
      new THREE.Vector3(-250, -30, -250),
      new THREE.Vector3(250, 200, 250)
    )

    const storeParams = useSimulationStore.getState().parameters
    const initialFishCount = storeParams.rendering.fishCount

    // Initialize high-performance GPU Flock Manager (supports up to 65,536 fish at 60 FPS)
    this.gpuFlockManager = new GPUFlockManager(this.renderer, this.scene, {
      bounds,
      maxFishCount: 65536,
      initialCount: initialFishCount
    })

    // Add swimmable area helper visualization
    this.swimmableAreaGroup = new THREE.Group()

    const width = bounds.max.x - bounds.min.x
    const height = bounds.max.y - bounds.min.y
    const depth = bounds.max.z - bounds.min.z
    const geometry = new THREE.BoxGeometry(width, height, depth)

    const center = new THREE.Vector3()
    bounds.getCenter(center)

    // Wireframe outline
    const edges = new THREE.EdgesGeometry(geometry)
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 0.3, transparent: true })
    const line = new THREE.LineSegments(edges, wireframeMaterial)
    line.position.copy(center)

    // Light transparent fill
    const fillMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.02,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    const fillMesh = new THREE.Mesh(geometry, fillMaterial)
    fillMesh.position.copy(center)

    this.swimmableAreaGroup.add(line)
    this.swimmableAreaGroup.add(fillMesh)
    this.swimmableAreaGroup.visible = storeParams.walls.showSwimmableArea

    this.scene.add(this.swimmableAreaGroup)
  }

  private initializeFishRenderer(): void {
    // GPUFlockManager directly handles ultra high capacity instanced rendering on the GPU
  }

  private initializeUnderwaterEnvironment(): void {
    const config: UnderwaterConfig = {
      rayCount: 40,
      rayRadius: 25,
      rayHeight: 350,
      rayOpacity: 0.035 // Halved intensity to make them more subtle
    }

    this.underwaterEnvironment = new UnderwaterEnvironment(this.scene, config)
  }

  private setupEnvironment(): void {
    const r = useSimulationStore.getState().parameters.rendering

    // Natural underwater background color - darkened as requested
    const fogColor = new THREE.Color(r.fogColor || 0x081621)
    this.scene.background = fogColor

    // Add distance-based fog
    this.scene.fog = new THREE.FogExp2(fogColor, r.fogDensity || 0.012)

    // Create a procedural high-quality environment map
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    pmremGenerator.compileEquirectangularShader()

    // Create a procedural "sky" texture
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 64
    const context = canvas.getContext('2d')
    if (context) {
      const gradient = context.createLinearGradient(0, 0, 0, 64)
      gradient.addColorStop(0, '#ffffff')   // Bright surface
      gradient.addColorStop(0.5, '#4facfe') // Mid blue
      gradient.addColorStop(1, '#1a3d5c')   // Dark deep
      context.fillStyle = gradient
      context.fillRect(0, 0, 128, 64)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.mapping = THREE.EquirectangularReflectionMapping

    this.scene.environment = pmremGenerator.fromEquirectangular(texture).texture

    // CRITICAL: Initialize the underwater environment (including sand floor)
    this.initializeUnderwaterEnvironment()
  }

  // Wall system removed - no walls or grids

  private initializeSeaFloorModel(): void {
    const store = useSimulationStore.getState()
    const seaFloorParams = store.parameters.seaFloor

    const seaFloorConfig: SeaFloorConfig = {
      enabled: seaFloorParams.enabled,
      scale: seaFloorParams.scale,
      position: new THREE.Vector3(seaFloorParams.positionX, seaFloorParams.positionY, seaFloorParams.positionZ),
      rotation: new THREE.Euler(seaFloorParams.rotationX, seaFloorParams.rotationY, seaFloorParams.rotationZ),
      receiveShadows: seaFloorParams.receiveShadows,
      castShadows: seaFloorParams.castShadows
    }

    this.seaFloorModel = new SeaFloorModel(this.scene, seaFloorConfig)

    // Load the model asynchronously if enabled
    if (seaFloorParams.enabled) {
      this.seaFloorModel.loadModel().then(() => {
        console.log('🌊 Sea floor model loaded and added to scene')
      }).catch((error) => {
        console.error('❌ Failed to load sea floor model:', error)
      })
    }
  }

  private handleResize(): void {
    const container = this.renderer.domElement.parentElement
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const resScale = useSimulationStore.getState().parameters.rendering?.resolutionScale ?? 1.0
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0) * resScale)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  private elapsedTime: number = 0

  public update(): void {
    if (this.isPaused) return

    const currentTime = performance.now()
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.05) // Cap at 20fps for physics stability
    this.lastTime = currentTime
    this.elapsedTime += deltaTime

    // 1. Update shark pack renderer (Apex leader + 2 flankers)
    let predatorPositions: THREE.Vector3[] = []
    if (this.sharkRenderer) {
      const state = useSimulationStore.getState()

      // Handle visibility (Permanent OR predator event)
      const isSharkVisible = state.sharkVisible || state.predatorVisible
      this.sharkRenderer.setVisibility(isSharkVisible)

      if (state.sharkVisible && !state.predatorVisible && state.sharkPatrol) {
        // PERMANENT SHARK HUNTING: Seek largest & nearest schools of sardines
        // Evaluate every ~0.5s for responsive predatory tracking
        if (this.elapsedTime - this.lastSharkUpdateTime > 0.5) {
          this.lastSharkUpdateTime = this.elapsedTime

          for (let i = 0; i < 3; i++) {
            const sharkPos = this.sharkRenderer.getSharkPosition(i)
            let huntTarget: THREE.Vector3 | null = null

            if (this.gpuFlockManager) {
              const res = this.gpuFlockManager.getBestHuntTarget(sharkPos)
              huntTarget = res.target
            } else if (this.flockManager) {
              huntTarget = this.flockManager.getHuntTarget(sharkPos)
            }

            if (huntTarget) {
              // Direct pursuit of school centroid with natural predatory weave
              const wanderX = Math.sin(this.elapsedTime * 0.6 + i * 2.1) * 3.5
              const wanderY = Math.cos(this.elapsedTime * 0.4 + i * 1.7) * 1.8
              const targetWithWander = huntTarget.clone().add(new THREE.Vector3(wanderX, wanderY, 0))
              this.sharkRenderer.setSharkTarget(i, targetWithWander)
            }
          }
        }
      } else if (state.predatorVisible) {
        // Controlled by predator event (mouse click)
        const pos = state.predatorPosition
        this.sharkRenderer.setPosition(new THREE.Vector3(pos.x, pos.y, pos.z))
      }

      this.sharkRenderer.update(deltaTime)

      if (isSharkVisible) {
        predatorPositions = this.sharkRenderer.getPositions()
      }
    }

    // 2. Update flock manager (GPU or CPU fallback) with all active shark positions
    if (this.gpuFlockManager) {
      this.gpuFlockManager.update(deltaTime, predatorPositions)
    } else if (this.flockManager) {
      const leadSharkPos = predatorPositions.length > 0 ? predatorPositions[0] : null
      this.flockManager.update(deltaTime, leadSharkPos)

      if (this.fishRenderer) {
        const fish = this.flockManager.getFish()
        this.fishRenderer.updateFish(fish)
      }
    }

    // 3. Update underwater environment
    if (this.underwaterEnvironment) {
      this.underwaterEnvironment.update(deltaTime)
    }

    // Wall system removed - no walls or grids

    // Update special cameras (follow/action/single-fish modes) with framerate-independent damping
    this.updateSpecialCameras(deltaTime)

    // Record frame time for FPS calculation
    const frameTime = deltaTime * 1000
    this.frameTimeHistory.push(frameTime)
    if (this.frameTimeHistory.length > 60) {
      this.frameTimeHistory.shift()
    }

    // Render scene
    this.renderer.render(this.scene, this.camera)
  }

  public updateParameters(parameters: any): void {
    if (this.gpuFlockManager) {
      this.gpuFlockManager.updateParameters(parameters)
    }
    if (this.flockManager) {
      // Update behavior parameters
      if (parameters.behavior) {
        this.flockManager.updateBehavior(parameters.behavior)
      }

      // Update flock configuration
      if (parameters.flock) {
        this.flockManager.updateConfig(parameters.flock)
      }
    }

    if (this.fishRenderer) {
      // Update rendering parameters
      if (parameters.rendering) {
        if (parameters.rendering.fishCount !== undefined) {
          this.flockManager?.setFishCount(parameters.rendering.fishCount)
        }
      }
    }
  }

  public setPaused(paused: boolean): void {
    this.isPaused = paused
    if (this.flockManager) {
      this.flockManager.setPaused(paused)
    }
  }

  public updateCamera(_cameraState: { position: { x: number; y: number; z: number }; target: { x: number; y: number; z: number } }): void {
    // Get the current camera preset from the store to determine mode
    const { ui } = useSimulationStore.getState()
    const selectedPreset = ui.selectedCameraPreset || 'default'
    this.currentCameraMode = selectedPreset

    if (selectedPreset === 'default') {
      this.controls.enabled = true
    } else {
      this.controls.enabled = false
    }

    // Blend smoothly from the current camera transform into the new preset
    this.smoothCameraPos.copy(this.camera.position)
    this.smoothCameraTarget.copy(this.controls.target)
    this.targetCameraQuaternion.copy(this.camera.quaternion)
  }

  private updateSpecialCameras(deltaTime: number): void {
    let flockCenter = new THREE.Vector3(0, 15, 0)
    let flockVelocity = new THREE.Vector3(0, 0, 1)

    if (this.gpuFlockManager) {
      flockCenter = this.gpuFlockManager.getFlockCenter()
      flockVelocity = this.gpuFlockManager.getFlockVelocity()
    } else if (this.flockManager) {
      const fish = this.flockManager.getFish()
      if (fish.length > 0) {
        flockCenter = new THREE.Vector3()
        flockVelocity = new THREE.Vector3()
        fish.forEach(f => {
          flockCenter.add(f.physics.position)
          flockVelocity.add(f.physics.velocity)
        })
        flockCenter.divideScalar(fish.length)
        flockVelocity.divideScalar(fish.length)
      }
    }

    // Filter forward direction with slow, framerate-independent decay to eliminate coordinate frame shudder
    const rawForward = flockVelocity.lengthSq() > 0.001
      ? flockVelocity.clone().normalize()
      : new THREE.Vector3(0, 0, 1)
    
    const forwardDamp = 1.0 - Math.exp(-1.2 * deltaTime)
    this.smoothForward.lerp(rawForward, forwardDamp).normalize()

    const worldUp = new THREE.Vector3(0, 1, 0)
    const rawRight = new THREE.Vector3().crossVectors(this.smoothForward, worldUp).normalize()
    if (rawRight.lengthSq() < 0.01) rawRight.set(1, 0, 0)
    this.smoothRight.lerp(rawRight, forwardDamp).normalize()

    // 1. FREE ORBIT OVERVIEW MODE
    if (this.currentCameraMode === 'default') {
      this.controls.enabled = true
      
      // Gently translate both controls target and camera position equally with slow, smooth pace
      const deltaCenter = flockCenter.clone().sub(this.controls.target)
      const damp = 1.0 - Math.exp(-0.8 * deltaTime)
      const translation = deltaCenter.multiplyScalar(damp)
      
      this.controls.target.add(translation)
      this.camera.position.add(translation)
      this.controls.update()
      return
    }

    // 2. SPECIAL CINEMATIC PRESETS
    this.controls.enabled = false

    let desiredPosition = new THREE.Vector3()
    let desiredTarget = new THREE.Vector3()

    if (this.currentCameraMode === 'follow') {
      // School Follow Orbit: Slow, majestic trailing behind the school
      const swellX = Math.sin(this.elapsedTime * 0.08) * 1.5
      desiredPosition = flockCenter.clone()
        .sub(this.smoothForward.clone().multiplyScalar(75))
        .add(this.smoothRight.clone().multiplyScalar(swellX))
        .add(new THREE.Vector3(0, 28, 0))
      desiredTarget = flockCenter.clone().add(this.smoothForward.clone().multiplyScalar(12))

    } else if (this.currentCameraMode === 'action') {
      // Dynamic Action Cam: 3/4 leading quarter angle, looking into the approaching school
      // Slow, hypnotic oceanic swell (0.1 rad/s period of ~60s)
      const swellX = Math.sin(this.elapsedTime * 0.1) * 2.0
      const swellY = Math.sin(this.elapsedTime * 0.14) * 1.0
      desiredPosition = flockCenter.clone()
        .add(this.smoothForward.clone().multiplyScalar(50))
        .add(this.smoothRight.clone().multiplyScalar(34 + swellX))
        .add(new THREE.Vector3(0, 20 + swellY, 0))
      desiredTarget = flockCenter.clone().add(this.smoothForward.clone().multiplyScalar(6))

    } else if (this.currentCameraMode === 'dolly-cam') {
      // Broadside Dolly: Slow side-profile tracking
      const swellY = Math.sin(this.elapsedTime * 0.12) * 1.0
      desiredPosition = flockCenter.clone()
        .add(this.smoothRight.clone().multiplyScalar(68))
        .add(new THREE.Vector3(0, 16 + swellY, 0))
      desiredTarget = flockCenter.clone()

    } else if (this.currentCameraMode === 'single-fish') {
      // Single Sardine Focus: Companion close camera
      const bobY = Math.sin(this.elapsedTime * 0.5) * 0.2
      desiredPosition = flockCenter.clone()
        .sub(this.smoothForward.clone().multiplyScalar(14))
        .add(this.smoothRight.clone().multiplyScalar(6))
        .add(new THREE.Vector3(0, 3.8 + bobY, 0))
      desiredTarget = flockCenter.clone().add(this.smoothForward.clone().multiplyScalar(5))

    } else if (this.currentCameraMode === 'close') {
      // Close School Inspection: Tight macro view
      desiredPosition = flockCenter.clone()
        .sub(this.smoothForward.clone().multiplyScalar(8))
        .add(this.smoothRight.clone().multiplyScalar(4))
        .add(new THREE.Vector3(0, 2.2, 0))
      desiredTarget = flockCenter.clone().add(this.smoothForward.clone().multiplyScalar(3))
    } else {
      desiredPosition = flockCenter.clone().add(new THREE.Vector3(80, 35, 75))
      desiredTarget = flockCenter.clone()
    }

    // On initial spawn, snap smoothly to the starting preset position to prevent wild initial travel
    if (!this.isCameraInitialized) {
      this.smoothCameraPos.copy(desiredPosition)
      this.smoothCameraTarget.copy(desiredTarget)
      this.camera.position.copy(desiredPosition)
      this.controls.target.copy(desiredTarget)
      this.camera.lookAt(desiredTarget)
      this.targetCameraQuaternion.copy(this.camera.quaternion)
      this.isCameraInitialized = true
      return
    }

    // Slow, stately exponential damping on camera position
    const posDamp = 1.0 - Math.exp(-1.2 * deltaTime)
    this.smoothCameraPos.lerp(desiredPosition, posDamp)
    this.camera.position.copy(this.smoothCameraPos)

    // Slow, stately exponential damping on look-at target
    const targetDamp = 1.0 - Math.exp(-1.5 * deltaTime)
    this.smoothCameraTarget.lerp(desiredTarget, targetDamp)
    this.controls.target.copy(this.smoothCameraTarget)

    // Slow, cinematic spherical geodesic rotation smoothing (quaternion slerp)
    const rotMatrix = new THREE.Matrix4()
    rotMatrix.lookAt(this.camera.position, this.smoothCameraTarget, worldUp)
    this.targetCameraQuaternion.setFromRotationMatrix(rotMatrix)

    const rotDamp = 1.0 - Math.exp(-1.8 * deltaTime)
    this.camera.quaternion.slerp(this.targetCameraQuaternion, rotDamp)
  }

  public getStats(): SceneStats {
    const averageFrameTime = this.frameTimeHistory.reduce((sum, time) => sum + time, 0) / this.frameTimeHistory.length
    const fps = averageFrameTime > 0 ? 1000 / averageFrameTime : 0

    if (this.gpuFlockManager) {
      const gpuStats = this.gpuFlockManager.getStats()
      return {
        fps: Math.round(fps),
        memory: Math.round((performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0),
        fishCount: gpuStats.fishCount,
        averageSpeed: gpuStats.averageSpeed,
        visibleFish: gpuStats.visibleFish,
        cullingEnabled: false,
        averageSize: gpuStats.averageSize,
        sizeRange: gpuStats.sizeRange
      }
    }

    const flockStats = this.flockManager?.getStats()
    const rendererStats = this.fishRenderer?.getPerformanceStats()

    return {
      fps: Math.round(fps),
      memory: Math.round((performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0),
      fishCount: flockStats?.activeFish || 0,
      averageSpeed: flockStats?.averageSpeed || 0,
      visibleFish: rendererStats?.visibleFishCount || 0,
      cullingEnabled: true,
      averageSize: flockStats?.averageSize || 1.0,
      sizeRange: flockStats?.sizeRange || { min: 1.0, max: 1.0 }
    }
  }

  public getFlockManager(): FlockManager | null {
    return this.flockManager
  }

  /**
   * Subscribe to store changes for live parameter updates
   */
  private subscribeToStoreChanges(): void {
    let lastParameters = useSimulationStore.getState().parameters
    let lastWhirlpoolTrigger = useSimulationStore.getState().whirlpoolTrigger

    // Subscribe to store changes to update fish behavior in real-time
    const unsub = useSimulationStore.subscribe((state) => {
      // Skip if parameters haven't changed and whirlpool wasn't triggered
      if (state.parameters === lastParameters && state.whirlpoolTrigger === lastWhirlpoolTrigger) {
        return
      }
      lastParameters = state.parameters
      lastWhirlpoolTrigger = state.whirlpoolTrigger

      if (this.gpuFlockManager) {
        this.gpuFlockManager.updateParameters(state.parameters)
        if (state.whirlpoolTrigger && state.whirlpoolTrigger !== this.lastWhirlpoolTrigger) {
          this.lastWhirlpoolTrigger = state.whirlpoolTrigger
          this.gpuFlockManager.triggerWhirlpool()
        }
      }

      if (this.sharkRenderer && state.parameters.behavior.sharkScale !== undefined) {
        this.sharkRenderer.setScale(state.parameters.behavior.sharkScale)
      }

      if (this.flockManager) {
        // Convert store parameters to Fish behavior format
        const fishBehavior: FishBehavior = { ...state.parameters.behavior }

        // Update all fish with new behavior parameters
        this.flockManager.updateBehavior(fishBehavior)

        // Update fish count if changed
        if (state.parameters.rendering.fishCount !== undefined) {
          this.flockManager.setFishCount(state.parameters.rendering.fishCount)
        }
      }

      if (this.fishRenderer) {
        // Update lighting intensity and material properties real-time
        if (state.parameters.rendering) {
          const r = state.parameters.rendering
          this.fishRenderer.updateMaterial({
            metalness: r.metalness,
            roughness: r.roughness,
            envMapIntensity: r.envMapIntensity,
            emissiveIntensity: r.emissiveIntensity
          })

          if (r.lightingIntensity !== undefined) {
            const mainLight = this.scene.getObjectByName('mainLight') as THREE.DirectionalLight
            if (mainLight) mainLight.intensity = r.lightingIntensity * 1.2
            const fillLight = this.scene.getObjectByName('fillLight') as THREE.DirectionalLight
            if (fillLight) fillLight.intensity = r.lightingIntensity * 0.5
          }

          // Update fog real-time
          if (r.fogColor !== undefined || r.fogDensity !== undefined) {
            const fogColor = new THREE.Color(r.fogColor)
            this.scene.background = fogColor
            if (this.scene.fog instanceof THREE.FogExp2) {
              this.scene.fog.color = fogColor
              this.scene.fog.density = r.fogDensity
            }
          }

          // Update blue filter real-time - Enhanced for dramatic impact on ALL actors
          if (r.blueFilterIntensity !== undefined) {
            const ambientLight = this.scene.getObjectByName('ambientLight') as THREE.AmbientLight
            const mainLight = this.scene.getObjectByName('mainLight') as THREE.DirectionalLight

            if (ambientLight) {
              // Increase ambient intensity to maintain visibility in the blue tint
              ambientLight.intensity = 0.5 + r.blueFilterIntensity * 0.8 / 1.0

              // Shift from a light blue to a very deep, dark oceanic blue
              const baseColor = new THREE.Color(0x0a2a4a)
              const deepColor = new THREE.Color(0x020810)
              ambientLight.color.copy(baseColor).lerp(deepColor, Math.min(r.blueFilterIntensity, 1.0))
            }

            if (mainLight) {
              // Sunlight attenuation: deeper water = less direct sun
              mainLight.intensity = Math.max(0.1, 1.5 - (r.blueFilterIntensity * 1.0))
            }

            // Sync fog with filtering intensity for a thicker look
            if (this.scene.fog instanceof THREE.FogExp2) {
              const fogBaseColor = new THREE.Color(r.fogColor)
              const fogDeepColor = new THREE.Color(0x010408)
              this.scene.fog.color.copy(fogBaseColor).lerp(fogDeepColor, Math.min(r.blueFilterIntensity * 0.7, 1.0))
              this.scene.background = this.scene.fog.color.clone()

              // Boost density slightly as we "filter" more light
              this.scene.fog.density = r.fogDensity * (1.0 + r.blueFilterIntensity * 0.5)
            }

            // CRITICAL: Dampen emissive intensity of actors as we go deeper
            const actorEmissiveMult = Math.max(0.05, 1.0 - r.blueFilterIntensity * 0.7)

            if (this.fishRenderer) {
              this.fishRenderer.updateMaterial({
                metalness: r.metalness,
                roughness: r.roughness,
                envMapIntensity: r.envMapIntensity,
                emissiveIntensity: r.emissiveIntensity * actorEmissiveMult
              })
            }
            if (this.sharkRenderer) {
              this.sharkRenderer.updateEmissive(actorEmissiveMult * 0.5) // Shark has lower base emissive
            }
          }

          // Handle Species switching
          if (r.selectedSpecies !== undefined) {
            if ((this as any)._currentSpecies !== r.selectedSpecies) {
              (this as any)._currentSpecies = r.selectedSpecies
              if (this.fishRenderer) {
                this.fishRenderer.switchSpecies(r.selectedSpecies)
              }
            }
          }

          // Handle live resolution scaling
          if (r.resolutionScale !== undefined && (this as any)._lastResolutionScale !== r.resolutionScale) {
            (this as any)._lastResolutionScale = r.resolutionScale
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0) * r.resolutionScale)
          }
        }
      }

      // Update particles real-time
      if (this.underwaterEnvironment && state.parameters.rendering) {
        const r = state.parameters.rendering
        if (r.particleCount !== undefined && (this as any)._lastParticleCount !== r.particleCount) {
          (this as any)._lastParticleCount = r.particleCount
          this.underwaterEnvironment.updateParticleCount(r.particleCount, r.particleOpacity)
        } else if (r.particleOpacity !== undefined) {
          this.underwaterEnvironment.updateParticleOpacity(r.particleOpacity)
        }
      }

      // Sync shark state (visibility, scale, predator click)
      if (this.sharkRenderer) {
        const isSharkVisible = state.sharkVisible || state.predatorVisible
        this.sharkRenderer.setVisibility(isSharkVisible)
        if (state.parameters.behavior.sharkScale) {
          this.sharkRenderer.setScale(state.parameters.behavior.sharkScale)
        }
        if (state.predatorVisible) {
          const pos = state.predatorPosition
          this.sharkRenderer.setPosition(new THREE.Vector3(pos.x, pos.y, pos.z))
        }
      }

      // Update Swimmable Area Box visibility
      if (this.swimmableAreaGroup && state.parameters.walls.showSwimmableArea !== undefined) {
        this.swimmableAreaGroup.visible = state.parameters.walls.showSwimmableArea
      }
    })
    this.unsubscribes.push(unsub)
  }

  /**
   * Subscribe to sea floor parameter changes
   */
  private subscribeToSeaFloorChanges(): void {
    const unsub = useSimulationStore.subscribe((state) => {
      if (this.seaFloorModel && state.parameters.seaFloor) {
        const seaFloorParams = state.parameters.seaFloor

        // Update sea floor configuration
        const seaFloorConfig: SeaFloorConfig = {
          enabled: seaFloorParams.enabled,
          scale: seaFloorParams.scale,
          position: new THREE.Vector3(seaFloorParams.positionX, seaFloorParams.positionY, seaFloorParams.positionZ),
          rotation: new THREE.Euler(seaFloorParams.rotationX, seaFloorParams.rotationY, seaFloorParams.rotationZ),
          receiveShadows: seaFloorParams.receiveShadows,
          castShadows: seaFloorParams.castShadows
        }

        this.seaFloorModel.updateConfig(seaFloorConfig)

        // Load or unload model based on enabled state
        if (seaFloorParams.enabled && !this.seaFloorModel.getModel()) {
          this.seaFloorModel.loadModel()
        } else if (!seaFloorParams.enabled && this.seaFloorModel.getModel()) {
          this.seaFloorModel.dispose()
        }
      }
    })
    this.unsubscribes.push(unsub)
  }

  /**
   * Comprehensive cleanup to prevent ghost simulations
   */
  public dispose(): void {
    console.log('SardinesScene: Disposing resources...')

    // 1. Unsubscribe from store changes
    this.unsubscribes.forEach(unsub => unsub())
    this.unsubscribes = []

    // 2. Clear simulation logic
    if (this.gpuFlockManager) {
      this.gpuFlockManager.dispose()
      this.gpuFlockManager = null
    }
    if (this.flockManager) {
      this.flockManager.dispose()
      this.flockManager = null
    }

    // 3. Cleanup Renderers
    if (this.fishRenderer) {
      this.fishRenderer.dispose()
      this.fishRenderer = null
    }
    if (this.sharkRenderer) {
      this.sharkRenderer.dispose()
      this.sharkRenderer = null
    }
    if (this.underwaterEnvironment) {
      this.underwaterEnvironment.dispose()
      this.underwaterEnvironment = null
    }
    if (this.seaFloorModel) {
      this.seaFloorModel.dispose()
      this.seaFloorModel = null
    }

    // 4. Dispose Scene Objects
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose())
          } else {
            object.material.dispose()
          }
        }
      }
    })

    // 5. Cleanup Three.js Core
    if (this.controls) {
      this.controls.dispose()
    }

    if (this.renderer) {
      this.renderer.dispose()
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
      }
    }

    // 6. Signal animation loop to stop
    this.isPaused = true
  }
}
