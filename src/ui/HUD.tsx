import React from 'react'
import { useSimulationStore } from '../stores/simulationStore'

const HUD: React.FC = () => {
  const { performance, actions } = useSimulationStore()

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-success'
    if (fps >= 45) return 'text-warning'
    return 'text-danger'
  }

  const getMemoryColor = (memory: number) => {
    if (memory < 256) return 'text-success'
    if (memory < 512) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
      <div className="glass-hud px-4 py-2 flex items-center gap-6 text-sm">
        {/* FPS */}
        <div className="flex items-center gap-2">
          <span className="text-muted">FPS</span>
          <span className={`font-mono font-semibold ${getFPSColor(performance.fps)}`}>
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

        {/* Visible Fish Count */}
        <div className="flex items-center gap-2">
          <span className="text-muted">Visible</span>
          <span className="font-mono font-semibold text-text">
            {performance.visibleFish || performance.fishCount}
          </span>
        </div>

        {/* Memory Usage */}
        <div className="flex items-center gap-2">
          <span className="text-muted">Memory</span>
          <span className={`font-mono font-semibold ${getMemoryColor(performance.memoryUsage)}`}>
            {performance.memoryUsage.toFixed(0)}MB
          </span>
        </div>

        {/* Pause/Play Status */}
        <div className="flex items-center gap-2">
          <span className="text-muted">Status</span>
          <span className={`font-semibold ${performance.isPaused ? 'text-warning' : 'text-success'}`}>
            {performance.isPaused ? 'PAUSED' : 'RUNNING'}
          </span>
        </div>

        {/* Average Speed */}
        <div className="flex items-center gap-2">
          <span className="text-muted">Speed</span>
          <span className="font-mono font-semibold text-text">
            {performance.averageSpeed.toFixed(1)}
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
