import { Options } from "yargs";

export interface ClientArguments {
	username: string;
	apikey: string;
}

export const clientOptions: { [key in keyof ClientArguments]: Options } = {
	username: {
		type: "string",
		demandOption: true,
		requiresArg: true,
		group: "Credentials:"
	},
	apikey: {
		type: "string",
		demandOption: true,
		requiresArg: true,
		group: "Credentials:"
	}
};
