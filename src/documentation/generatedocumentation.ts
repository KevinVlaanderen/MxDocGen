import * as fs from 'fs';
import {openWorkingCopy, WorkingCopyConfig} from "../sdk";
import {MendixSdkClient} from "mendixplatformsdk";
import Mustache from "mustache";
import path from "path";
import {loadTemplates, TemplateConfig, TemplateData} from "./templates";
import {FilterConfig} from "./filters";
import {IModel} from "mendixmodelsdk";

export interface GenerateDocumentationConfig {
    outputDir: string;
    filterConfig: FilterConfig;
    templateConfig: TemplateConfig;
    workingCopyConfig: WorkingCopyConfig;
    templateData: (model: IModel, filterConfig: FilterConfig) => Promise<TemplateData>;
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const filterConfig = config.filterConfig;
    const templateConfig = config.templateConfig;
    const workingCopyConfig = config.workingCopyConfig;

    const templates = loadTemplates(templateConfig.directory, templateConfig.extension, templateConfig.main);
    const model = await openWorkingCopy(client, workingCopyConfig);

    const templateData = await config.templateData(model, filterConfig);

    const rendered = Mustache.render(templates.main, templateData, templates.partials);

    if (!fs.existsSync(config.outputDir))
        fs.mkdirSync(config.outputDir);

    fs.writeFileSync(path.join(config.outputDir, "index.html"), rendered);
};
