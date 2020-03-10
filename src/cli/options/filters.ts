import { Argv } from "yargs";
import { defaultFilterConfig } from "../../documentation/filters";

export interface FilterArguments {
	modules: string;
	ignore: string[];
}

export const registerFilterOptions = (yargs: Argv) =>
	yargs
		.options({
			modules: {
				type: "string",
				requiresArg: true,
				default: defaultFilterConfig.modulesRegex
			},
			ignore: {
				type: "array",
				requiresArg: true,
				default: defaultFilterConfig.documentIgnorePatterns
			}
		})
		.group(["modules", "ignore"], "Filters:");
