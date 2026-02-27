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

        {/* HUD Hidden Indicator (Removed) */}

        {/* Settings Cog */}
        <div className="absolute bottom-6 right-6 pointer-events-auto z-[9999]">
          <button
            onClick={actions.toggleSidebar}
            className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 shadow-lg hover:rotate-90 hover:scale-110"
            title="Toggle Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        {ui.sidebarVisible && <Sidebar />}
      </div>
    </div>
  )
}

export default App
