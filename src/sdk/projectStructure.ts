import {IModel, projects} from "mendixmodelsdk";
import ignore from "ignore";
import {matchesRegex} from "../util/filters";
import IDocument = projects.IDocument;
import IModule = projects.IModule;
import IFolderBase = projects.IFolderBase;

export type DocumentType = 'microflows' | 'javaactions';
export const documentTypes: ReadonlyArray<DocumentType> = ['microflows', 'javaactions'];

export interface ProjectStructureConfig {
    modulesRegex: string;
    ignorePatterns: string[];
    types: {
        [type in DocumentType]: boolean;
    }
}

export interface ProjectStructure {
    modules: ModuleDescription[];
}

export interface ModuleDescription {
    name: string;
    documents: DocumentDescription[];
}

export interface DocumentDescription {
    folder?: string;
    name: string;
    document: IDocument;
    type: string;
}

export const getProjectStructure = (model: IModel, config: ProjectStructureConfig) => ({
    modules: getModules(model)
        .filter(module => matchesRegex(module.name, new RegExp(config.modulesRegex)))
        .map(module => ({
            name: module.name,
            documents: getDocuments(module)
                .filter(createDocumentIgnoreFilter(config.ignorePatterns))
        }))
});

const getModules = (model: IModel): IModule[] => model.allModules();

const getDocuments = (module: IModule): DocumentDescription[] => getDocumentDescriptions(module);

const getDocumentDescriptions = (folderBase: IFolderBase, path?: string): Array<DocumentDescription> =>
    [
        ...folderBase.folders.flatMap(folder => getDocumentDescriptions(folder, path ? [path, folder.name].join("/") : folder.name)),
        ...folderBase.documents.map(document => {
            return {
                folder: path,
                name: document.name,
                type: document.structureTypeName,
                document: document
            }
        })
    ];

const createDocumentIgnoreFilter = (ignorePatterns?: string[]): (document: DocumentDescription) => boolean => {
    const ig = ignore().add(ignorePatterns ?? []);
    return (document: DocumentDescription) => {
        const path = document.folder ? [document.folder, document.name].join("/") : document.name;
        return !ig.ignores(path);
    };
};
