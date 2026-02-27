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
            this.model.scale.set(2.0, 2.0, 2.0)
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

            // Add a bright red wireframe box so the shark's position is always visible
            const debugBox = new THREE.Mesh(
                new THREE.BoxGeometry(4, 2, 8),
                new THREE.MeshBasicMaterial({ color: 0xff2200, wireframe: true })
            )
            this.model.add(debugBox)

            // Setup animations
            if (gltf.animations && gltf.animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(this.model)
                const action = this.mixer.clipAction(gltf.animations[0])
                action.play()
            }

            this.isLoaded = true
            console.log('SharkRenderer: ready. visible=', this.model.visible, 'pos=', this.model.position)
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

        // Face movement direction
        if (this.model.position.distanceTo(this.targetPosition) > 1.0) {
            this.model.rotation.set(0, 0, 0)
            this.model.lookAt(this.targetPosition)
            this.model.rotateY(Math.PI)
        }
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
