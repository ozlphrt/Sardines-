import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types - Updated for Phase 1 + Flocking system
export interface BehaviorParams {
  // Flocking parameters (matching our Fish interface)
  cohesionStrength: number
  separationStrength: number
  alignmentStrength: number
  neighborRadius: number
  separationRadius: number
  collisionRadius: number

  // Force balancing
  individualWeight: number
  socialWeight: number

  // Core movement parameters
  bodyLength: number
  maxTurnRate: number
  maxRollAngle: number
  rollSpeed: number

  // Undulation parameters
  undulationFrequency: number
  undulationAmplitude: number

  // Speed parameters
  accelerationRate: number

  // Direction change parameters
  directionChangeInterval: number
  turnSmoothness: number

  // Elasticity
  waveDelayFactor: number
  clusterBias: number
  edgeSpeedMultiplier: number

  // Predator
  burstMultiplier: number
  compressionStrength: number
  baitBallDuration: number
  recoveryDuration: number

  // Environment
  seabedAvoidanceStrength: number
  obstacleLookAheadDistance: number
  preferredDepthBand: number
}

export interface PhysicsParams {
  maxSpeed: number
  maxForce: number
  maxAcceleration: number
}

export interface RenderingParams {
  fishCount: number
  modelScale: number
  lightingIntensity: number
  metalness: number
  roughness: number
  envMapIntensity: number
  emissiveIntensity: number
}

export interface WallParams {
  showWalls: boolean
  showGridlines: boolean
  showSwimmableArea: boolean
  wallOpacity: number
  gridlineOpacity: number
  gridSize: number
  wallColor: string
  gridlineColor: string
  transparencyEnabled: boolean
  transparencyDistance: number
}

export interface SeaFloorParams {
  enabled: boolean
  scale: number
  positionX: number
  positionY: number
  positionZ: number
  rotationX: number
  rotationY: number
  rotationZ: number
  receiveShadows: boolean
  castShadows: boolean
}

export interface PerformanceData {
  fps: number
  memoryUsage: number
  fishCount: number
  isPaused: boolean
  averageSpeed: number
  visibleFish: number
  cullingEnabled: boolean
  averageSize: number
  sizeRange: { min: number; max: number }
}

export interface CameraState {
  position: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
}

export interface UIState {
  sidebarVisible: boolean
  hudVisible: boolean
  fullscreen: boolean
  activeSection: string
  selectedBehaviorPreset: string
  selectedCameraPreset: string
}

export interface SimulationStore {
  // UI state
  ui: UIState

  // Simulation parameters
  parameters: {
    behavior: BehaviorParams
    physics: PhysicsParams
    rendering: RenderingParams
    walls: WallParams
    seaFloor: SeaFloorParams
  }

  // Performance data
  performance: PerformanceData

  // Camera state
  camera: CameraState

  // Actions
  actions: {
    updateParameter: (category: keyof SimulationStore['parameters'], param: string, value: number) => void
    togglePause: () => void
    resetSimulation: () => void
    loadPreset: (preset: string) => void
    loadCameraPreset: (preset: string) => void
    toggleSidebar: () => void
    toggleHUD: () => void
    setActiveSection: (section: string) => void
    updatePerformance: (data: Partial<PerformanceData>) => void
    updateCamera: (camera: CameraState) => void
    toggleWalls: () => void
    toggleGridlines: () => void
    updateWallParameter: (param: keyof WallParams, value: number | boolean | string) => void
    toggleSeaFloor: () => void
    updateSeaFloorParameter: (param: keyof SeaFloorParams, value: number | boolean) => void
  }
}

