// mouse.ts


/**
 * These are concrete event handlers that translate events from
 * document coordinates into the coordinates of the current renderer
 */
interface CanvasEventHandler {
    handleClick: (event: MouseEvent) => void;
    handleMouseMove: (event: MouseEvent) => void;
    handleMouseOut: (event: MouseEvent) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
}


/**
 * Singleton that listens to the document for events, then dispatches.
 */
const MouseListener = {
    initializeListeners: (handler: CanvasEventHandler) => {

        console.log("initializing listeners");

        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

        // --- Generic Event Listeners ---
        document.addEventListener('click', function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            handler.handleClick(mouseEvent);
        });

        document.addEventListener('contextmenu', function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            event.preventDefault(); // Prevent default context menu
            handler.handleClick(mouseEvent);
        });

        document.addEventListener('mousemove', function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            handler.handleMouseMove(mouseEvent);
        });

        document.addEventListener("mouseout", function (event: MouseEvent) {
            const mouseEvent = event as MouseEvent;
            handler.handleMouseOut(mouseEvent);
        });

        document.addEventListener("keydown", function (event: KeyboardEvent) {
            const keyboardEvent = event as KeyboardEvent;
            handler.handleKeyDown(keyboardEvent);

        });
    }
};

export {
    MouseListener,
    CanvasEventHandler,
    
};