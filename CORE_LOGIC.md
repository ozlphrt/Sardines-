# Core Logic - Sardines Flock Simulation

## 🧠 Flocking Algorithm Overview

The simulation implements Craig Reynolds' Boids algorithm with three fundamental behaviors that create emergent flocking patterns:

### 1. Cohesion (Center of Mass)
**Purpose**: Fish move toward the center of nearby neighbors
**Implementation**:
```typescript
function calculateCohesion(fish: Fish, neighbors: Fish[]): Vector3 {
  if (neighbors.length === 0) return new Vector3(0, 0, 0);
  
  const center = neighbors.reduce((sum, neighbor) => 
    sum.add(neighbor.position), new Vector3(0, 0, 0)
  ).divideScalar(neighbors.length);
  
  return center.sub(fish.position).normalize().multiplyScalar(cohesionStrength);
}
```

### 2. Separation (Collision Avoidance)
**Purpose**: Fish avoid crowding by maintaining minimum distance
**Implementation**:
```typescript
function calculateSeparation(fish: Fish, neighbors: Fish[]): Vector3 {
  const separation = new Vector3(0, 0, 0);
  
  neighbors.forEach(neighbor => {
    const distance = fish.position.distanceTo(neighbor.position);
    if (distance < separationRadius && distance > 0) {
      const diff = fish.position.clone().sub(neighbor.position);
      diff.normalize().divideScalar(distance);
      separation.add(diff);
    }
  });
  
  return separation.normalize().multiplyScalar(separationStrength);
}
```

### 3. Alignment (Velocity Matching)
**Purpose**: Fish match velocity with neighboring fish
**Implementation**:
```typescript
function calculateAlignment(fish: Fish, neighbors: Fish[]): Vector3 {
  if (neighbors.length === 0) return new Vector3(0, 0, 0);
  
  const averageVelocity = neighbors.reduce((sum, neighbor) => 
    sum.add(neighbor.velocity), new Vector3(0, 0, 0)
  ).divideScalar(neighbors.length);
  
  return averageVelocity.normalize().multiplyScalar(alignmentStrength);
}
```

## 🎯 Fish Class Structure

```typescript
class Fish {
  position: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
  
  // Behavior parameters
  maxSpeed: number;
  maxForce: number;
  perceptionRadius: number;
  
  // Visual properties
  size: number;
  color: Color;
  
  constructor(position: Vector3, config: FishConfig) {
    this.position = position.clone();
    this.velocity = new Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    this.acceleration = new Vector3(0, 0, 0);
    
    // Apply configuration
    Object.assign(this, config);
  }
  
  update(deltaTime: number, flock: Fish[]): void {
    // Calculate flocking forces
    const neighbors = this.getNeighbors(flock);
    const cohesion = this.calculateCohesion(neighbors);
    const separation = this.calculateSeparation(neighbors);
    const alignment = this.calculateAlignment(neighbors);
    
    // Apply forces
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    
    // Update physics
    this.velocity.add(this.acceleration.clone().multiplyScalar(deltaTime));
    this.velocity.clampLength(0, this.maxSpeed);
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
    
    // Reset acceleration
    this.acceleration.set(0, 0, 0);
    
    // Apply boundary constraints
    this.applyBoundaryConstraints();
  }
}
```

## 🌊 Physics Engine

### Boundary Constraints
```typescript
function applyBoundaryConstraints(fish: Fish, bounds: Bounds): void {
  const margin = 10;
  
  // X-axis boundaries
  if (fish.position.x < bounds.minX + margin) {
    fish.position.x = bounds.minX + margin;
    fish.velocity.x = Math.abs(fish.velocity.x);
  } else if (fish.position.x > bounds.maxX - margin) {
    fish.position.x = bounds.maxX - margin;
    fish.velocity.x = -Math.abs(fish.velocity.x);
  }
  
  // Y-axis boundaries (vertical)
  if (fish.position.y < bounds.minY + margin) {
    fish.position.y = bounds.minY + margin;
    fish.velocity.y = Math.abs(fish.velocity.y);
  } else if (fish.position.y > bounds.maxY - margin) {
    fish.position.y = bounds.maxY - margin;
    fish.velocity.y = -Math.abs(fish.velocity.y);
  }
  
  // Z-axis boundaries
  if (fish.position.z < bounds.minZ + margin) {
    fish.position.z = bounds.minZ + margin;
    fish.velocity.z = Math.abs(fish.velocity.z);
  } else if (fish.position.z > bounds.maxZ - margin) {
    fish.position.z = bounds.maxZ - margin;
    fish.velocity.z = -Math.abs(fish.velocity.z);
  }
}
```

### Performance Optimizations

