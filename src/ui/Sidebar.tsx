import React from 'react'
import { useSimulationStore } from '../stores/simulationStore'
import HoverDrag from './HoverDrag'

const Sidebar: React.FC = () => {
  const { ui, parameters, actions } = useSimulationStore()



  const renderBehaviorControls = () => (
    <div className="space-y-0.5">
      <HoverDrag
        label="Cohesion"
        value={parameters.behavior.cohesionStrength}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'cohesionStrength', value)}
        description="How strongly fish move toward center of neighbors"
      />
      <HoverDrag
        label="Separation"
        value={parameters.behavior.separationStrength}
        min={0}
        max={3}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'separationStrength', value)}
        description="How strongly fish avoid crowding"
      />
      <HoverDrag
        label="Alignment"
        value={parameters.behavior.alignmentStrength}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'alignmentStrength', value)}
        description="How strongly fish match neighbor velocities"
      />
             <HoverDrag
         label="Cohesion Radius"
         value={parameters.behavior.cohesionRadius}
         min={20}
         max={200}
         step={5}
         onChange={(value) => actions.updateParameter('behavior', 'cohesionRadius', value)}
         description="Distance for cohesion behavior"
       />
       <HoverDrag
         label="Separation Radius"
         value={parameters.behavior.separationRadius}
         min={10}
         max={100}
         step={2}
         onChange={(value) => actions.updateParameter('behavior', 'separationRadius', value)}
         description="Distance for separation behavior"
       />
       <HoverDrag
         label="Alignment Radius"
         value={parameters.behavior.alignmentRadius}
         min={20}
         max={200}
         step={5}
         onChange={(value) => actions.updateParameter('behavior', 'alignmentRadius', value)}
         description="Distance for alignment behavior"
       />
      <HoverDrag
        label="Collision Avoidance"
        value={parameters.behavior.collisionAvoidanceStrength}
        min={0}
        max={5}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'collisionAvoidanceStrength', value)}
        description="How strongly fish avoid direct collisions"
      />
      <HoverDrag
        label="Edge Avoidance"
        value={parameters.behavior.edgeAvoidanceStrength}
        min={0}
        max={3}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'edgeAvoidanceStrength', value)}
        description="How strongly fish avoid swimming near boundaries"
      />
      <HoverDrag
        label="Environmental Forces"
        value={parameters.behavior.environmentalForceStrength}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) => actions.updateParameter('behavior', 'environmentalForceStrength', value)}
        description="Strength of underwater currents and environmental effects"
      />
    </div>
  )

  const renderPhysicsControls = () => (
    <div className="space-y-0.5">
             <HoverDrag
         label="Max Speed"
         value={parameters.physics.maxSpeed}
         min={10}
         max={80}
         step={2}
         onChange={(value) => actions.updateParameter('physics', 'maxSpeed', value)}
         description="Maximum fish swimming speed"
       />
      <HoverDrag
        label="Max Force"
        value={parameters.physics.maxForce}
        min={0.5}
        max={20}
        step={0.5}
        onChange={(value) => actions.updateParameter('physics', 'maxForce', value)}
        description="Maximum steering force applied"
      />
      <HoverDrag
        label="Max Acceleration"
        value={parameters.physics.maxAcceleration}
        min={5}
        max={30}
        step={1}
        onChange={(value) => actions.updateParameter('physics', 'maxAcceleration', value)}
        description="Maximum acceleration rate"
      />
    </div>
  )

  const renderRenderingControls = () => (
    <div className="space-y-0.5">
      <HoverDrag
        label="Fish Count"
        value={parameters.rendering.fishCount}
        min={50}
        max={1000}
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
                     {/* Behavior Section */}
           <div>
             <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
               <span className="mr-2">🐟</span>Behavior
             </h3>
            {renderBehaviorControls()}
          </div>

                     {/* Physics Section */}
           <div>
             <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
               <span className="mr-2">⚡</span>Physics
             </h3>
            {renderPhysicsControls()}
          </div>

                     {/* Rendering Section */}
           <div>
             <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
               <span className="mr-2">🎨</span>Rendering
             </h3>
            {renderRenderingControls()}
          </div>

                     {/* Performance Section */}
           <div>
             <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5 flex items-center">
               <span className="mr-2">📊</span>Performance
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
