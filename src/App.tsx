import { useEffect } from 'react'
import FlockSimulation from './components/FlockSimulation'
import Sidebar from './ui/Sidebar'
import HUD from './ui/HUD'
import { useSimulationStore } from './stores/simulationStore'

function App() {
  const { ui, actions } = useSimulationStore()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle HUD with 'H' key
      if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        actions.toggleHUD()
      }
      // Toggle Sidebar with 'B' key
      if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        actions.toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [actions])

  return (
    <div className="relative w-full h-full bg-bg0 overflow-hidden">
      {/* Main 3D Scene */}
      <FlockSimulation />
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* HUD */}
        {ui.hudVisible && (
          <div className="pointer-events-auto">
            <HUD />
          </div>
        )}
        
        {/* HUD Hidden Indicator */}
        {!ui.hudVisible && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <div className="bg-warning/20 text-warning px-3 py-1 rounded text-xs font-semibold">
              HUD Hidden - Press 'H' to show FPS and stats
            </div>
          </div>
        )}
        
        {/* Sidebar */}
        {ui.sidebarVisible && (
          <div className="pointer-events-auto">
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