// Default values - Updated for Phase 1 + Flocking system
const defaultBehavior: BehaviorParams = {
  // Flocking parameters
  cohesionStrength: 0.9,
  separationStrength: 2.5,
  alignmentStrength: 0.7,
  neighborRadius: 60.0,
  separationRadius: 20.0,
  collisionRadius: 8.0,

  // Force balancing
  individualWeight: 0.1, // Stronger social following
  socialWeight: 0.9,

  // Core movement parameters
  bodyLength: 5.0, // Bigger fish for better visibility
  maxTurnRate: 2.5, // Much faster turning
  maxRollAngle: 0.6,
  rollSpeed: 5.0,

  // Undulation parameters
  undulationFrequency: 4.5,
  undulationAmplitude: 0.3,

  // Speed parameters
  accelerationRate: 8.0, // Very snappy speed changes

  // Direction change parameters
  directionChangeInterval: 12.0, // Very infrequent changes, travel further
  turnSmoothness: 0.98, // Very smooth transitions

  // Elasticity
  waveDelayFactor: 0.2,
  clusterBias: 0.8,
  edgeSpeedMultiplier: 1.15,

  // Predator
  burstMultiplier: 3.5,
  compressionStrength: 5.0,
  baitBallDuration: 3000,
  recoveryDuration: 6000,

  // Environment
  seabedAvoidanceStrength: 2.5,
  obstacleLookAheadDistance: 40.0,
  preferredDepthBand: 50.0
}

const defaultPhysics: PhysicsParams = {
  maxSpeed: 80, // Doubled speed
  maxForce: 20, // Doubled force
  maxAcceleration: 30, // Doubled acceleration
}

const defaultRendering: RenderingParams = {
  fishCount: 500,
  modelScale: 3.2,
  lightingIntensity: 2.1,
  metalness: 0.9,
  roughness: 0.4, // Smoothness 0.60
  envMapIntensity: 1.0,
  emissiveIntensity: 0.0,
}

const defaultWalls: WallParams = {
  showWalls: false,
  showGridlines: false,
  showSwimmableArea: false,
  wallOpacity: 0.05, // Almost invisible walls
  gridlineOpacity: 1.0, // Maximum visibility gridlines
  gridSize: 12, // Even denser grid
  wallColor: '#4A90E2',
  gridlineColor: '#00FFFF', // Bright cyan for maximum visibility
  transparencyEnabled: true,
  transparencyDistance: 150,
}

const defaultSeaFloor: SeaFloorParams = {
  enabled: true,
  scale: 60.0, // 2x increase from 30.0
  positionX: 0,
  positionY: -40,
  positionZ: 0,
  rotationX: 0, // Rotated 90 deg from previous -1.570796
  rotationY: 0,
  rotationZ: 0,
  receiveShadows: true,
  castShadows: false,
}

const defaultPerformance: PerformanceData = {
  fps: 0,
  memoryUsage: 0,
  fishCount: 0,
  isPaused: false,
  averageSpeed: 0,
  visibleFish: 0,
  cullingEnabled: false,
  averageSize: 1.0,
  sizeRange: { min: 1.0, max: 1.0 },
}

const defaultCamera: CameraState = {
  position: { x: 0, y: 60, z: 150 }, // Default position for single-fish preset
  target: { x: 0, y: 0, z: 0 },
}

const defaultUI: UIState = {
  sidebarVisible: false, // Default to off as requested
  hudVisible: true,
  fullscreen: false,
  activeSection: 'behavior',
  selectedBehaviorPreset: 'default',
  selectedCameraPreset: 'single-fish', // Default to single fish camera
}

