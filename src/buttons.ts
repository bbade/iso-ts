import World from "./world";
import { redrawScene } from "./render";

const Buttons = {
    registerListeners: () => {
        console.log("registering listeners");
        // --- Texture Upload and Reset Logic ---
        const uploadButton = document.getElementById("uploadButton") as HTMLButtonElement;
        const textureUpload = document.getElementById("textureUpload") as HTMLInputElement;
        const resetButton = document.getElementById("resetButton") as HTMLButtonElement;

        uploadButton.addEventListener("click", () => {
            textureUpload.click(); // Trigger the file input
        });

        textureUpload.addEventListener("change", function(event: Event) {
            console.log("upload clicked");
            const target = event.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;  //Check for null
            if (file && file.type === "image/png") {
                const reader = new FileReader();
                reader.onload = function(e: ProgressEvent<FileReader>) {
                  if (e.target && e.target.result) { //Check that result is not null
                    const img = new Image();
                    img.onload = function() {
                        World.setTexture(img); // Use World object
                        redrawScene(); // Redraw after setting texture and board
                    };
                    img.src = e.target.result as string;
                  }
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please upload a PNG image.");
            }
        });

        resetButton.addEventListener("click", () => {
            World.clearTexture(); // Use World object
            World.initializeBoard(16, 16); // Reset to original 16x16 board
            redrawScene(); // Redraw after resetting

            // Reset the file input (so the same file can be selected again)
            textureUpload.value = "";
        });
    }
};

export default Buttons;