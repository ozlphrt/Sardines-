import * as THREE from 'three'

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
        varying float vDepth;
        uniform float uTime;

        void main() {
          vUv = uv;
          
          // Add some sway to the rays
          vec3 pos = position;
          float sway = sin(uTime * 0.5 + position.x * 0.1) * 2.0;
          pos.x += sway;
          pos.z += sin(uTime * 0.3 + position.y * 0.1) * 2.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vDepth = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDepth;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uTime;

        void main() {
          // Circular falloff from the center of the cylinder face (UV.x)
          // Since it's a cylinder, vUv.x goes from 0 to 1 around the circumference
          // However, for the 'side' view of rays, we use a cosine-based falloff 
          // to make the edges soft.
          float horizontalFalloff = sin(vUv.x * 3.14159);
          horizontalFalloff = pow(horizontalFalloff, 2.0); // Sharpen the falloff slightly but keep edges soft
          
          // Vertical fade (surface to deep)
          float vFade = vUv.y; 
          
          // Pulsing effect
          float pulse = 0.8 + 0.2 * sin(uTime * 0.2 + vUv.x * 10.0);
          
          gl_FragColor = vec4(uColor, horizontalFalloff * vFade * uOpacity * pulse);
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
      const mesh = new THREE.Mesh(geometry, this.rayMaterial)

      mesh.position.set(
        (Math.random() - 0.5) * 400,
        this.config.rayHeight / 2 - 40,
        (Math.random() - 0.5) * 400
      )

      mesh.rotation.x = (Math.random() - 0.5) * 0.2
      mesh.rotation.z = (Math.random() - 0.5) * 0.2

      const scale = 0.5 + Math.random() * 1.0
      mesh.scale.set(scale, 1.0, scale)

      this.raysGroup.add(mesh)
    }
  }

  public update(deltaTime: number): void {
    this.rayMaterial.uniforms.uTime.value += deltaTime
  }

  public dispose(): void {
    this.raysGroup.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose()
      }
    })
    this.rayMaterial.dispose()
    this.scene.remove(this.raysGroup)
  }
}
