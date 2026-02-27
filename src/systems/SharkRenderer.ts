import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export class SharkRenderer {
    private scene: THREE.Scene
    private model: THREE.Group | null = null
    private mixer: THREE.AnimationMixer | null = null
    private isLoaded: boolean = false
    private visible: boolean = false
    private targetPosition: THREE.Vector3 = new THREE.Vector3(0, -10, 50)
    private hasBeenPositioned: boolean = false
    private lerpSpeed: number = 0.03

    // Smooth rotation
    private currentQuaternion: THREE.Quaternion = new THREE.Quaternion()
    private targetQuaternion: THREE.Quaternion = new THREE.Quaternion()
    private rotationLerpSpeed: number = 0.02 // Very slow turn for a big animal

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
            // 5x bigger than previous 2.0 = 10.0
            this.model.scale.set(10.0, 10.0, 10.0)
            this.model.position.copy(this.targetPosition)
            this.model.visible = this.visible

            // Force every descendant to be visible with correct materials
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

            // Initialise current quaternion from the starting rotation
            this.model.rotation.set(0, 0, 0)
            this.currentQuaternion.copy(this.model.quaternion)
            this.targetQuaternion.copy(this.model.quaternion)

            // Setup animations
            if (gltf.animations && gltf.animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(this.model)
                const action = this.mixer.clipAction(gltf.animations[0])
                action.play()
            }

            this.isLoaded = true
            console.log('SharkRenderer: ready. scale=10 visible=', this.model.visible)
        } catch (error) {
            console.error('SharkRenderer: Failed to load shark model:', error)
        }
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible
        if (this.model) {
            this.model.visible = visible
        }
    }

    public setPosition(position: THREE.Vector3): void {
        this.targetPosition.copy(position)
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

        if (this.mixer) this.mixer.update(deltaTime)

        // Move toward target
        this.model.position.lerp(this.targetPosition, this.lerpSpeed)

        // Compute smooth rotation toward movement direction using slerp
        const moveDelta = this.targetPosition.clone().sub(this.model.position)
        if (moveDelta.length() > 1.0) {
            // Build a lookAt matrix for target direction, extract quaternion
            const lookAtMatrix = new THREE.Matrix4()
            const up = new THREE.Vector3(0, 1, 0)
            lookAtMatrix.lookAt(this.model.position, this.targetPosition, up)
            this.targetQuaternion.setFromRotationMatrix(lookAtMatrix)
            // Apply the 180° Y correction in quaternion space
            const correction = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
            this.targetQuaternion.multiply(correction)
        }

        // Slerp current rotation toward target — smooth like a real animal
        this.currentQuaternion.slerp(this.targetQuaternion, this.rotationLerpSpeed)
        this.model.quaternion.copy(this.currentQuaternion)
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
