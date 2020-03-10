import { Argv } from "yargs";

export interface ProjectArguments {
	mpk?: string;
	projectid?: string;
	revision?: number;
	branch?: string;
	workingcopyid?: string;
}

export const registerProjectOptions = (yargs: Argv) =>
	yargs
		.options({
			mpk: { type: "string", requiresArg: true },
			projectid: { type: "string", requiresArg: true },
			revision: { type: "number", requiresArg: true },
			branch: { type: "string", requiresArg: true },
			workingcopyid: { type: "string", requiresArg: true }
		})
		.conflicts({
			mpk: ["projectid", "workingcopyid"],
			projectid: ["mpk", "workingcopyid"],
			workingcopyid: ["mpk", "projectid"]
		})
		.implies({
			projectid: ["revision", "branch"],
			revision: "projectid",
			branch: "projectid"
		})
		.group(["mpk", "projectid", "revision", "branch", "workingcopyid"], "Project:");
