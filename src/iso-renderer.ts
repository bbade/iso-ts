// iso-renderer.ts
import { IsometricContext } from "iso-context";
import { World } from "./world";
import { TileCoordinates } from "model";

export interface RendererCallbacks {
    redraw(): void; // Callback for redrawing the scene
}

function getColorByElevation(elevation: number): string {
    switch (elevation) {
        case 0: return "#0000ff"; // blue (water)
        case 1: return "#ffff00"; // yellow (sandy)
        case 2:
        case 3: return "#00c800"; // green (grass)
        case 4:
        case 5: return "#808080"; // gray (mountain)
        case 6: return "#ffffff"; // white (snow)
        default: return "#808080";
    }
}



function adjustBrightness(color: string, amount: number): string {
    // Handle rgb() colors
    if (color.startsWith("rgb")) {
        let [r, g, b] = color.substring(4, color.length - 1).split(",").map(Number);

        r = Math.min(255, Math.max(0, Math.round(r + amount * 255)));
        g = Math.min(255, Math.max(0, Math.round(g + amount * 255)));
        b = Math.min(255, Math.max(0, Math.round(b + amount * 255)));

        return `rgb(${r}, ${g}, ${b})`;
    }
    //Handle hex
    let usePound = false;
    if (color[0] == "#") {
        color = color.slice(1);
        usePound = true;
    }

    let num = parseInt(color, 16);
    let r = (num >> 16) + amount * 255;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amount * 255;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000FF) + amount * 255;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    let newColor = (g | (b << 8) | (r << 16)).toString(16);

    while (newColor.length < 6) {
        newColor = "0" + newColor;
    }

    return (usePound ? "#" : "") + newColor;
}

class IsoRenderer {
    private isoContext: IsometricContext;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private world: World;

    constructor(isometricContext: IsometricContext, world: World) {
        this.isoContext = isometricContext;
        this.canvas = isometricContext.canvas;
        this.ctx = this.canvas.getContext("2d")!; // Assert non-null, checked below
        this.world = world;
        world.renderer = this;

        // Initial setup and drawing
        const t = this.isoContext.baseTranslation();
        this.ctx.translate(t.x, t.y);
        this.drawScene();
    }

    private drawTile(boardX: number, boardY: number, zHeight: number, color: string, context: CanvasRenderingContext2D, isHighlighted: boolean): void {
        const { v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5y, v6y, v7y } = this.isoContext.tileVertices(boardX, boardY, zHeight);

        let drawColor = color;
        if (isHighlighted) {
            drawColor = this.adjustBrightness(color, 0.2); // Brighten for highlight
        }

        // --- Top Face ---
        context.fillStyle = drawColor;
        this.isoContext.tilePath(context, v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y);
        context.fill();

        // --- Left & Right Faces (only if zHeight > 0) ---
        if (zHeight > 0) {
            // --- Left Face ---
            context.fillStyle = this.adjustBrightness(drawColor, -0.2);
            context.beginPath();
            context.moveTo(v4x, v4y);
            context.lineTo(v3x, v3y);
            context.lineTo(v1x, v5y);
            context.lineTo(v4x, v6y);
            context.closePath();
            context.fill();

            // --- Right Face ---
            context.fillStyle = this.adjustBrightness(drawColor, -0.4);
            context.beginPath();
            context.moveTo(v2x, v2y);
            context.lineTo(v3x, v3y);
            context.lineTo(v1x, v5y);
            context.lineTo(v2x, v7y);
            context.closePath();
            context.fill();
        }
    }

    private drawScene(): void {
        const world = this.world;
        

        for (let boardY = 0; boardY < world.getHeight(); boardY++) {
            for (let boardX = 0; boardX < world.getWidth(); boardX++) {
                const elevation = world.getTile(boardX, boardY)!; // Assert non-null, as we're within bounds
                let tileColor: string;

                if (world.usingTexture) {
                    tileColor = world.getPixel(boardX, boardY);
                } else {
                    tileColor = getColorByElevation(elevation);
                }

                const highlightedTile = world.getHoveredTile(); 
                const isHighlighted: boolean = (highlightedTile &&
                    highlightedTile.x === boardX &&
                    highlightedTile.y === boardY) || false;

                for (let i = 0; i <= elevation; i++) {
                    this.drawTile(boardX, boardY, i, tileColor, this.ctx, isHighlighted);
                }
            }
        }
    }

    adjustBrightness(color: string, amount: number): string {
        // Handle rgb() colors
        if (color.startsWith("rgb")) {
            let [r, g, b] = color.substring(4, color.length - 1).split(",").map(Number);

            r = Math.min(255, Math.max(0, Math.round(r + amount * 255)));
            g = Math.min(255, Math.max(0, Math.round(g + amount * 255)));
            b = Math.min(255, Math.max(0, Math.round(b + amount * 255)));

            return `rgb(${r}, ${g}, ${b})`;
        }
        //Handle hex
        let usePound = false;
        if (color[0] == "#") {
            color = color.slice(1);
            usePound = true;
        }

        let num = parseInt(color, 16);
        let r = (num >> 16) + amount * 255;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amount * 255;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amount * 255;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        let newColor = (g | (b << 8) | (r << 16)).toString(16);

        while (newColor.length < 6) {
            newColor = "0" + newColor;
        }

        return (usePound ? "#" : "") + newColor;
    }

    public redraw(): void {
        const offsetX = this.isoContext.offsetX;
        const offsetY = this.isoContext.offsetY;
        this.ctx.clearRect(-offsetX, -offsetY, this.canvas.width, this.canvas.height);
        this.drawScene();
    }
}

export { IsoRenderer };