#### Spatial Partitioning
```typescript
class SpatialGrid {
  private grid: Map<string, Fish[]> = new Map();
  private cellSize: number;
  
  constructor(cellSize: number) {
    this.cellSize = cellSize;
  }
  
  getCellKey(position: Vector3): string {
    const x = Math.floor(position.x / this.cellSize);
    const y = Math.floor(position.y / this.cellSize);
    const z = Math.floor(position.z / this.cellSize);
    return `${x},${y},${z}`;
  }
  
  getNeighbors(fish: Fish, radius: number): Fish[] {
    const neighbors: Fish[] = [];
    const centerCell = this.getCellKey(fish.position);
    
    // Check current and adjacent cells
    const [cx, cy, cz] = centerCell.split(',').map(Number);
    
    for (let x = cx - 1; x <= cx + 1; x++) {
      for (let y = cy - 1; y <= cy + 1; y++) {
        for (let z = cz - 1; z <= cz + 1; z++) {
          const key = `${x},${y},${z}`;
          const cell = this.grid.get(key);
          if (cell) {
            cell.forEach(neighbor => {
              if (neighbor !== fish && 
                  fish.position.distanceTo(neighbor.position) <= radius) {
                neighbors.push(neighbor);
              }
            });
          }
        }
      }
    }
    
    return neighbors;
  }
}
```

## ⚙️ Configuration Parameters

### Default Values
```typescript
const DEFAULT_CONFIG = {
  // Flocking behavior strengths
  cohesionStrength: 0.5,
  separationStrength: 1.0,
  alignmentStrength: 0.3,
  
  // Physics constraints
  maxSpeed: 50,
  maxForce: 2,
  perceptionRadius: 100,
  separationRadius: 30,
  
  // Simulation settings
  fishCount: 500,
  bounds: {
    minX: -500, maxX: 500,
    minY: -200, maxY: 200,
    minZ: -500, maxZ: 500
  },
  
  // Performance settings
  spatialGridCellSize: 150,
  updateRate: 60, // Hz
  enableSpatialPartitioning: true
};
```

## 🔄 Update Loop

### Main Simulation Loop
```typescript
class FlockSimulation {
  private fish: Fish[] = [];
  private spatialGrid: SpatialGrid;
  private lastTime: number = 0;
  
  update(currentTime: number): void {
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 1/30);
    this.lastTime = currentTime;
    
    // Update spatial grid
    this.spatialGrid.clear();
    this.fish.forEach(fish => {
      this.spatialGrid.add(fish);
    });
    
    // Update all fish
    this.fish.forEach(fish => {
      const neighbors = this.spatialGrid.getNeighbors(fish, fish.perceptionRadius);
      fish.update(deltaTime, neighbors);
    });
    
    // Update visual representation
    this.updateFishMeshes();
  }
}
```

## 📊 Performance Monitoring

### Metrics Tracking
```typescript
class PerformanceMonitor {
  private fpsHistory: number[] = [];
  private frameTimeHistory: number[] = [];
  
  recordFrame(frameTime: number): void {
    const fps = 1000 / frameTime;
    this.fpsHistory.push(fps);
    this.frameTimeHistory.push(frameTime);
    
    // Keep last 60 frames
    if (this.fpsHistory.length > 60) {
      this.fpsHistory.shift();
      this.frameTimeHistory.shift();
    }
  }
  
  getAverageFPS(): number {
    return this.fpsHistory.reduce((sum, fps) => sum + fps, 0) / this.fpsHistory.length;
  }
  
  getAverageFrameTime(): number {
    return this.frameTimeHistory.reduce((sum, time) => sum + time, 0) / this.frameTimeHistory.length;
  }
}
```

## 🎯 Optimization Strategies

### 1. Instanced Rendering
- Use `InstancedMesh` for efficient rendering of multiple fish
- Update instance matrices in batches
- Minimize draw calls

### 2. Level of Detail (LOD)
- Reduce neighbor calculations for distant fish
- Simplify physics for fish outside camera view
- Adjust update frequency based on distance

### 3. Multithreading (Future)
- Offload physics calculations to Web Workers
- Use `SharedArrayBuffer` for position/velocity data
- Parallel neighbor detection

## 🚨 Error Handling

### Robustness Measures
```typescript
function safeUpdate(fish: Fish, neighbors: Fish[], deltaTime: number): void {
  try {
    // Validate inputs
    if (!fish || !neighbors || deltaTime <= 0) {
      console.warn('Invalid inputs to fish update');
      return;
    }
    
    // Clamp delta time to prevent large jumps
    const clampedDeltaTime = Math.min(deltaTime, 1/30);
    
    // Perform update with error catching
    fish.update(clampedDeltaTime, neighbors);
    
  } catch (error) {
    console.error('Error updating fish:', error);
    // Reset fish to safe state
    fish.velocity.set(0, 0, 0);
    fish.acceleration.set(0, 0, 0);
  }
}
```

---
*This document defines the core algorithmic logic and must be referenced when implementing flocking behaviors.*
