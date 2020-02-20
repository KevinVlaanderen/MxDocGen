import {MendixSdkClient} from "mendixplatformsdk";
import {IModel} from "mendixmodelsdk";

export interface WorkingCopyConfig {
    mpk?: string;
    projectId?: string;
    branch?: string;
    revision?: number;
    workingCopyId?: string;
}

export const createWorkingCopy = async (client: MendixSdkClient, config: WorkingCopyConfig): Promise<IModel> => {
    if (config.mpk !== undefined) {
        const workingCopy = await client.model().createWorkingCopy({
            name: config.mpk!,
            template: config.mpk!
        });

        console.log(`Created working copy with id ${workingCopy.id}`);

        return client.model().openWorkingCopy(workingCopy.id);
    } else if (config.projectId !== undefined) {
        const workingCopy = await client.model().createWorkingCopyFromTeamServer({
            name: config.mpk!,
            projectId: config.projectId!,
            teamServerBaseBranch: config.branch!,
            teamServerBaseRevision: config.revision!
        });

        console.log(`Created working copy with id ${workingCopy.id}`);

        return client.model().openWorkingCopy(workingCopy.id);
    } else if (config.workingCopyId !== undefined) {
        return await client.model().openWorkingCopy(config.workingCopyId!);
    } else {
        throw new Error("No project configured");
    }
};
