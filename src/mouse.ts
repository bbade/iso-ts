// mouse.ts
import World from "./world";
import { Point, TileCoordinates } from './model';
import { IsometricContext } from "iso-context";


interface CanvasEventHandler {
    handleClick: (event: MouseEvent) => void;
    handleMouseMove: (event: MouseEvent) => void;
    handleMouseOut: (event: MouseEvent) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
}

export interface WorldEventHandler {
    setHoveredTile: (x: number, y: number) => void;
    clearHoveredTile: () => void;
    changeTileElevation: (x: number, y: number, delta: number) => void;
    changeTileElevationBulk: (tiles: Point[], delta: number) => void;
}


const MouseListener = {
    initializeListeners: (handler: CanvasEventHandler) => {

        console.log("initializing listeners");

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
    }
};

class IsometricEvents implements CanvasEventHandler {

    private worldHandler: WorldEventHandler;
    private isoCtx: IsometricContext;

    constructor(isoCtx: IsometricContext, worldHandler: WorldEventHandler) {
        this.isoCtx = isoCtx;
        this.worldHandler = worldHandler;
    }

    private translateEventPointToViewport(clientX: number, clientY: number) : Point {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();

        const screenX = clientX - rect.left;
        const screenY = clientY - rect.top;

        return new Point(screenX, screenY);
    }

    private translateEventPointsToIsometricGrid(clientX: number, clientY: number) : TileCoordinates {
        const screenPoint: Point = this.translateEventPointToViewport(clientX, clientY);
        const { x, y } = this.isoCtx.screenToIso(screenPoint.x, screenPoint.y);
        const boardX = Math.floor(x);
        const boardY = Math.floor(y);
        return { x: boardX, y: boardY};
    }

    private translateEventToIsometricGrid(event: MouseEvent) : TileCoordinates {
        return this.translateEventPointsToIsometricGrid(event.clientX, event.clientY);
    }

    handleClick(event: MouseEvent): void {
        const { boardX, boardY} = this.translateEventToIsometricGrid(event);

        if (event.button === 0) { // Left click
            World.increaseElevation(boardX, boardY, event.shiftKey);
        } else if (event.button === 2) { // Right click
            World.decreaseElevation(boardX, boardY, event.shiftKey);
        }
    }

    handleMouseMove(event: MouseEvent): void {
        console.log("mouse move " + event);
        const { boardX, boardY} = this.translateEventToIsometricGrid(event);
        this.worldHandler.setHoveredTile(boardX, boardY);
    }

    handleMouseOut(event: MouseEvent): void {
        this.worldHandler.clearHoveredTile();
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'r') {
            World.rotateWorld(event.shiftKey);
        }
    }
}

export {
    MouseListener,
    CanvasEventHandler,
    
};