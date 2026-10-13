import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

export interface SharkInstance {
    id: number
    model: THREE.Group | null
    mixer: THREE.AnimationMixer | null
    heading: THREE.Vector3
    targetPosition: THREE.Vector3
    spawnPosition: THREE.Vector3
    hasBeenPositioned: boolean
    swimSpeed: number
    maxTurnRate: number
    scale: number
    patrolOffset: THREE.Vector3
}

export class SharkRenderer {
    private scene: THREE.Scene
    private isLoaded: boolean = false
    private visible: boolean = true
    private currentScale: number = 8.5

    // Hunting pack of 3 sharks with tactical role differentiation
    private sharks: SharkInstance[] = [
        {
            id: 0, // Apex Lead Shark
            model: null,
            mixer: null,
            heading: new THREE.Vector3(0, 0, 1),
            targetPosition: new THREE.Vector3(0, 12, 50),
            spawnPosition: new THREE.Vector3(0, 10, -70),
            hasBeenPositioned: false,
            swimSpeed: 6.2,
            maxTurnRate: 0.26,
            scale: 8.5,
            patrolOffset: new THREE.Vector3(0, 0, 0)
        },
        {
            id: 1, // Port Flanker Shark
            model: null,
            mixer: null,
            heading: new THREE.Vector3(1, 0, 0),
            targetPosition: new THREE.Vector3(-45, 8, 30),
            spawnPosition: new THREE.Vector3(-65, 6, 20),
            hasBeenPositioned: false,
            swimSpeed: 5.7,
            maxTurnRate: 0.23,
            scale: 7.6,
            patrolOffset: new THREE.Vector3(-45, -4, -30)
        },
        {
            id: 2, // Starboard Flanker Shark
            model: null,
            mixer: null,
            heading: new THREE.Vector3(-1, 0, 0),
            targetPosition: new THREE.Vector3(45, 16, 40),
            spawnPosition: new THREE.Vector3(65, 16, 35),
            hasBeenPositioned: false,
            swimSpeed: 6.6,
            maxTurnRate: 0.28,
            scale: 7.2,
            patrolOffset: new THREE.Vector3(45, 3, 25)
        }
    ]

    constructor(scene: THREE.Scene) {
        this.scene = scene
        this.loadModel()
    }

    public setScale(scale: number): void {
        this.currentScale = Math.max(scale, 1.0)
        const scaleMultipliers = [1.0, 0.9, 0.85]
        for (let i = 0; i < this.sharks.length; i++) {
            const s = this.sharks[i]
            s.scale = this.currentScale * scaleMultipliers[i]
            if (s.model) {
                s.model.scale.set(s.scale, s.scale, s.scale)
            }
        }
    }

