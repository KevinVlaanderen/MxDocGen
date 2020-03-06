import ignore from "ignore";
import {javaactions, microflows, projects} from "mendixmodelsdk";
import {lowerTypeName} from "../sdk";
import IModule = projects.IModule;
import IDocument = projects.IDocument;
import IFolderBase = projects.IFolderBase;
import Microflow = microflows.Microflow;
import JavaAction = javaactions.JavaAction;

export interface FilterConfig {
    modulesRegex: string;
    ignorePatterns: string[];
    types: string[]
}

interface Paths {
    [name: string]: string;
}

export const availableDocumentTypes = [Microflow, JavaAction].map(documentType => lowerTypeName(documentType));

export const defaultFilterConfig: FilterConfig = {
    modulesRegex: ".*",
    ignorePatterns: ["**"],
    types: availableDocumentTypes
};

export const createDocumentFilter = (ignorePatterns: string[], paths: Paths): (document: projects.IDocument) => boolean => {
    const ig = ignore().add(ignorePatterns);
    return (document: IDocument) => !ig.ignores(paths[document.qualifiedName!]);
};

export const createModuleFilter = (filter?: RegExp): (module: IModule) => boolean =>
    filter ?
        (module: IModule) => module.name.match(filter) !== null :
        () => true;

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
