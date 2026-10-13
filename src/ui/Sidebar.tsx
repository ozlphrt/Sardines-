import React, { useState } from 'react'
import { useSimulationStore } from '../stores/simulationStore'
import Slider from './Slider'
import ToggleSwitch from './ToggleSwitch'

type CategoryId = 'boids' | 'shark' | 'fish' | 'ocean' | 'camera'

interface CategoryDef {
  id: CategoryId
  label: string
  icon: string
  subtabs: { id: string; label: string }[]
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'boids',
    label: 'School & Boids',
    icon: '🐟',
    subtabs: [
      { id: 'forces', label: 'Forces' },
      { id: 'cyclone', label: 'Whirlpool' },
      { id: 'perception', label: 'Perception' },
      { id: 'elasticity', label: 'Elasticity' },
      { id: 'presets', label: 'Presets' }
    ]
  },
  {
    id: 'shark',
    label: 'Predator & Shark',
    icon: '🦈',
    subtabs: [
      { id: 'patrol', label: 'Patrol' },
      { id: 'panic', label: 'Evasion' }
    ]
  },
  {
    id: 'fish',
    label: 'Fish & Population',
    icon: '🐠',
    subtabs: [
      { id: 'population', label: 'Population' },
      { id: 'material', label: 'Material' },
      { id: 'swimming', label: 'Locomotion' }
    ]
  },
  {
    id: 'ocean',
    label: 'Ocean & World',
    icon: '🌊',
    subtabs: [
      { id: 'water', label: 'Atmosphere' },
      { id: 'seabed', label: 'Seabed' }
    ]
  },
  {
    id: 'camera',
    label: 'Camera & System',
    icon: '🎬',
    subtabs: [
      { id: 'views', label: 'Views' },
      { id: 'system', label: 'System' }
    ]
  }
]

