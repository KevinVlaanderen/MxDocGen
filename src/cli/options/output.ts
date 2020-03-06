import {Argv} from "yargs";

export interface OutputArguments {
    outputDirectory: string;
    outputFilename: string;
}

export const registerOutputOptions = (yargs: Argv) => yargs
    .options({
        outputDirectory: {type: "string", requiresArg: true, demandOption: true},
        outputFilename: {type: "string", requiresArg: true, demandOption: true, default: "index.html"}
    })
    .group(["outputDirectory", "outputFilename"], "Output:");
