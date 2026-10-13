import * as THREE from 'three'
import { useSimulationStore } from '../stores/simulationStore'

export interface UnderwaterConfig {
  rayCount?: number
  rayRadius?: number
  rayHeight?: number
  rayColor?: number
  rayOpacity?: number
}

export class UnderwaterEnvironment {
  private raysGroup: THREE.Group
  private rayMaterial: THREE.ShaderMaterial
  private particleGroup: THREE.Points | null = null
  private particleMaterial: THREE.ShaderMaterial | null = null
  private config: Required<UnderwaterConfig>

  constructor(private scene: THREE.Scene, config: UnderwaterConfig = {}) {
    this.config = {
      rayCount: config.rayCount ?? 15,
      rayRadius: config.rayRadius ?? 15,
      rayHeight: config.rayHeight ?? 250,
      rayColor: config.rayColor ?? 0x87CEEB,
      rayOpacity: config.rayOpacity ?? 0.15
    }

    this.raysGroup = new THREE.Group()
    this.rayMaterial = this.createRayMaterial()
    this.createRays()
    this.scene.add(this.raysGroup)

    const rendering = useSimulationStore.getState().parameters.rendering
    this.createMarineSnow(rendering.particleCount, rendering.particleOpacity)
  }

  private createRayMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(this.config.rayColor) },
        uOpacity: { value: this.config.rayOpacity }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform float uTime;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          // Add some sway to the rays
          vec3 pos = position;
          float sway = sin(uTime * 0.4 + position.x * 0.05) * 4.0;
          pos.x += sway;
          pos.z += sin(uTime * 0.25 + position.y * 0.05) * 3.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uTime;

        // Simple Hash Noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        // Value Noise
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // View-dependent edge fading (silhouette fade)
          // 1.0 when looking directly at the surface, 0.0 at the edges
          float viewDot = abs(dot(normal, viewDir));
          float edgeFade = pow(viewDot, 4.0); // Higher power means softer, more blurred edges
          
          // Smoother vertical fade (fade out at the very top and bottom)
          float vFade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          
          // Lower frequency noise for smoother, less sharp wisps
          float n1 = noise(vec2(vUv.x * 6.0 + uTime * 0.15, vUv.y * 1.5 - uTime * 0.08));
          float n2 = noise(vec2(vUv.x * 4.0 - uTime * 0.1, vUv.y * 2.5 + uTime * 0.04));
          float wisps = mix(n1, n2, 0.5);
          
          // Softer highlights and more blurred "smoke"
          // We apply edgeFade heavily to highlights to ensure they don't break the silhouette
          float highlights = pow(wisps, 3.0) * 1.5;
          float smoke = wisps * 0.5 + 0.5;
          
          // Smoother pulsing effect
          float flicker = 0.92 + 0.08 * sin(uTime * 1.2 + vUv.x * 12.0);
          
          // Combine factors for a blurred, volumetric look dependent on view angle
          float alpha = edgeFade * vFade * smoke * flicker + (highlights * edgeFade * vFade * 0.3);
          
          // Boost opacity slightly since edgeFade reduces overall brightness
          gl_FragColor = vec4(uColor, alpha * uOpacity * 1.5);
        }
      `
    })
  }

  private createRays(): void {
    const geometry = new THREE.CylinderGeometry(
      this.config.rayRadius * 0.5,
      this.config.rayRadius,
      this.config.rayHeight,
      16, 1, true
    )

    for (let i = 0; i < this.config.rayCount; i++) {
      // Clone material to allow for per-ray random offsets
      const individualMaterial = this.rayMaterial.clone()
      const randomOffset = Math.random() * 10.0
      individualMaterial.uniforms.uTime = { value: randomOffset }

      const mesh = new THREE.Mesh(geometry, individualMaterial)

      mesh.position.set(
        (Math.random() - 0.5) * 500, // Wider spread
        this.config.rayHeight / 2 - 50,
        (Math.random() - 0.5) * 500
      )

      mesh.rotation.x = (Math.random() - 0.5) * 0.4 // More varied tilt
      mesh.rotation.z = (Math.random() - 0.5) * 0.4

      const scaleX = 0.4 + Math.random() * 1.2
      const scaleY = 0.8 + Math.random() * 0.4 // Vary height slightly
      const scaleZ = scaleX // Keep it circular
      mesh.scale.set(scaleX, scaleY, scaleZ)

      this.raysGroup.add(mesh)
    }
  }

  private createMarineSnow(count: number, opacity: number): void {
    const particleCount = count
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const phases = new Float32Array(particleCount)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Spread particles throughout the swimmable volume
      positions[i * 3] = (Math.random() - 0.5) * 600
      positions[i * 3 + 1] = Math.random() * 250 - 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600

      phases[i] = Math.random() * Math.PI * 2.0
      sizes[i] = 0.5 + Math.random() * 2.0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    this.particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0x87CEEB) },
          uOpacity: { value: opacity }
        }
      ]),
      fog: true,
      vertexShader: `
        #include <common>
        #include <fog_pars_vertex>
        attribute float phase;
        attribute float size;
        varying float vOpacity;
        uniform float uTime;

        void main() {
          vec3 pos = position;
          
          // Subtle drifting motion
          pos.x += sin(uTime * 0.2 + phase) * 2.0;
          pos.y += cos(uTime * 0.15 + phase) * 3.0;
          pos.z += sin(uTime * 0.25 + phase) * 2.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          
          // Fade based on depth
          vOpacity = smoothstep(500.0, 100.0, -mvPosition.z);
          
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }
      `,
      fragmentShader: `
        #include <fog_pars_fragment>
        varying float vOpacity;
        uniform vec3 uColor;
        uniform float uOpacity;

        void main() {
          // Soft circular particle with smooth alpha falloff (no discard to preserve GPU Early-Z)
          float d = distance(gl_PointCoord, vec2(0.5));
          float strength = clamp(1.0 - d * 2.0, 0.0, 1.0);
          strength = strength * strength;
          
          gl_FragColor = vec4(uColor, strength * uOpacity * vOpacity);
          #include <fog_fragment>
        }
      `
    })

    this.particleGroup = new THREE.Points(geometry, this.particleMaterial)
    this.scene.add(this.particleGroup)
  }

  public updateParticleOpacity(opacity: number): void {
    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uOpacity.value = opacity
    }
  }

  public updateParticleCount(count: number, opacity: number): void {
    // Recreate particle system if count changed
    if (this.particleGroup) {
      if (this.particleGroup.geometry) this.particleGroup.geometry.dispose()
      if (this.particleMaterial) this.particleMaterial.dispose()
      this.scene.remove(this.particleGroup)
    }
    this.createMarineSnow(count, opacity)
  }

  public update(deltaTime: number): void {
    const timeStep = deltaTime

    // Update each ray's individual material
    this.raysGroup.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
        child.material.uniforms.uTime.value += timeStep
      }
    })

    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uTime.value += timeStep
    }
  }

  public dispose(): void {
    this.raysGroup.children.forEach((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose()
      }
    })
    this.rayMaterial.dispose()
    this.scene.remove(this.raysGroup)

    if (this.particleGroup) {
      if (this.particleGroup.geometry) this.particleGroup.geometry.dispose()
      if (this.particleMaterial) this.particleMaterial.dispose()
      this.scene.remove(this.particleGroup)
    }
  }
}
