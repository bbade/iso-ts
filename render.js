// render.js
const TILE_WIDTH = 16;
const TILE_HEIGHT = 8;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let board = []; // Will be initialized dynamically
let highlightedTile = null;
let usingTexture = false;
let textureCanvas = null;
let textureCtx = null;

function initializeBoard(width, height) {
    board = [];
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            row.push(0); // Initialize all elevations to 0
        }
        board.push(row);
    }
}
//Initial 16x16 board
initializeBoard(16, 16);

function getColorByElevation(elevation) {
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

function getTextureColor(boardX, boardY) {
    if (!textureCtx) {
        return "#000000"; // Default color if no texture
    }

    let texX = boardX;
    let texY = boardY;

    // Bounds Check
    if (texX < 0 || texX >= textureCanvas.width || texY < 0 || texY >= textureCanvas.height) {
        return "#000000"; //Return black if out of bounds.
    }

    const pixelData = textureCtx.getImageData(texX, texY, 1, 1).data;
    return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
}

function tileVertices(boardX, boardY, zHeight) {
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


function drawTile(boardX, boardY, zHeight, color, context, isHighlighted) {
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

function tilePath(context, v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y) {
    context.beginPath();
    context.moveTo(v1x, v1y);
    context.lineTo(v2x, v2y);
    context.lineTo(v3x, v3y);
    context.lineTo(v4x, v4y);
    context.closePath();
}


function adjustBrightness(color, amount) {
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

function screenToIso(screenX, screenY, offsetX, offsetY) {
    const isoX = screenX - offsetX;
    const isoY = screenY - offsetY;

    const boardX = (isoX / (TILE_WIDTH / 2) + isoY / (TILE_HEIGHT / 2)) / 2;
    const boardY = (isoY / (TILE_HEIGHT / 2) - isoX / (TILE_WIDTH / 2)) / 2;
    return { x: boardX, y: boardY };
}

function pixelToTile(screenX, screenY, offsetX, offsetY) {
    // Iterate in reverse draw order (top-down) to find hovered tile
    for (let boardY = board.length - 1; boardY >= 0; boardY--) {
        for (let boardX = board[boardY].length - 1; boardX >= 0; boardX--) {
            const elevation = board[boardY][boardX];

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

function drawScene(context) {
  const offsetX = canvas.width / 2;
  const offsetY = 350;

  for (let boardY = 0; boardY < board.length; boardY++) {
      for (let boardX = 0; boardX < board[boardY].length; boardX++) {
          const elevation = board[boardY][boardX];
          let tileColor;

          if (usingTexture) {
              tileColor = getTextureColor(boardX, boardY);
          } else {
              tileColor = getColorByElevation(elevation);
          }

          const isHighlighted = highlightedTile &&
                                highlightedTile.x === boardX &&
                                highlightedTile.y === boardY;

        for (let i = 0; i <= elevation; i++) {
            drawTile(boardX, boardY, i, tileColor, context, isHighlighted);
        }
      }
  }
}

function redrawScene() {
    const offsetX = canvas.width / 2;
    const offsetY = 350;
    ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
    drawScene(ctx);
}

// --- Mouse Event Handlers ---
canvas.addEventListener("click", function(event) {
handleMouseClick(event, 1, event.shiftKey); // Left click, no shift
});

canvas.addEventListener("contextmenu", function(event) {
event.preventDefault();
handleMouseClick(event, -1, event.shiftKey); // Right click, no shift
});

canvas.addEventListener("mousemove", function(event) {
  handleMouseMove(event);
});
canvas.addEventListener("mouseout", function(event) {
  highlightedTile = null;
  redrawScene();
});


function handleMouseClick(event, heightChange, isShiftClick) {
  const rect = canvas.getBoundingClientRect();
  const offsetX = canvas.width / 2;
  const offsetY = 350;
  const screenX = event.clientX - rect.left;
  const screenY = event.clientY - rect.top;

  const clickedTile = pixelToTile(screenX, screenY, offsetX, offsetY);

  if (clickedTile) {
       if (usingTexture && isShiftClick) {
          // Bulk edit
          const targetColor = getTextureColor(clickedTile.x, clickedTile.y);
          for (let y = 0; y < board.length; y++) {
              for (let x = 0; x < board[y].length; x++) {
                  if (getTextureColor(x, y) === targetColor) {
                      board[y][x] = Math.max(0, board[y][x] + heightChange);
                  }
              }
          }
      } else {
          // Single tile edit
          console.log("Clicked tile: boardX =", clickedTile.x, ", boardY =", clickedTile.y, ", elevation =", board[clickedTile.y][clickedTile.x]);
          board[clickedTile.y][clickedTile.x] += heightChange;
          board[clickedTile.y][clickedTile.x] = Math.max(0, board[clickedTile.y][clickedTile.x]);
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
  highlightedTile = { x: hoveredTile.x, y: hoveredTile.y, rawX: hoveredTile.x, rawY: hoveredTile.y }; // Store original coords
    redrawScene();

} else if (!hoveredTile && highlightedTile) {
    highlightedTile = null;
    redrawScene();
}
}

// --- Initial setup and drawing ---
if (ctx) {
    ctx.translate(canvas.width / 2, 350);
    drawScene(ctx);
} else {
    console.error("Canvas not supported!");
    const canvasContainer = document.getElementById("myCanvas");
    canvasContainer.parentNode.replaceChild(
        document.createTextNode("Your browser does not support the canvas element."),
        canvasContainer
    );
}
