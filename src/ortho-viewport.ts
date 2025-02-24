import { World } from "world";

import { KeyHandler } from "documentKeyboardListener";
import { RendererCallbacks } from "renderer-callbacks";

export class OrthoViewport implements KeyHandler, RendererCallbacks {

    private orthoCanvas: HTMLCanvasElement;
    private world: World;
    
    constructor(orthoCanvas: HTMLCanvasElement, world: World) {
        this.orthoCanvas = orthoCanvas;
        this.world = world;
    }
    handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                this.moveUp();
                break;
            case "ArrowDown":
                this.moveDown();
                break;
            case "ArrowLeft":
                this.moveLeft();
                break;
            case "ArrowRight":
                this.moveRight();
                break;
            case "r":
                this.recenter();
                break;
            default:
                break;
        }
    }
    redraw(): void {
        this.draw();
    }
    moveUp(): void {
        throw new Error("Method not implemented.");
    }
    moveDown(): void {
        throw new Error("Method not implemented.");
    }
    moveLeft(): void {
        throw new Error("Method not implemented.");
    }
    moveRight(): void {
        throw new Error("Method not implemented.");
    }
    recenter(): void {
        throw new Error("Method not implemented.");
    }

    private draw() {
        const canvasWidthPx = this.orthoCanvas.width;
        const canvasHeightPx = this.orthoCanvas.height;
        const ctx2d = this.orthoCanvas.getContext("2d")!;
        const world = this.world;
        const worldW = world.getWidth();
        const worldH = world.getHeight();

        const smallestDimenPx = Math.min(canvasWidthPx, canvasHeightPx);
        const tileSizePx = Math.floor(smallestDimenPx / Math.max(worldW, worldH));

        ctx2d.clearRect(0, 0, canvasWidthPx, canvasHeightPx);

        for (let boardY = 0; boardY < worldH; boardY++) {
            for (let boardX = 0; boardX < worldW; boardX++) {
                const color = world.getTexel(boardX, boardY);
                ctx2d.fillStyle = color;
                ctx2d.fillRect(boardX * tileSizePx, boardY * tileSizePx, tileSizePx, tileSizePx);
            }
        }
    }


}