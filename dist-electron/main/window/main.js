var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_base = __toESM(require("./base"));
var import_options = require("./options");
var import_is = require("../utils/is");
var import_path = require("path");
var import_electron = require("electron");
class MainWindow extends import_base.default {
  constructor(context) {
    super();
    this.context = context;
  }
  createWindow() {
    this.createNativeWindow((0, import_options.useMainWindowOptions)());
  }
  onBeforeCreate() {
    this.webContentUrl = import_is.isDev ? process.env.VITE_DEV_SERVER_URL : `file://${(0, import_path.join)(process.env.DIST, "index.html")}`;
  }
  onCreated() {
    this.nativeWindow.setMenu(null);
    this.show();
    this.webContent.setWindowOpenHandler((details) => {
      import_electron.shell.openExternal(details.url).then(() => {
      });
      return { action: "deny" };
    });
    this.webContent.on("will-navigate", (event, url) => {
      event.preventDefault();
      import_electron.shell.openExternal(url).then(() => {
      });
    });
    this.webContent.on("did-finish-load", () => {
      this.sendToRenderer("main-process-message", new Date().toLocaleString());
    });
  }
  onBeforeShow() {
    this.show();
  }
  onHidden() {
  }
  onShow() {
    if (import_is.isDev) {
      this.webContent.openDevTools();
    }
  }
  onBeforeClose() {
  }
  onClosed() {
    this.webContent = null;
    this.nativeWindow = null;
    import_electron.app.exit(0);
  }
  focusWindow() {
    if (this.isDestroyed)
      return;
    if (this.nativeWindow.isMinimized()) {
      this.nativeWindow.restore();
    }
    if (!this.nativeWindow.isVisible()) {
      this.nativeWindow.show();
    }
    this.nativeWindow.focus();
  }
}
var stdin_default = MainWindow;

//# sourceMappingURL=main.js.map