import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export class SharkRenderer {
    private scene: THREE.Scene
    private model: THREE.Group | null = null
    private mixer: THREE.AnimationMixer | null = null
    private isLoaded: boolean = false
    private visible: boolean = false

    // Hunting target — set externally
    private targetPosition: THREE.Vector3 = new THREE.Vector3(0, -10, 50)
    private hasBeenPositioned: boolean = false

    // Shark always moves FORWARD at this speed (units/s)
    private swimSpeed: number = 6.0

    // Current facing direction (world space, normalised)
    private heading: THREE.Vector3 = new THREE.Vector3(0, 0, 1)

    // How fast the shark can turn (radians/s) — very slow for a big animal
    private maxTurnRate: number = 0.25

    constructor(scene: THREE.Scene) {
        this.scene = scene
        this.loadModel()
    }

    private async loadModel(): Promise<void> {
        try {
            const loader = new GLTFLoader()
            const basePath = (import.meta as any).env.BASE_URL || '/'
            const modelPath = `${basePath}models/great_white_shark/scene.gltf`

            const gltf = await loader.loadAsync(modelPath)

            this.model = gltf.scene
            this.model.scale.set(10.0, 10.0, 10.0)
            this.model.position.copy(this.targetPosition)
            this.model.visible = this.visible

            // Force every descendant visible with double-sided materials
            this.model.traverse((child) => {
                child.visible = true
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh
                    mesh.frustumCulled = false
                    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
                    mats.forEach((mat: THREE.Material) => {
                        mat.side = THREE.DoubleSide
                        mat.needsUpdate = true
                    })
                }
            })

            this.scene.add(this.model)

            // Setup animations
            if (gltf.animations && gltf.animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(this.model)
                const action = this.mixer.clipAction(gltf.animations[0])
                action.play()
            }

            this.isLoaded = true
        } catch (error) {
            console.error('SharkRenderer: Failed to load shark model:', error)
        }
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible
        if (this.model) this.model.visible = visible
    }

    public setPosition(position: THREE.Vector3): void {
        this.targetPosition.copy(position)
        // On first call, snap position so sharks doesn't start at origin
        if (!this.hasBeenPositioned) {
            this.hasBeenPositioned = true
            if (this.model) this.model.position.copy(position)
        }
    }

    public getPosition(): THREE.Vector3 {
        return this.model ? this.model.position : this.targetPosition
    }

    public update(deltaTime: number): void {
        if (!this.isLoaded || !this.model || !this.visible) return

        // Animate skeleton
        if (this.mixer) this.mixer.update(deltaTime)

        // --- FORWARD-ONLY LOCOMOTION ---
        // 1. Compute desired direction toward hunting target
        const toTarget = this.targetPosition.clone().sub(this.model.position)
        toTarget.y *= 0.3 // dampen vertical — sharks swim mostly horizontally
        const distToTarget = toTarget.length()

        if (distToTarget > 2.0) {
            const desiredHeading = toTarget.clone().normalize()

            // 2. Compute signed angle between current heading and desired heading
            //    We slerp the heading vector at max turn rate per second
            const maxRotThisFrame = this.maxTurnRate * deltaTime
            const cosAngle = Math.max(-1, Math.min(1, this.heading.dot(desiredHeading)))
            const angleBetween = Math.acos(cosAngle)

            if (angleBetween > 0.001) {
                // How much of the turn we can do this frame
                const t = Math.min(1.0, maxRotThisFrame / angleBetween)
                this.heading.lerp(desiredHeading, t).normalize()
            }
        }

        // 3. Move forward in (current) heading direction
        const velocity = this.heading.clone().multiplyScalar(this.swimSpeed * deltaTime)
        this.model.position.add(velocity)

        // 4. Face the heading direction (Y-up, with model-space 180° correction)
        const lookTarget = this.model.position.clone().add(this.heading)
        const lookMatrix = new THREE.Matrix4()
        lookMatrix.lookAt(this.model.position, lookTarget, new THREE.Vector3(0, 1, 0))
        this.model.quaternion.setFromRotationMatrix(lookMatrix)
        // Apply 180° Y correction so the shark mesh faces forward
        this.model.rotateY(Math.PI)
    }

    public dispose(): void {
        if (this.model) {
            this.scene.remove(this.model)
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose()
                    const mats = Array.isArray(child.material) ? child.material : [child.material]
                    mats.forEach(m => m.dispose())
                }
            })
        }
    }
}
