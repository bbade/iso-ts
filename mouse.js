// mouse.js
let highlightedTile = null; // Define highlightedTile in mouse.js, accessible within this file

// --- Mouse Event Handlers ---
canvas.addEventListener("click", function(event) {
    handleMouseClick(event, 1, event.shiftKey); // Left click, pass shiftKey
});

canvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    handleMouseClick(event, -1, event.shiftKey); // Right click, pass shiftKey
});

canvas.addEventListener("mousemove", handleMouseMove);


canvas.addEventListener("mouseout", function(event) {
    highlightedTile = null;
    redrawScene();
});

function pixelToTile(screenX, screenY, offsetX, offsetY) {
    // Iterate in reverse draw order (top-down) to find hovered tile
    for (let boardY = World.getHeight() - 1; boardY >= 0; boardY--) {
        for (let boardX = World.getWidth() - 1; boardX >= 0; boardX--) {
            const elevation = World.getTile(boardX, boardY);

            for (let i = elevation; i >= 0; i--) {
                const { v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y } = tileVertices(boardX, boardY, i);

                tilePath(ctx, v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y);

                if (ctx.isPointInPath(screenX, screenY)) {
                    return { x: boardX, y: boardY }; // Return coordinates
                }
            }
        }
    }
    return null; // No tile found at this pixel
}

function handleMouseClick(event, heightChange, isShiftClick) {
    const rect = canvas.getBoundingClientRect();
    const offsetX = canvas.width / 2;
    const offsetY = 350;
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;

    const clickedTile = pixelToTile(screenX, screenY, offsetX, offsetY);

    if (clickedTile) {
        // Call World methods for increase/decrease, handling bulk edit
        if (heightChange > 0) {
            World.increaseElevation(clickedTile.x, clickedTile.y, isShiftClick && World.usingTexture);
        } else {
            World.decreaseElevation(clickedTile.x, clickedTile.y, isShiftClick && World.usingTexture);
        }
        redrawScene();
    } else {
        console.log("Clicked outside the board");
    }
}

function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const offsetX = canvas.width / 2;
    const offsetY = 350;
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;

    const hoveredTile = pixelToTile(screenX, screenY, offsetX, offsetY);

    if (hoveredTile && (!highlightedTile || hoveredTile.x !== highlightedTile.x || hoveredTile.y !== highlightedTile.y)) {
        highlightedTile = { x: hoveredTile.x, y: hoveredTile.y}; // Simplified
        redrawScene();

    } else if (!hoveredTile && highlightedTile) {
        highlightedTile = null;
        redrawScene();
    }
}

// --- Keyboard Event Listener (for rotation) ---
document.addEventListener("keydown", function(event) {
    if (event.key === "q") {
        World.rotateWorld(); // Call World's rotate method
        redrawScene();
    } else if (event.key === "e") {
        World.rotateWorld(true); // Rotate counter-clockwise
        redrawScene();
    }
});