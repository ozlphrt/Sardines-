import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useSimulationStore } from '../stores/simulationStore.js'

export interface GPUFlockConfig {
  bounds: THREE.Box3
  maxFishCount: number
  initialCount: number
}

// Texture dimensions for GPU computation
// 160 x 160 = 25,600 particles capacity (standard optimal capacity for 25k fish)
// 256 x 256 = 65,536 particles capacity (dynamically expanded if count > 25,600)
const BASE_TEXTURE_SIZE = 160
const HIGH_TEXTURE_SIZE = 256

// -------------------------------------------------------------
// GLSL COMPUTE SHADERS
// -------------------------------------------------------------

const POSITION_SHADER = `
uniform float uDeltaTime;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 pos = texture2D(texturePosition, uv);
  vec4 vel = texture2D(textureVelocity, uv);

  pos.xyz += vel.xyz * uDeltaTime;
  gl_FragColor = pos;
}
`

const VELOCITY_SHADER = `
uniform float uDeltaTime;
uniform float uTime;
uniform float uActiveCount;
uniform vec3 uBoundsMin;
uniform vec3 uBoundsMax;
uniform vec3 uSchoolCenters[3];
uniform vec3 uSchoolDirections[3];
uniform vec3 uPredatorPositions[3];
uniform float uPredatorCount;
uniform float uPredatorRadius;
uniform float uPredatorForce;

uniform float uCohesionWeight;
uniform float uAlignmentWeight;
uniform float uSeparationWeight;
uniform float uNeighborRadius;
uniform float uSeparationRadius;
uniform float uSocialWeight;
uniform float uIndividualWeight;
uniform float uMaxSpeed;
uniform float uMinSpeed;
uniform float uMaxForce;
uniform float uUndulationFrequency;
uniform float uVortexActive;
uniform vec3 uVortexCenter;
uniform float uVortexStrength;
uniform float uVortexRadius;

float hash(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float myIndex = floor(gl_FragCoord.y) * resolution.x + floor(gl_FragCoord.x);

  // Multi-School Assignment:
  // School 0 (Mega-School): ~55% of sardines
  // School 1 (Secondary School): ~30% of sardines
  // School 2 (Satellite School): ~15% of sardines
  float normIdx = myIndex / max(uActiveCount, 1.0);
  vec3 mySchoolCenter = uSchoolCenters[0];
  vec3 mySchoolDirection = uSchoolDirections[0];
  if (normIdx >= 0.85) {
    mySchoolCenter = uSchoolCenters[2];
    mySchoolDirection = uSchoolDirections[2];
  } else if (normIdx >= 0.55) {
    mySchoolCenter = uSchoolCenters[1];
    mySchoolDirection = uSchoolDirections[1];
  }

  vec4 selfPosData = texture2D(texturePosition, uv);
  vec4 selfVelData = texture2D(textureVelocity, uv);

  // Inactive particles beyond active fish count: keep stationary
  if (myIndex >= uActiveCount) {
    gl_FragColor = selfVelData;
    return;
  }

  vec3 selfPos = selfPosData.xyz;
  vec3 selfVel = selfVelData.xyz;
  float selfSpeed = max(length(selfVel), 0.001);

  vec3 separation = vec3(0.0);
  vec3 alignmentHeading = vec3(0.0);
  vec3 cohesionCenter = vec3(0.0);

  float separationCount = 0.0;
  float neighborCount = 0.0;

  // Separation personal space radius (boosted so sardines maintain open 3D breathing space)
  float sepRadius = max(uSeparationRadius, 10.5);
  float sepRadiusSq = sepRadius * sepRadius;
  float neighborRadiusSq = uNeighborRadius * uNeighborRadius;

  // 10-point High-Performance Spatial Neighborhood Sampling:
  // 8 Direct 2D-Grid UV Stencil Neighbors (Guaranteed physical 3D proximity) + 2 Global School Samples
  vec2 stepUV = 1.0 / resolution.xy;
  vec2 kernel[8];
  kernel[0] = vec2( 1.0,  0.0);
  kernel[1] = vec2(-1.0,  0.0);
  kernel[2] = vec2( 0.0,  1.0);
  kernel[3] = vec2( 0.0, -1.0);
  kernel[4] = vec2( 1.0,  1.0);
  kernel[5] = vec2(-1.0, -1.0);
  kernel[6] = vec2( 1.0, -1.0);
  kernel[7] = vec2(-1.0,  1.0);

  // 1. Check local spatial cluster (statically mapped from 2D texture grid to 3D ocean volume)
  for (int i = 0; i < 8; i++) {
    vec2 sampleUV = fract(uv + kernel[i] * stepUV);
    vec3 otherPos = texture2D(texturePosition, sampleUV).xyz;
    vec3 otherVel = texture2D(textureVelocity, sampleUV).xyz;

    vec3 diff = otherPos - selfPos;
    float distSq = dot(diff, diff);

    if (distSq > 0.0001 && distSq < sepRadiusSq) {
      float dist = sqrt(distSq);
      // Smooth continuous quadratic repulsion curve: zero push at boundary, smooth continuous push at center
      float push = (sepRadius - dist) / sepRadius;
      float pushWeight = push * push * 2.8;
      separation -= (diff / dist) * pushWeight;
      separationCount += 1.0;
    }

    if (distSq > 0.0001 && distSq < neighborRadiusSq) {
      float otherSpeed = length(otherVel);
      if (otherSpeed > 0.01) {
        alignmentHeading += otherVel / otherSpeed;
      }
      cohesionCenter += otherPos;
      neighborCount += 1.0;
    }
  }

  // 2. Consistent stratified samples across the active population
  // Using deterministic per-fish hash instead of uTime to eliminate frame-to-frame neighbor hopping jitter
  for (int j = 0; j < 2; j++) {
    float tFrac = fract(float(j) * 0.6180339887 + hash(uv * 17.3 + vec2(float(j) * 0.41, float(j) * 0.67)));
    float peerIndex = floor(tFrac * uActiveCount);
    if (abs(peerIndex - myIndex) < 0.5) continue;

    float sX = (mod(peerIndex, resolution.x) + 0.5) / resolution.x;
    float sY = (floor(peerIndex / resolution.x) + 0.5) / resolution.y;
    vec2 sampleUV = vec2(sX, sY);

    vec3 otherPos = texture2D(texturePosition, sampleUV).xyz;
    vec3 otherVel = texture2D(textureVelocity, sampleUV).xyz;

    vec3 diff = otherPos - selfPos;
    float distSq = dot(diff, diff);

    if (distSq > 0.0001 && distSq < sepRadiusSq) {
      float dist = sqrt(distSq);
      float push = (sepRadius - dist) / sepRadius;
      float pushWeight = push * push * 2.8;
      separation -= (diff / dist) * pushWeight;
      separationCount += 1.0;
    }

    if (distSq > 0.0001 && distSq < neighborRadiusSq) {
      float otherSpeed = length(otherVel);
      if (otherSpeed > 0.01) {
        alignmentHeading += otherVel / otherSpeed;
      }
      cohesionCenter += otherPos;
      neighborCount += 1.0;
    }
  }

  vec3 steeringForce = vec3(0.0);

  // --- 1. REYNOLDS SEPARATION FORCE (Volumetric spacing, smooth normalized push) ---
  if (separationCount > 0.5) {
    vec3 avgSep = separation / separationCount;
    steeringForce += avgSep * (uSeparationWeight * 14.0);
  }

  // --- 2. REYNOLDS ALIGNMENT FORCE (Seamless, continuous blend between local flow and assigned school direction) ---
  vec3 targetHeading = (length(mySchoolDirection) > 0.01) ? normalize(mySchoolDirection) : vec3(0.0, 0.0, 1.0);
  if (neighborCount > 0.5) {
    vec3 localHeading = normalize(alignmentHeading);
    if (length(localHeading) > 0.01) {
      targetHeading = normalize(mix(targetHeading, localHeading, 0.72));
    }
  }
  vec3 desiredVel = targetHeading * selfSpeed;
  steeringForce += (desiredVel - selfVel) * (uAlignmentWeight * 2.8);

  // --- 3. REYNOLDS COHESION FORCE (Pulls fish together smoothly without rubber-banding) ---
  if (neighborCount > 0.5) {
    vec3 localCenter = cohesionCenter / neighborCount;
    vec3 toCenter = localCenter - selfPos;
    float distToLocal = length(toCenter);
    if (distToLocal > sepRadius * 0.8) {
      vec3 desiredDir = toCenter / distToLocal;
      float pull = smoothstep(sepRadius * 0.8, uNeighborRadius, distToLocal);
      steeringForce += desiredDir * (pull * uCohesionWeight * 2.4);
    }
  }

  // --- 4. GLOBAL SCHOOL COHESION (Gentle Macroscopic Ocean Flow to assigned school) ---
  vec3 toSchool = mySchoolCenter - selfPos;
  float distToSchool = length(toSchool);
  if (distToSchool > 45.0) {
    float schoolPull = smoothstep(45.0, 180.0, distToSchool);
    vec3 schoolDir = toSchool / distToSchool;
    steeringForce += schoolDir * (schoolPull * uCohesionWeight * 2.0);
  }

  // --- 5. SOFT BOUNDARY CONTAINMENT ---
  vec3 softMargin = vec3(25.0);
  vec3 bMin = uBoundsMin + softMargin;
  vec3 bMax = uBoundsMax - softMargin;

  if (selfPos.x < bMin.x) steeringForce.x += (bMin.x - selfPos.x) * 3.5;
  if (selfPos.x > bMax.x) steeringForce.x += (bMax.x - selfPos.x) * 3.5;
  if (selfPos.y < bMin.y) steeringForce.y += (bMin.y - selfPos.y) * 5.0;
  if (selfPos.y > bMax.y) steeringForce.y += (bMax.y - selfPos.y) * 5.0;
  if (selfPos.z < bMin.z) steeringForce.z += (bMin.z - selfPos.z) * 3.5;
  if (selfPos.z > bMax.z) steeringForce.z += (bMax.z - selfPos.z) * 3.5;

  // --- 6. OCEANIC WHIRLPOOL / CYCLONE VORTEX (Dynamic Bait-Ball Tornado) ---
  if (uVortexActive > 0.01) {
    vec3 toVortex = selfPos - uVortexCenter;
    float rH = length(toVortex.xz);
    if (rH < uVortexRadius && rH > 0.5) {
      float vortexFactor = (1.0 - smoothstep(0.0, uVortexRadius, rH)) * uVortexActive;

      // 1. High-speed tangential rotation around Y axis (+Y)
      vec3 tangent = normalize(vec3(-toVortex.z, 0.0, toVortex.x));

      // 2. 3D helical corkscrew vertical circulation (twisting cyclone funnel)
      float verticalSpiral = sin(rH * 0.15 - uTime * 2.2) * 0.45;
      tangent.y += verticalSpiral;
      tangent = normalize(tangent);

      // 3. Centripetal inward pull towards the vortex core
      vec3 inward = normalize(vec3(-toVortex.x, 0.0, -toVortex.z));

      // Combined cyclone vortex force
      vec3 cycloneForce = tangent * 30.0 + inward * 10.0;
      steeringForce += cycloneForce * (vortexFactor * uVortexStrength);
    }
  }

  // --- 7. PREDATOR EVASION (Realistic Lateral Burst Away From All Active Sharks) ---
  if (uPredatorCount > 0.5) {
    for (int p = 0; p < 3; p++) {
      if (float(p) >= uPredatorCount) break;
      vec3 toPred = selfPos - uPredatorPositions[p];
      float predDist = length(toPred);
      if (predDist < uPredatorRadius && predDist > 0.001) {
        float panic = 1.0 - (predDist / uPredatorRadius);
        vec3 fleeDir = normalize(toPred);
        vec3 lateral = cross(vec3(0.0, 1.0, 0.0), fleeDir);
        if (length(lateral) > 0.01) {
          fleeDir += normalize(lateral) * 0.35 * (hash(uv + float(p) * 0.17) > 0.5 ? 1.0 : -1.0);
        }
        fleeDir = normalize(fleeDir);
        steeringForce += fleeDir * (panic * panic * uPredatorForce * 40.0);
      }
    }
  }

  // --- 8. NATURAL 3D TURBULENCE & INDIVIDUAL WEAVE (Smooth low-frequency stream, no jitter) ---
  float flowTime = uTime * 0.12;
  vec3 p3 = selfPos * 0.02 + vec3(flowTime * 0.6, flowTime * 0.35, flowTime * 0.45);
  vec3 wander = vec3(
    sin(p3.y * 2.5 + p3.z * 1.3),
    sin(p3.x * 2.1 + p3.z * 1.6) * 0.35,
    cos(p3.x * 1.4 + p3.y * 1.8)
  );
  steeringForce += wander * (uIndividualWeight * 5.5);

  // --- 9. ACCELERATION LIMITING & HYDRODYNAMIC INERTIA ---
  float forceLen = length(steeringForce);
  float maxAllowedForce = uMaxForce * 2.5;
  if (forceLen > maxAllowedForce) {
    steeringForce = (steeringForce / forceLen) * maxAllowedForce;
  }

  // Target velocity based on current steering
  vec3 targetVel = selfVel + steeringForce * uDeltaTime;

  float targetSpeed = length(targetVel);
  float activeMaxSpeed = uMaxSpeed;
  if (uPredatorCount > 0.5) {
    for (int p = 0; p < 3; p++) {
      if (float(p) >= uPredatorCount) break;
      if (length(selfPos - uPredatorPositions[p]) < uPredatorRadius) {
        activeMaxSpeed = uMaxSpeed * 2.0;
        break;
      }
    }
  }

  if (targetSpeed > activeMaxSpeed) {
    targetVel = (targetVel / targetSpeed) * activeMaxSpeed;
  } else if (targetSpeed < uMinSpeed) {
    targetVel = (targetVel / max(targetSpeed, 0.0001)) * uMinSpeed;
  }

  // Prevent vertical stalling: ensure fish swim mostly horizontally
  if (abs(targetVel.y) > length(targetVel.xz) * 1.2) {
    targetVel.y *= 0.85;
  }

  // Hydrodynamic Inertia (viscous momentum filter):
  // Eliminates frame-time micro-stutters and produces silky-smooth forward gliding
  float inertiaBlend = clamp(1.0 - exp(-8.5 * uDeltaTime), 0.05, 0.35);
  vec3 newVel = mix(selfVel, targetVel, inertiaBlend);

  // Biomechanical tail wagging rate & phase integration
  float actualSpeed = length(newVel);
  vec3 accel = (newVel - selfVel) / max(uDeltaTime, 0.0001);
  float accelMag = length(accel);

  // Stillness threshold: motionless when completely still (speed < 0.1)
  float stillFactor = smoothstep(0.05, 0.35, actualSpeed);

  // Wandering cadence vs fast swimming & acceleration burst:
  // Wandering cruise speed is ~3.5 - 5.5, max speed is ~12.0 - 24.0
  float speedNorm = clamp((actualSpeed - 3.0) / 9.0, 0.0, 1.0);
  float accelNorm = clamp(accelMag / 25.0, 0.0, 1.0);
  float vigor = clamp(speedNorm + accelNorm * 0.7, 0.0, 1.0);

  // Dynamic tail frequency (scaled by store uUndulationFrequency):
  // Calm wandering: ~2.5 Hz (15.5 rad/s) - smooth, graceful, fluid
  // High-speed sprint / burst acceleration: up to ~7.0 Hz (44.0 rad/s) - rapid, vigorous
  float freqMultiplier = max(uUndulationFrequency / 3.2, 0.2);
  float baseWagFreq = 15.5 * freqMultiplier;
  float maxWagFreq = 44.0 * freqMultiplier;
  float tailFrequency = mix(baseWagFreq, maxWagFreq, pow(vigor, 1.25)) * stillFactor;

  float newPhase = mod(selfVelData.w + tailFrequency * uDeltaTime, 6.2831853);

  gl_FragColor = vec4(newVel, newPhase);
}
`

