import * as fs from "fs";
import {registerCopyTemplatesCommand, registerGenerateCommand} from "./commands";

let yargs = require("yargs");

export interface GlobalArguments {}

yargs = registerGenerateCommand(yargs);
yargs = registerCopyTemplatesCommand(yargs);

yargs
    .config("config",  (configPath: string) => JSON.parse(fs.readFileSync(configPath, "utf-8")))
    .demandCommand(1, "You need at least one command before moving on")
    .showHelpOnFail(false, "Specify --help for available options")
    .argv;
