# Rendering - Sardines Flock Simulation

## 🎨 Three.js Scene Architecture

### Scene Setup
```typescript
class SardinesScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  
  constructor(container: HTMLElement) {
    // Scene initialization
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0B1426); // Deep water blue
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75, // FOV
      window.innerWidth / window.innerHeight,
      0.1, // Near plane
      2000 // Far plane
    );
    this.camera.position.set(0, 100, 300);
    
    // Renderer configuration
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 1000;
    this.controls.minDistance = 50;
  }
}
```

## 🌊 Underwater Environment

### Lighting Setup
```typescript
class UnderwaterLighting {
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;
  private pointLights: THREE.PointLight[];
  
  constructor(scene: THREE.Scene) {
    // Ambient underwater lighting
    this.ambientLight = new THREE.AmbientLight(0x3B82F6, 0.3);
    scene.add(this.ambientLight);
    
    // Directional light (sun through water surface)
    this.directionalLight = new THREE.DirectionalLight(0x87CEEB, 0.8);
    this.directionalLight.position.set(100, 200, 100);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    scene.add(this.directionalLight);
    
    // Caustics effect with point lights
    this.pointLights = [
      new THREE.PointLight(0x3B82F6, 0.5, 300),
      new THREE.PointLight(0x1E3A8A, 0.3, 200)
    ];
    
    this.pointLights.forEach(light => {
      light.position.set(
        (Math.random() - 0.5) * 400,
        50 + Math.random() * 100,
        (Math.random() - 0.5) * 400
      );
      scene.add(light);
    });
  }
}
```

### Fog and Atmosphere
```typescript
class UnderwaterAtmosphere {
  constructor(scene: THREE.Scene) {
    // Underwater fog
    scene.fog = new THREE.Fog(0x0B1426, 100, 800);
    
    // Particle system for suspended particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1000;
      positions[i + 1] = Math.random() * 400;
      positions[i + 2] = (Math.random() - 0.5) * 1000;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x87CEEB,
      size: 2,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
  }
}
```

## 🐟 Fish Model Integration

### GLTF Loader Setup
```typescript
class FishModelLoader {
  private loader: GLTFLoader;
  private fishGeometry: THREE.BufferGeometry;
  private fishMaterial: THREE.Material;
  
  constructor() {
    this.loader = new GLTFLoader();
  }
  
  async loadFishModel(): Promise<{
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
  }> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        '/assets/fish-model/scene.gltf',
        (gltf) => {
          const model = gltf.scene;
          const fishMesh = model.children[0] as THREE.Mesh;
          
          // Extract geometry and material
          this.fishGeometry = fishMesh.geometry;
          this.fishMaterial = fishMesh.material;
          
          // Optimize for instancing
          this.fishGeometry.computeBoundingSphere();
          this.fishGeometry.computeBoundingBox();
          
          resolve({
            geometry: this.fishGeometry,
            material: this.fishMaterial
          });
        },
        undefined,
        reject
      );
    });
  }
}
```

### Instanced Fish Rendering
```typescript
class InstancedFishRenderer {
  private instancedMesh: THREE.InstancedMesh;
  private matrix: THREE.Matrix4;
  private tempVector: THREE.Vector3;
  private tempQuaternion: THREE.Quaternion;
  
  constructor(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    maxFishCount: number
  ) {
    this.instancedMesh = new THREE.InstancedMesh(
      geometry,
      material,
      maxFishCount
    );
    this.instancedMesh.frustumCulled = false; // Disable for performance
    
    this.matrix = new THREE.Matrix4();
    this.tempVector = new THREE.Vector3();
    this.tempQuaternion = new THREE.Quaternion();
  }
  
  updateFishInstance(index: number, fish: Fish): void {
    // Position
    this.tempVector.copy(fish.position);
    
    // Rotation (fish faces direction of movement)
    const direction = fish.velocity.clone().normalize();
    this.tempQuaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1), // Model forward direction
      direction
    );
    
    // Scale
    const scale = fish.size || 1;
    
    // Build transformation matrix
    this.matrix.compose(
      this.tempVector,
      this.tempQuaternion,
      new THREE.Vector3(scale, scale, scale)
    );
    
    // Apply to instance
    this.instancedMesh.setMatrixAt(index, this.matrix);
  }
  
  updateVisibleCount(count: number): void {
    this.instancedMesh.count = count;
  }
  
  getMesh(): THREE.InstancedMesh {
    return this.instancedMesh;
  }
}
```

