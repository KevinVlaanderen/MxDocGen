import * as fs from 'fs';
import {
    DocumentDescription,
    getProjectStructure,
    ProjectStructure,
    ProjectStructureConfig
} from "../sdk/projectStructure";
import {MendixSdkClient} from "mendixplatformsdk";
import {createWorkingCopy, WorkingCopyConfig} from "../sdk/workingCopy";
import Mustache from "mustache";
import path from "path";
import {microflowPropertyMapping} from "./microflows";
import {getMappedProperties} from "./propertyMapping";
import {isMicroflow} from "../sdk/documents";

interface GenerateDocumentationConfig extends WorkingCopyConfig, ProjectStructureConfig {
    outputDir: string;
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);
    const projectStructure = getProjectStructure(model, config);
    const templateData = await generateTemplateDataForProject(projectStructure);
    const templates = readTemplates(path.join(process.cwd(), "templates"));

    console.debug(JSON.stringify(templateData, undefined, "  "));

    const rendered = Mustache.render(templates.index, templateData, templates);

    if (!fs.existsSync(config.outputDir))
        fs.mkdirSync(config.outputDir);

    fs.writeFileSync(path.join(config.outputDir, "index.html"), rendered);
};

const generateTemplateDataForProject = async (projectStructure: ProjectStructure) => ({
    title: "Documentation",
    modules: await Promise.all(projectStructure.modules.map(generateTemplateDataForModule))
});

const generateTemplateDataForModule = async (module: { documents: DocumentDescription[]; name: string }) => {
    const microflows = await Promise.all(module.documents
        .map(documentDescription => documentDescription.document)
        .filter(isMicroflow)
        .map(microflow => getMappedProperties(microflow, microflowPropertyMapping)));

    return {
        name: module.name,
        hasMicroflows: microflows.length > 0,
        microflows: microflows
    };
};

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
