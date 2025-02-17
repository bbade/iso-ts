import { Point, TileCoordinates, Vertices } from "model";

export class IsometricContext {
    readonly canvas: HTMLCanvasElement;
    tileWidth: number;
    tileHeight: number;
    offsetX: number;
    offsetY: number;

    constructor (canvas: HTMLCanvasElement, tileWidth = 16, tileHeight  = 8) {
        this.canvas = canvas;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.offsetX = this.canvas.width / 2;
        this.offsetY = 50;
    }

    baseTranslation(): Point {
        return new Point(this.canvas.width / 2, 250)
    }

    screenToIso(screenX: number, screenY: number): TileCoordinates {
        const isoX = screenX - offsetX;
        const isoY = screenY - offsetY;
    
        const boardX: number = (isoX / (this.tileWidth / 2) + isoY / (this.tileHeight / 2)) / 2;
        const boardY: number  = (isoY / (this.tileHeight / 2) - isoX / (this.tileWidth / 2)) / 2;
        return { x: boardX, y: boardY };
    }

    tileVertices(boardX: number, boardY: number, zHeight: number): Vertices {
        const isoX = (boardX - boardY) * this.tileWidth / 2;
        const isoY = (boardX + boardY) * this.tileHeight / 2;
        const topOffsetY = -zHeight * this.tileHeight;
    
        return {
            v1x: isoX,
            v1y: isoY + topOffsetY,
            v2x: isoX + this.tileWidth / 2,
            v2y: isoY + this.tileHeight / 2 + topOffsetY,
            v3x: isoX,
            v3y: isoY + this.tileHeight + topOffsetY,
            v4x: isoX - this.tileWidth / 2,
            v4y: isoY + this.tileHeight / 2 + topOffsetY,
            v5y: isoY + this.tileHeight, // Used for left/right faces
            v6y: isoY + this.tileHeight / 2,  //bottom left
            v7y: isoY + this.tileHeight / 2, //bottom right
        };
    }
    
    tilePath(context: CanvasRenderingContext2D, v1x: number, v1y: number, v2x: number, v2y: number, v3x: number, v3y: number, v4x: number, v4y: number): void {
        context.beginPath();
        context.moveTo(v1x, v1y);
        context.lineTo(v2x, v2y);
        context.lineTo(v3x, v3y);
        context.lineTo(v4x, v4y);
        context.closePath();
    }
}