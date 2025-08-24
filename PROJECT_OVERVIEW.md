# 3D Sardines Flock Simulation - Project Overview

## 🎯 Mission & Vision
Create an interactive 3D simulation of sardines exhibiting realistic flocking behavior using Three.js. The simulation will demonstrate emergent behavior through individual fish following simple rules of cohesion, separation, and alignment.

## 🎮 Core Concept
A real-time 3D visualization where hundreds of sardines swim together in a natural, fluid motion. Each fish follows three fundamental flocking behaviors:
- **Cohesion**: Move toward the center of nearby fish
- **Separation**: Avoid crowding by maintaining minimum distance
- **Alignment**: Match velocity with neighboring fish

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **3D Engine**: Three.js with WebGL renderer
- **State Management**: Zustand for simulation state
- **Styling**: Tailwind CSS with custom dark theme
- **Testing**: Playwright for UI smoke tests
- **Build**: Vite for fast development

### Core Components
1. **FlockManager**: Handles fish behavior calculations
2. **Fish**: Individual sardine with physics and rendering
3. **SimulationController**: Manages animation loop and performance
4. **UI Controls**: Real-time parameter adjustment
5. **Performance Monitor**: FPS tracking and optimization

### 3D Scene Structure
```
Scene
├── Environment (water, lighting, boundaries)
├── Fish Flock (instanced sardines)
├── Camera (orbit controls)
└── UI Overlay (controls, HUD)
```

## 🎨 Visual Design
- **Theme**: Dark glass morphism with blue water aesthetics
- **Fish Model**: External 3D sardine model with realistic textures
- **Environment**: Underwater lighting with caustics effect
- **UI**: Minimalist controls with auto-hiding sidebar

## 📊 Performance Targets
- **Frame Rate**: 60 FPS with 500+ fish
- **Memory**: < 512MB total usage
- **Load Time**: < 3 seconds initial setup
- **Input Lag**: < 16ms for UI interactions

## 🎯 Success Criteria
- [ ] Realistic flocking behavior with emergent patterns
- [ ] Smooth 60fps performance with 500+ fish
- [ ] Intuitive UI for parameter adjustment
- [ ] Responsive design across devices
- [ ] Comprehensive documentation and testing
- [ ] No console errors or performance issues

## 🔄 Development Phases
1. **Phase 1**: Core flocking algorithm and basic 3D setup
2. **Phase 2**: Fish model integration and rendering optimization
3. **Phase 3**: UI controls and parameter system
4. **Phase 4**: Performance optimization and testing
5. **Phase 5**: Polish and documentation

## 📁 File Structure
```
src/
├── components/
│   ├── FlockSimulation.tsx
│   ├── Fish.tsx
│   └── ui/
├── systems/
│   ├── FlockManager.ts
│   ├── PhysicsEngine.ts
│   └── PerformanceMonitor.ts
├── stores/
│   └── simulationStore.ts
├── utils/
│   ├── threeUtils.ts
│   └── mathUtils.ts
└── assets/
    └── models/
```

## 🚨 Critical Constraints
- Must maintain 60fps with 500+ fish
- No hardcoded values - all parameters configurable
- Comprehensive error handling and recovery
- Full accessibility compliance
- Mobile-responsive design

## 📈 Current Status
**Status**: [TODO] - Project initialization
**Last Updated**: $(date)
**Next Milestone**: Core flocking algorithm implementation

---
*This document serves as the master reference for all development decisions and must be updated before any major code changes.*
