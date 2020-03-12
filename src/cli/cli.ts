import * as fs from "fs";
import yargs from "yargs";

yargs
	.commandDir("commands")
	.demandCommand(1, "You need at least one command before moving on")
	.config("config", (configPath: string) => JSON.parse(fs.readFileSync(configPath, "utf-8")))
	.showHelpOnFail(false, "Specify --help for available options").argv;
