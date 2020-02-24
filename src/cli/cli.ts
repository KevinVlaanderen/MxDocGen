import {commandGenerateBuilder, commandGenerateHandler} from "./commands/generate";
import * as fs from "fs";

let yargs = require('yargs');

export interface GlobalArguments {}

yargs
    .config("config",  (configPath: string) => JSON.parse(fs.readFileSync(configPath, "utf-8")))
    .command('generate', 'Generate documentation', commandGenerateBuilder, commandGenerateHandler)
    .demandCommand(1, 'You need at least one command before moving on')
    .showHelpOnFail(false, "Specify --help for available options")
    .argv;
