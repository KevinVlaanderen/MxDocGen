import {
    DocumentDescription,
    getDocuments,
    getModules,
    logProjectStructure,
    ProjectStructure
} from "./projectStructure";
import {MendixSdkClient} from "mendixplatformsdk";
import {createWorkingCopy, WorkingCopyConfig} from "./sdk";
import {DocumentType} from "./documentTypes";
import ignore from "ignore";

interface GenerateDocumentationConfig extends WorkingCopyConfig {
    modulesRegex: string;
    ignorePatterns: string[];
    types: {
        [type in DocumentType]: boolean;
    }
}

const matchesRegex = (value: string, filter?: RegExp): boolean => filter ? value.match(filter) !== undefined : true;

const createDocumentIgnoreFilter = (ignorePatterns?: string[]): (document: DocumentDescription) => boolean => {
    const ig = ignore().add(ignorePatterns ?? []);
    return (document: DocumentDescription) => {
        const path = document.folder ? [document.folder, document.name].join("/") : document.name;
        return !ig.ignores(path);
    };
};

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);

    const projectStructure =
        getModules(model)
            .filter(module => matchesRegex(module.name, new RegExp(config.modulesRegex)))
            .map(module => ({
                name: module.name,
                documents: getDocuments(module)
                    .filter(createDocumentIgnoreFilter(config.ignorePatterns))
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
