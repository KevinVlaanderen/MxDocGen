import { Options } from "yargs";

export interface ProjectArguments {
	mpk: string;
	projectid: string;
	revision: number;
	branch: string;
	workingcopyid: string;
}

export const projectOptions: { [key in keyof ProjectArguments]: Options } = {
	mpk: {
		type: "string",
		requiresArg: true,
		group: "Project",
		conflicts: ["projectid", "workingcopyid"]
	},
	projectid: {
		type: "string",
		requiresArg: true,
		group: "Project",
		implies: ["revision", "branch"],
		conflicts: ["mpk", "workingcopyid"]
	},
	revision: {
		type: "number",
		requiresArg: true,
		group: "Project",
		implies: "projectid"
	},
	branch: {
		type: "string",
		requiresArg: true,
		group: "Project",
		implies: "projectid"
	},
	workingcopyid: {
		type: "string",
		requiresArg: true,
		group: "Project",
		conflicts: ["mpk", "projectid"]
	}
};
