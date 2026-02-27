import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlockManager, FlockConfig } from './FlockManager.js'
import { FishBehavior } from './Fish.js'
import { FishRenderer, FishRenderConfig } from './FishRenderer.js'
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
  private flockManager: FlockManager | null = null
  private fishRenderer: FishRenderer | null = null
  private sharkRenderer: SharkRenderer | null = null
  private underwaterEnvironment: UnderwaterEnvironment | null = null
  // Wall system removed
  private seaFloorModel: SeaFloorModel | null = null
  private swimmableAreaGroup: THREE.Group | null = null

  private isPaused: boolean = false
  private lastTime: number = 0
  private currentCameraMode: string = 'default'
  // Camera target for future camera controls
  // private cameraTargetPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  private cameraLerpFactor: number = 0.02

  private frameTimeHistory: number[] = []

  private raycaster: THREE.Raycaster = new THREE.Raycaster()
  private mouse: THREE.Vector2 = new THREE.Vector2()

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
    this.camera.position.set(0, 5, 40) // Higher camera position to see sand floor clearly

    // Renderer configuration
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = false // Disable shadows to avoid shader issues

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.maxDistance = 200
    this.controls.minDistance = 5

    // Allow looking down to see the floor
    this.controls.maxPolarAngle = Math.PI // Allow full 180 degree rotation
    this.controls.minPolarAngle = 0 // Allow looking straight up



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

    // Initialize underwater environment
    this.initializeUnderwaterEnvironment()

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
    if (!this.flockManager || !event.ctrlKey) return

    // Calculate mouse position in normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)

    // Intersect with a horizontal plane at Y=0 (mid-water)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const target = new THREE.Vector3()

    this.raycaster.ray.intersectPlane(plane, target)

    if (target) {
      this.flockManager.triggerPredator(target)

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
    // Enhanced underwater lighting for realistic sardine visibility and sand floor
    const ambientLight = new THREE.AmbientLight(0x87CEEB, 0.8) // Brighter sky blue ambient for underwater feel
    this.scene.add(ambientLight)

    // Main directional light (sunlight through water)
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2)
    directionalLight.name = 'mainLight'
    directionalLight.position.set(50, 200, 50)
    directionalLight.castShadow = false
    this.scene.add(directionalLight)

    // Secondary fill light
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.5)
    fillLight.name = 'fillLight'
    fillLight.position.set(-50, 100, -50)
    this.scene.add(fillLight)

    // Additional light to enhance sardine metallic shine - ENHANCED for maximum metallic impact
    const shineLight = new THREE.DirectionalLight(0xE6F3FF, 0.7) // Increased intensity for dramatic metallic highlights
    shineLight.position.set(100, 0, 0) // Side lighting for metallic highlights
    this.scene.add(shineLight)

    // Enhanced bottom light for better sand floor visibility
    const bottomLight = new THREE.DirectionalLight(0xFFFACD, 0.8) // Brighter warm light
    bottomLight.position.set(0, 50, 0) // Much closer to illuminate floor better
    bottomLight.target.position.set(0, -45, 0) // Target the deeper sand floor
    this.scene.add(bottomLight)
    this.scene.add(bottomLight.target)

    // Additional point light near the floor for sand texture visibility
    const floorLight = new THREE.PointLight(0xFFFFE0, 0.6, 150) // Bright light yellow
    floorLight.position.set(0, -35, 0) // Near the deeper sand floor
    this.scene.add(floorLight)

    // Extra spotlight directly on the floor for maximum visibility
    const spotLight = new THREE.SpotLight(0xFFFFFF, 1.0, 100, Math.PI / 6, 0.5)
    spotLight.position.set(0, -30, 0)
    spotLight.target.position.set(0, -45, 0)
    this.scene.add(spotLight)
    this.scene.add(spotLight.target)

    // Add ULTRA bright sand floor illumination system for maximum visibility
    const sandLight = new THREE.PointLight(0xFFF8DC, 2.5, 300) // Cornsilk color, ultra bright
    sandLight.position.set(0, -12, 0) // Close to sand floor at Y = -15
    this.scene.add(sandLight)

    // Add multiple sand lights for complete coverage
    const sandLight2 = new THREE.PointLight(0xF4E4BC, 2.0, 250) // Sandy beige matching floor
    sandLight2.position.set(40, -10, 0) // Right side coverage
    this.scene.add(sandLight2)

    const sandLight3 = new THREE.PointLight(0xF4E4BC, 2.0, 250) // Sandy beige matching floor  
    sandLight3.position.set(-40, -10, 0) // Left side coverage
    this.scene.add(sandLight3)

    const sandLight4 = new THREE.PointLight(0xF4E4BC, 2.0, 250) // Sandy beige matching floor
    sandLight4.position.set(0, -10, 40) // Front coverage
    this.scene.add(sandLight4)

    const sandLight5 = new THREE.PointLight(0xF4E4BC, 2.0, 250) // Sandy beige matching floor
    sandLight5.position.set(0, -10, -40) // Back coverage  
    this.scene.add(sandLight5)

    console.log('Enhanced lighting setup for realistic sardine appearance and sand floor visibility')
  }

  private initializeFlockManager(): void {
    const bounds = new THREE.Box3(
      new THREE.Vector3(-250, -30, -250), // Reduced from 600 to match visible sea bottom
      new THREE.Vector3(250, 200, 250)
    )

    // Get initial behavior from store instead of hardcoding
    const storeParams = useSimulationStore.getState().parameters
    const initialBehavior = storeParams.behavior
    const initialFishCount = storeParams.rendering.fishCount

    const config: FlockConfig = {
      fishCount: initialFishCount, // Use fish count from UI store
      bounds,
      behavior: { ...initialBehavior },
      spatialPartitioning: true,
      partitionSize: 80 // Smaller partitions for smaller space
    }

    this.flockManager = new FlockManager(config)

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
    const config: FishRenderConfig = {
      modelPath: '/assets/fish-model/scene.gltf',
      maxFishCount: 2500, // Increased max fish count for larger schools
      scale: 3.0, // Even bigger scale for visibility
      enableShadows: false, // Disable shadows to avoid shader issues
      enableFrustumCulling: true, // Enable frustum culling for performance
      enableLOD: true, // Enable Level of Detail for distant fish
      lodDistance: 200 // Reduced LOD distance for better performance
    }

    console.log('Initializing FishRenderer with config:', config)
    this.fishRenderer = new FishRenderer(this.scene, config)

    // Set camera reference for frustum culling
    if (this.fishRenderer) {
      this.fishRenderer.setCamera(this.camera)

      // Wait for model to load and optimize textures
      setTimeout(() => {
        if (this.fishRenderer && this.fishRenderer.isLoaded()) {
          this.fishRenderer.updateTextureSettings()
          console.log('Texture optimization applied to fish renderer')
        }
      }, 1000) // Wait 1 second for model to load
    }
  }

  private initializeUnderwaterEnvironment(): void {
    const config: UnderwaterConfig = {
      rayCount: 20,
      rayRadius: 20,
      rayHeight: 300,
      rayOpacity: 0.12
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

    // Reduce fog
    this.scene.fog = new THREE.Fog(0x1B4F72, 200, 800)

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

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  private deltaTimeHistory: number[] = []
  private maxDeltaTimeHistory: number = 5

  public update(): void {
    if (this.isPaused) return

    const currentTime = performance.now()
    let rawDeltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.05) // Cap at 20fps for physics stability
    this.lastTime = currentTime

    // Smooth deltaTime to avoid micro-stutters from browser frame timing jitter
    this.deltaTimeHistory.push(rawDeltaTime)
    if (this.deltaTimeHistory.length > this.maxDeltaTimeHistory) {
      this.deltaTimeHistory.shift()
    }
    const deltaTime = this.deltaTimeHistory.reduce((a, b) => a + b, 0) / this.deltaTimeHistory.length

    // Update flock manager
    if (this.flockManager) {
      let predatorPos: THREE.Vector3 | null = null
      if (this.sharkRenderer && useSimulationStore.getState().predatorVisible) {
        predatorPos = this.sharkRenderer.getPosition()
      }
      this.flockManager.update(deltaTime, predatorPos)
    }

    // Update fish renderer
    if (this.fishRenderer && this.flockManager) {
      const fish = this.flockManager.getFish()
      this.fishRenderer.updateFish(fish)
    }

    // Update underwater environment
    if (this.underwaterEnvironment) {
      this.underwaterEnvironment.update(deltaTime)
    }

    // Update shark renderer
    if (this.sharkRenderer) {
      this.sharkRenderer.update(deltaTime)
    }

    // Wall system removed - no walls or grids

    // Update special cameras (follow/action/single-fish modes)
    this.updateSpecialCameras()

    // Update controls
    this.controls.update()

    // Record frame time for FPS calculation
    const frameTime = deltaTime * 1000
    this.frameTimeHistory.push(frameTime)
    if (this.frameTimeHistory.length > 60) {
      this.frameTimeHistory.shift()
    }

    // Render scene
    this.renderer.render(this.scene, this.camera)

    // Performance monitoring - log if frame time is too high
    if (frameTime > 33) { // More than 30fps threshold
      console.warn(`High frame time: ${frameTime.toFixed(1)}ms (target: <33ms)`)
    }
  }

  public updateParameters(parameters: any): void {
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
          // Update fish count
          this.flockManager?.setFishCount(parameters.rendering.fishCount)
          console.log('Updated fish count to:', parameters.rendering.fishCount)
        }

        if (parameters.rendering.modelScale !== undefined) {
          // Update fish scale
          this.fishRenderer.updateMaterial({
            // Scale is handled in the updateFish method
          })
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

  public updateCamera(cameraState: { position: { x: number; y: number; z: number }; target: { x: number; y: number; z: number } }): void {
    // Get the current camera preset from the store to determine mode
    const { ui } = useSimulationStore.getState()
    const selectedPreset = ui.selectedCameraPreset

    // Determine camera mode from preset name
    if (selectedPreset === 'single-fish') {
      this.currentCameraMode = 'single-fish'
    } else if (selectedPreset === 'follow') {
      this.currentCameraMode = 'follow'
    } else if (selectedPreset === 'action') {
      this.currentCameraMode = 'action'
    } else {
      this.currentCameraMode = 'static'
    }

    // Update camera position
    this.camera.position.set(cameraState.position.x, cameraState.position.y, cameraState.position.z)

    // Update camera target (look at point)
    this.controls.target.set(cameraState.target.x, cameraState.target.y, cameraState.target.z)

    // Update controls
    this.controls.update()
  }

  private updateSpecialCameras(): void {
    if (!this.flockManager) return

    const fish = this.flockManager.getFish()
    if (fish.length === 0) return

    // Calculate flock center
    const flockCenter = new THREE.Vector3()
    fish.forEach(fish => {
      flockCenter.add(fish.physics.position)
    })
    flockCenter.divideScalar(fish.length)

    if (this.currentCameraMode === 'follow') {
      // Follow camera: smoothly follow the flock center (closer)
      const targetPosition = new THREE.Vector3(
        flockCenter.x,
        flockCenter.y + 40, // Closer to the flock
        flockCenter.z + 80 // Much closer behind the flock
      )

      // Smooth camera movement
      this.camera.position.lerp(targetPosition, this.cameraLerpFactor)
      this.controls.target.lerp(flockCenter, this.cameraLerpFactor)
      this.controls.update()

    } else if (this.currentCameraMode === 'action') {
      // Action camera: dynamic angle that follows flock movement with variable height
      const flockVelocity = new THREE.Vector3()
      fish.forEach(fish => {
        flockVelocity.add(fish.physics.velocity)
      })
      flockVelocity.divideScalar(fish.length)

      // Calculate dynamic camera position based on flock movement
      const movementDirection = flockVelocity.clone().normalize()
      const speed = flockVelocity.length()

      // Dynamic height based on flock speed and position with more random, longer variations
      const baseHeight = 40
      const speedHeightVariation = Math.min(speed * 2, 30) // Height increases with speed

      // More random and longer height variations using multiple sine waves
      const time = Date.now() * 0.0005 // Slower base frequency
      const longVariation = Math.sin(time) * 25 // Longer, larger oscillation
      const mediumVariation = Math.sin(time * 2.3) * 15 // Medium frequency variation
      const shortVariation = Math.sin(time * 5.7) * 8 // Short frequency variation
      const randomVariation = Math.sin(time * 1.7 + Math.sin(time * 0.3) * 10) * 12 // Chaotic variation

      const flockHeightVariation = longVariation + mediumVariation + shortVariation + randomVariation
      const dynamicHeight = baseHeight + speedHeightVariation + flockHeightVariation

      const actionPosition = new THREE.Vector3(
        flockCenter.x + movementDirection.x * 120,
        flockCenter.y + dynamicHeight,
        flockCenter.z + movementDirection.z * 80
      )

      // Super smooth camera movement for action camera (reduced responsiveness)
      this.camera.position.lerp(actionPosition, this.cameraLerpFactor * 0.3)
      this.controls.target.lerp(flockCenter, this.cameraLerpFactor * 0.3)
      this.controls.update()
    } else if (this.currentCameraMode === 'dolly-cam') {
      // Dolly cam: finds and follows the most crowded schools
      const clusterCenters: Array<{ center: THREE.Vector3; density: number; fish: any[] }> = []

      // Find clusters of fish using spatial partitioning
      const clusterRadius = 30
      const visited = new Set<number>()

      fish.forEach((currentFish, index) => {
        if (visited.has(index)) return

        const cluster: any[] = []
        const clusterCenter = new THREE.Vector3()

        // Find all fish within cluster radius
        fish.forEach((otherFish, otherIndex) => {
          if (visited.has(otherIndex)) return

          const distance = currentFish.physics.position.distanceTo(otherFish.physics.position)
          if (distance <= clusterRadius) {
            cluster.push(otherFish)
            clusterCenter.add(otherFish.physics.position)
            visited.add(otherIndex)
          }
        })

        if (cluster.length > 5) { // Only consider meaningful clusters
          clusterCenter.divideScalar(cluster.length)
          clusterCenters.push({
            center: clusterCenter,
            density: cluster.length,
            fish: cluster
          })
        }
      })

      // Find the densest cluster
      let targetCluster = clusterCenters[0]
      if (clusterCenters.length > 1) {
        targetCluster = clusterCenters.reduce((max, cluster) =>
          cluster.density > max.density ? cluster : max
        )
      }

      // Debug logging for dolly cam
      if (clusterCenters.length > 0) {
        console.log(`🎬 Dolly Cam: Found ${clusterCenters.length} clusters, targeting cluster with ${targetCluster.density} fish`)
      }

      if (targetCluster) {
        // Calculate dolly cam position - close and dynamic
        const clusterVelocity = new THREE.Vector3()
        targetCluster.fish.forEach(fish => {
          clusterVelocity.add(fish.physics.velocity)
        })
        clusterVelocity.divideScalar(targetCluster.fish.length)

        // Dynamic dolly positioning based on cluster movement
        const movementDirection = clusterVelocity.clone().normalize()
        const speed = clusterVelocity.length()

        // Closer positioning for intimate shots
        const baseDistance = 40 + Math.min(speed * 3, 20) // Distance varies with speed
        const heightVariation = Math.sin(Date.now() * 0.001) * 8 // Gentle height oscillation

        const dollyPosition = new THREE.Vector3(
          targetCluster.center.x + movementDirection.x * baseDistance,
          targetCluster.center.y + 25 + heightVariation,
          targetCluster.center.z + movementDirection.z * baseDistance
        )

        // Smooth dolly movement
        this.camera.position.lerp(dollyPosition, this.cameraLerpFactor * 0.4)
        this.controls.target.lerp(targetCluster.center, this.cameraLerpFactor * 0.4)
        this.controls.update()
      } else {
        // Fallback: if no clusters found, follow the flock center
        console.log('🎬 Dolly Cam: No clusters found, following flock center')
        const fallbackPosition = new THREE.Vector3(
          flockCenter.x,
          flockCenter.y + 40,
          flockCenter.z + 60
        )
        this.camera.position.lerp(fallbackPosition, this.cameraLerpFactor * 0.4)
        this.controls.target.lerp(flockCenter, this.cameraLerpFactor * 0.4)
        this.controls.update()
      }
    } else if (this.currentCameraMode === 'single-fish') {
      // Single fish follow camera - smooth following with depth variation
      const targetFish = fish[0] // Follow the first fish
      const fishPosition = targetFish.physics.position.clone()

      // Calculate smooth depth variation based on fish Y position
      const depthVariation = Math.sin(Date.now() * 0.001) * 5 // Gentle depth change
      const targetDepth = fishPosition.y + depthVariation

      // Position camera further back and higher for smoother view
      const offset = new THREE.Vector3(0, 8, 20) // Higher and further back
      const targetPosition = new THREE.Vector3(
        fishPosition.x + offset.x,
        targetDepth + offset.y,
        fishPosition.z + offset.z
      )

      // Very smooth camera movement to reduce shaking
      this.camera.position.lerp(targetPosition, this.cameraLerpFactor * 0.5)
      this.controls.target.lerp(fishPosition, this.cameraLerpFactor * 0.5)
      this.controls.update()
    }
  }

  public getStats(): SceneStats {
    const averageFrameTime = this.frameTimeHistory.reduce((sum, time) => sum + time, 0) / this.frameTimeHistory.length
    const fps = averageFrameTime > 0 ? 1000 / averageFrameTime : 0

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

  // Wall system methods removed

  public dispose(): void {
    // Wall system removed

    // Cleanup sea floor model
    if (this.seaFloorModel) {
      this.seaFloorModel.dispose()
    }

    // Cleanup fish renderer
    if (this.fishRenderer) {
      this.fishRenderer.dispose()
    }

    // Cleanup Three.js resources
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose()
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })

    this.renderer.dispose()

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize)

    // Remove DOM elements
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)
    }
  }

  /**
   * Subscribe to store changes for live parameter updates
   */
  private subscribeToStoreChanges(): void {
    // Subscribe to store changes to update fish behavior in real-time
    useSimulationStore.subscribe((state) => {
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

          if (r.modelScale !== undefined) {
            this.fishRenderer.setScale(r.modelScale)
          }

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

          // Handle Species switching
          if (r.selectedSpecies !== undefined) {
            if ((this as any)._currentSpecies !== r.selectedSpecies) {
              (this as any)._currentSpecies = r.selectedSpecies
              if (this.fishRenderer) {
                this.fishRenderer.switchSpecies(r.selectedSpecies)
              }
            }
          }
        }
      }

      // Sync shark state
      if (this.sharkRenderer) {
        this.sharkRenderer.setVisibility(state.predatorVisible)
        const pos = state.predatorPosition
        this.sharkRenderer.setPosition(new THREE.Vector3(pos.x, pos.y, pos.z))
      }

      // Update Swimmable Area Box visibility
      if (this.swimmableAreaGroup && state.parameters.walls.showSwimmableArea !== undefined) {
        this.swimmableAreaGroup.visible = state.parameters.walls.showSwimmableArea
      }
    })
  }

  /**
   * Subscribe to sea floor parameter changes
   */
  private subscribeToSeaFloorChanges(): void {
    useSimulationStore.subscribe((state) => {
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
  }
}
