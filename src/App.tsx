import { useEffect } from 'react'
import FlockSimulation from './components/FlockSimulation'
import Sidebar from './ui/Sidebar'
import HUD from './ui/HUD'
import CameraPresetToast from './ui/CameraPresetToast'
import { useSimulationStore } from './stores/simulationStore'

function App() {
  const { ui, actions } = useSimulationStore()

  useEffect(() => {
    (window as any).useSimulationStore = useSimulationStore
  }, [])

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
      // Cycle Camera with 'C' key
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        actions.cycleCamera()
      }
      // Trigger Whirlpool with 'W' key
      if (e.key.toLowerCase() === 'w' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        actions.triggerWhirlpool()
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
        {/* Temporary Camera Preset Banner Toast */}
        <CameraPresetToast />

        {/* HUD */}
        {ui.hudVisible && (
          <div className="pointer-events-auto">
            <HUD />
          </div>
        )}

        {/* HUD Hidden Indicator (Removed) */}

        {/* Sidebar */}
        {ui.sidebarVisible && <Sidebar />}
      </div>

      {/* floating Buttons Container */}
      <div
        className={`fixed bottom-8 md:bottom-6 z-[99999] flex flex-col gap-4 transition-all duration-300 ${
          ui.sidebarVisible
            ? 'right-[228px] md:right-[248px]'
            : 'right-6 md:right-6'
        }`}
      >
        {/* Whirlpool Cyclone Trigger Button */}
        <button
          onClick={actions.triggerWhirlpool}
          className="flex items-center justify-center w-12 h-12 bg-cyan-500/30 hover:bg-cyan-500/50 border border-cyan-400/50 backdrop-blur-md rounded-full text-cyan-200 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-110 active:scale-95 cursor-pointer group"
          title="Trigger Whirlpool Cyclone (W)"
        >
          <span className="text-xl group-hover:rotate-180 transition-transform duration-500">🌀</span>
        </button>

        {/* Camera Cycle Button */}
        <button
          onClick={actions.cycleCamera}
          className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 cursor-pointer"
          title="Cycle Camera (C)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 8-6 4 6 4V8Z"></path>
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
          </svg>
        </button>

        {/* Settings Cog */}
        <button
          onClick={actions.toggleSidebar}
          className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:rotate-90 hover:scale-110 cursor-pointer"
          title="Toggle Settings (B)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
