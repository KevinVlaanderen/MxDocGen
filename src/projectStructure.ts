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

export const logProjectStructure = (projectStructure: ProjectStructure) =>
    Object.keys(projectStructure).forEach(moduleName => {
        console.debug(moduleName);

        const moduleStructure = projectStructure[moduleName];

        moduleStructure.forEach(document => {
            const path = document.folder ? [document.folder, document.name].join("/") : document.name;
            console.debug(`   ${path}`);
        })
    });

export const getModules = (model: IModel): IModule[] => model.allModules();

export const getFilteredModules = (model: IModel, filter?: RegExp): IModule[] =>
    getModules(model)
        .filter(module => filter ? module.name.match(filter) : true);

export const getDocuments = (module: IModule): DocumentDescription[] => getDocumentDescriptions(module);

export const getFilteredDocuments = (module: IModule, ignorePatterns?: string[]): DocumentDescription[] => {
    const documents = getDocuments(module);

    if (ignorePatterns) {
        const filterFn = ignore().add(ignorePatterns).createFilter();
        return documents.filter(documentDescription => {
            const path = documentDescription.folder
                ? [documentDescription.folder, documentDescription.name].join("/")
                : documentDescription.name;
            return filterFn(path);
        });
    }

    return documents;
};

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
