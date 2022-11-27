var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_electron = require("electron");
class BaseWindow {
  constructor() {
    this.pendingList = [];
  }
  get isDestroyed() {
    return !this.nativeWindow || this.nativeWindow.isDestroyed();
  }
  createNativeWindow(options) {
    this.onBeforeCreate();
    this.nativeWindow = new import_electron.BrowserWindow(options);
    this.webContent = this.nativeWindow.webContents;
    if (!this.webContentUrl) {
      throw new Error("You must provide WebContentUrl before created!");
    }
    this.nativeWindow.loadURL(this.webContentUrl).then(() => this.isWebContentLoad = true).then(() => this.onCreated()).then(() => {
      this.pendingList.forEach((pending) => {
        this.sendToRenderer(pending.key, pending.value);
      });
      this.pendingList = [];
    }).catch((error) => console.warn("load url error: ", error));
    this.nativeWindow.once("ready-to-show", this.onBeforeShow.bind(this));
    this.nativeWindow.on("show", this.onShow.bind(this));
    this.nativeWindow.on("hide", this.onHidden.bind(this));
    this.nativeWindow.on("close", this.onBeforeClose.bind(this));
    this.nativeWindow.once("closed", this.onClosed.bind(this));
  }
  show() {
    if (this.isDestroyed)
      return;
    this.nativeWindow.show();
  }
  hide() {
    if (this.isDestroyed)
      return;
    this.nativeWindow.hide();
  }
  close() {
    return !this.isDestroyed && this.nativeWindow.close();
  }
  forceClose() {
    return !this.isDestroyed && this.nativeWindow.destroy();
  }
  reload() {
    return !this.isDestroyed && this.nativeWindow.reload();
  }
  destroy() {
    if (this.isDestroyed)
      return;
    this.nativeWindow.destroy();
    this.nativeWindow = null;
  }
  maximize() {
    if (this.isDestroyed)
      return;
    this.nativeWindow.maximize();
  }
  minimize() {
    if (this.isDestroyed)
      return;
    this.nativeWindow.minimize();
  }
  unmaximize() {
    if (this.isDestroyed)
      return;
    this.nativeWindow.unmaximize();
  }
  centralize() {
    if (this.isDestroyed)
      return;
    this.nativeWindow.center();
  }
  setBounds(rect) {
    if (this.isDestroyed)
      return;
    this.nativeWindow.setBounds(rect);
  }
  sendToRenderer(channel, params) {
    if (!this.nativeWindow)
      return;
    if (!this.isWebContentLoad) {
      this.pendingList.push({ key: channel, value: params });
      return;
    }
    this.webContent.send(channel, params);
  }
}
var stdin_default = BaseWindow;

//# sourceMappingURL=base.js.map