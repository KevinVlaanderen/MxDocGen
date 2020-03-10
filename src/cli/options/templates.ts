import { Argv } from "yargs";

export interface TemplateArguments {
	templateDirectory: string;
	templateExtension: string;
	templateMain: string;
}

export const registerTemplateOptions = (yargs: Argv) =>
	yargs
		.options({
			templatedir: { type: "string", requiresArg: true },
			templateext: { type: "string", requiresArg: true },
			templatemain: { type: "string", requiresArg: true }
		})
		.group(["templatedir", "templateext", "templatemain"], "Templates:")
		.implies({
			templatedir: ["templateext", "templatemain"],
			templateext: ["templatedir", "templatemain"],
			templatemain: ["templatedir", "templateext"]
		});
