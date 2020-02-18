import {getFilteredDocuments, getFilteredModules, logProjectStructure, ProjectStructure} from "./projectStructure";
import {MendixSdkClient} from "mendixplatformsdk";
import {createWorkingCopy, WorkingCopyConfig} from "./sdk";

interface GenerateDocumentationConfig extends WorkingCopyConfig {
    modulesRegex: string;
    ignorePatterns: string[];
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);

    const projectStructure = getFilteredModules(model, new RegExp(config.modulesRegex))
        .map(module => ({
            name: module.name,
            documents: getFilteredDocuments(module, config.ignorePatterns)
        }))
        .reduce((previousValue, currentValue) => {
            previousValue[currentValue.name] = currentValue.documents;
            return previousValue;
        }, {} as ProjectStructure);

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
