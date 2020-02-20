import {DocumentType, Paths} from "../sdk";
import ignore from "ignore";
import {projects} from "mendixmodelsdk";
import IModule = projects.IModule;
import IDocument = projects.IDocument;

export interface FilterConfig {
    modulesRegex: string;
    ignorePatterns: string[];
    types: {
        [type in DocumentType]: boolean;
    }
}

export const createDocumentFilter = (ignorePatterns: string[], paths: Paths): (document: projects.IDocument) => boolean => {
    const ig = ignore().add(ignorePatterns);
    return (document: IDocument) => !ig.ignores(paths[document.qualifiedName!]);
};

export const createModuleFilter = (filter?: RegExp): (module: IModule) => boolean =>
    filter ?
        (module: IModule) => module.name.match(filter) !== null :
        () => true;
