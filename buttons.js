// --- Texture Upload and Reset Logic ---
const uploadButton = document.getElementById("uploadButton");
const textureUpload = document.getElementById("textureUpload");
const resetButton = document.getElementById("resetButton");

uploadButton.addEventListener("click", () => {
    textureUpload.click(); // Trigger the file input
});

textureUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // Create offscreen canvas
                textureCanvas = document.createElement("canvas");
                textureCanvas.width = img.width;
                textureCanvas.height = img.height;
                textureCtx = textureCanvas.getContext("2d");
                textureCtx.drawImage(img, 0, 0);

                // Resize and reset the board
                initializeBoard(img.width, img.height);
                usingTexture = true;

                // Redraw the scene
                const offsetX = canvas.width / 2;  // Get offsets for clearing
                const offsetY = 350;
                ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
                drawScene(ctx);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a PNG image.");
    }
});

resetButton.addEventListener("click", () => {
    usingTexture = false;
    textureCanvas = null;
    textureCtx = null;
    initializeBoard(16, 16); // Reset to original 16x16 board

    const offsetX = canvas.width / 2;
    const offsetY = 350;
    ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
    drawScene(ctx);

    // Reset the file input (so the same file can be selected again)
    textureUpload.value = "";
});