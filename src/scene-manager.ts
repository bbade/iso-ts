import { KeyHandler } from "documentKeyboardListener";
import { RendererCallbacks } from "renderer-callbacks";

export class SceneManager {
    private visible: Scene;
    private hidden: Scene
    
    constructor(iso: Scene, ortho: Scene) {
        this.visible = iso;
        this.hidden = ortho;
    }
    
    toggleScene() {
        const temp = this.visible;
        this.visible = this.hidden;
        this.hidden = temp;
        
        this.visible.canvas.style.display = 'block';
        this.hidden.canvas.style.display = 'none';
        this.visible.renderer.redraw();
    }
    
    getVisibleScene(): Scene {
        return this.visible;
    }
    
    getHiddenScene(): Scene {
        return this.hidden;
    }
    
}

export class Scene implements KeyHandler {

    canvas: HTMLCanvasElement;
    keyboardHandler: KeyHandler;
    renderer: RendererCallbacks;
    
    constructor(
        canvas: HTMLCanvasElement,
        keyboardCallbacks: KeyHandler,
        renderer: RendererCallbacks
    ) {
        this.canvas = canvas;
        this.keyboardHandler = keyboardCallbacks;
        this.renderer = renderer;
    }
    
    handleKeyDown(event: KeyboardEvent): void {
        this.keyboardHandler.handleKeyDown(event);
        
    }
    
}
