import { Options } from "yargs";
import { defaultOutputConfig } from "../../documentation/output";

export interface OutputArguments {
	outputdir: string;
	outputfile: string;
}

export const outputOptions: { [key in keyof OutputArguments]: Options } = {
	outputdir: {
		type: "string",
		requiresArg: true,
		demandOption: true,
		default: defaultOutputConfig.directory,
		group: "Output"
	},
	outputfile: {
		type: "string",
		requiresArg: true,
		demandOption: true,
		default: defaultOutputConfig.filename,
		group: "Output"
	}
};
