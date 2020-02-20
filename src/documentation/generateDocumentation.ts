import * as fs from 'fs';
import {createWorkingCopy, WorkingCopyConfig} from "../sdk";
import {MendixSdkClient} from "mendixplatformsdk";
import Mustache from "mustache";
import path from "path";
import {FilterConfig} from "./filter";
import {projectTemplateData} from "./templatedata/project";

export interface GenerateDocumentationConfig extends WorkingCopyConfig, FilterConfig {
    outputDir: string;
    template: string;
    partials: {
        [name: string]: string;
    }
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);
    const data = await projectTemplateData(model, config);

    const rendered = Mustache.render(config.template, data, config.partials);

    if (!fs.existsSync(config.outputDir))
        fs.mkdirSync(config.outputDir);

    fs.writeFileSync(path.join(config.outputDir, "index.html"), rendered);
};
