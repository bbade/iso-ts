const World = {
    board: [], // 2D array of numbers (elevations)
    textureCanvas: null,
    textureCtx: null,
    usingTexture: false,
    initializeBoard(width, height) {
        this.board = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                row.push(0); // Initialize all elevations to 0
            }
            this.board.push(row);
        }
    },
    getTile(boardX, boardY) {
        if (boardX >= 0 && boardX < this.board[0].length && boardY >= 0 && boardY < this.board.length) {
            return this.board[boardY][boardX];
        }
        return null; // Or handle out-of-bounds differently
    },
    setTile(boardX, boardY, elevation) {
        if (boardX >= 0 && boardX < this.board[0].length && boardY >= 0 && boardY < this.board.length) {
            this.board[boardY][boardX] = elevation;
        }
    },
    getPixel(boardX, boardY) {
        if (!this.textureCtx) {
            return "#000000"; // Default color if no texture
        }
        let texX = boardX;
        let texY = boardY;
        // Bounds Check
        if (texX < 0 || texX >= this.textureCanvas.width || texY < 0 || texY >= this.textureCanvas.height) {
            return "#000000"; //Return black if out of bounds.
        }
        const pixelData = this.textureCtx.getImageData(texX, texY, 1, 1).data;
        return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    },
    setTexture(img) {
        this.textureCanvas = document.createElement("canvas");
        this.textureCanvas.width = img.width;
        this.textureCanvas.height = img.height;
        this.textureCtx = this.textureCanvas.getContext("2d"); // Assert non-null
        this.textureCtx.drawImage(img, 0, 0);
        this.usingTexture = true;
        this.initializeBoard(img.width, img.height);
    },
    clearTexture() {
        this.usingTexture = false;
        this.textureCanvas = null;
        this.textureCtx = null;
    },
    getWidth() {
        return this.board[0].length;
    },
    getHeight() {
        return this.board.length;
    },
    increaseElevation(boardX, boardY, bulkEdit) {
        if (boardX >= 0 && boardX < this.getWidth() && boardY >= 0 && boardY < this.getHeight()) {
            if (bulkEdit && this.usingTexture) {
                const targetColor = this.getPixel(boardX, boardY);
                for (let y = 0; y < this.getHeight(); y++) {
                    for (let x = 0; x < this.getWidth(); x++) {
                        if (this.getPixel(x, y) === targetColor) {
                            this.setTile(x, y, Math.max(0, this.getTile(x, y) + 1)); // Assert non-null
                        }
                    }
                }
            }
            else {
                this.setTile(boardX, boardY, Math.max(0, this.getTile(boardX, boardY) + 1)); // Assert non-null
            }
        }
    },
    decreaseElevation(boardX, boardY, bulkEdit) {
        if (boardX >= 0 && boardX < this.getWidth() && boardY >= 0 && boardY < this.getHeight()) {
            if (bulkEdit && this.usingTexture) {
                const targetColor = this.getPixel(boardX, boardY);
                for (let y = 0; y < this.getHeight(); y++) {
                    for (let x = 0; x < this.getWidth(); x++) {
                        if (this.getPixel(x, y) === targetColor) {
                            this.setTile(x, y, Math.max(0, this.getTile(x, y) - 1)); // Assert non-null
                        }
                    }
                }
            }
            else {
                this.setTile(boardX, boardY, Math.max(0, this.getTile(boardX, boardY) - 1)); // Assert non-null
            }
        }
    },
    rotateWorld(counterClockwise = false) {
        // --- Rotate Texture (if using texture) ---
        if (this.usingTexture && this.textureCanvas) {
            const rotatedCanvas = document.createElement('canvas');
            rotatedCanvas.width = this.textureCanvas.height; // Swap width/height
            rotatedCanvas.height = this.textureCanvas.width;
            const rotatedCtx = rotatedCanvas.getContext('2d'); // Assert non-null
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
        let newBoard;
        if (!counterClockwise) {
            newBoard = this.board[0].map((val, index) => this.board.map(row => row[index]).reverse());
        }
        else {
            newBoard = this.board[0].map((val, index) => this.board.map(row => row[row.length - 1 - index]));
        }
        this.board = newBoard; // Assign the new board
    }
};
//Initial 16x16 board at startup
World.initializeBoard(16, 16);
export default World;