const Sidebar: React.FC = () => {
  const { ui, parameters, actions, sharkVisible, sharkPatrol } = useSimulationStore()
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>('boids')
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [activeSubtabs, setActiveSubtabs] = useState<Record<CategoryId, string>>({
    boids: 'forces',
    shark: 'patrol',
    fish: 'population',
    ocean: 'water',
    camera: 'views'
  })

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {
      // Fallback below
    }
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      textArea.remove()
      return true
    } catch {
      textArea.remove()
      return false
    }
  }

  const handleCopyConfig = async (type: 'all' | 'behavior' | 'json') => {
    let content = ''
    if (type === 'json') {
      content = JSON.stringify(parameters, null, 2)
    } else if (type === 'behavior') {
      content = `// Sardines Simulation - Behavior Parameters
export const customBehavior = ${JSON.stringify(parameters.behavior, null, 2)};`
    } else {
      content = `// Sardines GPU Flocking Simulation - Parameters Export
// Generated: ${new Date().toISOString()}

export const defaultBehavior = {
  cohesionStrength: ${parameters.behavior.cohesionStrength},
  separationStrength: ${parameters.behavior.separationStrength},
  alignmentStrength: ${parameters.behavior.alignmentStrength},
  neighborRadius: ${parameters.behavior.neighborRadius},
  separationRadius: ${parameters.behavior.separationRadius},
  collisionRadius: ${parameters.behavior.collisionRadius},
  socialWeight: ${parameters.behavior.socialWeight},
  individualWeight: ${parameters.behavior.individualWeight},
  maxTurnRate: ${parameters.behavior.maxTurnRate},
  accelerationRate: ${parameters.behavior.accelerationRate},
  directionChangeInterval: ${parameters.behavior.directionChangeInterval},
  turnSmoothness: ${parameters.behavior.turnSmoothness},
  waveDelayFactor: ${parameters.behavior.waveDelayFactor},
  clusterBias: ${parameters.behavior.clusterBias},
  edgeSpeedMultiplier: ${parameters.behavior.edgeSpeedMultiplier},
  burstMultiplier: ${parameters.behavior.burstMultiplier},
  compressionStrength: ${parameters.behavior.compressionStrength},
  baitBallDuration: ${parameters.behavior.baitBallDuration},
  recoveryDuration: ${parameters.behavior.recoveryDuration},
  seabedAvoidanceStrength: ${parameters.behavior.seabedAvoidanceStrength},
  obstacleLookAheadDistance: ${parameters.behavior.obstacleLookAheadDistance},
  preferredDepthBand: ${parameters.behavior.preferredDepthBand},
  undulationFrequency: ${parameters.behavior.undulationFrequency},
  undulationAmplitude: ${parameters.behavior.undulationAmplitude}
};

export const defaultPhysics = {
  maxSpeed: ${parameters.physics.maxSpeed},
  maxForce: ${parameters.physics.maxForce},
  maxAcceleration: ${parameters.physics.maxAcceleration}
};

export const defaultRendering = {
  fishCount: ${parameters.rendering.fishCount},
  modelScale: ${parameters.rendering.modelScale},
  lightingIntensity: ${parameters.rendering.lightingIntensity},
  metalness: ${parameters.rendering.metalness},
  roughness: ${parameters.rendering.roughness},
  envMapIntensity: ${parameters.rendering.envMapIntensity},
  emissiveIntensity: ${parameters.rendering.emissiveIntensity},
  fogDensity: ${parameters.rendering.fogDensity},
  fogColor: '${parameters.rendering.fogColor}',
  particleCount: ${parameters.rendering.particleCount},
  particleOpacity: ${parameters.rendering.particleOpacity},
  blueFilterIntensity: ${parameters.rendering.blueFilterIntensity},
  selectedSpecies: '${parameters.rendering.selectedSpecies}'
};
`
    }

    const ok = await copyToClipboard(content)
    if (ok) {
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2500)
    }
  }

  if (!ui.sidebarVisible) return null

  const handleCategoryClick = (catId: CategoryId) => {
    if (activeCategory === catId) {
      // Toggle off flyout if clicked again
      setActiveCategory(null)
    } else {
      setActiveCategory(catId)
    }
  }

  const setSubtab = (catId: CategoryId, subtabId: string) => {
    setActiveSubtabs((prev) => ({ ...prev, [catId]: subtabId }))
  }

  const activeCategoryDef = CATEGORIES.find((c) => c.id === activeCategory)
  const currentSubtab = activeCategory ? activeSubtabs[activeCategory] : ''

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {/* ------------------------------------------------------------- */}
      {/* SIDEWAYS FLYOUT SUB-PANEL (Opens to the left of the main dock) */}
      {/* ------------------------------------------------------------- */}
      {activeCategoryDef && (
        <div
          id="sidebar-flyout-subpanel"
          className="pointer-events-auto fixed right-[228px] md:right-[244px] top-4 bottom-4 w-[340px] md:w-[380px] bg-[#081524]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-6 duration-200"
        >
          {/* Sub-panel Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{activeCategoryDef.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {activeCategoryDef.label}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  Configuring {activeCategoryDef.subtabs.find(s => s.id === currentSubtab)?.label}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              title="Close sub-panel"
            >
              ✕
            </button>
          </div>

          {/* Sub-group Tabs (Pill Bar) */}
          <div className="flex items-center gap-1.5 p-2 bg-black/20 border-b border-white/10 overflow-x-auto no-scrollbar">
            {activeCategoryDef.subtabs.map((tab) => {
              const isActive = currentSubtab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSubtab(activeCategoryDef.id, tab.id)}
                  className={`flex-1 min-w-[70px] py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                    isActive
                      ? 'bg-[#2fa1d6] text-white shadow-md shadow-[#2fa1d6]/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Sub-panel Content (Scrollable with clean modern controls) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {/* 1. BOIDS / SCHOOL CONTENT */}
            {activeCategory === 'boids' && (
              <>
                {currentSubtab === 'forces' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Reynolds Steering Forces
                    </div>
                    <Slider
                      label="Cohesion (Bait Ball Pull)"
                      value={parameters.behavior.cohesionStrength}
                      min={0}
                      max={5}
                      step={0.1}
                      onChange={(v) => actions.updateParameter('behavior', 'cohesionStrength', v)}
                    />
                    <Slider
                      label="Alignment (Velocity Sync)"
                      value={parameters.behavior.alignmentStrength}
                      min={0}
                      max={5}
                      step={0.1}
                      onChange={(v) => actions.updateParameter('behavior', 'alignmentStrength', v)}
                    />
                    <Slider
                      label="Separation (Collision Avoid)"
                      value={parameters.behavior.separationStrength}
                      min={0}
                      max={5}
                      step={0.1}
                      onChange={(v) => actions.updateParameter('behavior', 'separationStrength', v)}
                    />
                    <div className="pt-2 border-t border-white/10">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Social Weighting
                      </div>
                      <Slider
                        label="Social Influence Weight"
                        value={parameters.behavior.socialWeight}
                        min={0}
                        max={1}
                        step={0.05}
                        onChange={(v) => actions.updateParameter('behavior', 'socialWeight', v)}
                      />
                      <Slider
                        label="Individual Wander Weight"
                        value={parameters.behavior.individualWeight}
                        min={0}
                        max={1}
                        step={0.05}
                        onChange={(v) => actions.updateParameter('behavior', 'individualWeight', v)}
                      />
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => actions.triggerWhirlpool()}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600/40 via-sky-500/40 to-blue-600/40 hover:from-cyan-500/60 hover:to-blue-500/60 border border-cyan-400/40 text-cyan-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/30 cursor-pointer active:scale-95"
                      >
                        <span className="text-base animate-spin" style={{ animationDuration: '4s' }}>🌀</span>
                        <span>Trigger Oceanic Whirlpool</span>
                      </button>
                    </div>
                  </div>
                )}

                {currentSubtab === 'cyclone' && (
                  <div className="space-y-4">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Oceanic Whirlpool & Cyclone Vortex
                    </div>
                    <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 p-3.5 rounded-xl border border-cyan-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs">
                        <span className="text-lg">🌀</span>
                        <span>Bait-Ball Cyclone Simulator</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Sardines naturally congregate into dynamic rotating cyclones every ~18s to confuse predators, spiraling in a 3D helical vortex.
                      </p>
                      <button
                        type="button"
                        onClick={() => actions.triggerWhirlpool()}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30 cursor-pointer active:scale-95"
                      >
                        <span className="text-base">🌀</span>
                        <span>Engage Whirlpool Cyclone Now</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <Slider
                        label="Vortex Rotational Strength"
                        value={parameters.behavior.whirlpoolStrength ?? 1.8}
                        min={0.5}
                        max={4.0}
                        step={0.1}
                        onChange={(v) => actions.updateParameter('behavior', 'whirlpoolStrength', v)}
                      />
                      <Slider
                        label="Vortex Suction Radius"
                        value={parameters.behavior.whirlpoolRadius ?? 110.0}
                        min={40}
                        max={200}
                        step={5}
                        unit="u"
                        onChange={(v) => actions.updateParameter('behavior', 'whirlpoolRadius', v)}
                      />
                    </div>
                  </div>
                )}

                {currentSubtab === 'perception' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Sensory Awareness Radii
                    </div>
                    <Slider
                      label="Neighbor Perception Reach"
                      value={parameters.behavior.neighborRadius}
                      min={10}
                      max={150}
                      step={1}
                      unit="u"
                      onChange={(v) => actions.updateParameter('behavior', 'neighborRadius', v)}
                    />
                    <Slider
                      label="Personal Separation Bubble"
                      value={parameters.behavior.separationRadius}
                      min={2}
                      max={30}
                      step={0.5}
                      unit="u"
                      onChange={(v) => actions.updateParameter('behavior', 'separationRadius', v)}
                    />
                    <Slider
                      label="Direct Collision Boundary"
                      value={parameters.behavior.collisionRadius}
                      min={1}
                      max={20}
                      step={0.5}
                      unit="u"
                      onChange={(v) => actions.updateParameter('behavior', 'collisionRadius', v)}
                    />
                  </div>
                )}

                {currentSubtab === 'elasticity' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      School Hydrodynamics & Wave
                    </div>
                    <Slider
                      label="Wave Delay Factor"
                      value={parameters.behavior.waveDelayFactor}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('behavior', 'waveDelayFactor', v)}
                    />
                    <Slider
                      label="Cluster Core Bias"
                      value={parameters.behavior.clusterBias}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('behavior', 'clusterBias', v)}
                    />
                    <Slider
                      label="Edge Fish Speed Multiplier"
                      value={parameters.behavior.edgeSpeedMultiplier}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(v) => actions.updateParameter('behavior', 'edgeSpeedMultiplier', v)}
                    />
                  </div>
                )}

                {currentSubtab === 'presets' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Curated Schooling Formations
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'calm', name: 'Calm Flow', desc: 'Relaxed gliding' },
                        { id: 'tight', name: 'Tight Bait Ball', desc: 'Dense defensive sphere' },
                        { id: 'aggressive', name: 'Aggressive', desc: 'Fast darting turns' },
                        { id: 'gentle', name: 'Gentle Drift', desc: 'Smooth lazy drift' },
                        { id: 'scattered', name: 'Scattered', desc: 'Loose open foraging' },
                        { id: 'chaotic', name: 'Chaotic Swarm', desc: 'Frenetic schooling' },
                        { id: 'organized', name: 'Organized Wave', desc: 'Parallel undulation' },
                        { id: 'minimal', name: 'Minimalist', desc: 'Clean quiet school' }
                      ].map((preset) => {
                        const isSelected = ui.selectedBehaviorPreset === preset.id
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => actions.loadPreset(preset.id)}
                            className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-[#2fa1d6]/20 border-[#2fa1d6] text-white shadow-lg shadow-[#2fa1d6]/20'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                            }`}
                          >
                            <div className="text-xs font-bold">{preset.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{preset.desc}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 2. SHARK / PREDATOR CONTENT */}
            {activeCategory === 'shark' && (
              <>
                {currentSubtab === 'patrol' && (
                  <div className="space-y-4">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Predator State & Patrol
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
                      <ToggleSwitch
                        label="3-Shark Pack Active"
                        description="Apex leader and two flanker Great Whites swimming in pack formation"
                        checked={sharkVisible}
                        onChange={(v) => actions.setSharkVisible(v)}
                      />
                      <div className="border-t border-white/10 pt-2">
                        <ToggleSwitch
                          label="Autonomous Hunting Patrol"
                          description="Sharks autonomously stalk and coordinate hunting on the bait ball"
                          checked={sharkPatrol}
                          onChange={(v) => actions.setSharkPatrol(v)}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Slider
                        label="Shark Pack Scale"
                        value={parameters.behavior.sharkScale ?? 8.5}
                        min={3}
                        max={25}
                        step={0.5}
                        unit="u"
                        onChange={(v) => actions.updateParameter('behavior', 'sharkScale', v)}
                      />
                    </div>
                    <div className="p-3 bg-sky-500/10 border border-sky-400/20 rounded-xl text-xs text-sky-200">
                      💡 <strong>Tip:</strong> You can hold <kbd className="px-1.5 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]">Ctrl</kbd> and click anywhere in the water to send the shark pack attacking that location!
                    </div>
                  </div>
                )}

                {currentSubtab === 'panic' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Evasion & Scatter Dynamics
                    </div>
                    <Slider
                      label="Burst Evasion Speed"
                      value={parameters.behavior.burstMultiplier}
                      min={1}
                      max={5}
                      step={0.1}
                      unit="x"
                      onChange={(v) => actions.updateParameter('behavior', 'burstMultiplier', v)}
                    />
                    <Slider
                      label="Bait Ball Compression Strength"
                      value={parameters.behavior.compressionStrength}
                      min={0}
                      max={10}
                      step={0.5}
                      onChange={(v) => actions.updateParameter('behavior', 'compressionStrength', v)}
                    />
                    <Slider
                      label="Panic Duration (ms)"
                      value={parameters.behavior.baitBallDuration}
                      min={1000}
                      max={8000}
                      step={250}
                      precision={0}
                      unit="ms"
                      onChange={(v) => actions.updateParameter('behavior', 'baitBallDuration', v)}
                    />
                    <Slider
                      label="Recovery Regroup Time (ms)"
                      value={parameters.behavior.recoveryDuration}
                      min={2000}
                      max={12000}
                      step={500}
                      precision={0}
                      unit="ms"
                      onChange={(v) => actions.updateParameter('behavior', 'recoveryDuration', v)}
                    />
                  </div>
                )}
              </>
            )}

            {/* 3. FISH & POPULATION CONTENT */}
            {activeCategory === 'fish' && (
              <>
                {currentSubtab === 'population' && (
                  <div className="space-y-4">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Population & Mesh Sizing
                    </div>
                    <Slider
                      label="Fish Count"
                      value={parameters.rendering.fishCount}
                      min={500}
                      max={50000}
                      step={100}
                      precision={0}
                      onChange={(v) => actions.updateParameter('rendering', 'fishCount', v)}
                    />

                    {/* Quick preset chips */}
                    <div className="flex gap-1.5 pt-1">
                      {[1000, 5000, 10000, 25000, 50000].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => actions.updateParameter('rendering', 'fishCount', count)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            parameters.rendering.fishCount === count
                              ? 'bg-[#2fa1d6] text-white shadow-md shadow-[#2fa1d6]/30'
                              : 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white'
                          }`}
                        >
                          {count >= 1000 ? `${count / 1000}k` : count}
                        </button>
                      ))}
                    </div>

                    {/* Resolution / Performance Quality presets */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-slate-300">
                          Render Resolution Scale
                        </label>
                        <span className="text-[11px] font-mono text-[#2fa1d6] font-bold">
                          {((parameters.rendering.resolutionScale ?? 1.0) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {[
                          { label: '0.85x Ultra', value: 0.85 },
                          { label: '1.0x 60FPS', value: 1.0 },
                          { label: '1.25x Crisp', value: 1.25 },
                        ].map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => actions.updateParameter('rendering', 'resolutionScale', item.value)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                              (parameters.rendering.resolutionScale ?? 1.0) === item.value
                                ? 'bg-[#2fa1d6] text-white shadow-md shadow-[#2fa1d6]/30'
                                : 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Slider
                      label="Fish Model Scale"
                      value={parameters.rendering.modelScale}
                      min={0.5}
                      max={6.0}
                      step={0.1}
                      onChange={(v) => actions.updateParameter('rendering', 'modelScale', v)}
                    />

                    <div className="pt-2 border-t border-white/10">
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Selected Species
                      </label>
                      <select
                        className="w-full bg-black/40 text-slate-200 border border-white/20 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#2fa1d6] transition-colors cursor-pointer"
                        value={parameters.rendering.selectedSpecies}
                        onChange={(e) => actions.updateParameter('rendering', 'selectedSpecies', e.target.value)}
                      >
                        <option value="sardine">Pacific Sardine (High Detail)</option>
                        <option value="tropical">Tropical Reef Fish (Animated)</option>
                        <option value="school">Oceanic Fish School</option>
                        <option value="mixed">Mixed Species Combination</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentSubtab === 'material' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Scale Shimmer & Lighting Optics
                    </div>
                    <Slider
                      label="Metallic Sheen"
                      value={parameters.rendering.metalness}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('rendering', 'metalness', v)}
                    />
                    <Slider
                      label="Scale Smoothness"
                      value={1 - parameters.rendering.roughness}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('rendering', 'roughness', 1 - v)}
                    />
                    <Slider
                      label="Environment Reflection"
                      value={parameters.rendering.envMapIntensity}
                      min={0}
                      max={5}
                      step={0.1}
                      onChange={(v) => actions.updateParameter('rendering', 'envMapIntensity', v)}
                    />
                    <Slider
                      label="Subsurface Glow / Emissive"
                      value={parameters.rendering.emissiveIntensity}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('rendering', 'emissiveIntensity', v)}
                    />
                  </div>
                )}

                {currentSubtab === 'swimming' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Locomotion & Spine Undulation
                    </div>
                    <Slider
                      label="Max Swimming Speed"
                      value={parameters.physics.maxSpeed}
                      min={20}
                      max={300}
                      step={5}
                      precision={0}
                      onChange={(v) => actions.updateParameter('physics', 'maxSpeed', v)}
                    />
                    <Slider
                      label="Acceleration Snappiness"
                      value={parameters.behavior.accelerationRate}
                      min={1}
                      max={20}
                      step={0.5}
                      onChange={(v) => actions.updateParameter('behavior', 'accelerationRate', v)}
                    />
                    <Slider
                      label="Turn Rate Agility"
                      value={parameters.behavior.maxTurnRate}
                      min={0.5}
                      max={10}
                      step={0.2}
                      onChange={(v) => actions.updateParameter('behavior', 'maxTurnRate', v)}
                    />
                    <Slider
                      label="Spine Undulation Freq"
                      value={parameters.behavior.undulationFrequency}
                      min={1}
                      max={10}
                      step={0.5}
                      onChange={(v) => actions.updateParameter('behavior', 'undulationFrequency', v)}
                    />
                    <Slider
                      label="Spine Undulation Amp"
                      value={parameters.behavior.undulationAmplitude}
                      min={0.1}
                      max={1.0}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('behavior', 'undulationAmplitude', v)}
                    />
                  </div>
                )}
              </>
            )}

            {/* 4. OCEAN & ENVIRONMENT CONTENT */}
            {activeCategory === 'ocean' && (
              <>
                {currentSubtab === 'water' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Water Optics & Particulates
                    </div>
                    <Slider
                      label="Deep Blue Oceanic Filter"
                      value={parameters.rendering.blueFilterIntensity}
                      min={0}
                      max={2}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('rendering', 'blueFilterIntensity', v)}
                    />
                    <Slider
                      label="Underwater Fog Density"
                      value={parameters.rendering.fogDensity}
                      min={0}
                      max={0.03}
                      step={0.0005}
                      precision={4}
                      onChange={(v) => actions.updateParameter('rendering', 'fogDensity', v)}
                    />
                    <Slider
                      label="Floating Marine Snow Count"
                      value={parameters.rendering.particleCount}
                      min={100}
                      max={5000}
                      step={100}
                      precision={0}
                      onChange={(v) => actions.updateParameter('rendering', 'particleCount', v)}
                    />
                    <Slider
                      label="Particle Opacity"
                      value={parameters.rendering.particleOpacity}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={(v) => actions.updateParameter('rendering', 'particleOpacity', v)}
                    />
                    <Slider
                      label="Sunlight Illumination"
                      value={parameters.rendering.lightingIntensity}
                      min={0}
                      max={5}
                      step={0.1}
                      onChange={(v) => actions.updateParameter('rendering', 'lightingIntensity', v)}
                    />
                  </div>
                )}

                {currentSubtab === 'seabed' && (
                  <div className="space-y-4">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Seabed & Boundaries
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
                      <ToggleSwitch
                        label="Coral Sea Floor Model"
                        description="Realistic underwater coral terrain below"
                        checked={parameters.seaFloor.enabled}
                        onChange={() => actions.toggleSeaFloor()}
                      />
                      <div className="border-t border-white/10 pt-2">
                        <ToggleSwitch
                          label="Swimmable Area Boundary Box"
                          description="Display bounding cage helper lines"
                          checked={parameters.walls.showSwimmableArea}
                          onChange={() =>
                            actions.updateWallParameter('showSwimmableArea', !parameters.walls.showSwimmableArea)
                          }
                        />
                      </div>
                    </div>
                    <Slider
                      label="Seabed Avoidance Force"
                      value={parameters.behavior.seabedAvoidanceStrength}
                      min={0}
                      max={5}
                      step={0.2}
                      onChange={(v) => actions.updateParameter('behavior', 'seabedAvoidanceStrength', v)}
                    />
                    <Slider
                      label="Obstacle Lookahead Distance"
                      value={parameters.behavior.obstacleLookAheadDistance}
                      min={5}
                      max={50}
                      step={1}
                      unit="u"
                      onChange={(v) => actions.updateParameter('behavior', 'obstacleLookAheadDistance', v)}
                    />
                  </div>
                )}
              </>
            )}

            {/* 5. CAMERA & SYSTEM CONTENT */}
            {activeCategory === 'camera' && (
              <>
                {currentSubtab === 'views' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Cinematic Camera Presets
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'default', name: 'Overview', desc: 'Wide ocean angle' },
                        { id: 'single-fish', name: 'Single Sardine', desc: 'Intimate companion' },
                        { id: 'follow', name: 'Follow School', desc: 'Trailing bait ball' },
                        { id: 'action', name: 'Action Cam', desc: 'Dynamic chase view' },
                        { id: 'dolly-cam', name: 'Dolly View', desc: 'Smooth cinematic track' },
                        { id: 'close', name: 'Macro View', desc: 'High-detail close up' }
                      ].map((preset) => {
                        const isSelected = ui.selectedCameraPreset === preset.id
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => actions.loadCameraPreset(preset.id)}
                            className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                            }`}
                          >
                            <div className="text-xs font-bold">{preset.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{preset.desc}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {currentSubtab === 'system' && (
                  <div className="space-y-4">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Code Export & Utilities
                    </div>

                    {/* Code Export Box */}
                    <div className="p-3.5 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 border border-cyan-500/30 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">📋</span>
                          <span className="font-semibold text-white text-xs">Copy Parameters Code</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 border border-cyan-400/30 px-1.5 py-0.5 rounded">
                          TS / JS
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Copy live parameters formatted as clean constants ready to paste into <code className="text-cyan-300 font-mono">simulationStore.ts</code>.
                      </p>

                      <div className="space-y-2 pt-1">
                        <button
                          id="flyout-copy-full-btn"
                          type="button"
                          onClick={() => handleCopyConfig('all')}
                          className={`w-full py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                            copiedType === 'all'
                              ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-emerald-500/30'
                              : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/40 text-cyan-200 hover:text-white shadow-cyan-500/10'
                          }`}
                        >
                          <span className="text-sm">{copiedType === 'all' ? '✓' : '📋'}</span>
                          <span>{copiedType === 'all' ? 'Copied Full Parameters!' : 'Copy Full Config (TS Constants)'}</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyConfig('behavior')}
                            className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              copiedType === 'behavior'
                                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                            }`}
                          >
                            <span>{copiedType === 'behavior' ? '✓' : '🐟'}</span>
                            <span>Behavior Only</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyConfig('json')}
                            className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              copiedType === 'json'
                                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                            }`}
                          >
                            <span>{copiedType === 'json' ? '✓' : '📦'}</span>
                            <span>Raw JSON</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Simulation Actions
                    </div>
                    <button
                      type="button"
                      onClick={actions.resetSimulation}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-rose-500/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>🔄</span>
                      <span>Reset Simulation Defaults</span>
                    </button>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs text-slate-300">
                      <div className="font-semibold text-white mb-1">Keyboard Shortcuts</div>
                      <div className="flex justify-between items-center">
                        <span>Toggle Sidebar</span>
                        <kbd className="px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]">B</kbd>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Toggle Bottom HUD</span>
                        <kbd className="px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]">H</kbd>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Cycle Camera Preset</span>
                        <kbd className="px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]">C</kbd>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Direct Shark Attack</span>
                        <kbd className="px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]">Ctrl + Click</kbd>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PRIMARY RIGHT DOCK (Main category list on the right edge)     */}
      {/* ------------------------------------------------------------- */}
      <div
        id="sidebar-primary-dock"
        className="pointer-events-auto fixed right-4 top-4 bottom-4 w-[200px] md:w-[220px] bg-[#081524]/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl flex flex-col justify-between p-3.5 select-none"
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2fa1d6] animate-pulse shadow-sm shadow-[#2fa1d6]" />
              <h2 className="text-sm font-bold text-white tracking-wide">
                Controls
              </h2>
            </div>
            <button
              type="button"
              onClick={actions.toggleSidebar}
              className="w-6 h-6 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              title="Hide sidebar (B)"
            >
              ✕
            </button>
          </div>

          {/* Categories Navigation */}
          <nav className="space-y-1.5" aria-label="Simulation Categories">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  id={`sidebar-category-${cat.id}`}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                    isActive
                      ? 'bg-[#2fa1d6]/20 border-[#2fa1d6]/50 text-white shadow-lg shadow-[#2fa1d6]/20 font-semibold'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-[13px] font-medium tracking-tight">
                      {cat.label}
                    </span>
                  </div>
                  <span
                    className={`text-base font-bold transition-transform duration-200 ${
                      isActive ? 'text-[#2fa1d6] -translate-x-1' : 'text-white/30'
                    }`}
                  >
                    ‹
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom Status / Footer */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          {/* Copy Config to Clipboard */}
          <button
            id="sidebar-copy-code-btn"
            type="button"
            onClick={() => handleCopyConfig('all')}
            className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md ${
              copiedType === 'all'
                ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-emerald-500/20 scale-[1.02]'
                : 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-400/40 text-cyan-300 hover:text-white shadow-cyan-500/10'
            }`}
            title="Copy current parameters formatted for code"
          >
            <span>{copiedType === 'all' ? '✓' : '📋'}</span>
            <span>{copiedType === 'all' ? 'Copied to Clipboard!' : 'Copy Config for Code'}</span>
          </button>

          <button
            type="button"
            onClick={actions.resetSimulation}
            className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>🔄</span>
            <span>Reset Defaults</span>
          </button>
          <div className="text-[10px] text-center text-slate-500 tracking-wider uppercase font-mono">
            Press &apos;B&apos; to toggle
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar