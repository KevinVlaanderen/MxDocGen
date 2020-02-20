import * as fs from 'fs';
import {getProjectStructure, isMicroflow, ProjectStructureConfig} from "../sdk/projectStructure";
import {loadAsPromise, MendixSdkClient} from "mendixplatformsdk";
import {createWorkingCopy, WorkingCopyConfig} from "../sdk/workingCopy";
import Mustache from "mustache";
import path from "path";
import {microflows} from "mendixmodelsdk";
import {microflowPropertyMapping} from "./microflows";
import {getMappedProperties} from "./propertyMapping";
import IMicroflow = microflows.IMicroflow;

interface GenerateDocumentationConfig extends WorkingCopyConfig, ProjectStructureConfig {
    outputDir: string;
}

const readTemplates = (templatesDir: string) =>
    fs.readdirSync(templatesDir)
        .map(file => ({
            name: file.split(".")[0],
            template: fs.readFileSync(path.join(templatesDir, file), {encoding: "utf8"})
        }))
        .reduce((obj: any, value) => {
            obj[value.name] = value.template;
            return obj;
        }, {});


export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);
    const projectStructure = getProjectStructure(model, config);

    const templateData = {
        title: "Documentation",
        modules: await Promise.all(projectStructure.modules.map(async module => {
            const microflows = await Promise.all(module.documents
                .filter(isMicroflow)
                .map(microflow => microflow.document as IMicroflow)
                .map(microflow => loadAsPromise(microflow))
                .map(async microflow => getMappedProperties(await microflow, microflowPropertyMapping)));

            return {
                name: module.name,
                hasMicroflows: microflows.length > 0,
                microflows: microflows
            };
        }))
    };

    console.debug(JSON.stringify(templateData, undefined, "  "));

    const templates = readTemplates(path.join(process.cwd(), "templates"));

    const rendered = Mustache.render(templates.index, templateData, templates);

    if (!fs.existsSync(config.outputDir))
        fs.mkdirSync(config.outputDir);

    fs.writeFileSync(path.join(config.outputDir, "index.html"), rendered);
};
