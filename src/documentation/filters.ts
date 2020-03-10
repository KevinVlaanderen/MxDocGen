import ignore from "ignore";
import { projects } from "mendixmodelsdk";
import IFolderBase = projects.IFolderBase;
import IModule = projects.IModule;
import IDocument = projects.IDocument;
import Folder = projects.Folder;

export interface FilterConfig {
	modulesRegex: string;
	documentIgnorePatterns: string[];
}

export const defaultFilterConfig: FilterConfig = {
	modulesRegex: ".*",
	documentIgnorePatterns: ["**"]
};

export const createRegexModuleFilter = (filter?: RegExp): ((module: IModule) => boolean) =>
	filter ? (module: IModule) => module.name.match(filter) !== null : () => true;

export const defaultModuleFilter = createRegexModuleFilter(
	new RegExp(defaultFilterConfig.modulesRegex)
);

export const createGlobDocumentFilter = (
	ignorePatterns: string[]
): ((document: IDocument) => boolean) => {
	const ig = ignore().add(ignorePatterns);
	return (document: IDocument) => {
		const path = buildDocumentPath(document);
		return !ig.ignores(path);
	};
};

export const defaultDocumentFilter = createGlobDocumentFilter(
	defaultFilterConfig.documentIgnorePatterns
);

const buildDocumentPath = (document: IDocument): string => {
	const documentPath: string[] = [document.name];

	let container = document.containerAsFolderBase;
	while (isFolder(container)) {
		documentPath.unshift(container.name);
		container = container.containerAsFolderBase;
	}

	return documentPath.join("/");
};

const isFolder = (folderbase: IFolderBase): folderbase is Folder => {
	return folderbase.structureTypeName === Folder.structureTypeName;
};
