import {IModel, projects} from "mendixmodelsdk";
import IDocument = projects.IDocument;
import IModule = projects.IModule;
import IFolderBase = projects.IFolderBase;
import ignore from "ignore";

export interface ProjectStructure {
    [module: string]: DocumentDescription[]
}

export interface DocumentDescription {
    folder?: string;
    name: string;
    document: IDocument;
}

export const getModules = (model: IModel): IModule[] => model.allModules();
export const getDocuments = (module: IModule): DocumentDescription[] => getDocumentDescriptions(module);

export const logProjectStructure = (projectStructure: ProjectStructure) =>
    Object.keys(projectStructure).forEach(moduleName => {
        console.debug(moduleName);

        const moduleStructure = projectStructure[moduleName];

        moduleStructure.forEach(document => {
            const path = document.folder ? [document.folder, document.name].join("/") : document.name;
            console.debug(`   ${path}`);
        })
    });

const getDocumentDescriptions = (folderBase: IFolderBase, path?: string): Array<DocumentDescription> =>
    [
        ...folderBase.folders.flatMap(folder => getDocumentDescriptions(folder, path ? [path, folder.name].join("/") : folder.name)),
        ...folderBase.documents.map(document => {
            return {
                folder: path,
                name: document.name,
                document: document,
            }
        })
    ];
