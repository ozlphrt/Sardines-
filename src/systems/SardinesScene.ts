import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlockManager, FlockConfig } from './FlockManager.js'
import { FishBehavior } from './Fish.js'
import { FishRenderer, FishRenderConfig } from './FishRenderer.js'
import { UnderwaterEnvironment, UnderwaterConfig } from './UnderwaterEnvironment.js'
// Wall system removed
import { SeaFloorModel, SeaFloorConfig } from './SeaFloorModel.js'
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
  private underwaterEnvironment: UnderwaterEnvironment | null = null
  // Wall system removed
  private seaFloorModel: SeaFloorModel | null = null
  
  private isPaused: boolean = false
  private lastTime: number = 0
  private currentCameraMode: string = 'default'
  // Camera target for future camera controls
  // private cameraTargetPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
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
    
    // Initialize underwater environment
    this.initializeUnderwaterEnvironment()
    
    // Wall system removed - no walls or grids
    
    // Initialize sea floor model
    this.initializeSeaFloorModel()
    
    // Subscribe to store changes for live parameter updates
    this.subscribeToStoreChanges()
    
    // Subscribe to sea floor parameter changes
    this.subscribeToSeaFloorChanges()
  }

  private setupLighting(): void {
    // Enhanced underwater lighting for realistic sardine visibility and sand floor
    const ambientLight = new THREE.AmbientLight(0x87CEEB, 0.8) // Brighter sky blue ambient for underwater feel
    this.scene.add(ambientLight)
    
    // Main directional light (sunlight through water) - ENHANCED for maximum brightness
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2) // Significantly increased intensity for brighter sardines
    directionalLight.position.set(50, 200, 50)
    directionalLight.castShadow = false // Disable shadows for performance
    this.scene.add(directionalLight)
    
    // Secondary fill light for better metallic highlights
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.5) // Enhanced blue fill light
    fillLight.position.set(-50, 100, -50)
    this.scene.add(fillLight)
    
    // Additional light to enhance sardine metallic shine - ENHANCED for maximum metallic impact
    const shineLight = new THREE.DirectionalLight(0xE6F3FF, 0.7) // Increased intensity for dramatic metallic highlights
    shineLight.position.set(100, 0, 0) // Side lighting for metallic highlights
    this.scene.add(shineLight)
    
    // Enhanced bottom light for better sand floor visibility
    const bottomLight = new THREE.DirectionalLight(0xFFFACD, 0.8) // Brighter warm light
    bottomLight.position.set(0, 50, 0) // Much closer to illuminate floor better
    bottomLight.target.position.set(0, -25, 0) // Target the new sand floor position
    this.scene.add(bottomLight)
    this.scene.add(bottomLight.target)
    
    // Additional point light near the floor for sand texture visibility
    const floorLight = new THREE.PointLight(0xFFFFE0, 0.6, 150) // Bright light yellow
    floorLight.position.set(0, -15, 0) // Much closer to the sand floor
    this.scene.add(floorLight)
    
    // Extra spotlight directly on the floor for maximum visibility
    const spotLight = new THREE.SpotLight(0xFFFFFF, 1.0, 100, Math.PI / 6, 0.5)
    spotLight.position.set(0, -10, 0)
    spotLight.target.position.set(0, -25, 0)
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
      new THREE.Vector3(-100, -40, -100), // Larger swimming area
      new THREE.Vector3(100, 40, 100)
    )
    
    const defaultBehavior: FishBehavior = {
      // Phase 1 - Core movement parameters
      bodyLength: 3.0,              // Fish body length in world units
      maxTurnRate: 1.57,            // 90°/s maximum turn rate
      maxRollAngle: 0.52,           // 30° maximum roll angle
      rollSpeed: 3.0,               // 3 rad/s roll speed
      
      // Undulation parameters
      undulationFrequency: 3.0,     // 3 Hz base frequency
      undulationAmplitude: 0.2,     // 0.2 body length amplitude
      
      // Speed parameters
      accelerationRate: 2.5,        // 2.5 BL/s² acceleration
      
      // Direction change parameters
      directionChangeInterval: 4.0, // 4 seconds between changes
      turnSmoothness: 0.8,          // 0.8 smoothness factor
      
      // Flocking parameters
      neighborRadius: 25.0,         // Detection radius for neighbors
      separationRadius: 8.0,        // Minimum distance to maintain
      collisionRadius: 4.0,         // Emergency collision avoidance radius
      cohesionStrength: 0.4,        // Attraction to group center
      separationStrength: 0.8,      // Avoidance of crowding
      alignmentStrength: 0.6,       // Velocity matching strength
      
      // Force balancing
      individualWeight: 0.6,        // Weight of individual behavior
      socialWeight: 0.4             // Weight of flocking behavior
    }
    
    // Get initial fish count from store
    const initialFishCount = useSimulationStore.getState().parameters.rendering.fishCount
    
    const config: FlockConfig = {
      fishCount: initialFishCount, // Use fish count from UI store
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
    
    // Reduce fog to see floor better
    this.scene.fog = new THREE.Fog(0x1B4F72, 200, 600) // Fog starts much farther, less interference
    
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
      visibleFish: rendererStats?.visibleFish || 0,
      cullingEnabled: rendererStats?.cullingEnabled || false,
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
        const fishBehavior: FishBehavior = {
          // Core movement parameters
          bodyLength: state.parameters.behavior.bodyLength,
          maxTurnRate: state.parameters.behavior.maxTurnRate,
          maxRollAngle: state.parameters.behavior.maxRollAngle,
          rollSpeed: state.parameters.behavior.rollSpeed,
          
          // Undulation parameters
          undulationFrequency: state.parameters.behavior.undulationFrequency,
          undulationAmplitude: state.parameters.behavior.undulationAmplitude,
          
          // Speed parameters
          accelerationRate: state.parameters.behavior.accelerationRate,
          
          // Direction change parameters
          directionChangeInterval: state.parameters.behavior.directionChangeInterval,
          turnSmoothness: state.parameters.behavior.turnSmoothness,
          
          // Flocking parameters
          neighborRadius: state.parameters.behavior.neighborRadius,
          separationRadius: state.parameters.behavior.separationRadius,
          collisionRadius: state.parameters.behavior.collisionRadius,
          cohesionStrength: state.parameters.behavior.cohesionStrength,
          separationStrength: state.parameters.behavior.separationStrength,
          alignmentStrength: state.parameters.behavior.alignmentStrength,
          
          // Force balancing
          individualWeight: state.parameters.behavior.individualWeight,
          socialWeight: state.parameters.behavior.socialWeight
        }
        
        // Update all fish with new behavior parameters
        this.flockManager.updateBehavior(fishBehavior)
        
        // Update fish count if changed
        if (state.parameters.rendering.fishCount !== undefined) {
          this.flockManager.setFishCount(state.parameters.rendering.fishCount)
        }
      }
      
      // Wall system removed
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
