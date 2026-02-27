import React from 'react'
import { useSimulationStore } from '../stores/simulationStore'

const HUD: React.FC = () => {
  const { performance } = useSimulationStore()

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-success'
    if (fps >= 45) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className="absolute bottom-4 left-4 pointer-events-auto">
      <div className="glass-hud px-4 py-2 flex items-center gap-4 text-sm bg-bg0/50 backdrop-blur-md rounded border border-white/10">
        {/* FPS */}
        <div className="flex items-center gap-2">
          <span className="text-muted font-semibold text-xs">FPS</span>
          <span className={`font-mono font-bold ${getFPSColor(performance.fps)}`}>
            {performance.fps.toFixed(0)}
          </span>
        </div>

        <div className="w-px h-4 bg-white/20"></div>

        {/* Fish Count */}
        <div className="flex items-center gap-2">
          <span className="text-muted text-xs">FISH</span>
          <span className="font-mono font-semibold text-text">
            {performance.fishCount}
          </span>
        </div>
      </div>
    </div>
  )
}

export default HUD
