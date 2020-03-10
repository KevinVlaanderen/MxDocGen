import { Argv } from "yargs";
import { defaultOutputConfig } from "../../documentation/output";

export interface OutputArguments {
	outputDirectory: string;
	outputFilename: string;
}

export const registerOutputOptions = (yargs: Argv) =>
	yargs
		.options({
			outputDirectory: {
				type: "string",
				requiresArg: true,
				demandOption: true,
				default: defaultOutputConfig.directory
			},
			outputFilename: {
				type: "string",
				requiresArg: true,
				demandOption: true,
				default: defaultOutputConfig.filename
			}
		})
		.group(["outputDirectory", "outputFilename"], "Output:");
