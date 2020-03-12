import { Options } from "yargs";

export interface TemplateArguments {
	templatedir: string;
	templateext: string;
	maintemplate: string;
}

export const templateOptions: { [key in keyof TemplateArguments]: Options } = {
	templatedir: {
		type: "string",
		requiresArg: true,
		group: "Templates",
		implies: ["templateext", "templatemain"]
	},
	templateext: {
		type: "string",
		requiresArg: true,
		group: "Templates",
		implies: ["templatedir", "templatemain"]
	},
	maintemplate: {
		type: "string",
		requiresArg: true,
		group: "Templates",
		implies: ["templatedir", "templateext"]
	}
};
