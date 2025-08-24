import React, { useRef, useEffect } from 'react'
import { useSimulationStore } from '../stores/simulationStore'
import { SardinesScene } from '../systems/SardinesScene'

const FlockSimulation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<SardinesScene | null>(null)
  const { parameters, performance, actions } = useSimulationStore()

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

  // Update scene when parameters change
            useEffect(() => {
            if (sceneRef.current) {
              // Convert store parameters to the format expected by SardinesScene
                          const sceneParameters = {
              behavior: {
                cohesionStrength: parameters.behavior.cohesionStrength,
                separationStrength: parameters.behavior.separationStrength,
                alignmentStrength: parameters.behavior.alignmentStrength,
                cohesionRadius: parameters.behavior.cohesionRadius,
                separationRadius: parameters.behavior.separationRadius,
                alignmentRadius: parameters.behavior.alignmentRadius,
                collisionAvoidanceStrength: parameters.behavior.collisionAvoidanceStrength,
                edgeAvoidanceStrength: parameters.behavior.edgeAvoidanceStrength,
                environmentalForceStrength: parameters.behavior.environmentalForceStrength,
                maxSpeed: parameters.physics.maxSpeed,
                maxForce: parameters.physics.maxForce,
                maxAcceleration: parameters.physics.maxAcceleration,
              },
                flock: {
                  fishCount: parameters.rendering.fishCount,
                  spatialPartitioning: true,
                  partitionSize: 50,
                },
                rendering: {
                  modelScale: parameters.rendering.modelScale,
                }
              }
              sceneRef.current.updateParameters(sceneParameters)
            }
          }, [parameters])

  // Handle pause/resume
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setPaused(performance.isPaused)
    }
  }, [performance.isPaused])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-water-deep"
      style={{ background: 'linear-gradient(to bottom, var(--water-surface), var(--water-deep))' }}
    />
  )
}

export default FlockSimulation
