import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlockManager, FlockConfig } from './FlockManager.js'
import { FishBehavior } from './Fish.js'
import { FishRenderer, FishRenderConfig } from './FishRenderer.js'
import { UnderwaterEnvironment, UnderwaterConfig } from './UnderwaterEnvironment.js'
import { useSimulationStore } from '../stores/simulationStore.js'

export interface SceneStats {
  fps: number
  memory: number
  fishCount: number
  averageSpeed: number
  visibleFish: number
  cullingEnabled: boolean
}

export class SardinesScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private flockManager: FlockManager | null = null
  private fishRenderer: FishRenderer | null = null
  private underwaterEnvironment: UnderwaterEnvironment | null = null
  
  private isPaused: boolean = false
  private lastTime: number = 0
  private currentCameraMode: string = 'default'
  private cameraTargetPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  private cameraLerpFactor: number = 0.02

  private frameTimeHistory: number[] = []

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
    this.camera.position.set(0, -15, 40) // Lower camera position to see detailed ocean floor
    
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
    
    // Initialize underwater environment
    this.initializeUnderwaterEnvironment()
    
    // Add boundary visualization after flock manager is ready
    this.addBoundaryVisualization()
  }

  private setupLighting(): void {
    // Natural underwater lighting
    const ambientLight = new THREE.AmbientLight(0x4A90E2, 0.5) // Moderate blue ambient
    this.scene.add(ambientLight)
    
    // Main directional light (sunlight through water)
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
    directionalLight.position.set(50, 200, 50)
    directionalLight.castShadow = false // Disable shadows for performance
    this.scene.add(directionalLight)
    
    // Secondary fill light for better texture visibility
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.4) // Blue fill light
    fillLight.position.set(-50, 100, -50)
    this.scene.add(fillLight)
    
    // Subtle bottom light for floor visibility
    const bottomLight = new THREE.DirectionalLight(0xE6F3FF, 0.3)
    bottomLight.position.set(0, 150, 0)
    this.scene.add(bottomLight)
  }

  private initializeFlockManager(): void {
    const bounds = new THREE.Box3(
      new THREE.Vector3(-100, -40, -100), // Larger swimming area
      new THREE.Vector3(100, 40, 100)
    )
    
    const defaultBehavior: FishBehavior = {
      cohesionStrength: 0.8,
      separationStrength: 1.2,
      alignmentStrength: 0.8,
      cohesionRadius: 35, // Moderate radius
      separationRadius: 15,
      alignmentRadius: 35,
      maxSpeed: 18, // Moderate speed for smoother movement
      maxForce: 6, // Reduced force for less jittery movement
      maxAcceleration: 8, // Reduced acceleration for smoother movement
      collisionAvoidanceStrength: 1.5, // Moderate collision avoidance
      edgeAvoidanceStrength: 1.0, // Gentle edge avoidance
      environmentalForceStrength: 0.2 // Subtle environmental forces
    }
    
    const config: FlockConfig = {
      fishCount: 200, // Reduced fish count for better performance
      bounds,
      behavior: defaultBehavior,
      spatialPartitioning: true,
      partitionSize: 80 // Smaller partitions for smaller space
    }
    
    this.flockManager = new FlockManager(config)
  }

  private initializeFishRenderer(): void {
    const config: FishRenderConfig = {
      modelPath: '/assets/fish-model/scene.gltf',
      maxFishCount: 500, // Reduced max fish count for performance
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
      enableCorals: true,
      enableRocks: true,
      enableSeaweed: true,
      enablePlankton: true,
      coralCount: 8, // Reduced from 15
      rockCount: 15, // Reduced from 25
      seaweedCount: 20, // Reduced from 30
      planktonCount: 30 // Reduced from 50
    }
    
    this.underwaterEnvironment = new UnderwaterEnvironment(this.scene, config)
  }

  private setupEnvironment(): void {
    // Natural underwater background color
    this.scene.background = new THREE.Color(0x1B4F72) // Deep blue water
    
    // Natural fog for underwater atmosphere
    this.scene.fog = new THREE.Fog(0x1B4F72, 60, 200) // Fog starts at 60 units, fully foggy at 200
  }

  private addBoundaryVisualization(): void {
    // Boundary visualization removed as requested
    // Fish now swim in a more natural, unbounded environment
    console.log('Boundary visualization disabled - fish swim in natural environment')
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

    public update(): void {
    if (this.isPaused) return

    const currentTime = performance.now()
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 1/30)
    this.lastTime = currentTime

    // Update flock manager
    if (this.flockManager) {
      this.flockManager.update(deltaTime)
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
      // Follow camera: smoothly follow the flock center
      const targetPosition = new THREE.Vector3(
        flockCenter.x,
        flockCenter.y + 60, // Keep camera above the flock
        flockCenter.z + 150 // Keep camera behind the flock
      )
      
      // Smooth camera movement
      this.camera.position.lerp(targetPosition, this.cameraLerpFactor)
      this.controls.target.lerp(flockCenter, this.cameraLerpFactor)
      this.controls.update()
      
    } else if (this.currentCameraMode === 'action') {
      // Action camera: dynamic angle that follows flock movement
      const flockVelocity = new THREE.Vector3()
      fish.forEach(fish => {
        flockVelocity.add(fish.physics.velocity)
      })
      flockVelocity.divideScalar(fish.length)
      
      // Calculate dynamic camera position based on flock movement
      const movementDirection = flockVelocity.clone().normalize()
      const actionPosition = new THREE.Vector3(
        flockCenter.x + movementDirection.x * 120,
        flockCenter.y + 40,
        flockCenter.z + movementDirection.z * 80
      )
      
      // Smooth camera movement with faster response for action camera
      this.camera.position.lerp(actionPosition, this.cameraLerpFactor * 2)
      this.controls.target.lerp(flockCenter, this.cameraLerpFactor * 2)
      this.controls.update()
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
      visibleFish: rendererStats?.visibleFish || 0,
      cullingEnabled: rendererStats?.cullingEnabled || false
    }
  }

  public getFlockManager(): FlockManager | null {
    return this.flockManager
  }

  public dispose(): void {
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
}
