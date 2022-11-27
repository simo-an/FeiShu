var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_client = __toESM(require("./client"));
var import_is = require("./utils/is");
var import_path = require("path");
process.env.DIST_ELECTRON = (0, import_path.join)(__dirname, "..");
process.env.DIST = (0, import_path.join)(__dirname, "../..");
process.env.PUBLIC = import_is.isDev ? (0, import_path.join)(process.env.DIST, "../public") : process.env.DIST;
new import_client.default().createClient();

//# sourceMappingURL=index.js.map