import {IModel, projects} from "mendixmodelsdk";
import IDocument = projects.IDocument;
import IModule = projects.IModule;
import IFolderBase = projects.IFolderBase;

export type DocumentType = 'microflows' | 'javaactions';
export const documentTypes: ReadonlyArray<DocumentType> = ['microflows', 'javaactions'];

export interface Paths {
    [name: string]: string;
}

export const getModules = (model: IModel): IModule[] => model.allModules();
export const getDocuments = (folderBase: IFolderBase): IDocument[] => [
    ...folderBase.documents,
    ...folderBase.folders.flatMap(folder => getDocuments(folder))
];

export const buildDocumentPaths = (folderBase: IFolderBase, path?: string): Paths =>
    [
        ...folderBase.documents
            .map(document => ({
                [document.qualifiedName!]: path ? [path, document.name].join("/") : document.name
            })),
        ...folderBase.folders
            .map(folder =>
                buildDocumentPaths(folder, path ? [path, folder.name].join("/") : folder.name))
    ].reduce((obj, item) =>
        Object.assign(obj, item), {});
