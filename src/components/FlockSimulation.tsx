import React, { useRef, useEffect } from 'react'
import { useSimulationStore } from '../stores/simulationStore'
import { SardinesScene } from '../systems/SardinesScene'

const FlockSimulation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<SardinesScene | null>(null)
  const { performance, camera, actions } = useSimulationStore()

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    sceneRef.current = new SardinesScene(containerRef.current)
    
    // Start animation loop
    const animate = () => {
      if (sceneRef.current) {
        sceneRef.current.update()
        
        // Update performance metrics
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
      
      requestAnimationFrame(animate)
    }
    
    animate()

    // Cleanup
    return () => {
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
      sceneRef.current.setPaused(performance.isPaused)
    }
  }, [performance.isPaused])

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
