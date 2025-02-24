// World.ts

import { Point } from "model";
import {RendererCallbacks} from "renderer-callbacks";

type TileCoordinates = Point;


/**
 * These take events that have been transformed into board coordinates
 * and update the state of the world. 
 */
export interface WorldEventHandler {
    setHoveredTile: (x: number, y: number) => void;
    clearHoveredTile: () => void;
    changeTileElevation: (x: number, y: number, delta: number) => void;
    changeTileElevationBulk: (x: number, y: number, delta: number) => void;
    setTexture(texture: HTMLImageElement): void; 
    clearTexture(): void;
    reset(): void;
    rotateWorld(counterClockwise: boolean): void;
}

// TODO TODO TODO: Refactor to request a redraw after it changes. 

export class World {
    board = [] as number[][];  // 2D array of numbers (elevations)
    textureCanvas = null as HTMLCanvasElement | null;
    textureCtx = null as CanvasRenderingContext2D | null;
    usingTexture = false;
    private hoveredTile = null as TileCoordinates | null;
    renderer: RendererCallbacks | null = null; 
    dontRedraw: boolean = false; // enable this to do a number of operations

    constructor(width: number, height: number) {
        this.initBoard(width, height);
    }

    redraw() {
        if (this.dontRedraw) {
            return;
        }
        this.renderer?.redraw(); 
    }

    initBoard(width: number = 16, height: number = 16): void {
        this.board = [];
        for (let y = 0; y < height; y++) {
            let row: number[] = [];
            for (let x = 0; x < width; x++) {
                row.push(0); // Initialize all elevations to 0
            }
            this.board.push(row);
        }
    }

    getTile(boardX: number, boardY: number): number | null {
        if (boardX >= 0 && boardX < this.board[0].length && boardY >= 0 && boardY < this.board.length) {
            return this.board[boardY][boardX];
        }
        return null; // Or handle out-of-bounds differently
    }

    setTile(boardX: number, boardY: number, elevation: number): void {
        if (boardX >= 0 && boardX < this.board[0].length && boardY >= 0 && boardY < this.board.length) {
            this.board[boardY][boardX] = elevation;
        }
    }

    getHoveredTile(): TileCoordinates | null {
        return this.hoveredTile;
    }

    getTexel(boardX: number, boardY: number): string {
        if (!this.textureCtx) {
            return "#000000"; // Default color if no texture
        }

        let texX = boardX;
        let texY = boardY;

        // Bounds Check
        if (texX < 0 || texX >= this.textureCanvas!.width || texY < 0 || texY >= this.textureCanvas!.height) {
            return "#000000"; //Return black if out of bounds.
        }

        const pixelData = this.textureCtx.getImageData(texX, texY, 1, 1).data;
        return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    }

    

    getWidth(): number {
        return this.board[0].length;
    }

    getHeight(): number {
        return this.board.length;
    }

    getCenter(): Point {
        const centerX = Math.floor(this.getWidth() / 2);
        const centerY = Math.floor(this.getHeight() / 2);
        return new Point(centerX, centerY);
    }

    changeElevation(boardX: number, boardY: number, delta: number, bulkEdit: boolean): void {
        if (boardX >= 0 && boardX < this.getWidth() && boardY >= 0 && boardY < this.getHeight()) {
            if (bulkEdit && this.usingTexture) {
                const targetColor = this.getTexel(boardX, boardY);
                for (let y = 0; y < this.getHeight(); y++) {
                    for (let x = 0; x < this.getWidth(); x++) {
                        if (this.getTexel(x, y) === targetColor) {
                            this.setTile(x, y, Math.max(0, this.getTile(x, y)! + delta)); // Assert non-null
                        }
                    }
                }
            } else {
                this.setTile(boardX, boardY, Math.max(0, this.getTile(boardX, boardY)! + delta)); // Assert non-null
            }
        }
        
        this.redraw();
    }

    rotateWorld(counterClockwise: boolean = false): void {
        // --- Rotate Texture (if using texture) ---
        if (this.usingTexture && this.textureCanvas) {
            const rotatedCanvas = document.createElement('canvas');
            rotatedCanvas.width = this.textureCanvas.height;  // Swap width/height
            rotatedCanvas.height = this.textureCanvas.width;
            const rotatedCtx = rotatedCanvas.getContext('2d')!; // Assert non-null

            rotatedCtx.clearRect(0, 0, rotatedCanvas.width, rotatedCanvas.height); //Clear
            if (counterClockwise) {
                rotatedCtx.rotate(-Math.PI / 2);
                rotatedCtx.drawImage(this.textureCanvas, -this.textureCanvas.width, 0);

            }
            else {
                rotatedCtx.rotate(Math.PI / 2);
                rotatedCtx.drawImage(this.textureCanvas, 0, -this.textureCanvas.height);
            }

            this.textureCanvas = rotatedCanvas; // Replace the old canvas
            this.textureCtx = rotatedCtx;
        }
          // --- Rotate Board ---
        let newBoard: number[][];
        if(!counterClockwise){
            newBoard = this.board[0].map((val, index) => this.board.map(row => row[index]).reverse());
        }
        else{
            newBoard = this.board[0].map((val, index) => this.board.map(row => row[row.length-1-index]));
        }
        this.board = newBoard; // Assign the new board

        this.redraw();
    }

    private clearTexture() {
        this.usingTexture = false;
        this.textureCanvas = null;
        this.textureCtx = null;

        this.redraw();
    }

    readonly eventHandler: WorldEventHandler = {
        setHoveredTile: (x: number, y: number): void => {
            this.hoveredTile = new Point(x, y);
            this.redraw();
        },
        clearHoveredTile: (): void => {
            this.hoveredTile = null;
            this.redraw();
        },
        changeTileElevation: (x: number, y: number, delta: number): void => {
            this.changeElevation(x, y, delta, false);
        },
        changeTileElevationBulk: (x: number, y: number, delta: number): void => {
            this.changeElevation(x, y, delta, true);
        },

        setTexture: (img: HTMLImageElement): void => {
            this.textureCanvas = document.createElement("canvas");
            this.textureCanvas.width = img.width;
            this.textureCanvas.height = img.height;
            this.textureCtx = this.textureCanvas.getContext("2d")!; // Assert non-null
            this.textureCtx.drawImage(img, 0, 0);
            this.usingTexture = true;
            this.initBoard(img.width, img.height);

            this.redraw();
        },

        clearTexture: (): void => {
            this.clearTexture();
        },

        reset: (): void => {
            this.dontRedraw = true;
            this.clearTexture();
            this.initBoard();
            this.dontRedraw = false;
            this.redraw();
        },
        rotateWorld: (direction: boolean): void => {
           this.rotateWorld(direction);
        }
    }
};