## 🎭 Materials and Shaders

### Fish Material with Underwater Effects
```typescript
class UnderwaterFishMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        waterDepth: { value: 0.5 },
        causticsIntensity: { value: 0.3 },
        baseColor: { value: new THREE.Color(0x4A5568) },
        specularColor: { value: new THREE.Color(0x87CEEB) }
      },
      
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      
      fragmentShader: `
        uniform float time;
        uniform float waterDepth;
        uniform float causticsIntensity;
        uniform vec3 baseColor;
        uniform vec3 specularColor;
        
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          // Caustics effect
          float caustics = sin(vPosition.x * 0.1 + time) * 
                          sin(vPosition.z * 0.1 + time) * 0.5 + 0.5;
          
          // Fresnel effect for underwater look
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          // Final color
          vec3 color = mix(baseColor, specularColor, fresnel * 0.3);
          color += caustics * causticsIntensity * specularColor;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }
  
  updateTime(time: number): void {
    this.uniforms.time.value = time;
  }
}
```

## ⚡ Performance Optimizations

### Level of Detail (LOD)
```typescript
class FishLODSystem {
  private lodLevels: {
    high: THREE.InstancedMesh;
    medium: THREE.InstancedMesh;
    low: THREE.InstancedMesh;
  };
  
  constructor() {
    // Create different detail levels
    this.lodLevels = {
      high: this.createHighDetailMesh(),
      medium: this.createMediumDetailMesh(),
      low: this.createLowDetailMesh()
    };
  }
  
  updateLOD(camera: THREE.Camera, fish: Fish[]): void {
    const cameraPosition = camera.position;
    
    fish.forEach((fish, index) => {
      const distance = fish.position.distanceTo(cameraPosition);
      let lodLevel: 'high' | 'medium' | 'low';
      
      if (distance < 100) {
        lodLevel = 'high';
      } else if (distance < 300) {
        lodLevel = 'medium';
      } else {
        lodLevel = 'low';
      }
      
      this.updateFishInLOD(lodLevel, index, fish);
    });
  }
}
```

### Frustum Culling
```typescript
class FrustumCulling {
  private frustum: THREE.Frustum;
  private camera: THREE.Camera;
  
  constructor(camera: THREE.Camera) {
    this.camera = camera;
    this.frustum = new THREE.Frustum();
  }
  
  updateFrustum(): void {
    this.frustum.setFromProjectionMatrix(
      new THREE.Matrix4().multiplyMatrices(
        this.camera.projectionMatrix,
        this.camera.matrixWorldInverse
      )
    );
  }
  
  isFishVisible(fish: Fish): boolean {
    const sphere = new THREE.Sphere(fish.position, 10);
    return this.frustum.intersectsSphere(sphere);
  }
}
```

### Spatial Partitioning for Rendering
```typescript
class RenderSpatialGrid {
  private grid: Map<string, Fish[]> = new Map();
  private cellSize: number;
  
  constructor(cellSize: number = 200) {
    this.cellSize = cellSize;
  }
  
  updateGrid(fish: Fish[]): void {
    this.grid.clear();
    
    fish.forEach(fish => {
      const key = this.getCellKey(fish.position);
      if (!this.grid.has(key)) {
        this.grid.set(key, []);
      }
      this.grid.get(key)!.push(fish);
    });
  }
  
