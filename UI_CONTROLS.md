# UI Controls - Sardines Flock Simulation

## 🎨 Design System Overview

### Theme Implementation
Following the dark glass morphism design system with underwater aesthetics:

```css
/* Core theme variables */
:root {
  --bg0: #0B0B0C;
  --bg1: #121214;
  --bg2: #18181B;
  --hairline: #2A2A2E;
  --text: #E5E7EB;
  --muted: #9CA3AF;
  --accent: #7DD3FC;
  --danger: #F87171;
  --success: #34D399;
  --warning: #F59E0B;
  
  /* Underwater specific colors */
  --water-deep: #0B1426;
  --water-surface: #1E3A8A;
  --water-light: #3B82F6;
  --caustics: rgba(59, 130, 246, 0.1);
}
```

### Glass Morphism Components
```css
.glass-panel {
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

## 🎮 Core UI Components

### 1. Sidebar Panel
**Purpose**: Main control interface with collapsible sections
**Behavior**: Auto-hide after 5s idle, hover zones to reveal

```typescript
interface SidebarProps {
  isVisible: boolean;
  onToggle: () => void;
  sections: {
    rendering: boolean;
    physics: boolean;
    behavior: boolean;
    performance: boolean;
  };
}
```

**Sections**:
- **Rendering**: Fish count, model settings, lighting
- **Physics**: Speed limits, boundaries, forces
- **Behavior**: Cohesion, separation, alignment strengths
- **Performance**: FPS, memory, optimization toggles

### 2. HUD Overlay
**Purpose**: Real-time performance and simulation stats
**Position**: Top-center (desktop), top-right (mobile)

```typescript
interface HUDProps {
  fps: number;
  fishCount: number;
  isPaused: boolean;
  memoryUsage: number;
  averageSpeed: number;
}
```

**Display Elements**:
- FPS counter with color coding (green: >50, yellow: 30-50, red: <30)
- Fish count with live updates
- Pause/Play status indicator
- Memory usage bar
- Average flock speed

### 3. HoverDrag Controls
**Purpose**: Precise numeric parameter adjustment without sliders
**Interaction**: Hover + vertical drag, modifiers for fine control

```typescript
interface HoverDragProps {
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  onChange: (value: number) => void;
  onReset?: () => void;
}
```

**Modifiers**:
- **Normal drag**: Standard step size
- **Shift + drag**: 10x step size
- **Alt + drag**: 0.1x step size
- **Double-click**: Reset to default

## 🎛️ Control Categories

### Flocking Behavior Controls
```typescript
const behaviorControls = {
  cohesionStrength: {
    label: "Cohesion",
    min: 0,
    max: 2,
    step: 0.1,
    default: 0.5,
    description: "How strongly fish move toward center of neighbors"
  },
  separationStrength: {
    label: "Separation", 
    min: 0,
    max: 3,
    step: 0.1,
    default: 1.0,
    description: "How strongly fish avoid crowding"
  },
  alignmentStrength: {
    label: "Alignment",
    min: 0,
    max: 2,
    step: 0.1,
    default: 0.3,
    description: "How strongly fish match neighbor velocities"
  }
};
```

### Physics Controls
```typescript
const physicsControls = {
  maxSpeed: {
    label: "Max Speed",
    min: 10,
    max: 100,
    step: 5,
    default: 50,
    description: "Maximum fish swimming speed"
  },
  maxForce: {
    label: "Max Force",
    min: 0.5,
    max: 5,
    step: 0.1,
    default: 2,
    description: "Maximum steering force applied"
  },
  perceptionRadius: {
    label: "Perception",
    min: 50,
    max: 200,
    step: 10,
    default: 100,
    description: "Distance fish can see neighbors"
  }
};
```

### Rendering Controls
```typescript
const renderingControls = {
  fishCount: {
    label: "Fish Count",
    min: 50,
    max: 1000,
    step: 50,
    default: 500,
    description: "Number of fish in simulation"
  },
  modelScale: {
    label: "Fish Size",
    min: 0.5,
    max: 2,
    step: 0.1,
    default: 1,
    description: "Scale of fish models"
  },
  lightingIntensity: {
    label: "Lighting",
    min: 0.1,
    max: 2,
    step: 0.1,
    default: 1,
    description: "Underwater lighting intensity"
  }
};
```

## ⌨️ Keyboard Shortcuts

### Global Controls
```typescript
const keyboardShortcuts = {
  // Simulation control
  'Space': 'Toggle pause/play',
  'R': 'Reset simulation',
  'C': 'Center camera on flock',
  
  // UI navigation
  'B': 'Toggle sidebar',
  'H': 'Toggle HUD',
  'F': 'Toggle fullscreen',
  
  // Camera controls
  '1': 'Top view',
  '2': 'Side view', 
  '3': 'Front view',
  '0': 'Reset camera',
  
  // Parameter presets
  'F1': 'Load calm swimming preset',
  'F2': 'Load tight schooling preset',
  'F3': 'Load scattered behavior preset'
};
```

### Command Palette
**Hotkey**: `Cmd/Ctrl + K`
**Features**:
- Quick parameter search
- Preset management
- Camera positioning
- Performance toggles

## 📱 Responsive Design

### Mobile Adaptations
```typescript
const mobileBreakpoints = {
  small: 'max-width: 640px',
  medium: 'max-width: 768px',
  large: 'max-width: 1024px'
};
```

**Mobile UI Changes**:
- Sidebar becomes bottom drawer
- HUD moves to top-right corner
- Touch-friendly larger controls
- Simplified parameter sets
- Gesture controls for camera

### Touch Interactions
```typescript
const touchControls = {
  // Camera
  'Single finger drag': 'Orbit camera',
  'Two finger pinch': 'Zoom camera',
  'Two finger drag': 'Pan camera',
  
  // Parameters
  'Long press + drag': 'Adjust parameter',
  'Double tap': 'Reset parameter',
  'Swipe up/down': 'Quick preset cycling'
};
```

## 🎯 Auto-Hide Behavior

### Sidebar Auto-Hide
```typescript
interface AutoHideConfig {
  delay: 5000; // 5 seconds
  hoverZones: {
    left: 20; // 20px from left edge
    right: 0;
  };
  transition: {
    duration: 300; // 300ms
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
  };
}
```

**Trigger Conditions**:
- Mouse leaves sidebar area
- No interaction for 5 seconds
- User manually hides (B key)

**Reveal Conditions**:
- Mouse enters left edge hover zone
- Keyboard shortcut (B key)
- Touch gesture on mobile

## 🔧 State Management

### Zustand Store Structure
```typescript
interface SimulationStore {
  // UI state
  ui: {
    sidebarVisible: boolean;
    hudVisible: boolean;
    fullscreen: boolean;
    activeSection: string;
  };
  
