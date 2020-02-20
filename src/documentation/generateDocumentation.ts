import * as fs from 'fs';
import {
    createWorkingCopy,
    describeProject,
    isMicroflow,
    ProjectDescription,
    ProjectDescriptionConfig,
    WorkingCopyConfig, ModuleDescription
} from "../sdk";
import {MendixSdkClient} from "mendixplatformsdk";
import Mustache from "mustache";
import path from "path";
import {microflowTemplateData} from "./templatedata/microflows";
import {microflows} from "mendixmodelsdk";
import {v4 as uuid} from 'uuid';
import Microflow = microflows.Microflow;

interface GenerateDocumentationConfig extends WorkingCopyConfig, ProjectDescriptionConfig {
    outputDir: string;
    template: string;
    partials: {
        [name: string]: string;
    }
}

export const generateDocumentation = async (client: MendixSdkClient, config: GenerateDocumentationConfig): Promise<void> => {
    const model = await createWorkingCopy(client, config);
    const projectStructure = describeProject(model, config);

    const templateData = await generateTemplateDataForProject(projectStructure);

    console.debug(JSON.stringify(templateData, undefined, "  "));

    const rendered = Mustache.render(config.template, templateData, config.partials);

    if (!fs.existsSync(config.outputDir))
        fs.mkdirSync(config.outputDir);

    fs.writeFileSync(path.join(config.outputDir, "index.html"), rendered);
};

const generateTemplateDataForProject = async (projectStructure: ProjectDescription) => ({
    Name: "Documentation",
    Modules: await Promise.all(projectStructure.modules.map(generateTemplateDataForModule))
});

const generateTemplateDataForModule = async (module: ModuleDescription) => {
    const microflows = await Promise.all(module.documents
        .map(documentDescription => documentDescription.document)
        .filter(isMicroflow)
        .map(async microflow => microflowTemplateData(await microflow.load())));

    return {
        ID: uuid(),
        Name: module.name,
        HasMicroflows: microflows.length > 0,
        Microflows: {
            ID: uuid(),
            TypeName: Microflow.structureTypeName.split("$")[1],
            Microflows: microflows
        }
    };
};
