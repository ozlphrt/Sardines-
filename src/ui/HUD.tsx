import React from 'react'
import { useSimulationStore } from '../stores/simulationStore'

const HUD: React.FC = () => {
  const { performance, actions } = useSimulationStore()

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-success'
    if (fps >= 45) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
      <div className="glass-hud px-4 py-2 flex items-center gap-6 text-sm">
        {/* FPS - Enhanced visibility */}
        <div className="flex items-center gap-2 px-2 py-1 bg-bg2/50 rounded">
          <span className="text-muted font-semibold">FPS</span>
          <span className={`font-mono font-bold text-lg ${getFPSColor(performance.fps)}`}>
            {performance.fps.toFixed(0)}
          </span>
        </div>

        {/* Fish Count */}
        <div className="flex items-center gap-2">
          <span className="text-muted">Fish</span>
          <span className="font-mono font-semibold text-text">
            {performance.fishCount}
          </span>
        </div>

        {/* Pause/Play Status */}
        <div className="flex items-center gap-2">
          <span className="text-muted">Status</span>
          <span className={`font-semibold ${performance.isPaused ? 'text-warning' : 'text-success'}`}>
            {performance.isPaused ? 'PAUSED' : 'RUNNING'}
          </span>
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={actions.togglePause}
          className="ml-4 px-3 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded-md transition-colors"
          aria-label={performance.isPaused ? 'Resume simulation' : 'Pause simulation'}
        >
          {performance.isPaused ? '▶' : '⏸'}
        </button>
      </div>
    </div>
  )
}

export default HUD