  // Simulation parameters
  parameters: {
    behavior: BehaviorParams;
    physics: PhysicsParams;
    rendering: RenderingParams;
  };
  
  // Performance data
  performance: {
    fps: number;
    memoryUsage: number;
    fishCount: number;
    isPaused: boolean;
  };
  
  // Actions
  actions: {
    updateParameter: (category: string, param: string, value: number) => void;
    togglePause: () => void;
    resetSimulation: () => void;
    loadPreset: (preset: string) => void;
  };
}
```

### Persistence
```typescript
const persistenceConfig = {
  // Local storage keys
  keys: {
    parameters: 'sardines-params',
    ui: 'sardines-ui',
    presets: 'sardines-presets'
  },
  
  // Debounce save operations
  debounce: 1000, // 1 second
  
  // Migration handling
  version: '1.0.0'
};
```

## 🎨 Visual Feedback

### Parameter Changes
```typescript
const visualFeedback = {
  // Value changes
  highlight: {
    duration: 200,
    color: 'var(--accent)',
    scale: 1.05
  },
  
  // Invalid values
  error: {
    color: 'var(--danger)',
    shake: true,
    duration: 500
  },
  
  // Preset loading
  success: {
    color: 'var(--success)',
    scale: 1.1,
    duration: 300
  }
};
```

### Performance Indicators
```typescript
const performanceIndicators = {
  fps: {
    excellent: { min: 55, color: '#34D399' },
    good: { min: 45, color: '#F59E0B' },
    poor: { min: 0, color: '#F87171' }
  },
  
  memory: {
    low: { max: 256, color: '#34D399' },
    medium: { max: 512, color: '#F59E0B' },
    high: { max: Infinity, color: '#F87171' }
  }
};
```

## 🧪 Accessibility Features

### Keyboard Navigation
- Tab order follows logical flow
- All controls accessible via keyboard
- Focus indicators clearly visible
- Screen reader compatible labels

### Visual Accessibility
- High contrast mode support
- Large text option
- Reduced motion preferences
- Color blind friendly indicators

### ARIA Labels
```typescript
const ariaLabels = {
  sidebar: 'Simulation controls panel',
  hud: 'Performance and status display',
  pauseButton: 'Pause or resume simulation',
  resetButton: 'Reset simulation to initial state',
  fishCount: 'Number of fish in simulation'
};
```

---
*This document defines all UI interactions and must be referenced when implementing interface components.*
