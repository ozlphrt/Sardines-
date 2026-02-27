import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export class SharkRenderer {
    private scene: THREE.Scene
    private model: THREE.Group | null = null
    private mixer: THREE.AnimationMixer | null = null
    private currentAction: THREE.AnimationAction | null = null
    private isLoaded: boolean = false
    private visible: boolean = false
    private targetPosition: THREE.Vector3 = new THREE.Vector3()
    private lerpSpeed: number = 0.05

    constructor(scene: THREE.Scene) {
        this.scene = scene
        this.loadModel()
    }

    private async loadModel(): Promise<void> {
        try {
            const loader = new GLTFLoader()
            const basePath = (import.meta as any).env.BASE_URL || '/'

            // Path based on my xcopy earlier: public/models/white_pointer/
            const modelPath = `${basePath}models/white_pointer/scene.gltf`

            console.log('SharkRenderer: Loading model from', modelPath)
            const gltf = await loader.loadAsync(modelPath)

            this.model = gltf.scene
            this.model.scale.set(5, 5, 5) // Sharks are bigger than sardines
            this.model.visible = false
            this.scene.add(this.model)

            // Setup animations
            if (gltf.animations && gltf.animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(this.model)
                // Find the swimming animation (usually index 0 or named appropriately)
                this.currentAction = this.mixer.clipAction(gltf.animations[0])
                this.currentAction.play()
            }

            this.isLoaded = true
            console.log('SharkRenderer: Model loaded successfully')
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
        if (!this.visible && this.model) {
            // Snap to position if just becoming visible
            this.model.position.copy(position)
        }
    }

    public getPosition(): THREE.Vector3 {
        return this.model ? this.model.position : this.targetPosition
    }

    public update(deltaTime: number): void {
        if (!this.isLoaded || !this.model || !this.visible) return

        // Update animation
        if (this.mixer) {
            this.mixer.update(deltaTime)
        }

        // Smoothly follow the target position
        this.model.position.lerp(this.targetPosition, this.lerpSpeed)

        // Look at the target (or maintain orientation if at target)
        if (this.model.position.distanceTo(this.targetPosition) > 0.1) {
            const lookTarget = this.targetPosition.clone()
            this.model.lookAt(lookTarget)
            // The model might need a rotation correction depending on its original orientation
            // For many Sketchfab models, Z+ is forward.
        }
    }

    public dispose(): void {
        if (this.model) {
            this.scene.remove(this.model)
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose()
                    if (Array.isArray(child.material)) {
                        child.material.forEach(m => m.dispose())
                    } else {
                        child.material.dispose()
                    }
                }
            })
        }
    }
}
