// src/index.ts
import './buttons'; // Import buttons to ensure it runs
import Buttons from './buttons';
import { CanvasEventHandler, MouseListener }  from './mouse';
import { IsoRenderer } from './iso-renderer';
import './world';   // Import world to ensure it runs
import { IsometricContext } from 'iso-context';
import { World } from './world';

import { IsometricEventHandler } from 'iso-event-handler';
import { IsoViewport } from 'iso-viewport';
import { RendererCallbacks } from 'renderer-callbacks';
import { OrthoViewport } from 'ortho-viewport';


export class SceneManager {
     visible: Scene;
     hidden: Scene

    constructor(iso: Scene, ortho: Scene) {
       this.visible = iso;
       this.hidden = ortho;
    }

    toggleCanvases() {
        const temp = this.visible;
        this.visible = this.hidden;
        this.hidden = temp;
        
        this.visible.canvas.style.display = 'block';
        this.hidden.canvas.style.display = 'none';
        this.visible.renderer.redraw();
    }

} 

export class Scene {
    canvas: HTMLCanvasElement;
    renderer: RendererCallbacks;

    constructor(canvas: HTMLCanvasElement, renderer: RendererCallbacks) {
        this.canvas = canvas;
        this.renderer = renderer;
    }
}

const isoCanvas =  document.getElementById("iso-canvas") as HTMLCanvasElement;
const isoCtx = new IsometricContext(isoCanvas);

const orthoCanvas =  document.getElementById("ortho-canvas") as HTMLCanvasElement;

const world = new World(16, 16);
const buttonEventHandler = new Buttons(world.eventHandler);
const isoViewport = new IsoViewport(world, isoCtx);
const isoEventHandler = new IsometricEventHandler(isoCanvas, isoCtx, world.eventHandler, isoViewport); // Create IsometricEventHandler instance

const isoViewportButtonHandlers = isoViewport.callbacks();
const isoRenderer = new IsoRenderer(isoCtx, world, isoViewport); // Create IsoRenderer instance

const orthoViewport = new OrthoViewport(orthoCanvas, world);

const sceneManager = new SceneManager(
    new Scene(isoCanvas, isoRenderer),
    new Scene(orthoCanvas, orthoViewport)
);


const mouseListener = new MouseListener( 
    isoEventHandler, 
    isoViewportButtonHandlers,
    sceneManager
); // Initialize mouse listeners

buttonEventHandler.registerListeners(); // Register button listeners