    private async loadModel(): Promise<void> {
        try {
            const loader = new GLTFLoader()
            const basePath = (import.meta as any).env.BASE_URL || '/'
            const modelPath = `${basePath}models/great_white_shark/scene.gltf`

            const gltf = await loader.loadAsync(modelPath)

            // Setup double-sided materials and fog on the master GLTF scene
            gltf.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh
                    mesh.frustumCulled = false
                    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
                    mats.forEach((mat: THREE.Material) => {
                        mat.side = THREE.DoubleSide
                        if ((mat as any).isMeshStandardMaterial || (mat as any).isMeshPhongMaterial || (mat as any).isMeshBasicMaterial) {
                            (mat as any).fog = true
                        }
                        mat.needsUpdate = true
                    })
                }
            })

            // Instantiate each of the 3 sharks with independent skeletons and animation mixers
            for (let i = 0; i < this.sharks.length; i++) {
                const shark = this.sharks[i]
                const clonedModel = SkeletonUtils.clone(gltf.scene) as THREE.Group
                clonedModel.scale.set(shark.scale, shark.scale, shark.scale)
                clonedModel.position.copy(shark.spawnPosition)
                clonedModel.visible = this.visible

                if (gltf.animations && gltf.animations.length > 0) {
                    const mixer = new THREE.AnimationMixer(clonedModel)
                    const action = mixer.clipAction(gltf.animations[0])
                    action.play()
                    // Offset phase so the 3 sharks don't wag tails in unison
                    action.time = i * 1.35
                    shark.mixer = mixer
                }

                shark.model = clonedModel
                this.scene.add(clonedModel)
            }

            this.isLoaded = true
        } catch (error) {
            console.error('SharkRenderer: Failed to load shark model:', error)
        }
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible
        for (let i = 0; i < this.sharks.length; i++) {
            const m = this.sharks[i].model
            if (m) m.visible = visible
        }
    }

    public setPosition(position: THREE.Vector3): void {
        for (let i = 0; i < this.sharks.length; i++) {
            this.setSharkTarget(i, position)
        }
    }

    public setSharkTarget(sharkIndex: number, target: THREE.Vector3): void {
        if (sharkIndex < 0 || sharkIndex >= this.sharks.length) return
        const shark = this.sharks[sharkIndex]
        // Incorporate tactical role formation offset
        shark.targetPosition.copy(target).add(shark.patrolOffset)

        if (!shark.hasBeenPositioned) {
            shark.hasBeenPositioned = true
            if (shark.model) shark.model.position.copy(shark.spawnPosition)
        }
    }

    public getSharkPosition(sharkIndex: number): THREE.Vector3 {
        if (sharkIndex < 0 || sharkIndex >= this.sharks.length) return this.getPosition()
        const s = this.sharks[sharkIndex]
        return s.model ? s.model.position : s.spawnPosition
    }

    public getPosition(): THREE.Vector3 {
        const lead = this.sharks[0].model
        return lead ? lead.position : this.sharks[0].spawnPosition
    }

    public getPositions(): THREE.Vector3[] {
        if (!this.isLoaded || !this.visible) return []
        const positions: THREE.Vector3[] = []
        for (let i = 0; i < this.sharks.length; i++) {
            const m = this.sharks[i].model
            if (m) positions.push(m.position)
        }
        return positions
    }

    public update(deltaTime: number): void {
        if (!this.isLoaded || !this.visible) return

        // Maximum vertical diving / climbing angle: 20 degrees
        const MAX_PITCH_RAD = 20 * (Math.PI / 180) // ~0.349066 rad

        for (let i = 0; i < this.sharks.length; i++) {
            const shark = this.sharks[i]
            if (!shark.model) continue

            // 1. Animate skeleton with independent timer
            if (shark.mixer) {
                shark.mixer.update(deltaTime)
            }

            // 2. Compute desired direction toward hunting target (including formation offset)
            const toTarget = shark.targetPosition.clone().sub(shark.model.position)
            const horizontalDist = Math.sqrt(toTarget.x * toTarget.x + toTarget.z * toTarget.z)

            // Limit target seeking so vertical dive/climb angle request never exceeds 20 degrees
            if (horizontalDist > 0.001) {
                const maxAllowedY = horizontalDist * Math.tan(MAX_PITCH_RAD)
                toTarget.y = Math.max(-maxAllowedY, Math.min(maxAllowedY, toTarget.y))
            } else {
                toTarget.y = 0
                toTarget.x = shark.heading.x
                toTarget.z = shark.heading.z
            }

            const distToTarget = toTarget.length()

            if (distToTarget > 2.0) {
                const desiredHeading = toTarget.clone().normalize()
                const maxRotThisFrame = shark.maxTurnRate * deltaTime
                const cosAngle = Math.max(-1, Math.min(1, shark.heading.dot(desiredHeading)))
                const angleBetween = Math.acos(cosAngle)

                if (angleBetween > 0.001) {
                    const t = Math.min(1.0, maxRotThisFrame / angleBetween)
                    shark.heading.lerp(desiredHeading, t).normalize()
                }
            }

            // Hard vertical invariant clamp: strictly guarantee the shark heading never exceeds 20° up or down
            const hLen = Math.sqrt(shark.heading.x * shark.heading.x + shark.heading.z * shark.heading.z)
            if (hLen < 0.0001) {
                shark.heading.set(0, 0, 1)
            } else {
                const currentPitch = Math.asin(Math.max(-1, Math.min(1, shark.heading.y)))
                if (Math.abs(currentPitch) > MAX_PITCH_RAD) {
                    const clampedPitch = Math.max(-MAX_PITCH_RAD, Math.min(MAX_PITCH_RAD, currentPitch))
                    const cosPitch = Math.cos(clampedPitch)
                    const sinPitch = Math.sin(clampedPitch)
                    const hNormX = shark.heading.x / hLen
                    const hNormZ = shark.heading.z / hLen
                    shark.heading.set(hNormX * cosPitch, sinPitch, hNormZ * cosPitch)
                }
            }

            // 3. Move forward in (current) heading direction
            const velocity = shark.heading.clone().multiplyScalar(shark.swimSpeed * deltaTime)
            shark.model.position.add(velocity)

            // 4. Face heading direction (Y-up, with model-space 180° correction)
            const lookTarget = shark.model.position.clone().add(shark.heading)
            const lookMatrix = new THREE.Matrix4()
            lookMatrix.lookAt(shark.model.position, lookTarget, new THREE.Vector3(0, 1, 0))
            shark.model.quaternion.setFromRotationMatrix(lookMatrix)
            shark.model.rotateY(Math.PI)
        }

        // 5. Inter-shark separation: prevent sharks from colliding or overlapping
        for (let i = 0; i < this.sharks.length; i++) {
            for (let j = i + 1; j < this.sharks.length; j++) {
                const s1 = this.sharks[i].model
                const s2 = this.sharks[j].model
                if (!s1 || !s2) continue

                const diff = s1.position.clone().sub(s2.position)
                const dist = diff.length()
                const minSeparation = 24.0 // Minimum distance between sharks
                if (dist < minSeparation && dist > 0.001) {
                    const push = diff.normalize().multiplyScalar((minSeparation - dist) * 0.4)
                    push.y *= 0.2 // Keep separation mostly horizontal
                    s1.position.add(push)
                    s2.position.sub(push)
                }
            }
        }
    }

    public dispose(): void {
        for (let i = 0; i < this.sharks.length; i++) {
            const model = this.sharks[i].model
            if (model) {
                this.scene.remove(model)
                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.geometry.dispose()
                        const mats = Array.isArray(child.material) ? child.material : [child.material]
                        mats.forEach(m => m.dispose())
                    }
                })
            }
        }
    }

    public updateEmissive(intensity: number): void {
        for (let i = 0; i < this.sharks.length; i++) {
            const model = this.sharks[i].model
            if (!model) continue
            model.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh
                    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
                    mats.forEach((mat: THREE.Material) => {
                        if ((mat as any).isMeshStandardMaterial || (mat as any).isMeshPhongMaterial) {
                            (mat as any).emissiveIntensity = intensity
                        }
                    })
                }
            })
        }
    }
}
