// mouse.ts
import World from "./world";
import { redrawScene, TILE_WIDTH, TILE_HEIGHT } from "./render"; // Import constants
let highlightedTile = null; // Define highlightedTile
// --- Constants for Canvas IDs ---
const ISOMETRIC_CANVAS = "isometric-canvas";
const ORTHOGRAPHIC_CANVAS = "ortho-canvas"; // You had this defined, but it was never used
let activeCanvas = ISOMETRIC_CANVAS; // Track the currently visible canvas
function initializeListeners(orthographicEvents) {
    if (orthographicEvents == null) {
        throw new Error("orthographicEvents is null");
    }
    console.log("initializing listeners");
    const canvas = document.getElementById("myCanvas");
    const TILE_WIDTH = 16; //From Render.ts
    const TILE_HEIGHT = 8;
    // --- Isometric Event Listener Callbacks ---
    const isometricEvents = {
        handleClick: (event) => {
            const rect = canvas.getBoundingClientRect();
            const offsetX = canvas.width / 2;
            const offsetY = 50;
            const screenX = event.clientX - rect.left;
            const screenY = event.clientY - rect.top;
            const { x, y } = screenToIso(screenX, screenY, offsetX, offsetY);
            const boardX = Math.floor(x);
            const boardY = Math.floor(y);
            if (event.button === 0) { // Left click
                World.increaseElevation(boardX, boardY, event.shiftKey);
            }
            else if (event.button === 2) { // Right click
                World.decreaseElevation(boardX, boardY, event.shiftKey);
            }
            redrawScene();
        },
        handleMouseMove: (event) => {
            const rect = canvas.getBoundingClientRect();
            const offsetX = canvas.width / 2;
            const offsetY = 50; // Consistent offset with drawScene
            const screenX = event.clientX - rect.left;
            const screenY = event.clientY - rect.top;
            const { x, y } = screenToIso(screenX, screenY, offsetX, offsetY);
            const boardX = Math.floor(x);
            const boardY = Math.floor(y);
            if (highlightedTile === null || highlightedTile.x !== boardX || highlightedTile.y !== boardY) {
                highlightedTile = { x: boardX, y: boardY };
                redrawScene(); // Redraw on *every* mouse move that changes the highlighted tile
            }
        },
        handleMouseOut: (event) => {
            highlightedTile = null;
            redrawScene();
        },
        handleKeyDown: (event) => {
            if (event.key === 'r') {
                World.rotateWorld(event.shiftKey);
                redrawScene();
            }
        }
    };
    // --- Generic Event Listeners ---
    document.addEventListener('click', function (event) {
        const mouseEvent = event;
        if (activeCanvas === ISOMETRIC_CANVAS) {
            isometricEvents.handleClick(mouseEvent);
        }
        else if (activeCanvas === ORTHOGRAPHIC_CANVAS) {
            orthographicEvents.handleClick(mouseEvent);
        }
    });
    document.addEventListener('contextmenu', function (event) {
        const mouseEvent = event;
        event.preventDefault(); // Prevent default context menu
        if (activeCanvas === ISOMETRIC_CANVAS) {
            isometricEvents.handleClick(mouseEvent); //Reuse the same handler.
        }
        else if (activeCanvas === ORTHOGRAPHIC_CANVAS) {
            orthographicEvents.handleClick(mouseEvent);
        }
    });
    document.addEventListener('mousemove', function (event) {
        const mouseEvent = event;
        if (activeCanvas === ISOMETRIC_CANVAS) {
            isometricEvents.handleMouseMove(mouseEvent);
        }
        else if (activeCanvas === ORTHOGRAPHIC_CANVAS) {
            orthographicEvents.handleMouseMove(mouseEvent);
        }
    });
    document.addEventListener("mouseout", function (event) {
        const mouseEvent = event;
        if (activeCanvas === ISOMETRIC_CANVAS) {
            isometricEvents.handleMouseOut(mouseEvent);
        }
        else if (activeCanvas === ORTHOGRAPHIC_CANVAS) {
            orthographicEvents.handleMouseOut(mouseEvent);
        }
    });
    document.addEventListener("keydown", function (event) {
        const keyboardEvent = event;
        if (keyboardEvent.key === '`' || keyboardEvent.code === 'Backquote' || keyboardEvent.keyCode === 192) {
            console.log("switching canvas");
            event.preventDefault(); // Prevent default tab behavior (focus change)
            toggleCanvas(redrawScene, () => { orthographicEvents.onDisplay(); });
            return;
        }
        if (activeCanvas === ISOMETRIC_CANVAS) {
            isometricEvents.handleKeyDown(keyboardEvent);
        }
        else if (activeCanvas === ORTHOGRAPHIC_CANVAS) {
            orthographicEvents.handleKeyDown(keyboardEvent);
        }
    });
}
function screenToIso(screenX, screenY, offsetX, offsetY) {
    const isoX = screenX - offsetX;
    const isoY = screenY - offsetY;
    const boardX = (isoX / (TILE_WIDTH / 2) + isoY / (TILE_HEIGHT / 2)) / 2;
    const boardY = (isoY / (TILE_HEIGHT / 2) - isoX / (TILE_WIDTH / 2)) / 2;
    return { x: boardX, y: boardY };
}
function toggleCanvas(onIsoSelected, onOrthoSelected) {
    const isoCanvas = document.getElementById(ISOMETRIC_CANVAS);
    const orthoCanvas = document.getElementById(ORTHOGRAPHIC_CANVAS); //Corrected
    if (activeCanvas === ISOMETRIC_CANVAS) {
        isoCanvas.style.display = "none";
        if (orthoCanvas)
            orthoCanvas.style.display = "block"; //Corrected
        activeCanvas = ORTHOGRAPHIC_CANVAS;
        onOrthoSelected();
    }
    else {
        if (orthoCanvas)
            orthoCanvas.style.display = "none"; //Corrected
        isoCanvas.style.display = "block";
        activeCanvas = ISOMETRIC_CANVAS;
        onIsoSelected();
    }
}
export { initializeListeners, toggleCanvas, highlightedTile, ISOMETRIC_CANVAS, ORTHOGRAPHIC_CANVAS };
