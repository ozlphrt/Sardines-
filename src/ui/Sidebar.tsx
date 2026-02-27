import React, { useState } from 'react'
import { useSimulationStore } from '../stores/simulationStore'
import Slider from './Slider'

interface FolderProps {
  title: string
  children: React.ReactNode
  initialOpen?: boolean
}

const Folder: React.FC<FolderProps> = ({ title, children, initialOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  return (
    <div className="dat-gui-folder">
      <div
        className={`dat-gui-folder-header border-l-2 ${isOpen ? 'border-[#2fa1d6]' : 'border-transparent'} ${!isOpen ? 'dat-gui-folder-closed' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  )
}

const Sidebar: React.FC = () => {
  const { ui, parameters, actions } = useSimulationStore()

  if (!ui.sidebarVisible) return null

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[220px] z-[10000] pointer-events-auto overflow-y-auto dat-gui-panel custom-scrollbar">

      <Folder title="Flocking Behavior" initialOpen={true}>
        <Slider
          label="Cohesion"
          value={parameters.behavior.cohesionStrength}
          min={0} max={2}
          onChange={(v) => actions.updateParameter('behavior', 'cohesionStrength', v)}
        />
        <Slider
          label="Separation"
          value={parameters.behavior.separationStrength}
          min={0} max={5}
          onChange={(v) => actions.updateParameter('behavior', 'separationStrength', v)}
        />
        <Slider
          label="Alignment"
          value={parameters.behavior.alignmentStrength}
          min={0} max={2}
          onChange={(v) => actions.updateParameter('behavior', 'alignmentStrength', v)}
        />
        <Slider
          label="Reach Radius"
          value={parameters.behavior.neighborRadius}
          min={10} max={150}
          onChange={(v) => actions.updateParameter('behavior', 'neighborRadius', v)}
        />
        <Slider
          label="Separation Rad"
          value={parameters.behavior.separationRadius}
          min={2} max={30}
          onChange={(v) => actions.updateParameter('behavior', 'separationRadius', v)}
        />
        <Slider
          label="Collision Rad"
          value={parameters.behavior.collisionRadius}
          min={1} max={15}
          onChange={(v) => actions.updateParameter('behavior', 'collisionRadius', v)}
        />
        <Slider
          label="Individual Wt"
          value={parameters.behavior.individualWeight}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('behavior', 'individualWeight', v)}
        />
        <Slider
          label="Social Wt"
          value={parameters.behavior.socialWeight}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('behavior', 'socialWeight', v)}
        />
      </Folder>

      <Folder title="Movement & Physics" initialOpen={false}>
        <Slider
          label="Max Speed"
          value={parameters.physics.maxSpeed}
          min={20} max={300}
          onChange={(v) => actions.updateParameter('physics', 'maxSpeed', v)}
        />
        <Slider
          label="Acceleration"
          value={parameters.behavior.accelerationRate}
          min={1} max={20}
          onChange={(v) => actions.updateParameter('behavior', 'accelerationRate', v)}
        />
        <Slider
          label="Turn Rate"
          value={parameters.behavior.maxTurnRate}
          min={0.5} max={10}
          onChange={(v) => actions.updateParameter('behavior', 'maxTurnRate', v)}
        />
        <Slider
          label="Max Roll"
          value={parameters.behavior.maxRollAngle}
          min={0.1} max={1.5}
          onChange={(v) => actions.updateParameter('behavior', 'maxRollAngle', v)}
        />
        <Slider
          label="Roll Speed"
          value={parameters.behavior.rollSpeed}
          min={1} max={10}
          onChange={(v) => actions.updateParameter('behavior', 'rollSpeed', v)}
        />
      </Folder>

      <Folder title="Animation" initialOpen={false}>
        <Slider
          label="Undulation Freq"
          value={parameters.behavior.undulationFrequency}
          min={1} max={10}
          onChange={(v) => actions.updateParameter('behavior', 'undulationFrequency', v)}
        />
        <Slider
          label="Undulation Amp"
          value={parameters.behavior.undulationAmplitude}
          min={0.1} max={1.0}
          onChange={(v) => actions.updateParameter('behavior', 'undulationAmplitude', v)}
        />
        <Slider
          label="Change Int"
          value={parameters.behavior.directionChangeInterval}
          min={1} max={15}
          onChange={(v) => actions.updateParameter('behavior', 'directionChangeInterval', v)}
        />
        <Slider
          label="Smoothness"
          value={parameters.behavior.turnSmoothness}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('behavior', 'turnSmoothness', v)}
        />
      </Folder>

      <Folder title="Environment & Render" initialOpen={false}>
        <div className="dat-gui-row">
          <div className="dat-gui-label">Species</div>
          <div className="dat-gui-controller px-1">
            <select
              className="bg-[#111] text-[#ccc] border-none outline-none text-xs w-full py-0.5 cursor-pointer hover:bg-[#222]"
              value={parameters.rendering.selectedSpecies}
              onChange={(e) => actions.updateParameter('rendering', 'selectedSpecies', e.target.value)}
            >
              <option value="sardine">Sardine (Standard)</option>
              <option value="tropical">Tropical (Animated)</option>
              <option value="school">Fish School</option>
            </select>
          </div>
        </div>
        <Slider
          label="Fish Count"
          value={parameters.rendering.fishCount}
          min={10} max={1000}
          step={10}
          onChange={(v) => actions.updateParameter('rendering', 'fishCount', v)}
        />
        <Slider
          label="Fish Size"
          value={parameters.rendering.modelScale}
          min={0.1} max={10}
          onChange={(v) => actions.updateParameter('rendering', 'modelScale', v)}
        />
        <Slider
          label="Lighting"
          value={parameters.rendering.lightingIntensity}
          min={0} max={5}
          onChange={(v) => actions.updateParameter('rendering', 'lightingIntensity', v)}
        />
        <Slider
          label="Metallic"
          value={parameters.rendering.metalness}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('rendering', 'metalness', v)}
        />
        <Slider
          label="Smoothness"
          value={1 - parameters.rendering.roughness}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('rendering', 'roughness', 1 - v)}
        />
        <Slider
          label="Reflection"
          value={parameters.rendering.envMapIntensity}
          min={0} max={10}
          onChange={(v) => actions.updateParameter('rendering', 'envMapIntensity', v)}
        />
        <Slider
          label="Glow/Contrast"
          value={parameters.rendering.emissiveIntensity}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('rendering', 'emissiveIntensity', v)}
        />
        <Slider
          label="Fog Density"
          value={parameters.rendering.fogDensity}
          min={0} max={0.1}
          step={0.001}
          onChange={(v) => actions.updateParameter('rendering', 'fogDensity', v)}
        />
        <div className="dat-gui-row">
          <div className="dat-gui-label">Sea Floor</div>
          <div className="dat-gui-controller px-2">
            <input
              type="checkbox"
              className="accent-[#2fa1d6]"
              checked={parameters.seaFloor.enabled}
              onChange={() => actions.toggleSeaFloor()}
            />
          </div>
        </div>
      </Folder>

      <Folder title="Elasticity (New)" initialOpen={false}>
        <Slider
          label="Wave Delay"
          value={parameters.behavior.waveDelayFactor}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('behavior', 'waveDelayFactor', v)}
        />
        <Slider
          label="Cluster Bias"
          value={parameters.behavior.clusterBias}
          min={0} max={1}
          onChange={(v) => actions.updateParameter('behavior', 'clusterBias', v)}
        />
        <Slider
          label="Edge Speed Mult"
          value={parameters.behavior.edgeSpeedMultiplier}
          min={1} max={3}
          onChange={(v) => actions.updateParameter('behavior', 'edgeSpeedMultiplier', v)}
        />
      </Folder>

      <Folder title="Predator (New)" initialOpen={false}>
        <Slider
          label="Burst Power"
          value={parameters.behavior.burstMultiplier}
          min={1} max={5}
          onChange={(v) => actions.updateParameter('behavior', 'burstMultiplier', v)}
        />
        <Slider
          label="Compression"
          value={parameters.behavior.compressionStrength}
          min={0} max={10}
          onChange={(v) => actions.updateParameter('behavior', 'compressionStrength', v)}
        />
      </Folder>

      <Folder title="Environment (New)" initialOpen={false}>
        <Slider
          label="Seabed Avoid"
          value={parameters.behavior.seabedAvoidanceStrength}
          min={0} max={5}
          onChange={(v) => actions.updateParameter('behavior', 'seabedAvoidanceStrength', v)}
        />
        <Slider
          label="Reef Avoid"
          value={parameters.behavior.obstacleLookAheadDistance}
          min={5} max={50}
          onChange={(v) => actions.updateParameter('behavior', 'obstacleLookAheadDistance', v)}
        />
        <Slider
          label="Pref Depth"
          value={parameters.behavior.preferredDepthBand}
          min={0} max={50}
          onChange={(v) => actions.updateParameter('behavior', 'preferredDepthBand', v)}
        />
        <div className="dat-gui-row">
          <div className="dat-gui-label">Area Box</div>
          <div className="dat-gui-controller px-2">
            <input
              type="checkbox"
              className="accent-[#2fa1d6]"
              checked={parameters.walls.showSwimmableArea}
              onChange={() => actions.updateWallParameter('showSwimmableArea', !parameters.walls.showSwimmableArea)}
            />
          </div>
        </div>
      </Folder>

      <Folder title="Behavior Presets" initialOpen={false}>
        <div className="grid grid-cols-2 bg-[#272727]">
          {['calm', 'tight', 'aggressive', 'chaotic', 'gentle', 'scattered', 'organized', 'minimal'].map(preset => (
            <div key={preset} className="border-r border-b border-[#1a1a1a]">
              <button
                onClick={() => actions.loadPreset(preset)}
                className={`w-full py-1 text-[9px] uppercase tracking-tighter ${ui.selectedBehaviorPreset === preset ? 'bg-[#2fa1d6] text-white' : 'bg-[#303030] hover:bg-[#444] text-[#eee]'
                  }`}
              >
                {preset}
              </button>
            </div>
          ))}
        </div>
      </Folder>

      <Folder title="Camera Presets" initialOpen={false}>
        <div className="grid grid-cols-2 bg-[#272727]">
          {['default', 'close', 'dolly-cam', 'follow', 'action', 'single-fish'].map(preset => (
            <div key={preset} className="border-r border-b border-[#1a1a1a]">
              <button
                onClick={() => actions.loadCameraPreset(preset)}
                className={`w-full py-1 text-[9px] uppercase tracking-tighter ${ui.selectedCameraPreset === preset ? 'bg-[#44b544] text-white' : 'bg-[#303030] hover:bg-[#444] text-[#eee]'
                  }`}
              >
                {preset.replace('-', ' ')}
              </button>
            </div>
          ))}
        </div>
      </Folder>

      <div className="border-b border-[#272727]">
        <button
          onClick={actions.resetSimulation}
          className="w-full h-[20px] bg-[#d64a2f]/20 hover:bg-[#d64a2f]/40 text-[#d64a2f] text-[9px] font-bold uppercase transition-colors"
        >
          Reset Simulation
        </button>
      </div>

      <div className="text-[8px] text-center text-[#444] py-1 uppercase tracking-widest bg-[#111]">
        'B' to Toggle
      </div>
    </div>
  )
}

export default Sidebar