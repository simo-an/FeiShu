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
var import_main = __toESM(require("./window/main"));
var import_electron = require("electron");
var import_shortcut = __toESM(require("./shortcut"));
var import_ipc = __toESM(require("./ipc"));
class EasyCustomerClient {
  constructor() {
    this.status = "before-create";
    this.inMeeting = false;
    this.isDesktopSharing = false;
  }
  createClient() {
    import_electron.app.on("ready", this.onReady.bind(this));
    import_electron.app.on("before-quit", this.onBeforeQuit.bind(this));
    import_electron.app.on("window-all-closed", this.onWindowAllClosed.bind(this));
    import_electron.app.on("activate", this.onActivate.bind(this));
    import_electron.app.on("quit", this.onQuit.bind(this));
    import_electron.app.on("second-instance", this.onSecondInstance.bind(this));
    const isLockFetched = import_electron.app.requestSingleInstanceLock();
    if (!isLockFetched) {
      this.status = "before-quit";
      import_electron.app.quit();
    }
    process.on("exit", (code) => import_electron.app.exit(code));
  }
  onReady() {
    this.status = "created";
    this.createIPC();
    this.createMainWindow();
    this.ipc.createMainWindowCommunication();
  }
  onBeforeQuit() {
    this.status = "before-quit";
  }
  onWindowAllClosed() {
    this.status = "closed";
    if (process.platform !== "darwin")
      import_electron.app.quit();
  }
  onActivate() {
    if (import_electron.BrowserWindow.getAllWindows().length > 0)
      return;
    if (!this.mainWindow || this.mainWindow.isDestroyed) {
      return this.createMainWindow();
    }
    this.mainWindow.show();
  }
  onQuit() {
    this.status = "quited";
  }
  onSecondInstance() {
    if (this.mainWindow) {
      this.mainWindow.focusWindow();
    }
  }
  createMainWindow() {
    this.mainWindow = new import_main.default(this);
    this.mainWindow.createWindow();
    return this.mainWindow;
  }
  createIPC() {
    if (this.ipc)
      return;
    this.ipc = new import_ipc.default(this);
    this.ipc.createBaseCommunication();
  }
  createShortCut() {
    this.shortcut = new import_shortcut.default(this);
    this.mainWindow.nativeWindow.on("focus", () => this.shortcut.createMainWindowShortcut());
    this.mainWindow.nativeWindow.on("blur", () => this.shortcut.destroyMainWindowShortcut());
  }
}
var stdin_default = EasyCustomerClient;

//# sourceMappingURL=client.js.map