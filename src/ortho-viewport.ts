import { World } from "world";

import { KeyHandler } from "documentKeyboardListener";
import { RendererCallbacks } from "renderer-callbacks";
import { Point, TileCoordinates } from "model";

export class OrthoViewport implements KeyHandler, RendererCallbacks {

    private orthoCanvas: HTMLCanvasElement;
    private world: World;
    private tileSizePx: number = 1;
    private lastBoardSize: TileCoordinates | null = null;

    constructor(orthoCanvas: HTMLCanvasElement, world: World) {
        this.orthoCanvas = orthoCanvas;
        this.world = world;

        this.measure();
        this.registerClickHandlers();
        orthoCanvas.addEventListener('resize', () => this.measure());
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

    private measure() {
        const world = this.world;

        const canvasWidthPx = this.orthoCanvas.width;
        const canvasHeightPx = this.orthoCanvas.height;
        const worldW = world.getWidth();
        const worldH = world.getHeight();

        const smallestDimenPx = Math.min(canvasWidthPx, canvasHeightPx);
        this.tileSizePx = Math.floor(smallestDimenPx / Math.max(worldW, worldH));

        console.log(`Measured canvas is ${canvasWidthPx} by ${canvasHeightPx} pixels, tilesize is ${this.tileSizePx}`);
        console.log(`Board size is ${worldW} by ${worldH} tiles`);
    }

    private draw() {
        const world = this.world;
        const worldW = world.getWidth();
        const worldH = world.getHeight();

        const lastBoardWidth = this.lastBoardSize?.boardX  ;
        const lastBoardHeight = this.lastBoardSize?.boardY;
        if (lastBoardWidth != worldW || lastBoardHeight != worldH) {
            this.measure();
        }
        this.lastBoardSize = { boardX: worldW, boardY: worldH };

        const canvasWidthPx = this.orthoCanvas.width;
        const canvasHeightPx = this.orthoCanvas.height;
        const tileSizePx = this.tileSizePx;
        const ctx2d = this.orthoCanvas.getContext("2d")!;

        ctx2d.clearRect(0, 0, canvasWidthPx, canvasHeightPx);

        for (let boardY = 0; boardY < worldH; boardY++) {
            for (let boardX = 0; boardX < worldW; boardX++) {
                const color = world.getTexel(boardX, boardY);
                ctx2d.fillStyle = color;
                ctx2d.fillRect(boardX * tileSizePx, boardY * tileSizePx, tileSizePx, tileSizePx);
            }
        }
    }

    private pixelToBoard(canvasX: number, canvasY: number): TileCoordinates {
        const boardX = Math.floor(canvasX / this.tileSizePx);
        const boardY = Math.floor(canvasY / this.tileSizePx);
        return { boardX: boardX, boardY: boardY };
    }

    private boardToPixel(board: TileCoordinates): Point {
        const canvasX = board.boardX * this.tileSizePx;
        const canvasY = board.boardY * this.tileSizePx;
        return new Point(canvasX, canvasY);
    }
    
    private registerClickHandlers() {


    }

    private onTileClick(tile: TileCoordinates, isShift: boolean ){
        const handler = this.world.eventHandler;
        handler.changeTileElevation(tile.boardX, tile.boardY, isShift ? -1 : 1);
    }

}