import * as fs from 'fs';
import {createWorkingCopy, WorkingCopyConfig} from "../sdk";
import {MendixSdkClient} from "mendixplatformsdk";
import Mustache from "mustache";
import path from "path";
import {projectTemplateData} from "./templatedata/project";
import {TemplateConfig} from "./templates";
import {FilterConfig} from "./filters";
import {projects} from "mendixmodelsdk";
import IFolderBase = projects.IFolderBase;

export interface GenerateDocumentationConfig extends FilterConfig, TemplateConfig, WorkingCopyConfig {
    outputDir: string;
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);
    const data = await projectTemplateData(model, config);

    const rendered = Mustache.render(config.template, data, config.partials);

    if (!fs.existsSync(config.outputDir))
        fs.mkdirSync(config.outputDir);

    fs.writeFileSync(path.join(config.outputDir, "index.html"), rendered);
};
