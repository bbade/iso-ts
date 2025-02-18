// src/index.ts
import './buttons'; // Import buttons to ensure it runs
import Buttons from './buttons';
import { CanvasEventHandler, MouseListener }  from './mouse';
import { IsoRenderer } from './iso-renderer';
import './world';   // Import world to ensure it runs
import { IsometricContext } from 'iso-context';
import { World } from './world';
import { IsometricEventHandler } from 'iso-event-handler';

const isoCanvas =  document.getElementById("iso-canvas") as HTMLCanvasElement;
const isoCtx = new IsometricContext(isoCanvas);
const world = new World(16, 16);
const isoEventHandler = new IsometricEventHandler(isoCanvas, isoCtx, world.eventHandler); // Create IsometricEventHandler instance
const buttonEventHandler = new Buttons(world.eventHandler);

const isoRenderer = new IsoRenderer(isoCtx, world); // Create IsoRenderer instance
MouseListener.initializeListeners( isoEventHandler); // Initialize mouse listeners

buttonEventHandler.registerListeners(); // Register button listeners
