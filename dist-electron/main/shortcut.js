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
  SHORTCUT_KEY: () => SHORTCUT_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_electron = require("electron");
var SHORTCUT_KEY = /* @__PURE__ */ ((SHORTCUT_KEY2) => {
  SHORTCUT_KEY2["MAIN_OPEN_DEVTOOL"] = "CommandOrControl+Shift+u";
  SHORTCUT_KEY2["MAIN_REFRESH"] = "CommandOrControl+Shift+k";
  return SHORTCUT_KEY2;
})(SHORTCUT_KEY || {});
class ShortcutService {
  constructor(context) {
    this.context = context;
  }
  createBaseShortcut() {
  }
  createMainWindowShortcut() {
    import_electron.globalShortcut.register("CommandOrControl+Shift+u" /* MAIN_OPEN_DEVTOOL */, () => {
      this.context.mainWindow.webContent.openDevTools();
    });
    import_electron.globalShortcut.register("CommandOrControl+Shift+k" /* MAIN_REFRESH */, () => {
      this.context.mainWindow.reload();
    });
  }
  destroyMainWindowShortcut() {
    import_electron.globalShortcut.unregister("CommandOrControl+Shift+u" /* MAIN_OPEN_DEVTOOL */);
    import_electron.globalShortcut.unregister("CommandOrControl+Shift+k" /* MAIN_REFRESH */);
  }
}
var stdin_default = ShortcutService;

//# sourceMappingURL=shortcut.js.map