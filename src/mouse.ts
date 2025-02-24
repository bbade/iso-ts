// mouse.ts

import { SceneManager } from "scene-manager";


/**
 * These are concrete event handlers that translate events from
 * document coordinates into the coordinates of the current renderer
 */
interface CanvasEventHandler {
    handleClick: (event: MouseEvent) => void;
    handleMouseMove: (event: MouseEvent) => void;
    handleMouseOut: (event: MouseEvent) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
}

export interface ViewportCallbacks {
    moveUp(): void;
    moveDown(): void;
    moveLeft(): void;
    moveRight(): void;
    recenter(): void;
}


class MouseListener {
    private viewportCallbacks: ViewportCallbacks | null = null;
    
    constructor(
        handler: CanvasEventHandler, 
        keyboardHandler: ViewportCallbacks,
        sceneManager: SceneManager
    ) {
        console.log("initializing listeners");

        if (!sceneManager) {
            throw new Error("SceneManager is required");
        }

        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

        // --- Generic Event Listeners ---
        document.addEventListener('click', function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            handler.handleClick(mouseEvent);
        });

        document.addEventListener('contextmenu', function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            event.preventDefault(); // Prevent default context menu
            handler.handleClick(mouseEvent);
        });

        document.addEventListener('mousemove', function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            handler.handleMouseMove(mouseEvent);
        });

        document.addEventListener("mouseout", function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            handler.handleMouseOut(mouseEvent);
        });

        document.addEventListener("keydown", function (event: KeyboardEvent) {
            const keyboardEvent = event as KeyboardEvent;
            handler.handleKeyDown(keyboardEvent);
        });

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            switch (event.key) {
            case 'w':
                keyboardHandler.moveUp();
                break;
            case 'a':
                keyboardHandler.moveLeft();
                break;
            case 's':
                keyboardHandler.moveDown();
                break;
            case 'd':
                keyboardHandler.moveRight();
                break;
            case 'r':
                keyboardHandler.recenter();
                break;
            case '`':
                event.preventDefault(); // Prevent default tab behavior
                sceneManager.toggleCanvases();
                break;
            }
        });
    }
}

export {
    MouseListener,
    CanvasEventHandler,
    
};
