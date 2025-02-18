
import { CanvasEventHandler } from './mouse';
import { IsoRenderer } from './iso-renderer';
import { IsometricContext } from 'iso-context';
import { Point, TileCoordinates } from 'model';
import { WorldEventHandler } from 'world';

export class IsometricEventHandler implements CanvasEventHandler {

    private worldHandler: WorldEventHandler;
    private isoCanvas: HTMLCanvasElement;
    private isoCtx: IsometricContext;

    constructor(canvas: HTMLCanvasElement, isoCtx: IsometricContext, worldHandler: WorldEventHandler) {
        this.isoCanvas = canvas;
        this.isoCtx = isoCtx;
        this.worldHandler = worldHandler;
    }

    private translateEventPointToViewport(clientX: number, clientY: number) : Point {
        const rect = this.isoCanvas.getBoundingClientRect();

        const screenX = clientX - rect.left;
        const screenY = clientY - rect.top;

        return new Point(screenX, screenY);
    }

    private translateEventToIsometricGrid(event: MouseEvent) : TileCoordinates {
        const clientX = event.clientX;
        const clientY = event.clientY;
        const viewportPoint: Point = this.translateEventPointToViewport(clientX, clientY);
        
        // console.log(`Client coordinates: (${clientX}, ${clientY})`);
        // console.log(`Screen coordinates: (${viewportPoint.x}, ${viewportPoint.y})`);
        
        const isoPoint =  this.isoCtx.screenToIso(viewportPoint.x, viewportPoint.y);
        // console.log(`Isometric coordinates: (${isoPoint.boardX}, ${isoPoint.boardY})`);
        
        return isoPoint;
    }

    // private translateEventToIsometricGrid(event: MouseEvent) : TileCoordinates {
    //     return this.translateEventPointsToIsometricGrid(event.clientX, event.clientY);
    // }

    handleClick(event: MouseEvent): void {
        console.log("handleClick: "+ event);
        const { boardX, boardY} = this.translateEventToIsometricGrid(event);

        let delta: number;
        if (event.button === 0) { // Left click
            delta  = 1;
        } else if (event.button === 2) { // Right click
            delta = -1;
        } else {
            return; // Ignore other buttons
        }

        if ( event.shiftKey) {
            this.worldHandler.changeTileElevationBulk(boardX, boardY, delta);
        } else {
            this.worldHandler.changeTileElevation(boardX, boardY, delta);
        }
    }

    handleMouseMove(event: MouseEvent): void {
        const { boardX, boardY} = this.translateEventToIsometricGrid(event);
        // console.log("mouse event " + event +" at board(" + boardX + ", " + boardY+")");
        this.worldHandler.setHoveredTile(boardX, boardY);
    }

    handleMouseOut(event: MouseEvent): void {
        this.worldHandler.clearHoveredTile();
    }

    handleKeyDown(event: KeyboardEvent): void {
        const clockwise = true;
        const cclockwise = false; // these are enum constants
        console.log(`Key pressed: ${event.key}`);

        if (event.key === 'q') {
            this.worldHandler.rotateWorld(clockwise);
        } if (event.key === 'e') {
            this.worldHandler.rotateWorld(cclockwise);
        }

        if (event.key === '-') {
            this.isoCtx.decTileSize();
        } else if (event.key === '=') {
            this.isoCtx.incTileSize();
        }
    } 
    // // todo: bring back rotation
}