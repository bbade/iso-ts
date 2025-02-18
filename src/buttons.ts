import {WorldEventHandler} from "./world";
import { CanvasEventHandler } from "mouse";

class Buttons {

    private worldEvents: WorldEventHandler;

    constructor( worldEventHandler: WorldEventHandler) {
        this.worldEvents = worldEventHandler;
        this.registerListeners();
    }

    registerListeners(): void {
        console.log("registering listeners");
        // --- Texture Upload and Reset Logic ---
        const uploadButton = document.getElementById("uploadButton") as HTMLButtonElement;
        const textureUpload = document.getElementById("textureUpload") as HTMLInputElement;
        const resetButton = document.getElementById("resetButton") as HTMLButtonElement;

        uploadButton.addEventListener("click", (event: MouseEvent) => {
            event.stopPropagation(); // Prevent event from bubbling up
            textureUpload.click(); // Trigger the file input
        });

        textureUpload.addEventListener("change", (event: Event) => {
            console.log("upload clicked");
            const target = event.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;  //Check for null
            if (file && file.type === "image/png") {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>)  =>{
                  if (e.target && e.target.result) { //Check that result is not null
                    const img = new Image();
                    img.onload = () => {
                        this.worldEvents.setTexture(img);
                    };
                    img.src = e.target.result as string;
                  }
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please upload a PNG image.");
            }
        });

        resetButton.addEventListener("click", (event: MouseEvent) => {
            event.stopPropagation(); // Prevent event from bubbling up
            this.worldEvents.reset();
            // Reset the file input (so the same file can be selected again)
            textureUpload.value = "";
        });
    }
}

export default Buttons;