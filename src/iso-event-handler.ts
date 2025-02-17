
import { CanvasEventHandlers, WorldEventHandler } from './mouse';
import { IsoRenderer } from './iso-renderer';


class IsoEventHandler implements CanvasEventHandlers {
    private worldEvents: WorldEventHandler;
    private isoRenderer: IsoRenderer;

    constructor(worldEvents: WorldEventHandler, isoRenderer: IsoRenderer) {
        this.worldEvents = worldEvents;
        this.isoRenderer = isoRenderer;
    }

    handleClick(event: MouseEvent): void {
        // Implement the handle click logic here, using this.worldEvents and this.isoRenderer
        console.log("IsoEventHandler.handleClick");
    }

    handleMouseMove(event: MouseEvent): void {
        // Implement the handle mouse move logic here, using this.worldEvents and this.isoRenderer
        console.log("IsoEventHandler.handleMouseMove");
    }

    handleMouseOut(event: MouseEvent): void {
        // Implement the handle mouse out logic here, using this.worldEvents and this.isoRenderer
        console.log("IsoEventHandler.handleMouseOut");
    }

    handleKeyDown(event: KeyboardEvent): void {
        // Implement the handle key down logic here, using this.worldEvents and this.isoRenderer
        console.log("IsoEventHandler.handleKeyDown");
    }
}
