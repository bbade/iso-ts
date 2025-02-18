// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"bTHtU":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"h7u1C":[function(require,module,exports,__globalThis) {
// src/index.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _buttons = require("./buttons"); // Import buttons to ensure it runs
var _buttonsDefault = parcelHelpers.interopDefault(_buttons);
var _mouse = require("./mouse");
var _isoRenderer = require("./iso-renderer");
var _world = require("./world"); // Import world to ensure it runs
var _isoContext = require("iso-context");
var _isoEventHandler = require("iso-event-handler");
const isoCanvas = document.getElementById("iso-canvas");
const isoCtx = new (0, _isoContext.IsometricContext)(isoCanvas);
const world = new (0, _world.World)(16, 16);
const isoEventHandler = new (0, _isoEventHandler.IsometricEventHandler)(isoCanvas, isoCtx, world.eventHandler); // Create IsometricEventHandler instance
const buttonEventHandler = new (0, _buttonsDefault.default)(world.eventHandler);
const isoRenderer = new (0, _isoRenderer.IsoRenderer)(isoCtx, world); // Create IsoRenderer instance
(0, _mouse.MouseListener).initializeListeners(isoEventHandler); // Initialize mouse listeners

},{"./buttons":"7OSSg","./mouse":"j0st4","./iso-renderer":"ekh73","./world":"1L67l","iso-context":"fUbgX","iso-event-handler":"dVI9N","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7OSSg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Buttons {
    constructor(worldEventHandler){
        this.worldEvents = worldEventHandler;
        this.registerListeners();
    }
    registerListeners() {
        console.log("registering listeners");
        // --- Texture Upload and Reset Logic ---
        const uploadButton = document.getElementById("uploadButton");
        const textureUpload = document.getElementById("textureUpload");
        const resetButton = document.getElementById("resetButton");
        uploadButton.addEventListener("click", (event)=>{
            event.stopPropagation(); // Prevent event from bubbling up
            textureUpload.click(); // Trigger the file input
        });
        textureUpload.addEventListener("change", (event)=>{
            console.log("upload clicked");
            const target = event.target;
            const file = target.files ? target.files[0] : null; //Check for null
            if (file && file.type === "image/png") {
                const reader = new FileReader();
                reader.onload = (e)=>{
                    if (e.target && e.target.result) {
                        const img = new Image();
                        img.onload = ()=>{
                            this.worldEvents.setTexture(img);
                        };
                        img.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            } else alert("Please upload a PNG image.");
        });
        resetButton.addEventListener("click", (event)=>{
            event.stopPropagation(); // Prevent event from bubbling up
            this.worldEvents.reset();
            // Reset the file input (so the same file can be selected again)
            textureUpload.value = "";
        });
    }
}
exports.default = Buttons;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"j0st4":[function(require,module,exports,__globalThis) {
// mouse.ts
/**
 * These are concrete event handlers that translate events from
 * document coordinates into the coordinates of the current renderer
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MouseListener", ()=>MouseListener);
/**
 * Singleton that listens to the document for events, then dispatches.
 */ const MouseListener = {
    initializeListeners: (handler)=>{
        console.log("initializing listeners");
        const canvas = document.getElementById("myCanvas");
        // --- Generic Event Listeners ---
        document.addEventListener('click', function(event) {
            const mouseEvent = event;
            handler.handleClick(mouseEvent);
        });
        document.addEventListener('contextmenu', function(event) {
            const mouseEvent = event;
            event.preventDefault(); // Prevent default context menu
            handler.handleClick(mouseEvent);
        });
        document.addEventListener('mousemove', function(event) {
            const mouseEvent = event;
            handler.handleMouseMove(mouseEvent);
        });
        document.addEventListener("mouseout", function(event) {
            const mouseEvent = event;
            handler.handleMouseOut(mouseEvent);
        });
        document.addEventListener("keydown", function(event) {
            const keyboardEvent = event;
            handler.handleKeyDown(keyboardEvent);
        });
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ekh73":[function(require,module,exports,__globalThis) {
// iso-renderer.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IsoRenderer", ()=>IsoRenderer);
function getColorByElevation(elevation) {
    switch(elevation){
        case 0:
            return "#0000ff"; // blue (water)
        case 1:
            return "#ffff00"; // yellow (sandy)
        case 2:
        case 3:
            return "#00c800"; // green (grass)
        case 4:
        case 5:
            return "#808080"; // gray (mountain)
        case 6:
            return "#ffffff"; // white (snow)
        default:
            return "#808080";
    }
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
    let b = (num >> 8 & 0x00FF) + amount * 255;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000FF) + amount * 255;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    let newColor = (g | b << 8 | r << 16).toString(16);
    while(newColor.length < 6)newColor = "0" + newColor;
    return (usePound ? "#" : "") + newColor;
}
class IsoRenderer {
    constructor(isometricContext, world){
        this.isoContext = isometricContext;
        this.canvas = isometricContext.canvas;
        this.ctx = this.canvas.getContext("2d"); // Assert non-null, checked below
        this.world = world;
        world.renderer = this;
        // Initial setup and drawing
        const t = this.isoContext.baseTranslation();
        this.ctx.translate(t.x, t.y);
        this.drawScene();
    }
    drawTile(boardX, boardY, zHeight, color, context, isHighlighted) {
        const { v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5y, v6y, v7y } = this.isoContext.tileVertices(boardX, boardY, zHeight);
        let drawColor = color;
        if (isHighlighted) drawColor = this.adjustBrightness(color, 0.2); // Brighten for highlight
        // --- Top Face ---
        context.fillStyle = drawColor;
        this.isoContext.tilePath(context, v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y);
        context.fill();
        // --- Left & Right Faces (only if zHeight > 0) ---
        if (zHeight > 0) {
            // --- Left Face ---
            context.fillStyle = this.adjustBrightness(drawColor, -0.2);
            context.beginPath();
            context.moveTo(v4x, v4y);
            context.lineTo(v3x, v3y);
            context.lineTo(v1x, v5y);
            context.lineTo(v4x, v6y);
            context.closePath();
            context.fill();
            // --- Right Face ---
            context.fillStyle = this.adjustBrightness(drawColor, -0.4);
            context.beginPath();
            context.moveTo(v2x, v2y);
            context.lineTo(v3x, v3y);
            context.lineTo(v1x, v5y);
            context.lineTo(v2x, v7y);
            context.closePath();
            context.fill();
        }
    }
    drawScene() {
        const world = this.world;
        for(let boardY = 0; boardY < world.getHeight(); boardY++)for(let boardX = 0; boardX < world.getWidth(); boardX++){
            const elevation = world.getTile(boardX, boardY); // Assert non-null, as we're within bounds
            let tileColor;
            if (world.usingTexture) tileColor = world.getPixel(boardX, boardY);
            else tileColor = getColorByElevation(elevation);
            const highlightedTile = world.getHoveredTile();
            const isHighlighted = highlightedTile && highlightedTile.x === boardX && highlightedTile.y === boardY || false;
            for(let i = 0; i <= elevation; i++)this.drawTile(boardX, boardY, i, tileColor, this.ctx, isHighlighted);
        }
    }
    adjustBrightness(color, amount) {
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
        let b = (num >> 8 & 0x00FF) + amount * 255;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amount * 255;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        let newColor = (g | b << 8 | r << 16).toString(16);
        while(newColor.length < 6)newColor = "0" + newColor;
        return (usePound ? "#" : "") + newColor;
    }
    redraw() {
        const offsetX = this.isoContext.offsetX;
        const offsetY = this.isoContext.offsetY;
        this.ctx.clearRect(-offsetX, -offsetY, this.canvas.width, this.canvas.height);
        this.drawScene();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1L67l":[function(require,module,exports,__globalThis) {
// World.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// TODO TODO TODO: Refactor to request a redraw after it changes. 
parcelHelpers.export(exports, "World", ()=>World);
var _model = require("model");
class World {
    constructor(width, height){
        this.board = [] // 2D array of numbers (elevations)
        ;
        this.textureCanvas = null;
        this.textureCtx = null;
        this.usingTexture = false;
        this.hoveredTile = null;
        this.renderer = null;
        this.dontRedraw = false // enable this to do a number of operations
        ;
        this.eventHandler = {
            setHoveredTile: (x, y)=>{
                this.hoveredTile = new (0, _model.Point)(x, y);
                this.redraw();
            },
            clearHoveredTile: ()=>{
                this.hoveredTile = null;
                this.redraw();
            },
            changeTileElevation: (x, y, delta)=>{
                this.changeElevation(x, y, delta, false);
            },
            changeTileElevationBulk: (x, y, delta)=>{
                this.changeElevation(x, y, delta, true);
            },
            setTexture: (img)=>{
                this.textureCanvas = document.createElement("canvas");
                this.textureCanvas.width = img.width;
                this.textureCanvas.height = img.height;
                this.textureCtx = this.textureCanvas.getContext("2d"); // Assert non-null
                this.textureCtx.drawImage(img, 0, 0);
                this.usingTexture = true;
                this.initBoard(img.width, img.height);
                this.redraw();
            },
            clearTexture: ()=>{
                this.clearTexture();
            },
            reset: ()=>{
                this.dontRedraw = true;
                this.clearTexture();
                this.initBoard();
                this.dontRedraw = false;
                this.redraw();
            }
        };
        this.initBoard(width, height);
    }
    redraw() {
        if (this.dontRedraw) return;
        this.renderer?.redraw();
    }
    initBoard(width = 16, height = 16) {
        this.board = [];
        for(let y = 0; y < height; y++){
            let row = [];
            for(let x = 0; x < width; x++)row.push(0); // Initialize all elevations to 0
            this.board.push(row);
        }
    }
    getTile(boardX, boardY) {
        if (boardX >= 0 && boardX < this.board[0].length && boardY >= 0 && boardY < this.board.length) return this.board[boardY][boardX];
        return null; // Or handle out-of-bounds differently
    }
    setTile(boardX, boardY, elevation) {
        if (boardX >= 0 && boardX < this.board[0].length && boardY >= 0 && boardY < this.board.length) this.board[boardY][boardX] = elevation;
    }
    getHoveredTile() {
        return this.hoveredTile;
    }
    getPixel(boardX, boardY) {
        if (!this.textureCtx) return "#000000"; // Default color if no texture
        let texX = boardX;
        let texY = boardY;
        // Bounds Check
        if (texX < 0 || texX >= this.textureCanvas.width || texY < 0 || texY >= this.textureCanvas.height) return "#000000"; //Return black if out of bounds.
        const pixelData = this.textureCtx.getImageData(texX, texY, 1, 1).data;
        return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    }
    getWidth() {
        return this.board[0].length;
    }
    getHeight() {
        return this.board.length;
    }
    changeElevation(boardX, boardY, delta, bulkEdit) {
        if (boardX >= 0 && boardX < this.getWidth() && boardY >= 0 && boardY < this.getHeight()) {
            if (bulkEdit && this.usingTexture) {
                const targetColor = this.getPixel(boardX, boardY);
                for(let y = 0; y < this.getHeight(); y++){
                    for(let x = 0; x < this.getWidth(); x++)if (this.getPixel(x, y) === targetColor) this.setTile(x, y, Math.max(0, this.getTile(x, y) + delta)); // Assert non-null
                }
            } else this.setTile(boardX, boardY, Math.max(0, this.getTile(boardX, boardY) + delta)); // Assert non-null
        }
        this.redraw();
    }
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
            } else {
                rotatedCtx.rotate(Math.PI / 2);
                rotatedCtx.drawImage(this.textureCanvas, 0, -this.textureCanvas.height);
            }
            this.textureCanvas = rotatedCanvas; // Replace the old canvas
            this.textureCtx = rotatedCtx;
        }
        // --- Rotate Board ---
        let newBoard;
        if (!counterClockwise) newBoard = this.board[0].map((val, index)=>this.board.map((row)=>row[index]).reverse());
        else newBoard = this.board[0].map((val, index)=>this.board.map((row)=>row[row.length - 1 - index]));
        this.board = newBoard; // Assign the new board
        this.redraw();
    }
    clearTexture() {
        this.usingTexture = false;
        this.textureCanvas = null;
        this.textureCtx = null;
        this.redraw();
    }
}

},{"model":"1hsjm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1hsjm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Point", ()=>Point);
parcelHelpers.export(exports, "Tile", ()=>Tile);
class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
class Tile {
    constructor(point, elevation){
        this.point = point;
        this.elevation = elevation;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fUbgX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IsometricContext", ()=>IsometricContext);
var _model = require("model");
class IsometricContext {
    constructor(canvas, tileWidth = 16, tileHeight = 8){
        this.canvas = canvas;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
    baseTranslation() {
        return new (0, _model.Point)(this.canvas.width / 2, 250);
    }
    screenToIso(screenX, screenY) {
        const baseT = this.baseTranslation();
        const isoX = screenX - baseT.x;
        const isoY = screenY - baseT.y;
        const boardXMaybeFloat = (isoX / (this.tileWidth / 2) + isoY / (this.tileHeight / 2)) / 2;
        const boardYMaybeFloat = (isoY / (this.tileHeight / 2) - isoX / (this.tileWidth / 2)) / 2;
        const boardX = Math.floor(boardXMaybeFloat);
        const boardY = Math.floor(boardYMaybeFloat);
        return {
            boardX: boardX,
            boardY: boardY
        };
    }
    tileVertices(boardX, boardY, zHeight) {
        const isoX = (boardX - boardY) * this.tileWidth / 2;
        const isoY = (boardX + boardY) * this.tileHeight / 2;
        const topOffsetY = -zHeight * this.tileHeight;
        return {
            v1x: isoX,
            v1y: isoY + topOffsetY,
            v2x: isoX + this.tileWidth / 2,
            v2y: isoY + this.tileHeight / 2 + topOffsetY,
            v3x: isoX,
            v3y: isoY + this.tileHeight + topOffsetY,
            v4x: isoX - this.tileWidth / 2,
            v4y: isoY + this.tileHeight / 2 + topOffsetY,
            v5y: isoY + this.tileHeight,
            v6y: isoY + this.tileHeight / 2,
            v7y: isoY + this.tileHeight / 2
        };
    }
    tilePath(context, v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y) {
        context.beginPath();
        context.moveTo(v1x, v1y);
        context.lineTo(v2x, v2y);
        context.lineTo(v3x, v3y);
        context.lineTo(v4x, v4y);
        context.closePath();
    }
}

},{"model":"1hsjm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dVI9N":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IsometricEventHandler", ()=>IsometricEventHandler);
var _model = require("model");
class IsometricEventHandler {
    constructor(canvas, isoCtx, worldHandler){
        this.isoCanvas = canvas;
        this.isoCtx = isoCtx;
        this.worldHandler = worldHandler;
    }
    translateEventPointToViewport(clientX, clientY) {
        const rect = this.isoCanvas.getBoundingClientRect();
        const screenX = clientX - rect.left;
        const screenY = clientY - rect.top;
        return new (0, _model.Point)(screenX, screenY);
    }
    translateEventToIsometricGrid(event) {
        const clientX = event.clientX;
        const clientY = event.clientY;
        const screenPoint = this.translateEventPointToViewport(clientX, clientY);
        console.log(`Client coordinates: (${clientX}, ${clientY})`);
        console.log(`Screen coordinates: (${screenPoint.x}, ${screenPoint.y})`);
        const isoPoint = this.isoCtx.screenToIso(screenPoint.x, screenPoint.y);
        console.log(`Isometric coordinates: (${isoPoint.boardX}, ${isoPoint.boardY})`);
        return isoPoint;
    }
    // private translateEventToIsometricGrid(event: MouseEvent) : TileCoordinates {
    //     return this.translateEventPointsToIsometricGrid(event.clientX, event.clientY);
    // }
    handleClick(event) {
        console.log("handleClick: " + event);
        const { boardX, boardY } = this.translateEventToIsometricGrid(event);
        let delta;
        if (event.button === 0) delta = 1;
        else if (event.button === 2) delta = -1;
        else return; // Ignore other buttons
        if (event.shiftKey) this.worldHandler.changeTileElevationBulk(boardX, boardY, delta);
        else this.worldHandler.changeTileElevation(boardX, boardY, delta);
    }
    handleMouseMove(event) {
        const { boardX, boardY } = this.translateEventToIsometricGrid(event);
        console.log("mouse event " + event + " at board(" + boardX + ", " + boardY + ")");
        this.worldHandler.setHoveredTile(boardX, boardY);
    }
    handleMouseOut(event) {
        this.worldHandler.clearHoveredTile();
    }
    handleKeyDown(event) {
        event.key;
    }
}

},{"model":"1hsjm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["bTHtU","h7u1C"], "h7u1C", "parcelRequire94c2")

//# sourceMappingURL=index.b71e74eb.js.map
