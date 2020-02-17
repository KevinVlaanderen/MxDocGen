"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mendixplatformsdk_1 = require("mendixplatformsdk");
const minimist_1 = __importDefault(require("minimist"));
const config = require("./config.json");
const args = minimist_1.default(process.argv.slice(2), {
    string: "path"
});
const username = config.sdk.username;
const apikey = config.sdk.apikey;
const client = new mendixplatformsdk_1.MendixSdkClient(username, apikey);
async function generateDocumentation(path) {
    var _a;
    console.log(path);
    const project = await client.model().createAndOpenWorkingCopy({
        name: path,
        template: path
    });
    let moduleRegex;
    if ((_a = config.project) === null || _a === void 0 ? void 0 : _a.modulePattern)
        moduleRegex = new RegExp(config.project.modulePattern);
    const modules = project.allModules().filter(module => moduleRegex ? module.name.match(moduleRegex) : true);
    await project.deleteWorkingCopy();
}
generateDocumentation(args.path);
//# sourceMappingURL=index.js.map