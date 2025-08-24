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

export interface UIState {
  sidebarVisible: boolean
  hudVisible: boolean
  fullscreen: boolean
  activeSection: string
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
  
  // Actions
  actions: {
    updateParameter: (category: keyof SimulationStore['parameters'], param: string, value: number) => void
    togglePause: () => void
    resetSimulation: () => void
    loadPreset: (preset: string) => void
    toggleSidebar: () => void
    toggleHUD: () => void
    setActiveSection: (section: string) => void
    updatePerformance: (data: Partial<PerformanceData>) => void
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

const defaultUI: UIState = {
  sidebarVisible: true,
  hudVisible: true,
  fullscreen: false,
  activeSection: 'behavior',
}

// Store creation
export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set, get) => ({
      ui: defaultUI,
      
      parameters: {
        behavior: defaultBehavior,
        physics: defaultPhysics,
        rendering: defaultRendering,
      },
      
      performance: defaultPerformance,
      
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
              physics: { ...defaultPhysics, perceptionRadius: 150 },
              rendering: { ...defaultRendering, fishCount: 800 },
            },
            scattered: {
              behavior: { ...defaultBehavior, cohesionStrength: 0.2, separationStrength: 1.5 },
              physics: { ...defaultPhysics, maxSpeed: 80 },
              rendering: { ...defaultRendering, fishCount: 200 },
            },
          }
          
          const selectedPreset = presets[preset as keyof typeof presets]
          if (selectedPreset) {
            set((state) => ({
              parameters: selectedPreset,
              performance: {
                ...state.performance,
                isPaused: false,
              },
            }))
          }
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
