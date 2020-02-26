import {MendixSdkClient} from "mendixplatformsdk";
import {IModel} from "mendixmodelsdk";

export interface MpkProjectConfig extends ProjectConfig {
    type: "mpk";
    mpk: string;
}

export interface SvnProjectConfig extends ProjectConfig {
    type: "svn";
    projectId: string;
    branch: string;
    revision: number;
}

export interface WorkingCopyProjectConfig extends ProjectConfig {
    type: "workingcopy";
    workingCopyId: string;
}

export interface ProjectConfig {
    type: "mpk" | "svn" | "workingcopy"
}

export const openWorkingCopy = async (client: MendixSdkClient, config: ProjectConfig): Promise<IModel> => {
    if (isMpkProjectconfig(config)) {
        const workingCopy = await client.model().createWorkingCopy({
            name: config.mpk,
            template: config.mpk
        });

        console.log(`Created working copy with id ${workingCopy.id}`);

        return client.model().openWorkingCopy(workingCopy.id);
    } else if (isSvnProjectconfig(config)) {
        const workingCopy = await client.model().createWorkingCopyFromTeamServer({
            name: `${config.projectId} ${config.branch} ${config.revision}`,
            projectId: config.projectId,
            teamServerBaseBranch: config.branch,
            teamServerBaseRevision: config.revision
        });

        console.log(`Created working copy with id ${workingCopy.id}`);

        return client.model().openWorkingCopy(workingCopy.id);
    } else if (isWorkingCopyProjectconfig(config)) {
        return await client.model().openWorkingCopy(config.workingCopyId);
    } else {
        throw new Error("No project configured");
    }
};

const isMpkProjectconfig = (config: ProjectConfig): config is MpkProjectConfig => {
    return config.type === "mpk";
};

const isSvnProjectconfig = (config: ProjectConfig): config is SvnProjectConfig => {
    return config.type === "svn";
};

const isWorkingCopyProjectconfig = (config: ProjectConfig): config is WorkingCopyProjectConfig => {
    return config.type === "workingcopy";
};