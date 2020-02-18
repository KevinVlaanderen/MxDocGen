import {IModel, projects} from "mendixmodelsdk";
import IDocument = projects.IDocument;
import IModule = projects.IModule;
import IFolderBase = projects.IFolderBase;

export interface ProjectStructure {
    [module: string]: DocumentDescription[]
}

export interface DocumentDescription {
    folder: string;
    name: string;
    document: IDocument;
}

export const logProjectStructure = (projectStructure: ProjectStructure) =>
    Object.keys(projectStructure).forEach(moduleName => {
        console.debug(moduleName);

        const moduleStructure = projectStructure[moduleName];

        moduleStructure.forEach(document => {
            console.debug(`   ${document.folder}/${document.name}`);
        })
    });

export const getModules = (model: IModel): IModule[] => model.allModules();

export const getFilteredModules = (model: IModel, filter?: RegExp): IModule[] =>
    getModules(model)
        .filter(module => filter ? module.name.match(filter) : true);

export const getDocuments = (module: IModule): DocumentDescription[] => getDocumentDescriptions(module);

export const getFilteredDocuments = (module: IModule, filter?: string[]): DocumentDescription[] =>
    getDocuments(module)
        .filter(() => true);

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
