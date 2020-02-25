import * as fs from "fs";
import {addCopyTemplatesCommand, addGenerateCommand} from "./commands";

let yargs = require("yargs");

export interface GlobalArguments {}

yargs = addGenerateCommand(yargs);
yargs = addCopyTemplatesCommand(yargs);

yargs
    .config("config",  (configPath: string) => JSON.parse(fs.readFileSync(configPath, "utf-8")))
    .demandCommand(1, "You need at least one command before moving on")
    .showHelpOnFail(false, "Specify --help for available options")
    .argv;
