# 🐟 3D Sardines Flock Simulation

An interactive 3D simulation of sardine flocking behavior using Three.js and React. Watch hundreds of fish swim together in realistic underwater environments with dynamic camera systems.

## 🌊 Live Demo

**[Play the Simulation →](https://ozlphrt.github.io/Sardines-/)**

*No download required - runs directly in your browser!*

## ✨ Features

### 🎬 Dynamic Camera System
- **Action Camera**: Smooth cinematic shots with variable height
- **Dolly Cam**: Automatically finds and follows crowded fish schools
- **Follow Camera**: Smooth tracking of the entire flock
- **Single Fish**: Close-up individual fish tracking

### 🐟 Realistic Flocking Behavior
- **Cohesion**: Fish move toward the center of nearby neighbors
- **Separation**: Fish avoid crowding and maintain personal space
- **Alignment**: Fish match the velocity of nearby neighbors
- **Individual Personality**: Each fish has unique movement characteristics

### 🌊 Underwater Environment
- **External 3D Sea Floor**: High-quality GLTF terrain model
- **Dynamic Lighting**: Realistic underwater lighting effects
- **Smooth Performance**: Optimized for 60fps with 1000+ fish

### 🎮 Interactive Controls
- **Real-time Parameters**: Adjust flocking behavior on the fly
- **Camera Presets**: Switch between different viewing modes
- **Behavior Presets**: Pre-configured flocking behaviors
- **Hover-Drag Controls**: Intuitive parameter adjustment

## 🚀 Quick Start

### Option 1: Live Demo (Recommended)
Simply visit the live demo link above - no installation required!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/ozlphrt/Sardines-.git
cd sardines-simulation

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🎯 Camera Controls

| Camera Mode | Description |
|-------------|-------------|
| **Default** | Balanced overview of the entire simulation |
| **Close** | Intimate view of the fish |
| **Dolly Cam** | Automatically follows the most crowded schools |
| **Action** | Dynamic cinematic shots with variable height |
| **Follow** | Smooth tracking of the flock center |
| **Single Fish** | Close-up tracking of individual fish |

## 🎮 Mouse Controls

- **Left Click + Drag**: Orbit camera around the scene
- **Right Click + Drag**: Pan camera
- **Scroll**: Zoom in/out
- **Hover + Drag**: Adjust simulation parameters

## 🎨 Behavior Presets

- **Calm**: Gentle, relaxed swimming
- **Tight**: Close-knit school formation
- **Scattered**: Spread out, individual movement
- **Aggressive**: Fast, dynamic movement
- **Gentle**: Smooth, flowing motion
- **Chaotic**: Random, unpredictable behavior
- **Organized**: Structured, coordinated movement
- **Minimal**: Simple, basic flocking

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **3D Models**: GLTF/GLB format

## 📊 Performance

- **Target**: 60fps with 1000+ fish
- **Memory**: <512MB for complex scenes
- **Load Time**: <3 seconds for initial setup
- **Input Lag**: <16ms for smooth interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js**: 3D graphics library
- **GLTF Models**: External sea floor terrain
- **Flocking Algorithm**: Based on Craig Reynolds' Boids
- **React Community**: Excellent documentation and tools

---

**Enjoy watching the sardines swim! 🐟🌊**
