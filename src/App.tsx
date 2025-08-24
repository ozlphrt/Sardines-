import FlockSimulation from './components/FlockSimulation'
import Sidebar from './ui/Sidebar'
import HUD from './ui/HUD'
import { useSimulationStore } from './stores/simulationStore'

function App() {
  const { ui } = useSimulationStore()

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
