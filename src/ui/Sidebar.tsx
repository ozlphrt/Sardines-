import React from 'react'
import { useSimulationStore } from '../stores/simulationStore'
import HoverDrag from './HoverDrag'

const Sidebar: React.FC = () => {
  const { ui, parameters, actions } = useSimulationStore()

  const renderBehaviorControls = () => (
    <div className="space-y-0.5">
      {/* Flocking Forces */}
      <HoverDrag
        label="Cohesion"
        value={parameters.behavior.cohesionStrength}
        min={0}
        max={1}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'cohesionStrength', value)}
        description="How strongly fish move toward center of neighbors"
      />
      <HoverDrag
        label="Separation"
        value={parameters.behavior.separationStrength}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'separationStrength', value)}
        description="How strongly fish avoid crowding"
      />
      <HoverDrag
        label="Alignment"
        value={parameters.behavior.alignmentStrength}
        min={0}
        max={1}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'alignmentStrength', value)}
        description="How strongly fish match neighbor velocities"
      />
      
      {/* Detection Radii */}
      <HoverDrag
        label="Neighbor Radius"
        value={parameters.behavior.neighborRadius}
        min={10}
        max={50}
        step={2}
        onChange={(value) => actions.updateParameter('behavior', 'neighborRadius', value)}
        description="Detection radius for nearby neighbors"
      />
      <HoverDrag
        label="Separation Radius"
        value={parameters.behavior.separationRadius}
        min={3}
        max={20}
        step={1}
        onChange={(value) => actions.updateParameter('behavior', 'separationRadius', value)}
        description="Minimum distance to maintain from neighbors"
      />
      <HoverDrag
        label="Collision Radius"
        value={parameters.behavior.collisionRadius}
        min={1}
        max={10}
        step={0.5}
        onChange={(value) => actions.updateParameter('behavior', 'collisionRadius', value)}
        description="Emergency collision avoidance radius (smaller than separation)"
      />
      
      {/* Force Balancing */}
      <HoverDrag
        label="Individual Weight"
        value={parameters.behavior.individualWeight}
        min={0}
        max={1}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'individualWeight', value)}
        description="Weight of individual personality vs social behavior"
      />
      <HoverDrag
        label="Social Weight"
        value={parameters.behavior.socialWeight}
        min={0}
        max={1}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'socialWeight', value)}
        description="Weight of flocking behavior vs individual personality"
      />
    </div>
  )

  const renderPhysicsControls = () => (
    <div className="space-y-0.5">
      {/* Core Movement Parameters */}
      <HoverDrag
        label="Turn Rate"
        value={parameters.behavior.maxTurnRate}
        min={0.5}
        max={3}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'maxTurnRate', value)}
        description="Maximum turn rate (rad/s)"
      />
      <HoverDrag
        label="Roll Angle"
        value={parameters.behavior.maxRollAngle}
        min={0.1}
        max={1.0}
        step={0.05}
        onChange={(value) => actions.updateParameter('behavior', 'maxRollAngle', value)}
        description="Maximum roll angle during turns"
      />
      <HoverDrag
        label="Roll Speed"
        value={parameters.behavior.rollSpeed}
        min={1}
        max={6}
        step={0.5}
        onChange={(value) => actions.updateParameter('behavior', 'rollSpeed', value)}
        description="How fast fish can roll"
      />
      <HoverDrag
        label="Acceleration"
        value={parameters.behavior.accelerationRate}
        min={1}
        max={5}
        step={0.5}
        onChange={(value) => actions.updateParameter('behavior', 'accelerationRate', value)}
        description="Speed change rate (BL/s²)"
      />
    </div>
  )

  const renderRenderingControls = () => (
    <div className="space-y-0.5">
      {/* Undulation Parameters */}
      <HoverDrag
        label="Undulation Frequency"
        value={parameters.behavior.undulationFrequency}
        min={1}
        max={6}
        step={0.5}
        onChange={(value) => actions.updateParameter('behavior', 'undulationFrequency', value)}
        description="Body wave frequency (Hz)"
      />
      <HoverDrag
        label="Undulation Amplitude"
        value={parameters.behavior.undulationAmplitude}
        min={0.1}
        max={0.5}
        step={0.05}
        onChange={(value) => actions.updateParameter('behavior', 'undulationAmplitude', value)}
        description="Body wave amplitude (body lengths)"
      />
      
      {/* Direction Change Parameters */}
      <HoverDrag
        label="Direction Change Interval"
        value={parameters.behavior.directionChangeInterval}
        min={1}
        max={10}
        step={0.5}
        onChange={(value) => actions.updateParameter('behavior', 'directionChangeInterval', value)}
        description="Seconds between direction changes"
      />
      <HoverDrag
        label="Turn Smoothness"
        value={parameters.behavior.turnSmoothness}
        min={0.1}
        max={1}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'turnSmoothness', value)}
        description="How smooth turns are (0-1)"
      />
      
      {/* Rendering */}
      <HoverDrag
        label="Fish Count"
        value={parameters.rendering.fishCount}
        min={50}
        max={2500}
        step={50}
        onChange={(value) => actions.updateParameter('rendering', 'fishCount', value)}
        description="Number of fish in simulation"
      />
      <HoverDrag
        label="Fish Size"
        value={parameters.rendering.modelScale}
        min={0.5}
        max={2}
        step={0.1}
        onChange={(value) => actions.updateParameter('rendering', 'modelScale', value)}
        description="Scale of fish models"
      />
      <HoverDrag
        label="Lighting"
        value={parameters.rendering.lightingIntensity}
        min={0.1}
        max={2}
        step={0.1}
        onChange={(value) => actions.updateParameter('rendering', 'lightingIntensity', value)}
        description="Underwater lighting intensity"
      />
    </div>
  )

  const renderPerformanceControls = () => (
    <div className="space-y-1">
      <div className="space-y-0.5">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wide">Behavior Presets</h4>
        <div className="grid grid-cols-3 gap-0.5">
          <button
            onClick={() => actions.loadPreset('calm')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'calm' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Calm
          </button>
          <button
            onClick={() => actions.loadPreset('tight')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'tight' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Tight
          </button>
          <button
            onClick={() => actions.loadPreset('scattered')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'scattered' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Scattered
          </button>
          <button
            onClick={() => actions.loadPreset('aggressive')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'aggressive' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Aggressive
          </button>
          <button
            onClick={() => actions.loadPreset('gentle')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'gentle' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Gentle
          </button>
          <button
            onClick={() => actions.loadPreset('chaotic')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'chaotic' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Chaotic
          </button>
          <button
            onClick={() => actions.loadPreset('organized')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'organized' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Organized
          </button>
          <button
            onClick={() => actions.loadPreset('minimal')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedBehaviorPreset === 'minimal' 
                ? 'bg-accent/40 text-accent font-semibold' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            Minimal
          </button>
          <button
            onClick={actions.resetSimulation}
            className="px-1 py-0.5 bg-warning/20 hover:bg-warning/30 text-warning rounded text-xs transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="space-y-0.5">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wide">Camera Presets</h4>
        <div className="grid grid-cols-3 gap-0.5">
          <button
            onClick={() => actions.loadCameraPreset('default')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedCameraPreset === 'default' 
                ? 'bg-success/40 text-success font-semibold' 
                : 'bg-success/20 hover:bg-success/30 text-success'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => actions.loadCameraPreset('close')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedCameraPreset === 'close' 
                ? 'bg-success/40 text-success font-semibold' 
                : 'bg-success/20 hover:bg-success/30 text-success'
            }`}
          >
            Close
          </button>
          <button
            onClick={() => actions.loadCameraPreset('far')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedCameraPreset === 'far' 
                ? 'bg-success/40 text-success font-semibold' 
                : 'bg-success/20 hover:bg-success/30 text-success'
            }`}
          >
            Far
          </button>
          <button
            onClick={() => actions.loadCameraPreset('action')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedCameraPreset === 'action' 
                ? 'bg-success/40 text-success font-semibold' 
                : 'bg-success/20 hover:bg-success/30 text-success'
            }`}
          >
            Action
          </button>
          <button
            onClick={() => actions.loadCameraPreset('follow')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedCameraPreset === 'follow' 
                ? 'bg-success/40 text-success font-semibold' 
                : 'bg-success/20 hover:bg-success/30 text-success'
            }`}
          >
            Follow
          </button>
          <button
            onClick={() => actions.loadCameraPreset('single-fish')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedCameraPreset === 'single-fish' 
                ? 'bg-success/40 text-success font-semibold' 
                : 'bg-success/20 hover:bg-success/30 text-success'
            }`}
          >
            Single Fish
          </button>
          <button
            onClick={() => actions.loadCameraPreset('corner')}
            className={`px-1 py-0.5 rounded text-xs transition-colors ${
              ui.selectedCameraPreset === 'corner' 
                ? 'bg-success/40 text-success font-semibold' 
                : 'bg-success/20 hover:bg-success/30 text-success'
            }`}
          >
            Corner
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="absolute left-4 top-4 bottom-4 w-80 pointer-events-auto">
      <div className="glass-panel h-full p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-text">Sardines Simulation</h2>
          <button
            onClick={actions.toggleSidebar}
            className="text-muted hover:text-text transition-colors"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Consolidated Content */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {/* Flocking Behavior Section */}
          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
              <span className="mr-2">🐟</span>Flocking Behavior
            </h3>
            {renderBehaviorControls()}
          </div>

          {/* Individual Movement Section */}
          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
              <span className="mr-2">⚡</span>Individual Movement
            </h3>
            {renderPhysicsControls()}
          </div>

          {/* Animation & Rendering Section */}
          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
              <span className="mr-2">🎨</span>Animation & Rendering
            </h3>
            {renderRenderingControls()}
          </div>

          {/* Presets Section */}
          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
              <span className="mr-2">📊</span>Presets & Controls
            </h3>
            {renderPerformanceControls()}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-1 pt-1 border-t border-hairline">
          <div className="text-xs text-muted text-center">
            Press <kbd className="px-1 py-0.5 bg-bg1 rounded text-xs">B</kbd> to toggle sidebar
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar