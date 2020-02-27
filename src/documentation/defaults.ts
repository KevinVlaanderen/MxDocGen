import path from "path";
import pkgDir from "pkg-dir";
import {TemplateConfig} from "./templates";
import {javaactions, microflows} from "mendixmodelsdk";
import {lowerTypeName} from "../sdk";
import {projectTemplateData} from "./defaulttemplatedata";
import {FilterConfig} from "./filters";
import Microflow = microflows.Microflow;
import JavaAction = javaactions.JavaAction;

export const availableDocumentTypes = [Microflow, JavaAction].map(documentType => lowerTypeName(documentType));

export const defaultFilterConfig: FilterConfig = {
    modulesRegex: ".*",
    ignorePatterns: ["**"],
    types: availableDocumentTypes
};

export const defaultTemplateConfig: TemplateConfig = {
    directory: path.join(pkgDir.sync(__dirname)!, "templates"),
    extension: ".html",
    main: "Main"
};

export const defaultTemplateDataProvider = projectTemplateData;
