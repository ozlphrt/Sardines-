import React, { useRef, useEffect } from 'react'
import { useSimulationStore } from '../stores/simulationStore'
import { SardinesScene } from '../systems/SardinesScene'

const FlockSimulation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<SardinesScene | null>(null)
  const isPaused = useSimulationStore(state => state.performance.isPaused)
  const camera = useSimulationStore(state => state.camera)
  const actions = useSimulationStore(state => state.actions)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    sceneRef.current = new SardinesScene(containerRef.current)

    // Start animation loop
    let animationFrameId: number
    let lastPerfUpdate = 0

    const animate = (timestamp: number) => {
      if (sceneRef.current) {
        sceneRef.current.update()

        // Update performance metrics every 500ms (2Hz) instead of 60Hz to prevent React render thrashing
        if (timestamp - lastPerfUpdate > 500) {
          lastPerfUpdate = timestamp
          const stats = sceneRef.current.getStats()
          actions.updatePerformance({
            fps: stats.fps,
            memoryUsage: stats.memory,
            fishCount: stats.fishCount,
            averageSpeed: stats.averageSpeed,
            visibleFish: stats.visibleFish,
            cullingEnabled: stats.cullingEnabled
          })
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (sceneRef.current) {
        sceneRef.current.dispose()
      }
    }
  }, [actions])

  // Parameters are now automatically updated via store subscription in SardinesScene
  // No manual parameter updates needed here

  // Handle pause/resume
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setPaused(isPaused)
    }
  }, [isPaused])

  // Handle camera changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.updateCamera(camera)
    }
  }, [camera])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-water-deep"
      style={{ background: 'linear-gradient(to bottom, var(--water-surface), var(--water-deep))' }}
    />
  )
}

export default FlockSimulation
