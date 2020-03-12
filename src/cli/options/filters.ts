import { Options } from "yargs";
import { defaultFilterConfig } from "../../documentation/filters";

export interface FilterArguments {
	modules: string;
	ignore: string[];
}

export const filterOptions: { [key in keyof FilterArguments]: Options } = {
	modules: {
		type: "string",
		requiresArg: true,
		default: defaultFilterConfig.modulesRegex,
		group: "Filters:"
	},
	ignore: {
		type: "array",
		requiresArg: true,
		default: defaultFilterConfig.documentIgnorePatterns,
		group: "Filters:"
	}
};
