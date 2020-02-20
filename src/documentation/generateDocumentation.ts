import * as fs from 'fs';
import {createWorkingCopy, WorkingCopyConfig} from "../sdk";
import {MendixSdkClient} from "mendixplatformsdk";
import Mustache from "mustache";
import path from "path";
import {projectTemplateData} from "./templatedata/project";
import {TemplatesConfig} from "./templates";
import {FilterConfig} from "./filters";

export interface GenerateDocumentationConfig {
    filter: FilterConfig;
    templates: TemplatesConfig;
    workingCopy: WorkingCopyConfig;
    outputDir: string;
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config.workingCopy);
    const data = await projectTemplateData(model, config.filter);

    const rendered = Mustache.render(config.templates.base, data, config.templates.partials);

    if (!fs.existsSync(config.outputDir))
        fs.mkdirSync(config.outputDir);

    fs.writeFileSync(path.join(config.outputDir, "index.html"), rendered);
};
