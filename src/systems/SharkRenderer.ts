import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export class SharkRenderer {
    private scene: THREE.Scene
    private model: THREE.Group | null = null
    private mixer: THREE.AnimationMixer | null = null
    private currentAction: THREE.AnimationAction | null = null
    private isLoaded: boolean = false
    private visible: boolean = false
    private targetPosition: THREE.Vector3 = new THREE.Vector3(0, -10, 50)
    private hasBeenPositioned: boolean = false
    private lerpSpeed: number = 0.03

    constructor(scene: THREE.Scene) {
        this.scene = scene
        this.loadModel()
    }

    private async loadModel(): Promise<void> {
        try {
            const loader = new GLTFLoader()
            const basePath = (import.meta as any).env.BASE_URL || '/'

            // Using the Great White Shark model
            const modelPath = `${basePath}models/great_white_shark/scene.gltf`

            const gltf = await loader.loadAsync(modelPath)

            this.model = gltf.scene

            // native scale of the great white model seems small in some exports
            // User requested 4X larger than 0.5 -> 2.0
            this.model.scale.set(2.0, 2.0, 2.0)
            // Adjust model orientation if needed (e.g., if it loads facing the wrong way)
            // A common correction for GLTF models is to rotate 180 degrees around the Y-axis
            this.model.rotation.y = Math.PI;

            // Set initial visibility from the current state
            this.model.visible = this.visible
            this.scene.add(this.model)

            // Setup animations
            if (gltf.animations && gltf.animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(this.model)
                this.currentAction = this.mixer.clipAction(gltf.animations[0])
                this.currentAction.play()
            }

            this.isLoaded = true
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
        // Snap to position on first call so shark doesn't crawl from origin
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

        // Update animation
        if (this.mixer) {
            this.mixer.update(deltaTime)
        }

        // Smoothly follow the target position
        this.model.position.lerp(this.targetPosition, this.lerpSpeed)

        // Face movement direction, then reapply model-specific rotation offset
        if (this.model.position.distanceTo(this.targetPosition) > 1.0) {
            const lookTarget = this.targetPosition.clone()
            // Temporarily clear rotation offset to get a clean lookAt
            this.model.rotation.set(0, 0, 0)
            this.model.lookAt(lookTarget)
            // Reapply the 180° Y offset so the shark faces forward in its own mesh space
            this.model.rotateY(Math.PI)
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
