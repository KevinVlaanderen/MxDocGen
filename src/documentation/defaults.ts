import path from "path";
import pkgDir from "pkg-dir";
import {loadTemplates, TemplatesConfig} from "./templates";
import {javaactions, microflows} from "mendixmodelsdk";
import {lowerTypeName} from "../sdk";
import Microflow = microflows.Microflow;
import JavaAction = javaactions.JavaAction;

const defaultTemplatePath = path.join(pkgDir.sync(__dirname)!, "templates", "Main.html");

export const defaultTemplateConfig = (): TemplatesConfig => loadTemplates(defaultTemplatePath);

export const defaultFilterConfig = () => ({
    modulesRegex: ".*",
    ignorePatterns: ["**"],
    types: availableDocumentTypes
});

export const availableDocumentTypes = [Microflow, JavaAction].map(documentType => lowerTypeName(documentType));
