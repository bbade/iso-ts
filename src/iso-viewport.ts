import { IsometricContext } from "iso-context";
import { RendererCallbacks } from "iso-renderer";
import { Point } from "model";
import { ViewportCallbacks } from "mouse";
import { World } from "world";

export class IsoViewport {
    private center: Point | null;
    world: World;
    context: IsometricContext;
    onChange: RendererCallbacks | null = null;

    constructor(world: World, context: IsometricContext) {
        this.world = world;
        this.center = new Point(0, 0);
        this.context = context;

        if (!world) {
            throw new Error("World cannot be null or undefined");
        }

        if (!context) {
            throw new Error("Context cannot be null or undefined");
        }

        this.recenter();
    }

    moveCenter(deltaX: number, deltaY: number): void {
        let center: Point;
        if (this.center == null) {
            center = this.getCenter();
            this.center = center;
        }
        else {
            center = this.center; 
        };

        const x = Math.floor(center.x + deltaX);
        const y = Math.floor(center.y + deltaY);
        this.center = new Point(x, y);
        this.onChange?.redraw();
    }

    recenter() {
        const x = this.world.getWidth() / 2;
        const y = this.world.getHeight() / 2;
        this.center = new Point(Math.floor(x), Math.floor(y));
        this.onChange?.redraw();
    }

    getCenter(): Point {
        return this.center || this.world.getCenter();
    }

    isWithinViewport(boardLocation: Point): boolean {
        const { tileWidth, tileHeight } = this.context.tileSize();
        const canvasWidth = this.context.canvas.width;
        const canvasHeight = this.context.canvas.height;

        const center = this.getCenter();
        const isoCenter = this.context.screenToIso(center.x, center.y);

        const isoX = (boardLocation.x - isoCenter.boardX) * tileWidth / 2;
        const isoY = (boardLocation.y - isoCenter.boardY) * tileHeight / 2;

        const screenX = isoX + canvasWidth / 2;
        const screenY = isoY + canvasHeight / 2;

        return screenX >= 0 && screenX <= canvasWidth && screenY >= 0 && screenY <= canvasHeight;
    }

    allTilesWithinViewport(): Point[] {
        const visibleTiles: Point[] = [];
        for (let y = 0; y < this.world.getHeight(); y++) {
            for (let x = 0; x < this.world.getWidth(); x++) {
                const tilePoint = new Point(x, y);
                if (this.isWithinViewport(tilePoint)) {
                    visibleTiles.push(tilePoint);
                }
            }
        }
        return visibleTiles;
    }

    callbacks(): ViewportCallbacks {
        return {
            moveUp: () => this.moveCenter(0, -IsoConstants.delta),
            moveDown: () => this.moveCenter(0, IsoConstants.delta),
            moveLeft: () => this.moveCenter(-IsoConstants.delta, 0),
            moveRight: () => this.moveCenter(IsoConstants.delta, 0),
            recenter: () => this.recenter(),
        };
    }
}

const IsoConstants = {
    delta: 1
};