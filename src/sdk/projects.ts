import { MendixSdkClient } from "mendixplatformsdk";
import { IModel } from "mendixmodelsdk";

export interface ProjectConfig {}

export interface MpkProjectConfig extends ProjectConfig {
	mpk: string;
}

export interface SvnProjectConfig extends ProjectConfig {
	projectId: string;
	branch: string;
	revision: number;
}

export interface WorkingCopyProjectConfig extends ProjectConfig {
	workingCopyId: string;
}

export const openWorkingCopy = async (
	client: MendixSdkClient,
	config: ProjectConfig
): Promise<IModel> => {
	let workingCopyId: string;

	if (isMpkProjectconfig(config)) {
		const workingCopy = await createWorkingCopyFromMpk(client, config);
		workingCopyId = workingCopy.id;
	} else if (isSvnProjectconfig(config)) {
		const workingCopy = await createWorkingCopyFromRevision(client, config);
		workingCopyId = workingCopy.id;
	} else if (isWorkingCopyProjectconfig(config)) {
		workingCopyId = config.workingCopyId;
	} else {
		throw new Error("No project configured");
	}

	return client.model().openWorkingCopy(workingCopyId);
};

const createWorkingCopyFromMpk = async (client: MendixSdkClient, config: MpkProjectConfig) => {
	const workingCopy = await client.model().createWorkingCopy({
		name: config.mpk,
		template: config.mpk
	});

	console.log(`Created working copy with id ${workingCopy.id}`);
	return workingCopy;
};

const createWorkingCopyFromRevision = async (client: MendixSdkClient, config: SvnProjectConfig) => {
	const workingCopy = await client.model().createWorkingCopyFromTeamServer({
		name: `${config.projectId} ${config.branch} ${config.revision}`,
		projectId: config.projectId,
		teamServerBaseBranch: config.branch,
		teamServerBaseRevision: config.revision
	});

	console.log(`Created working copy with id ${workingCopy.id}`);
	return workingCopy;
};

const isMpkProjectconfig = (config: ProjectConfig): config is MpkProjectConfig =>
	(config as MpkProjectConfig).mpk !== undefined;

const isSvnProjectconfig = (config: ProjectConfig): config is SvnProjectConfig =>
	(config as SvnProjectConfig).projectId !== undefined &&
	(config as SvnProjectConfig).branch !== undefined &&
	(config as SvnProjectConfig).revision !== undefined;

const isWorkingCopyProjectconfig = (config: ProjectConfig): config is WorkingCopyProjectConfig =>
	(config as WorkingCopyProjectConfig).workingCopyId !== undefined;
