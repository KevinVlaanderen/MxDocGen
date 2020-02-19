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

export const getProjectStructure = function (model: IModel, config: ProjectStructureConfig) {
    return getModules(model)
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
};

const getModules = (model: IModel): IModule[] => model.allModules();

const getDocuments = (module: IModule): DocumentDescription[] => getDocumentDescriptions(module);

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

const createDocumentIgnoreFilter = (ignorePatterns?: string[]): (document: DocumentDescription) => boolean => {
    const ig = ignore().add(ignorePatterns ?? []);
    return (document: DocumentDescription) => {
        const path = document.folder ? [document.folder, document.name].join("/") : document.name;
        return !ig.ignores(path);
    };
};
