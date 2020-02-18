import {IModel, projects} from "mendixmodelsdk";
import IFolderBase = projects.IFolderBase;
import IDocument = projects.IDocument;
import IModule = projects.IModule;

export interface GenerateDocumentationConfig {
    modules: string;
    documents: string[];
}

interface ProjectStructure {
    [module: string]: DocumentDescription[]
}

interface DocumentDescription {
    folder: string;
    name: string;
    document: IDocument;
}

export const generateDocumentation = async (model: IModel, config: GenerateDocumentationConfig): Promise<void> => {
    const projectStructure = getFilteredModules(model, new RegExp(config.modules))
        .map(module => ({
            name: module.name,
            documents: getFilteredDocuments(module, config.documents)
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

const getFilteredModules = (model: IModel, filter?: RegExp): IModule[] =>
    getModules(model)
        .filter(module => filter ? module.name.match(filter) : true);

const getFilteredDocuments = (module: IModule, filter?: string[]): DocumentDescription[] =>
    getDocumentDescriptions(module)
        .filter(() => true);

const getModules = (model: IModel): IModule[] => model.allModules();

const getDocumentDescriptions = (folderBase: IFolderBase, path: string = "."): Array<DocumentDescription> =>
    [
        ...folderBase.folders.flatMap(folder => getDocumentDescriptions(folder, [path, folder.name].join("/"))),
        ...folderBase.documents.map(document => {
            return {
                folder: path,
                name: document.name,
                document: document,
            }
        })
    ];

const logProjectStructure = (projectStructure: ProjectStructure) =>
    Object.keys(projectStructure).forEach(moduleName => {
        console.debug(moduleName);

        const moduleStructure = projectStructure[moduleName];

        moduleStructure.forEach(document => {
            console.debug(`   ${document.folder}/${document.name}`);
        })
    });
