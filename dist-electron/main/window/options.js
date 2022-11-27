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
  mergeOptions: () => mergeOptions,
  useMainWindowOptions: () => useMainWindowOptions
});
module.exports = __toCommonJS(stdin_exports);
var import_path = require("path");
const mergePlainObject = (source, target) => {
  Reflect.ownKeys(source).forEach((key) => target[key] = target[key] ?? source[key]);
};
const mergeOptions = (source, target) => {
  const keyList = Reflect.ownKeys(source);
  keyList.forEach((key) => {
    target[key] = target[key] ?? source[key];
    if (key === "webPreferences") {
      mergePlainObject(target[key], source[key]);
    }
  });
  return target;
};
function useMainWindowOptions() {
  return {
    title: "\u98DE\u4E66",
    icon: (0, import_path.join)(process.env.PUBLIC, "favicon.png"),
    width: 1120,
    height: 760,
    minWidth: 920,
    minHeight: 640,
    frame: false,
    backgroundColor: "#FFFFFF",
    alwaysOnTop: true,
    webPreferences: {
      preload: (0, import_path.join)(__dirname, "../../preload/index.js"),
      nodeIntegration: true,
      contextIsolation: false
    }
  };
}

//# sourceMappingURL=options.js.map