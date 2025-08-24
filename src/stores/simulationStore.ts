import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface BehaviorParams {
  cohesionStrength: number
  separationStrength: number
  alignmentStrength: number
  cohesionRadius: number
  separationRadius: number
  alignmentRadius: number
  collisionAvoidanceStrength: number
  edgeAvoidanceStrength: number
  environmentalForceStrength: number
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
}

export interface PerformanceData {
  fps: number
  memoryUsage: number
  fishCount: number
  isPaused: boolean
  averageSpeed: number
  visibleFish: number
  cullingEnabled: boolean
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
  }
}

// Default values
const defaultBehavior: BehaviorParams = {
  cohesionStrength: 1.0,
  separationStrength: 1.5,
  alignmentStrength: 1.0,
  cohesionRadius: 80, // Updated for smaller space
  separationRadius: 30, // Updated for smaller space
  alignmentRadius: 80, // Updated for smaller space
  collisionAvoidanceStrength: 2.0,
  edgeAvoidanceStrength: 1.5,
  environmentalForceStrength: 0.3,
}

const defaultPhysics: PhysicsParams = {
  maxSpeed: 40, // Updated for smaller space
  maxForce: 10, // Updated for smaller space
  maxAcceleration: 15, // Updated for smaller space
}

const defaultRendering: RenderingParams = {
  fishCount: 500,
  modelScale: 1,
  lightingIntensity: 1,
}

const defaultPerformance: PerformanceData = {
  fps: 0,
  memoryUsage: 0,
  fishCount: 0,
  isPaused: false,
  averageSpeed: 0,
  visibleFish: 0,
  cullingEnabled: false,
}

const defaultCamera: CameraState = {
  position: { x: 120, y: 40, z: 80 },
  target: { x: 0, y: 0, z: 0 },
}

const defaultUI: UIState = {
  sidebarVisible: true,
  hudVisible: true,
  fullscreen: false,
  activeSection: 'behavior',
  selectedBehaviorPreset: 'default',
  selectedCameraPreset: 'default',
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
          // Preset configurations
          const presets = {
            calm: {
              behavior: { ...defaultBehavior, cohesionStrength: 0.3, separationStrength: 0.8 },
              physics: { ...defaultPhysics, maxSpeed: 30 },
              rendering: { ...defaultRendering, fishCount: 300 },
            },
            tight: {
              behavior: { ...defaultBehavior, cohesionStrength: 1.0, separationStrength: 0.5 },
              physics: { ...defaultPhysics, maxSpeed: 50 },
              rendering: { ...defaultRendering, fishCount: 800 },
            },
            scattered: {
              behavior: { ...defaultBehavior, cohesionStrength: 0.2, separationStrength: 1.5 },
              physics: { ...defaultPhysics, maxSpeed: 80 },
              rendering: { ...defaultRendering, fishCount: 200 },
            },
            aggressive: {
              behavior: { ...defaultBehavior, cohesionStrength: 2.0, separationStrength: 0.3, alignmentStrength: 1.5 },
              physics: { ...defaultPhysics, maxSpeed: 60, maxForce: 15 },
              rendering: { ...defaultRendering, fishCount: 400 },
            },
            gentle: {
              behavior: { ...defaultBehavior, cohesionStrength: 0.5, separationStrength: 1.0, alignmentStrength: 0.8 },
              physics: { ...defaultPhysics, maxSpeed: 25, maxForce: 8 },
              rendering: { ...defaultRendering, fishCount: 250 },
            },
            chaotic: {
              behavior: { ...defaultBehavior, cohesionStrength: 0.1, separationStrength: 2.0, alignmentStrength: 0.3 },
              physics: { ...defaultPhysics, maxSpeed: 70, maxForce: 20 },
              rendering: { ...defaultRendering, fishCount: 350 },
            },
            organized: {
              behavior: { ...defaultBehavior, cohesionStrength: 1.5, separationStrength: 0.8, alignmentStrength: 1.2 },
              physics: { ...defaultPhysics, maxSpeed: 45, maxForce: 12 },
              rendering: { ...defaultRendering, fishCount: 600 },
            },
            minimal: {
              behavior: { ...defaultBehavior, cohesionStrength: 0.8, separationStrength: 1.2, alignmentStrength: 0.6 },
              physics: { ...defaultPhysics, maxSpeed: 35, maxForce: 9 },
              rendering: { ...defaultRendering, fishCount: 150 },
            },
          }
          
          const selectedPreset = presets[preset as keyof typeof presets]
          if (selectedPreset) {
            set((state) => ({
              parameters: selectedPreset,
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
            far: { position: { x: 0, y: 80, z: 300 }, target: { x: 0, y: 0, z: 0 } },
            action: { position: { x: 120, y: 40, z: 80 }, target: { x: 0, y: 0, z: 0 } },
            follow: { position: { x: 0, y: 60, z: 150 }, target: { x: 0, y: 0, z: 0 } },
            'single-fish': { position: { x: 0, y: 60, z: 150 }, target: { x: 0, y: 0, z: 0 } },
            corner: { position: { x: 150, y: 100, z: 150 }, target: { x: 0, y: 0, z: 0 } },
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
      },
    }),
    {
      name: 'sardines-simulation-storage',
      partialize: (state) => ({
        parameters: state.parameters,
        ui: state.ui,
      }),
      onRehydrateStorage: () => (state) => {
        // Migrate old store data to include new physics parameters
        if (state && state.parameters && state.parameters.behavior) {
          const behavior = state.parameters.behavior
          if (behavior.collisionAvoidanceStrength === undefined) {
            behavior.collisionAvoidanceStrength = defaultBehavior.collisionAvoidanceStrength
          }
          if (behavior.edgeAvoidanceStrength === undefined) {
            behavior.edgeAvoidanceStrength = defaultBehavior.edgeAvoidanceStrength
          }
          if (behavior.environmentalForceStrength === undefined) {
            behavior.environmentalForceStrength = defaultBehavior.environmentalForceStrength
          }
        }
      },
    }
  )
)
