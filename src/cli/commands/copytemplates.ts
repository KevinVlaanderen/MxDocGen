import os from "os";
import fs from "fs-extra";
import path from "path";
import { defaultTemplateConfig } from "../../documentation/templates";
import { Arguments, CommandBuilder } from "yargs";

interface CopyTemplatesCommandArguments extends Arguments {
	target: string;
}

export const command = "copy-templates <target>";
export const describe = "Copy the default templates to another location for modification";

export const builder: CommandBuilder = {
	target: {
		describe: "Target directory for the templates",
		type: "string"
	}
};

export const handler = (args: CopyTemplatesCommandArguments) => {
	const targetDirectory = args.target.startsWith("~/")
		? path.join(os.homedir(), args.target.slice(2))
		: args.target;

	fs.ensureDirSync(targetDirectory);

	fs.copySync(defaultTemplateConfig.directory, targetDirectory);
};