  getVisibleFish(camera: THREE.Camera, frustum: THREE.Frustum): Fish[] {
    const visibleFish: Fish[] = [];
    const cameraPosition = camera.position;
    
    // Only check cells near camera
    const nearbyCells = this.getNearbyCells(cameraPosition, 400);
    
    nearbyCells.forEach(cellKey => {
      const cell = this.grid.get(cellKey);
      if (cell) {
        cell.forEach(fish => {
          if (frustum.intersectsSphere(new THREE.Sphere(fish.position, 10))) {
            visibleFish.push(fish);
          }
        });
      }
    });
    
    return visibleFish;
  }
}
```

## 📊 Performance Monitoring

### Render Stats
```typescript
class RenderPerformanceMonitor {
  private stats: Stats;
  private renderCalls: number = 0;
  private triangles: number = 0;
  private points: number = 0;
  private lines: number = 0;
  
  constructor() {
    this.stats = new Stats();
    this.stats.showPanel(0); // FPS panel
    document.body.appendChild(this.stats.dom);
  }
  
  beginFrame(): void {
    this.stats.begin();
  }
  
  endFrame(): void {
    this.stats.end();
    
    // Get renderer info
    const info = this.renderer.info;
    this.renderCalls = info.render.calls;
    this.triangles = info.render.triangles;
    this.points = info.render.points;
    this.lines = info.render.lines;
  }
  
  logPerformance(): void {
    console.log(`Render Calls: ${this.renderCalls}`);
    console.log(`Triangles: ${this.triangles}`);
    console.log(`FPS: ${this.stats.getFPS()}`);
  }
}
```

## 🎨 Post-Processing Effects

### Underwater Post-Processing
```typescript
class UnderwaterPostProcessing {
  private composer: THREE.EffectComposer;
  private renderPass: THREE.RenderPass;
  private underwaterPass: THREE.ShaderPass;
  
  constructor(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.composer = new THREE.EffectComposer(renderer);
    
    // Base render pass
    this.renderPass = new THREE.RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);
    
    // Underwater effect pass
    this.underwaterPass = new THREE.ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 },
        distortion: { value: 0.1 },
        aberration: { value: 0.02 }
      },
      
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float distortion;
        uniform float aberration;
        
        varying vec2 vUv;
        
        void main() {
          // Chromatic aberration
          vec2 uv = vUv;
          float wave = sin(uv.y * 10.0 + time) * distortion;
          
          vec4 r = texture2D(tDiffuse, uv + vec2(wave * aberration, 0.0));
          vec4 g = texture2D(tDiffuse, uv);
          vec4 b = texture2D(tDiffuse, uv - vec2(wave * aberration, 0.0));
          
          gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
        }
      `
    });
    
    this.composer.addPass(this.underwaterPass);
  }
  
  render(): void {
    this.underwaterPass.uniforms.time.value += 0.016;
    this.composer.render();
  }
}
```

## 🔧 Memory Management

### Resource Cleanup
```typescript
class ResourceManager {
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];
  private textures: THREE.Texture[] = [];
  
  dispose(): void {
    // Dispose geometries
    this.geometries.forEach(geometry => {
      geometry.dispose();
    });
    
    // Dispose materials
    this.materials.forEach(material => {
      if (material.map) material.map.dispose();
      if (material.normalMap) material.normalMap.dispose();
      if (material.roughnessMap) material.roughnessMap.dispose();
      material.dispose();
    });
    
    // Dispose textures
    this.textures.forEach(texture => {
      texture.dispose();
    });
    
    // Clear arrays
    this.geometries = [];
    this.materials = [];
    this.textures = [];
  }
  
  trackGeometry(geometry: THREE.BufferGeometry): void {
    this.geometries.push(geometry);
  }
  
  trackMaterial(material: THREE.Material): void {
    this.materials.push(material);
  }
  
  trackTexture(texture: THREE.Texture): void {
    this.textures.push(texture);
  }
}
```

---
*This document defines the rendering architecture and must be referenced when implementing Three.js components.*
