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
class IPCService {
  constructor(context) {
    this.context = context;
  }
  createBaseCommunication() {
    import_electron.ipcMain.on("app-quit", () => {
      import_electron.app.quit();
    });
    import_electron.ipcMain.on("close-quit", () => {
      import_electron.app.exit(0);
    });
  }
  createMainWindowCommunication() {
    const mainWindow = this.context.mainWindow;
    import_electron.ipcMain.on("main:minimize", (_) => mainWindow.minimize());
    import_electron.ipcMain.on("main:maximize", (_) => {
      if (mainWindow.nativeWindow.isMaximized()) {
        return mainWindow.unmaximize();
      }
      mainWindow.maximize();
    });
    import_electron.ipcMain.on("main:close", (_) => mainWindow.close());
  }
}
var stdin_default = IPCService;

//# sourceMappingURL=ipc.js.map