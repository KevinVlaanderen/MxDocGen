import {getProjectStructure, logProjectStructure, ProjectStructureConfig} from "../sdk/projectStructure";
import {MendixSdkClient} from "mendixplatformsdk";
import {createWorkingCopy, WorkingCopyConfig} from "../sdk/workingCopy";

interface GenerateDocumentationConfig extends WorkingCopyConfig, ProjectStructureConfig {}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);

    const projectStructure = getProjectStructure(model, config);

    logProjectStructure(projectStructure);

    // project.allMicroflows()
    //     .filter(microflow => microflow.containerAsModule.name.match(moduleRegex))
    //     .filter(microflow => {
    //         const pathParths = [microflow.name];
    //
    //         let current: IFolderBase;
    //         while (microflow.containerAsFolderBase.structureTypeName === "Projects$Folder") {
    //             current = microflow.containerAsFolderBase.;
    //         }
    //     });
    //
    // const modules = project.allModules().filter(module => moduleRegex ? module.name.match(moduleRegex) : true);
    // for (const module of modules) {
    //     console.log(`Module: ${module.name}`);
    //
    //     console.log(module.toJSON());
    //
    //     // await generateDocumentationForModule(module);
    //     module.traversePublicParts(structure => {
    //         console.log(structure.structureTypeName);
    //     })
    // }

    await model.deleteWorkingCopy();
};