export class GPUFlockManager {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private bounds: THREE.Box3

  private textureWidth: number = BASE_TEXTURE_SIZE
  private textureHeight: number = BASE_TEXTURE_SIZE
  private maxCapacity: number = BASE_TEXTURE_SIZE * BASE_TEXTURE_SIZE

  private gpuCompute!: GPUComputationRenderer
  private positionVariable: any
  private velocityVariable: any

  private instancedMesh: THREE.InstancedMesh | null = null
  private currentFishCount: number = 25000

  private modelGeometry: THREE.BufferGeometry | null = null
  private modelMaterial: THREE.Material | null = null
  private baseScale: number = 1.0

  private simulationTime: number = 0
  private smoothedDt: number = 0.0166
  private schoolCenters: THREE.Vector3[] = [
    new THREE.Vector3(0, 16, 0),
    new THREE.Vector3(-55, 22, 35),
    new THREE.Vector3(50, 12, -30)
  ]
  private schoolVelocities: THREE.Vector3[] = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0)
  ]
  private schoolCenter: THREE.Vector3 = this.schoolCenters[0]
  private schoolVelocity: THREE.Vector3 = this.schoolVelocities[0]

  // Oceanic Whirlpool / Bait-Ball Cyclone vortex state
  private vortexTimer: number = 0
  private vortexPhase: 'calm' | 'ramping_up' | 'active' | 'ramping_down' = 'calm'
  private vortexActiveValue: number = 0
  private vortexCenter: THREE.Vector3 = new THREE.Vector3(0, 25, 0)

  // Shared uniforms referenced directly by the WebGL compiled shader
  private uniforms = {
    uTexturePosition: { value: null as THREE.Texture | null },
    uTextureVelocity: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uModelScale: { value: 2.0 },
    uUndulationAmplitude: { value: 0.22 }
  }

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, config: GPUFlockConfig) {
    this.renderer = renderer
    this.scene = scene
    this.bounds = config.bounds
    this.currentFishCount = config.initialCount || 25000

    const texSize = this.currentFishCount > 25600 ? HIGH_TEXTURE_SIZE : BASE_TEXTURE_SIZE
    this.textureWidth = texSize
    this.textureHeight = texSize
    this.maxCapacity = texSize * texSize

    this.initGPUComputation()

    // Initialize immediate procedural fish mesh so fish are 100% visible immediately from frame 0
    this.initDefaultGeometry()
    this.createInstancedMesh()

    // Asynchronously load the high-detail sardine GLTF model and swap geometry
    this.loadFishModel()
  }

  private initGPUComputation(): void {
    this.gpuCompute = new GPUComputationRenderer(this.textureWidth, this.textureHeight, this.renderer)

    if (this.renderer.capabilities.isWebGL2 === false) {
      this.gpuCompute.setDataType(THREE.HalfFloatType)
    }

    const dtPosition = this.gpuCompute.createTexture()
    const dtVelocity = this.gpuCompute.createTexture()

    this.fillInitialTextures(dtPosition, dtVelocity)

    this.positionVariable = this.gpuCompute.addVariable('texturePosition', POSITION_SHADER, dtPosition)
    this.velocityVariable = this.gpuCompute.addVariable('textureVelocity', VELOCITY_SHADER, dtVelocity)

    this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable, this.velocityVariable])
    this.gpuCompute.setVariableDependencies(this.velocityVariable, [this.positionVariable, this.velocityVariable])

    // Setup uniform defaults on velocity variable
    const velUniforms = this.velocityVariable.material.uniforms
    velUniforms.uDeltaTime = { value: 0.016 }
    velUniforms.uTime = { value: 0 }
    velUniforms.uActiveCount = { value: this.currentFishCount }
    velUniforms.uBoundsMin = { value: this.bounds.min.clone() }
    velUniforms.uBoundsMax = { value: this.bounds.max.clone() }
    velUniforms.uSchoolCenters = {
      value: [
        this.schoolCenters[0].clone(),
        this.schoolCenters[1].clone(),
        this.schoolCenters[2].clone()
      ]
    }
    velUniforms.uSchoolDirections = {
      value: [
        this.schoolVelocities[0].clone(),
        this.schoolVelocities[1].clone(),
        this.schoolVelocities[2].clone()
      ]
    }
    velUniforms.uPredatorPositions = {
      value: [
        new THREE.Vector3(0, -9999, 0),
        new THREE.Vector3(0, -9999, 0),
        new THREE.Vector3(0, -9999, 0)
      ]
    }
    velUniforms.uPredatorCount = { value: 0.0 }
    velUniforms.uPredatorRadius = { value: 55.0 }
    velUniforms.uPredatorForce = { value: 3.5 }

    // Flocking parameters
    const p = useSimulationStore.getState().parameters
    velUniforms.uCohesionWeight = { value: p.behavior.cohesionStrength ?? 1.5 }
    velUniforms.uAlignmentWeight = { value: p.behavior.alignmentStrength ?? 1.0 }
    velUniforms.uSeparationWeight = { value: p.behavior.separationStrength ?? 2.2 }
    velUniforms.uNeighborRadius = { value: p.behavior.neighborRadius ?? 40.0 }
    velUniforms.uSeparationRadius = { value: p.behavior.separationRadius ?? 10.5 }
    velUniforms.uSocialWeight = { value: p.behavior.socialWeight ?? 0.7 }
    velUniforms.uIndividualWeight = { value: p.behavior.individualWeight ?? 0.35 }
    velUniforms.uMaxSpeed = { value: 12.0 }
    velUniforms.uMinSpeed = { value: 4.0 }
    velUniforms.uMaxForce = { value: 30.0 }
    velUniforms.uUndulationFrequency = { value: p.behavior.undulationFrequency ?? 3.2 }
    velUniforms.uVortexActive = { value: 0.0 }
    velUniforms.uVortexCenter = { value: this.vortexCenter.clone() }
    velUniforms.uVortexStrength = { value: 1.8 }
    velUniforms.uVortexRadius = { value: 110.0 }
    this.uniforms.uUndulationAmplitude.value = p.behavior.undulationAmplitude ?? 0.22

    this.positionVariable.material.uniforms.uDeltaTime = { value: 0.016 }

    const error = this.gpuCompute.init()
    if (error !== null) {
      console.error('GPUComputationRenderer init error:', error)
    }

    // Set initial texture values on shared uniforms
    this.uniforms.uTexturePosition.value = this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture
    this.uniforms.uTextureVelocity.value = this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture
  }

  private fillInitialTextures(dtPosition: THREE.DataTexture, dtVelocity: THREE.DataTexture): void {
    const posArray = (dtPosition.image.data as unknown) as Float32Array
    const velArray = (dtVelocity.image.data as unknown) as Float32Array

    // 2D grid dimensions mapped into 3D oceanic space
    const halfWidth = 140.0
    const halfDepth = 140.0
    const minY = 10.0
    const maxY = 68.0
    const spanY = maxY - minY

    for (let k = 0, kl = posArray.length; k < kl; k += 4) {
      const idx = k / 4
      const tx = (idx % this.textureWidth) / this.textureWidth
      const ty = Math.floor(idx / this.textureWidth) / this.textureHeight

      // 2D Spatial mapping: adjacent UVs in texture correspond to adjacent 3D positions in the ocean
      const gridX = (tx - 0.5) * 2.0 * halfWidth
      const gridZ = (ty - 0.5) * 2.0 * halfDepth

      // Natural organic dispersion around grid node (prevents rigid lattice appearance)
      const jitterX = (Math.random() - 0.5) * 20.0
      const jitterZ = (Math.random() - 0.5) * 20.0
      const jitterY = minY + Math.random() * spanY

      posArray[k + 0] = gridX + jitterX
      posArray[k + 1] = jitterY
      posArray[k + 2] = gridZ + jitterZ
      posArray[k + 3] = 1.0

      // Natural circular swirling circulation from start (tangential to ocean center)
      const tangent = Math.atan2(gridZ, gridX) + Math.PI * 0.5
      const angle = tangent + (Math.random() - 0.5) * 0.8
      const pitch = (Math.random() - 0.5) * 0.25
      const cosPitch = Math.cos(pitch)

      const dirX = Math.cos(angle) * cosPitch
      const dirY = Math.sin(pitch)
      const dirZ = Math.sin(angle) * cosPitch

      const speed = 4.0 + Math.random() * 2.0
      velArray[k + 0] = dirX * speed
      velArray[k + 1] = dirY * speed
      velArray[k + 2] = dirZ * speed
      velArray[k + 3] = Math.random() * Math.PI * 2 // undulation phase offset
    }
  }

  private initDefaultGeometry(): void {
    // Aerodynamic sardine-shaped procedural geometry oriented +Z forward
    const geom = new THREE.ConeGeometry(0.35, 1.6, 7)
    geom.rotateX(Math.PI / 2) // Orient along +Z axis
    this.modelGeometry = geom

    const r = useSimulationStore.getState().parameters.rendering
    this.modelMaterial = new THREE.MeshStandardMaterial({
      color: 0x90caf9,
      metalness: r.metalness ?? 0.8,
      roughness: r.roughness ?? 0.2,
      envMapIntensity: r.envMapIntensity ?? 1.5,
      emissive: new THREE.Color(0x113355),
      emissiveIntensity: 0.3,
      side: THREE.DoubleSide
    })
    this.baseScale = 1.8
    this.uniforms.uModelScale.value = (r.modelScale ?? 1.8) * this.baseScale
  }

  private async loadFishModel(): Promise<void> {
    const basePath = (import.meta as any).env.BASE_URL || '/'
    const loader = new GLTFLoader()
    loader.setPath(`${basePath}assets/fish-model/`)

    try {
      const gltf = await loader.loadAsync('scene.gltf')
      let fishMesh: THREE.Mesh | null = null
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && !fishMesh) fishMesh = child
      })

      if (fishMesh) {
        const geometry = (fishMesh as THREE.Mesh).geometry.clone()

        // Fix inward winding order if present:
        // Swap index 1 and 2 of each triangle so face normals and vertex normals point cleanly outward
        if (geometry.index) {
          const indexArray = geometry.index.array
          const count = indexArray.length
          for (let i = 0; i < count; i += 3) {
            const temp = indexArray[i + 1]
            indexArray[i + 1] = indexArray[i + 2]
            indexArray[i + 2] = temp
          }
          geometry.index.needsUpdate = true
          geometry.computeVertexNormals()
        }

        this.modelGeometry = geometry
        const origMat = (fishMesh as THREE.Mesh).material
        const material = Array.isArray(origMat) ? origMat[0].clone() : origMat.clone()

        const r = useSimulationStore.getState().parameters.rendering
        material.side = THREE.DoubleSide
        if (material instanceof THREE.MeshStandardMaterial) {
          material.metalness = r.metalness ?? 0.8
          material.roughness = r.roughness ?? 0.2
          material.envMapIntensity = r.envMapIntensity ?? 1.5
          material.emissive = new THREE.Color(0x113355)
          material.emissiveIntensity = r.emissiveIntensity ?? 0.3
          material.fog = true
          if (material.map) material.map.anisotropy = 4
          if (material.normalMap) material.normalMap.anisotropy = 4
        }

        this.modelMaterial = material
        this.baseScale = 1.0
        this.uniforms.uModelScale.value = (r.modelScale ?? 1.8) * this.baseScale

        // Re-create instanced mesh with high-detail sardine model
        this.createInstancedMesh()
      }
    } catch (e) {
      console.warn('GLTF fish-model load note:', e)
    }
  }

  private createInstancedMesh(): void {
    if (!this.modelGeometry || !this.modelMaterial) return

    if (this.instancedMesh) {
      this.scene.remove(this.instancedMesh)
      this.instancedMesh.geometry.dispose()
      if (Array.isArray(this.instancedMesh.material)) {
        this.instancedMesh.material.forEach(m => m.dispose())
      } else {
        this.instancedMesh.material.dispose()
      }
    }

    const geometry = this.modelGeometry.clone()
    const material = this.modelMaterial.clone()

    // Assign per-instance UVs mapping into the GPU computation texture
    const uvArray = new Float32Array(this.maxCapacity * 2)
    const dnaArray = new Float32Array(this.maxCapacity * 3)

    for (let i = 0; i < this.maxCapacity; i++) {
      const x = ((i % this.textureWidth) + 0.5) / this.textureWidth
      const y = (Math.floor(i / this.textureWidth) + 0.5) / this.textureHeight

      uvArray[i * 2 + 0] = x
      uvArray[i * 2 + 1] = y

      dnaArray[i * 3 + 0] = 0.7 + Math.random() * 0.5 // Scale variation (0.7 to 1.2)
      dnaArray[i * 3 + 1] = 0.8 + Math.random() * 0.4 // Speed variation
      dnaArray[i * 3 + 2] = Math.random() * Math.PI * 2 // Undulation phase offset
    }

    geometry.setAttribute('aInstanceUV', new THREE.InstancedBufferAttribute(uvArray, 2))
    geometry.setAttribute('aInstanceDNA', new THREE.InstancedBufferAttribute(dnaArray, 3))

    // Inject custom GPU Boids sampling into material shaders
    this.setupCustomShader(material)

    const mesh = new THREE.InstancedMesh(geometry, material, this.maxCapacity)

    // Pre-initialize instance matrices to identity so no zero-matrices exist in WebGL
    const identity = new THREE.Matrix4()
    for (let i = 0; i < this.maxCapacity; i++) {
      mesh.setMatrixAt(i, identity)
    }
    mesh.instanceMatrix.needsUpdate = true

    mesh.count = Math.min(this.currentFishCount, this.maxCapacity)
    mesh.frustumCulled = false
    mesh.castShadow = false
    mesh.receiveShadow = false

    this.instancedMesh = mesh
    this.scene.add(mesh)
  }

  private setupCustomShader(material: THREE.Material): void {
    const sharedUniforms = this.uniforms

    material.onBeforeCompile = (shader) => {
      // Connect shared uniforms directly to WebGL shader program
      shader.uniforms.uTexturePosition = sharedUniforms.uTexturePosition
      shader.uniforms.uTextureVelocity = sharedUniforms.uTextureVelocity
      shader.uniforms.uTime = sharedUniforms.uTime
      shader.uniforms.uModelScale = sharedUniforms.uModelScale
      shader.uniforms.uUndulationAmplitude = sharedUniforms.uUndulationAmplitude

      // Insert attribute and uniform declarations after #include <common>
      // so that #version 300 es remains the first line in WebGL2!
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        attribute vec2 aInstanceUV;
        attribute vec3 aInstanceDNA;
        uniform sampler2D uTexturePosition;
        uniform sampler2D uTextureVelocity;
        uniform float uTime;
        uniform float uModelScale;
        uniform float uUndulationAmplitude;
        `
      )

      // Replace normal calculation to compute orientation basis ONCE (no duplicate texture fetches or cross products)
      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
        #include <beginnormal_vertex>
        vec4 posData = texture2D(uTexturePosition, aInstanceUV);
        vec4 velData = texture2D(uTextureVelocity, aInstanceUV);
        vec3 fishVel = velData.xyz;
        float speed = length(fishVel);
        vec3 forward = (speed > 0.001) ? normalize(fishVel) : vec3(0.0, 0.0, 1.0);
        vec3 tempUp = (abs(forward.y) > 0.92) ? vec3(0.0, 0.0, 1.0) : vec3(0.0, 1.0, 0.0);
        vec3 right = normalize(cross(tempUp, forward));
        vec3 up = cross(forward, right);

        objectNormal = right * objectNormal.x + up * objectNormal.y + forward * objectNormal.z;
        `
      )

      // Replace begin_vertex with GPU Boids orientation and swimming wave reusing basis
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vec3 worldFishPos = posData.xyz;

        // Realistic carangiform swimming spine wave (head-to-tail propagation)
        // Nose is at +Z (~0.84), caudal fin is at -Z (~-1.16)
        float headZ = 0.84;
        float tailZ = -1.16;

        // Head remains steady; spine progressively flexes toward the caudal fin
        // smoothstep from gills (Z = 0.45) back to tail tip (Z = -1.16)
        float tailWeight = smoothstep(0.45, tailZ, position.z);

        // Continuous traveling wave along the spine with individual DNA offset
        float waveNumber = 2.4;
        float wigglePhase = velData.w + (position.z - headZ) * waveNumber + aInstanceDNA.z * 0.35;

        // Stillness factor: no movement if fish is motionless
        float stillFactor = smoothstep(0.08, 0.4, speed);

        // Vigor from speed (cruising = 0.0, sprinting = 1.0)
        float vigor = clamp((speed - 3.0) / 8.0, 0.0, 1.0);

        // User amplitude scale multiplier from store
        float ampMultiplier = max(uUndulationAmplitude / 0.22, 0.2);

        // Amplitude (Biomechanics: wider when slower, narrower when faster):
        // Calm wandering / slow cruising: wide, sweeping, graceful tail strokes (0.40 units)
        // High-speed sprint / burst panic: narrow, stiff, high-frequency hydrodynamic flutter (0.16 units)
        float slowStroke = 0.40 * ampMultiplier;
        float fastStroke = 0.16 * ampMultiplier;
        float strokeAmp = mix(slowStroke, fastStroke, vigor) * stillFactor;

        // Spine deformation wave: progressive caudal wave + natural body flex
        float waveDisplacement = sin(wigglePhase) * tailWeight * strokeAmp;
        float bodyBend = sin(wigglePhase - 0.7) * tailWeight * mix(0.07, 0.025, vigor) * ampMultiplier * stillFactor;

        // Slight counter-yaw on the rostrum/head for physical realism (scaled with stroke amplitude)
        float headCounterYaw = (1.0 - tailWeight) * smoothstep(-0.2, headZ, position.z) * 0.06 * strokeAmp;
        float headDisplacement = -sin(wigglePhase - 1.2) * headCounterYaw;

        vec3 localPos = position;
        localPos.x += waveDisplacement + bodyBend + headDisplacement;

        // Apply scale
        float finalScale = uModelScale * aInstanceDNA.x;
        localPos *= finalScale;

        // Orient and position in world space
        transformed = right * localPos.x + up * localPos.y + forward * localPos.z + worldFishPos;
        `
      )

      // Clean project_vertex bypass for instance matrix
      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        `
        vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
        `
      )
    }

    material.needsUpdate = true
  }

  public update(deltaTime: number, predatorInput: THREE.Vector3[] | THREE.Vector3 | null): void {
    if (!this.gpuCompute) return

    // Smooth frame-to-frame delta time fluctuations (EMA filter)
    const rawDt = Math.min(Math.max(deltaTime, 0.001), 0.05)
    this.smoothedDt = THREE.MathUtils.lerp(this.smoothedDt, rawDt, 0.15)
    const safeDt = this.smoothedDt
    this.simulationTime += safeDt

    // Compute dynamic, organic trajectories for all 3 sardine schools through the oceanic volume
    // 1. Alpha Mega-School (~55% population): Main oceanic migration
    const t0 = this.simulationTime * 0.065
    const x0 = Math.sin(t0) * 85.0 + Math.sin(t0 * 0.43) * 30.0
    const y0 = 16.0 + Math.sin(t0 * 0.71) * 10.0
    const z0 = Math.sin(t0 * 0.82) * 80.0 + Math.sin(t0 * 0.31) * 25.0
    this.schoolCenters[0].set(x0, y0, z0)
    const vx0 = (Math.cos(t0) * 85.0 + Math.cos(t0 * 0.43) * 30.0 * 0.43) * 0.065
    const vy0 = (Math.cos(t0 * 0.71) * 10.0 * 0.71) * 0.065
    const vz0 = (Math.cos(t0 * 0.82) * 80.0 * 0.82 + Math.cos(t0 * 0.31) * 25.0 * 0.31) * 0.065
    this.schoolVelocities[0].set(vx0, vy0, vz0).normalize()

    // 2. Beta Secondary School (~30% population): Sweeping counter-orbit flank school
    const t1 = this.simulationTime * 0.072 + 2.4
    const x1 = Math.cos(t1) * 90.0 + Math.sin(t1 * 0.38) * 35.0
    const y1 = 22.0 + Math.cos(t1 * 0.62) * 12.0
    const z1 = Math.sin(t1 * 0.75) * 85.0 + Math.cos(t1 * 0.41) * 30.0
    this.schoolCenters[1].set(x1, y1, z1)
    const vx1 = (-Math.sin(t1) * 90.0 + Math.cos(t1 * 0.38) * 35.0 * 0.38) * 0.072
    const vy1 = (-Math.sin(t1 * 0.62) * 12.0 * 0.62) * 0.072
    const vz1 = (Math.cos(t1 * 0.75) * 85.0 * 0.75 - Math.sin(t1 * 0.41) * 30.0 * 0.41) * 0.072
    this.schoolVelocities[1].set(vx1, vy1, vz1).normalize()

    // 3. Gamma Satellite School (~15% population): Agile reef-skimming school
    const t2 = this.simulationTime * 0.08 + 4.8
    const x2 = Math.sin(t2 * 0.9) * 75.0 + Math.cos(t2 * 0.47) * 25.0
    const y2 = 12.0 + Math.sin(t2 * 0.55) * 8.0
    const z2 = Math.cos(t2 * 0.85) * 75.0 + Math.sin(t2 * 0.33) * 25.0
    this.schoolCenters[2].set(x2, y2, z2)
    const vx2 = (Math.cos(t2 * 0.9) * 75.0 * 0.9 - Math.sin(t2 * 0.47) * 25.0 * 0.47) * 0.08
    const vy2 = (Math.cos(t2 * 0.55) * 8.0 * 0.55) * 0.08
    const vz2 = (-Math.sin(t2 * 0.85) * 75.0 * 0.85 + Math.cos(t2 * 0.33) * 25.0 * 0.33) * 0.08
    this.schoolVelocities[2].set(vx2, vy2, vz2).normalize()

    // Primary school center for legacy callers / cameras
    this.schoolCenter.copy(this.schoolCenters[0])
    this.schoolVelocity.copy(this.schoolVelocities[0])

    // Update compute uniforms
    const velUniforms = this.velocityVariable.material.uniforms
    velUniforms.uDeltaTime.value = safeDt
    velUniforms.uTime.value = this.simulationTime
    velUniforms.uActiveCount.value = this.currentFishCount
    for (let i = 0; i < 3; i++) {
      velUniforms.uSchoolCenters.value[i].copy(this.schoolCenters[i])
      velUniforms.uSchoolDirections.value[i].copy(this.schoolVelocities[i])
    }

    if (predatorInput) {
      const positions = Array.isArray(predatorInput) ? predatorInput : [predatorInput]
      const count = Math.min(positions.length, 3)
      velUniforms.uPredatorCount.value = count
      for (let i = 0; i < 3; i++) {
        if (i < count) {
          velUniforms.uPredatorPositions.value[i].copy(positions[i])
        } else {
          velUniforms.uPredatorPositions.value[i].set(0, -9999, 0)
        }
      }
    } else {
      velUniforms.uPredatorCount.value = 0.0
    }

    // Oceanic Whirlpool / Bait-Ball Cyclone periodic state machine
    // Transitions: calm (18s) -> ramping_up (2.0s) -> active (9.0s) -> ramping_down (2.5s) -> calm
    this.vortexTimer += safeDt
    if (this.vortexPhase === 'calm') {
      if (this.vortexTimer > 18.0) {
        this.vortexPhase = 'ramping_up'
        this.vortexTimer = 0
        this.vortexCenter.copy(this.schoolCenter)
        this.vortexCenter.y = 20.0
      }
    } else if (this.vortexPhase === 'ramping_up') {
      this.vortexActiveValue = Math.min(this.vortexTimer / 2.0, 1.0)
      if (this.vortexTimer >= 2.0) {
        this.vortexPhase = 'active'
        this.vortexTimer = 0
      }
    } else if (this.vortexPhase === 'active') {
      this.vortexActiveValue = 1.0
      // Dynamic vertical helical motion of vortex eye
      this.vortexCenter.y = 20.0 + Math.sin(this.simulationTime * 0.8) * 8.0
      if (this.vortexTimer >= 9.0) {
        this.vortexPhase = 'ramping_down'
        this.vortexTimer = 0
      }
    } else if (this.vortexPhase === 'ramping_down') {
      this.vortexActiveValue = Math.max(1.0 - this.vortexTimer / 2.5, 0.0)
      if (this.vortexTimer >= 2.5) {
        this.vortexPhase = 'calm'
        this.vortexTimer = 0
        this.vortexActiveValue = 0.0
      }
    }

    velUniforms.uVortexActive.value = this.vortexActiveValue
    velUniforms.uVortexCenter.value.copy(this.vortexCenter)

    this.positionVariable.material.uniforms.uDeltaTime.value = safeDt

    // Compute next frame on GPU
    this.gpuCompute.compute()

    // Pass latest compute textures to shared uniforms
    const posTexture = this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture
    const velTexture = this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture

    this.uniforms.uTexturePosition.value = posTexture
    this.uniforms.uTextureVelocity.value = velTexture
    this.uniforms.uTime.value = this.simulationTime
  }

  public triggerWhirlpool(): void {
    this.vortexPhase = 'ramping_up'
    this.vortexTimer = 0
    this.vortexCenter.copy(this.schoolCenter)
    this.vortexCenter.y = 20.0
    this.vortexActiveValue = 0.3
    console.log('🌀 Oceanic Whirlpool triggered at center:', this.vortexCenter)
  }

  public getVortexStatus(): { active: boolean; factor: number; phase: string } {
    return {
      active: this.vortexActiveValue > 0.05,
      factor: this.vortexActiveValue,
      phase: this.vortexPhase
    }
  }

  public setFishCount(count: number): void {
    const requiredSize = count > 25600 ? HIGH_TEXTURE_SIZE : BASE_TEXTURE_SIZE
    const requiredCapacity = requiredSize * requiredSize

    if (requiredCapacity !== this.maxCapacity) {
      this.reinitializeComputation(requiredSize, requiredSize)
    }

    this.currentFishCount = Math.min(Math.max(count, 10), this.maxCapacity)
    if (this.instancedMesh) {
      this.instancedMesh.count = this.currentFishCount
    }
    if (this.velocityVariable) {
      this.velocityVariable.material.uniforms.uActiveCount.value = this.currentFishCount
    }
  }

  private reinitializeComputation(width: number, height: number): void {
    if (this.gpuCompute) {
      this.gpuCompute.dispose()
    }
    this.textureWidth = width
    this.textureHeight = height
    this.maxCapacity = width * height

    this.initGPUComputation()
    this.createInstancedMesh()
  }

  public getFishCount(): number {
    return this.currentFishCount
  }

  public updateParameters(params: any): void {
    if (!this.velocityVariable) return

    const velUniforms = this.velocityVariable.material.uniforms

    if (params.behavior) {
      const b = params.behavior
      if (b.cohesionStrength !== undefined) velUniforms.uCohesionWeight.value = b.cohesionStrength
      if (b.alignmentStrength !== undefined) velUniforms.uAlignmentWeight.value = b.alignmentStrength
      if (b.separationStrength !== undefined) velUniforms.uSeparationWeight.value = b.separationStrength
      if (b.neighborRadius !== undefined) velUniforms.uNeighborRadius.value = b.neighborRadius
      if (b.separationRadius !== undefined) velUniforms.uSeparationRadius.value = b.separationRadius
      if (b.socialWeight !== undefined) velUniforms.uSocialWeight.value = b.socialWeight
      if (b.individualWeight !== undefined) velUniforms.uIndividualWeight.value = b.individualWeight
      if (b.undulationFrequency !== undefined && velUniforms.uUndulationFrequency) {
        velUniforms.uUndulationFrequency.value = b.undulationFrequency
      }
      if (b.undulationAmplitude !== undefined) {
        this.uniforms.uUndulationAmplitude.value = b.undulationAmplitude
      }
      if ((b as any).whirlpoolStrength !== undefined && velUniforms.uVortexStrength) {
        velUniforms.uVortexStrength.value = (b as any).whirlpoolStrength
      }
      if ((b as any).whirlpoolRadius !== undefined && velUniforms.uVortexRadius) {
        velUniforms.uVortexRadius.value = (b as any).whirlpoolRadius
      }
    }

    if (params.physics) {
      const p = params.physics
      if (p.maxSpeed !== undefined) velUniforms.uMaxSpeed.value = Math.max(p.maxSpeed * 0.15, 6.0)
      if (p.maxForce !== undefined) velUniforms.uMaxForce.value = p.maxForce
    }

    if (params.rendering) {
      const r = params.rendering
      if (r.fishCount !== undefined && r.fishCount !== this.currentFishCount) {
        this.setFishCount(r.fishCount)
      }
      if (r.modelScale !== undefined) {
        this.uniforms.uModelScale.value = r.modelScale * this.baseScale
      }
      if (this.instancedMesh && this.instancedMesh.material instanceof THREE.MeshStandardMaterial) {
        const mat = this.instancedMesh.material
        if (r.metalness !== undefined) mat.metalness = r.metalness
        if (r.roughness !== undefined) mat.roughness = r.roughness
        if (r.envMapIntensity !== undefined) mat.envMapIntensity = r.envMapIntensity
        if (r.emissiveIntensity !== undefined) mat.emissiveIntensity = r.emissiveIntensity
      }
    }
  }

  public getFlockCenter(): THREE.Vector3 {
    if (this.vortexActiveValue > 0.001) {
      const blend = this.vortexActiveValue * this.vortexActiveValue * (3.0 - 2.0 * this.vortexActiveValue)
      return this.schoolCenters[0].clone().lerp(this.vortexCenter, blend)
    }
    return this.schoolCenters[0]
  }

  public getSchools(): { id: number; name: string; center: THREE.Vector3; velocity: THREE.Vector3; population: number }[] {
    return [
      {
        id: 0,
        name: 'Alpha Mega-School',
        center: this.schoolCenters[0],
        velocity: this.schoolVelocities[0],
        population: Math.round(this.currentFishCount * 0.55)
      },
      {
        id: 1,
        name: 'Beta Secondary School',
        center: this.schoolCenters[1],
        velocity: this.schoolVelocities[1],
        population: Math.round(this.currentFishCount * 0.30)
      },
      {
        id: 2,
        name: 'Gamma Satellite School',
        center: this.schoolCenters[2],
        velocity: this.schoolVelocities[2],
        population: Math.round(this.currentFishCount * 0.15)
      }
    ]
  }

  /**
   * Evaluates all schools for a shark at fromPosition, selecting the optimal target
   * by balancing school size (largest) and proximity (nearest).
   */
  public getBestHuntTarget(fromPosition: THREE.Vector3): { target: THREE.Vector3; schoolId: number; population: number } {
    const schools = this.getSchools()
    let bestScore = -1
    let bestTarget = schools[0].center.clone()
    let bestId = 0
    let bestPop = schools[0].population

    for (let i = 0; i < schools.length; i++) {
      const s = schools[i]
      const dist = fromPosition.distanceTo(s.center)
      // Score balances largest school (population weight) vs nearest school (distance penalty)
      const score = Math.pow(s.population, 1.15) / (dist + 35.0)
      if (score > bestScore) {
        bestScore = score
        bestTarget = s.center.clone()
        bestId = s.id
        bestPop = s.population
      }
    }

    return { target: bestTarget, schoolId: bestId, population: bestPop }
  }

  public getFlockVelocity(): THREE.Vector3 {
    return this.schoolVelocity
  }

  public getLeaderPosition(): THREE.Vector3 {
    return this.getFlockCenter()
  }

  public getStats() {
    return {
      fishCount: this.currentFishCount,
      activeFish: this.currentFishCount,
      visibleFish: this.currentFishCount,
      averageSpeed: 5.5,
      averageSize: 1.0,
      sizeRange: { min: 0.7, max: 1.2 }
    }
  }

  public dispose(): void {
    if (this.instancedMesh) {
      this.scene.remove(this.instancedMesh)
      this.instancedMesh.geometry.dispose()
      if (Array.isArray(this.instancedMesh.material)) {
        this.instancedMesh.material.forEach(m => m.dispose())
      } else {
        this.instancedMesh.material.dispose()
      }
    }
    if (this.gpuCompute) {
      this.gpuCompute.dispose()
    }
  }
}
