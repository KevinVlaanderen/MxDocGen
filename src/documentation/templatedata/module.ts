import {v4 as uuid} from "uuid";
import {microflows, projects} from "mendixmodelsdk";
import {buildDocumentPaths, createDocumentFilter, FilterConfig} from "../filters";
import {microflowTemplateData} from "./microflow";
import {TemplateData} from "../templates";
import {isMicroflow, typeName} from "../../sdk";
import IModule = projects.IModule;
import Microflow = microflows.Microflow;
import IFolderBase = projects.IFolderBase;
import IDocument = projects.IDocument;

export const moduleTemplateData = async (module: IModule, config: FilterConfig): Promise<TemplateData> => {
    const filteredDocuments = getDocuments(module)
        .filter(createDocumentFilter(config.ignorePatterns ?? [], buildDocumentPaths(module)));

    const microflows = await Promise.all(
        filteredDocuments
            .filter(isMicroflow)
            .map(microflowTemplateData));

    return {
        ID: uuid(),
        Name: module.name,
        HasMicroflows: microflows.length > 0,
        Microflows: {
            ID: uuid(),
            TypeName: typeName(Microflow),
            Microflows: microflows
        }
    };
};

const getDocuments = (folderBase: IFolderBase): IDocument[] => [
    ...folderBase.documents,
    ...folderBase.folders.flatMap(folder => getDocuments(folder))
];
