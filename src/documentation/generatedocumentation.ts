import * as fs from 'fs';
import {MendixSdkClient} from "mendixplatformsdk";
import Mustache from "mustache";
import path from "path";
import {loadTemplates, TemplateConfig, TemplateData} from "./templates";
import {FilterConfig} from "./filters";
import {IModel} from "mendixmodelsdk";
import {openWorkingCopy, ProjectConfig} from "../sdk";

interface OutputConfig {
    directory: string;
    filename: string;
}

export interface GenerateDocumentationConfig {
    output: OutputConfig;
    filters: FilterConfig;
    templates: TemplateConfig;
    project: ProjectConfig;
    templateData: (model: IModel, filterConfig: FilterConfig) => Promise<TemplateData>;
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const filterConfig = config.filters;
    const templateConfig = config.templates;
    const workingCopyConfig = config.project;

    const templates = loadTemplates(templateConfig.directory, templateConfig.extension, templateConfig.main);
    const model = await openWorkingCopy(client, workingCopyConfig);

    const templateData = await config.templateData(model, filterConfig);

    const rendered = Mustache.render(templates.main, templateData, templates.partials);

    if (!fs.existsSync(config.output.directory))
        fs.mkdirSync(config.output.directory);

    fs.writeFileSync(path.join(config.output.directory, config.output.filename), rendered);
};
