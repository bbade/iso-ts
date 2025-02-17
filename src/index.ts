// src/index.ts
import './buttons'; // Import buttons to ensure it runs
import Buttons from './buttons';
import { CanvasEventHandlers, MouseListener }  from './mouse';
import { IsoRenderer } from './iso-renderer';
import './world';   // Import world to ensure it runs
import { IsometricContext } from 'iso-context';




const isoCanvas =  document.getElementById("iso-canvas") as HTMLCanvasElement;
const isoCtx = new IsometricContext(isoCanvas);
Buttons.registerListeners(); // Register button listeners
const isoRenderer = new IsoRenderer(isoCtx); // Create IsoRenderer instance
MouseListener.initializeListeners( /** todo, continue to unfuck the click handling code */); // Initialize mouse listeners