// Store creation
export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set, _get) => ({
      ui: defaultUI,

      parameters: {
        behavior: defaultBehavior,
        physics: defaultPhysics,
        rendering: defaultRendering,
        walls: defaultWalls,
        seaFloor: defaultSeaFloor,
      },

      performance: defaultPerformance,

      camera: defaultCamera,

      actions: {
        updateParameter: (category, param, value) => {
          set((state) => ({
            parameters: {
              ...state.parameters,
              [category]: {
                ...state.parameters[category],
                [param]: value,
              },
            },
          }))
        },

        togglePause: () => {
          set((state) => ({
            performance: {
              ...state.performance,
              isPaused: !state.performance.isPaused,
            },
          }))
        },

        resetSimulation: () => {
          set((state) => ({
            parameters: {
              behavior: defaultBehavior,
              physics: defaultPhysics,
              rendering: defaultRendering,
              walls: defaultWalls,
              seaFloor: defaultSeaFloor,
            },
            ui: {
              ...state.ui,
              selectedBehaviorPreset: 'default',
            },
            performance: {
              ...state.performance,
              isPaused: false,
            },
          }))
        },

        loadPreset: (preset) => {
          // Preset configurations for Phase 1 + Flocking
          const presets = {
            calm: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.3,
                separationStrength: 0.6,
                alignmentStrength: 0.4,
                socialWeight: 0.3,
                individualWeight: 0.7,
                waveDelayFactor: 0.1,
                clusterBias: 0.2
              },
              physics: { ...defaultPhysics, maxSpeed: 30 },
              rendering: { ...defaultRendering, fishCount: 200 },
            },
            tight: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.8,
                separationStrength: 0.4,
                alignmentStrength: 0.9,
                socialWeight: 0.7,
                individualWeight: 0.3,
                separationRadius: 6.0,
                collisionRadius: 2.5, // Smaller for tight formation
                waveDelayFactor: 0.8,
                clusterBias: 0.9
              },
              physics: { ...defaultPhysics, maxSpeed: 50 },
              rendering: { ...defaultRendering, fishCount: 250 },
            },
            scattered: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.2,
                separationStrength: 1.2,
                alignmentStrength: 0.3,
                socialWeight: 0.2,
                individualWeight: 0.8,
                neighborRadius: 15.0,
                separationRadius: 12.0,
                collisionRadius: 6.0, // Larger for scattered behavior
                waveDelayFactor: 0.0,
                clusterBias: 0.0
              },
              physics: { ...defaultPhysics, maxSpeed: 80 },
              rendering: { ...defaultRendering, fishCount: 150 },
            },
            aggressive: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.6,
                separationStrength: 0.3,
                alignmentStrength: 1.0,
                socialWeight: 0.8,
                individualWeight: 0.2,
                maxTurnRate: 2.0,
                accelerationRate: 4.0,
                waveDelayFactor: 0.3,
                clusterBias: 0.6
              },
              physics: { ...defaultPhysics, maxSpeed: 60, maxForce: 15 },
              rendering: { ...defaultRendering, fishCount: 200 },
            },
            gentle: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.5,
                separationStrength: 0.9,
                alignmentStrength: 0.7,
                socialWeight: 0.4,
                individualWeight: 0.6,
                maxTurnRate: 1.0,
                accelerationRate: 1.5,
                waveDelayFactor: 0.6,
                clusterBias: 0.4
              },
              physics: { ...defaultPhysics, maxSpeed: 25, maxForce: 8 },
              rendering: { ...defaultRendering, fishCount: 180 },
            },
            chaotic: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.1,
                separationStrength: 1.5,
                alignmentStrength: 0.2,
                socialWeight: 0.1,
                individualWeight: 0.9,
                directionChangeInterval: 2.0,
                maxTurnRate: 2.5,
                waveDelayFactor: 0.0,
                clusterBias: 0.1
              },
              physics: { ...defaultPhysics, maxSpeed: 70, maxForce: 20 },
              rendering: { ...defaultRendering, fishCount: 120 },
            },
            organized: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.7,
                separationStrength: 0.6,
                alignmentStrength: 1.0,
                socialWeight: 0.8,
                individualWeight: 0.2,
                neighborRadius: 30.0,
                turnSmoothness: 0.9,
                waveDelayFactor: 0.5,
                clusterBias: 0.7
              },
              physics: { ...defaultPhysics, maxSpeed: 45, maxForce: 12 },
              rendering: { ...defaultRendering, fishCount: 220 },
            },
            minimal: {
              behavior: {
                ...defaultBehavior,
                cohesionStrength: 0.6,
                separationStrength: 1.0,
                alignmentStrength: 0.5,
                socialWeight: 0.5,
                individualWeight: 0.5,
                waveDelayFactor: 0.2,
                clusterBias: 0.3
              },
              physics: { ...defaultPhysics, maxSpeed: 35, maxForce: 9 },
              rendering: { ...defaultRendering, fishCount: 100 },
            },
          }

          const selectedPreset = presets[preset as keyof typeof presets]
          if (selectedPreset) {
            set((state) => ({
              parameters: {
                ...selectedPreset,
                walls: state.parameters.walls,
                seaFloor: state.parameters.seaFloor,
              },
              ui: {
                ...state.ui,
                selectedBehaviorPreset: preset,
              },
              performance: {
                ...state.performance,
                isPaused: false,
              },
            }))
          }
        },

        loadCameraPreset: (preset) => {
          // Camera preset configurations
          const cameraPresets = {
            default: { position: { x: 120, y: 40, z: 80 }, target: { x: 0, y: 0, z: 0 } },
            close: { position: { x: 0, y: 30, z: 100 }, target: { x: 0, y: 0, z: 0 } },
            'dolly-cam': { position: { x: 0, y: 25, z: 60 }, target: { x: 0, y: 0, z: 0 } },
            action: { position: { x: 120, y: 40, z: 80 }, target: { x: 0, y: 0, z: 0 } },
            follow: { position: { x: 0, y: 40, z: 80 }, target: { x: 0, y: 0, z: 0 } },
            'single-fish': { position: { x: 0, y: 60, z: 150 }, target: { x: 0, y: 0, z: 0 } },
          }

          const selectedCameraPreset = cameraPresets[preset as keyof typeof cameraPresets]
          if (selectedCameraPreset) {
            set((_state) => ({
              camera: selectedCameraPreset,
              ui: {
                ..._state.ui,
                selectedCameraPreset: preset,
              },
            }))

            // Set camera mode based on preset
            if (preset === 'single-fish') {
              // This will be handled by the scene when it detects the preset
              console.log('Single fish camera mode activated')
            }
          }
        },

        updateCamera: (camera) => {
          set((_state) => ({
            camera,
          }))
        },

        toggleSidebar: () => {
          set((state) => ({
            ui: {
              ...state.ui,
              sidebarVisible: !state.ui.sidebarVisible,
            },
          }))
        },

        toggleHUD: () => {
          set((state) => ({
            ui: {
              ...state.ui,
              hudVisible: !state.ui.hudVisible,
            },
          }))
        },

        setActiveSection: (section) => {
          set((state) => ({
            ui: {
              ...state.ui,
              activeSection: section,
            },
          }))
        },

        updatePerformance: (data) => {
          set((state) => ({
            performance: {
              ...state.performance,
              ...data,
            },
          }))
        },

        toggleWalls: () => {
          set((state) => ({
            parameters: {
              ...state.parameters,
              walls: {
                ...state.parameters.walls,
                showWalls: !state.parameters.walls.showWalls,
              },
            },
          }))
        },

        toggleGridlines: () => {
          set((state) => ({
            parameters: {
              ...state.parameters,
              walls: {
                ...state.parameters.walls,
                showGridlines: !state.parameters.walls.showGridlines,
              },
            },
          }))
        },

        updateWallParameter: (param, value) => {
          set((state) => ({
            parameters: {
              ...state.parameters,
              walls: {
                ...state.parameters.walls,
                [param]: value,
              },
            },
          }))
        },

        toggleSeaFloor: () => {
          set((state) => ({
            parameters: {
              ...state.parameters,
              seaFloor: {
                ...state.parameters.seaFloor,
                enabled: !state.parameters.seaFloor.enabled,
              },
            },
          }))
        },

        updateSeaFloorParameter: (param, value) => {
          set((state) => ({
            parameters: {
              ...state.parameters,
              seaFloor: {
                ...state.parameters.seaFloor,
                [param]: value,
              },
            },
          }))
        },
      },
    }),
    {
      name: 'sardines-simulation-storage',
      partialize: (state) => ({
        parameters: state.parameters,
        ui: state.ui,
      }),
      onRehydrateStorage: () => (state) => {
        // ABSOLUTE FORCED RESET for major coordination fix
        if (state) {
          state.parameters.behavior = { ...defaultBehavior }
          state.parameters.seaFloor = { ...defaultSeaFloor }
          state.parameters.rendering = { ...defaultRendering }
          state.parameters.physics = { ...defaultPhysics }
          state.ui.sidebarVisible = false // Force sidebar closed on load as requested
          state.ui.selectedCameraPreset = 'single-fish' // Force single-fish camera on load
          state.camera = { position: { x: 0, y: 60, z: 150 }, target: { x: 0, y: 0, z: 0 } }
          console.log('🔄 FINAL COORDINATION RESET APPLIED')
        }
      },
    }
  )
)
