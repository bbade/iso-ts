// render.ts
import World from "./world";

export const TILE_WIDTH = 16;
export const TILE_HEIGHT = 8;

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!; // Assert non-null, checked below

interface TileCoordinates {
  x: number;
  y: number;
}

// Assuming highlightedTile is defined and managed in mouse.ts,
// we'll declare it here with the correct type.  It's important
// that this matches the type in mouse.ts.
let highlightedTile: TileCoordinates | null = null;  //From Mouse.js


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
interface Vertices {
    v1x: number;
    v1y: number;
    v2x: number;
    v2y: number;
    v3x: number;
    v3y: number;
    v4x: number;
    v4y: number;
    v5y: number;
    v6y: number;
    v7y: number;
}

function tileVertices(boardX: number, boardY: number, zHeight: number): Vertices {
    const isoX = (boardX - boardY) * TILE_WIDTH / 2;
    const isoY = (boardX + boardY) * TILE_HEIGHT / 2;
    const topOffsetY = -zHeight * TILE_HEIGHT;

    return {
        v1x: isoX,
        v1y: isoY + topOffsetY,
        v2x: isoX + TILE_WIDTH / 2,
        v2y: isoY + TILE_HEIGHT / 2 + topOffsetY,
        v3x: isoX,
        v3y: isoY + TILE_HEIGHT + topOffsetY,
        v4x: isoX - TILE_WIDTH / 2,
        v4y: isoY + TILE_HEIGHT / 2 + topOffsetY,
        v5y: isoY + TILE_HEIGHT, // Used for left/right faces
        v6y: isoY + TILE_HEIGHT / 2,  //bottom left
        v7y: isoY + TILE_HEIGHT / 2, //bottom right
    };
}


function drawTile(boardX: number, boardY: number, zHeight: number, color: string, context: CanvasRenderingContext2D, isHighlighted: boolean): void {
    const { v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5y, v6y, v7y } = tileVertices(boardX, boardY, zHeight);


    let drawColor = color;
    if (isHighlighted) {
        drawColor = adjustBrightness(color, 0.2); // Brighten for highlight
    }

    // --- Top Face ---
    context.fillStyle = drawColor;
    tilePath(context, v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y);
    context.fill();


    // --- Left & Right Faces (only if zHeight > 0) ---
    if (zHeight > 0) {
        // --- Left Face ---
        context.fillStyle = adjustBrightness(drawColor, -0.2);
        context.beginPath();
        context.moveTo(v4x, v4y);
        context.lineTo(v3x, v3y);
        context.lineTo(v1x, v5y);
        context.lineTo(v4x, v6y);
        context.closePath();
        context.fill();

        // --- Right Face ---
        context.fillStyle = adjustBrightness(drawColor, -0.4);
        context.beginPath();
        context.moveTo(v2x, v2y);
        context.lineTo(v3x, v3y);
        context.lineTo(v1x, v5y);
        context.lineTo(v2x, v7y);
        context.closePath();
        context.fill();
    }
}

function tilePath(context: CanvasRenderingContext2D, v1x: number, v1y: number, v2x: number, v2y: number, v3x: number, v3y: number, v4x: number, v4y: number): void {
    context.beginPath();
    context.moveTo(v1x, v1y);
    context.lineTo(v2x, v2y);
    context.lineTo(v3x, v3y);
    context.lineTo(v4x, v4y);
    context.closePath();
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

function screenToIso(screenX: number, screenY: number, offsetX: number, offsetY: number): TileCoordinates {
    const isoX = screenX - offsetX;
    const isoY = screenY - offsetY;

    const boardX = (isoX / (TILE_WIDTH / 2) + isoY / (TILE_HEIGHT / 2)) / 2;
    const boardY = (isoY / (TILE_HEIGHT / 2) - isoX / (TILE_WIDTH / 2)) / 2;
    return { x: boardX, y: boardY };
}


function drawScene(context: CanvasRenderingContext2D): void {
    const offsetX = canvas.width / 2;
    const offsetY = 50;

    for (let boardY = 0; boardY < World.getHeight(); boardY++) {
        for (let boardX = 0; boardX < World.getWidth(); boardX++) {
            const elevation = World.getTile(boardX, boardY)!; // Assert non-null, as we're within bounds
            let tileColor: string;

            if (World.usingTexture) {
                tileColor = World.getPixel(boardX, boardY);
            } else {
                tileColor = getColorByElevation(elevation);
            }

            const isHighlighted: boolean = (highlightedTile &&
                highlightedTile.x === boardX &&
                highlightedTile.y === boardY) || false;

            for (let i = 0; i <= elevation; i++) {
                drawTile(boardX, boardY, i, tileColor, context, isHighlighted);
            }
        }
    }
}

export function redrawScene(): void {
    const offsetX = canvas.width / 2;
    const offsetY = 100;
    ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
    drawScene(ctx);
}

// --- Initial setup and drawing ---
if (ctx) {
    ctx.translate(canvas.width / 2, 250);
    drawScene(ctx);
} else {
    console.error("Canvas not supported!");
    const canvasContainer = document.getElementById("myCanvas") as HTMLCanvasElement;
    canvasContainer.parentNode!.replaceChild( // Assert non-null
        document.createTextNode("Your browser does not support the canvas element."),
        canvasContainer
    );
}