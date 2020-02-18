import {MendixSdkClient} from "mendixplatformsdk";
import {IModel} from "mendixmodelsdk";

export interface WorkingCopyConfig {
    mpk?: string;
    projectId?: string;
    branch?: string;
    revision?: number;
}

export const createMendixSdkClient = (username: string, apiKey: string) => new MendixSdkClient(username, apiKey);

export const createWorkingCopy = async (client: MendixSdkClient, config: WorkingCopyConfig): Promise<IModel> => {
    if ("mpk" in config) {
        return await client.model().createAndOpenWorkingCopy({
            name: config.mpk!,
            template: config.mpk!
        });
    } else if ("projectId" in config) {
        const workingCopy = await client.model().createWorkingCopyFromTeamServer({
            name: config.mpk!,
            projectId: config.projectId!,
            teamServerBaseBranch: config.branch!,
            teamServerBaseRevision: config.revision!
        });
        return client.model().openWorkingCopy(workingCopy.id);
    } else {
        throw new Error("No project configured");
    }
};
