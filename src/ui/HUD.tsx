import React, { useState, useRef, useEffect } from 'react'
import { useSimulationStore } from '../stores/simulationStore'

const PRESETS = [1000, 5000, 10000, 25000, 50000]

const HUD: React.FC = () => {
  const { performance, parameters, actions } = useSimulationStore()
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const currentCount = parameters.rendering.fishCount || performance.fishCount || 25000

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-success'
    if (fps >= 45) return 'text-warning'
    return 'text-danger'
  }

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    actions.updateParameter('rendering', 'fishCount', val)
  }

  const sliderPercent = Math.max(0, Math.min(100, ((currentCount - 100) / (50000 - 100)) * 100))

  return (
    <div className="absolute bottom-4 left-4 pointer-events-auto z-40" ref={popupRef}>
      {/* Popover Slider Panel */}
      {isOpen && (
        <div className="mb-2.5 p-3.5 w-72 rounded-xl bg-[#0a1624]/90 backdrop-blur-xl border border-white/20 shadow-2xl text-xs select-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-wide">Fish Population</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#2fa1d6]/20 text-[#2fa1d6] font-mono font-bold text-xs">
                {currentCount.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-5 h-5 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Slider */}
          <div className="space-y-1.5 mb-3">
            <div className="relative flex items-center h-5">
              {/* Custom track fill */}
              <div className="absolute left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2fa1d6] to-[#00ffff] rounded-full transition-all duration-75"
                  style={{ width: `${sliderPercent}%` }}
                />
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={100}
                value={currentCount}
                onChange={handleSliderChange}
                className="relative w-full h-5 opacity-0 cursor-ew-resize z-10"
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-white/40 px-0.5">
              <span>500</span>
              <span>25,000</span>
              <span>50,000</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-1.5 pt-1 border-t border-white/10">
            {PRESETS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => actions.updateParameter('rendering', 'fishCount', val)}
                className={`flex-1 py-1 rounded text-[11px] font-mono transition-all ${
                  currentCount === val
                    ? 'bg-[#2fa1d6] text-white font-bold shadow-md shadow-[#2fa1d6]/30'
                    : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white'
                }`}
              >
                {val >= 1000 ? `${val / 1000}k` : val}
              </button>
            ))}
          </div>

          {/* Resolution Scale Presets */}
          <div className="flex items-center gap-1 pt-2 border-t border-white/10 text-[10px]">
            <span className="text-white/50 mr-1">Scale:</span>
            {[
              { label: '0.85x Ultra', value: 0.85 },
              { label: '1.0x (60FPS)', value: 1.0 },
              { label: '1.25x Crisp', value: 1.25 },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => actions.updateParameter('rendering', 'resolutionScale', item.value)}
                className={`flex-1 py-0.5 rounded text-[10px] font-mono transition-all ${
                  (parameters.rendering.resolutionScale ?? 1.0) === item.value
                    ? 'bg-[#2fa1d6] text-white font-bold shadow-sm shadow-[#2fa1d6]/30'
                    : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main HUD Pill */}
      <div className="glass-hud px-4 py-2 flex items-center gap-4 text-sm bg-bg0/60 backdrop-blur-md rounded-lg border border-white/15 shadow-lg">
        {/* FPS */}
        <div className="flex items-center gap-2">
          <span className="text-muted font-semibold text-xs tracking-wider">FPS</span>
          <span className={`font-mono font-bold ${getFPSColor(performance.fps)}`}>
            {performance.fps.toFixed(0)}
          </span>
        </div>

        <div className="w-px h-4 bg-white/20"></div>

        {/* Clickable Fish Count */}
        <button
          id="hud-fish-button"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-2 py-0.5 -mx-1.5 rounded-md transition-all cursor-pointer group ${
            isOpen ? 'bg-[#2fa1d6]/20 border border-[#2fa1d6]/40' : 'hover:bg-white/10 border border-transparent'
          }`}
          title="Click to adjust fish population"
        >
          <span className="text-muted text-xs group-hover:text-[#2fa1d6] transition-colors font-medium">FISH</span>
          <span className="font-mono font-semibold text-text group-hover:text-white transition-colors">
            {currentCount.toLocaleString()}
          </span>
          <span className={`text-[9px] transition-transform duration-200 ${isOpen ? 'text-[#2fa1d6] rotate-180' : 'text-muted group-hover:text-[#2fa1d6]'}`}>
            ▲
          </span>
        </button>
      </div>
    </div>
  )
}

export default HUD
