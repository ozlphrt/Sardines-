import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlockManager, FlockConfig } from './FlockManager.js'
import { FishBehavior } from './Fish.js'
import { FishRenderer, FishRenderConfig } from './FishRenderer.js'

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
  
  private isPaused: boolean = false
  private lastTime: number = 0

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
    this.camera.position.set(0, 50, 200) // Much closer camera position for better fish visibility
    
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
    this.controls.maxDistance = 800
    this.controls.minDistance = 50
    

    
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
    
    // Add boundary visualization after flock manager is ready
    this.addBoundaryVisualization()
  }

  private setupLighting(): void {
    // Simple ambient lighting for basic materials
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8)
    this.scene.add(ambientLight)
    
    // Simple directional light
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5)
    directionalLight.position.set(100, 100, 100)
    this.scene.add(directionalLight)
  }

  private initializeFlockManager(): void {
    const bounds = new THREE.Box3(
      new THREE.Vector3(-200, -100, -200), // Reduced swimming area for better visibility
      new THREE.Vector3(200, 100, 200)
    )
    
    const defaultBehavior: FishBehavior = {
      cohesionStrength: 1.0,
      separationStrength: 1.5,
      alignmentStrength: 1.0,
      cohesionRadius: 80, // Reduced radius for smaller space
      separationRadius: 30,
      alignmentRadius: 80,
      maxSpeed: 40, // Reduced speed for smaller area
      maxForce: 10,
      maxAcceleration: 15,
      collisionAvoidanceStrength: 2.0, // Strong collision avoidance
      edgeAvoidanceStrength: 1.5, // Moderate edge avoidance
      environmentalForceStrength: 0.3 // Subtle environmental forces
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
    }
  }

  private setupEnvironment(): void {
    // Simple background color
    this.scene.background = new THREE.Color(0x0B1426) // Deep water blue
    
    // Remove fog and particles to avoid shader issues
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
