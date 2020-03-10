import ignore from "ignore";
import { javaactions, microflows, projects } from "mendixmodelsdk";
import IFolderBase = projects.IFolderBase;
import Microflow = microflows.Microflow;
import JavaAction = javaactions.JavaAction;
import IModule = projects.IModule;
import IDocument = projects.IDocument;
import Folder = projects.Folder;

export interface FilterConfig {
	modulesRegex: string;
	ignorePatterns: string[];
	types: string[];
}

export const availableDocumentTypes = [Microflow, JavaAction];

export const defaultFilterConfig: FilterConfig = {
	modulesRegex: ".*",
	ignorePatterns: ["**"],
	types: availableDocumentTypes.map(documentType =>
		documentType.structureTypeName.split("$")[1].toLowerCase()
	)
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
export const defaultDocumentFilter = createGlobDocumentFilter(defaultFilterConfig.ignorePatterns);

export const createDocumentTypeFilter = (types: string[]): ((document: IDocument) => boolean) => {
	return (document: IDocument) =>
		types.includes(document.structureTypeName.split("$")[1].toLowerCase());
};
export const defaultDocumentTypeFilter = createDocumentTypeFilter(defaultFilterConfig.types);

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
