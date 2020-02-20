import {IModel} from "mendixmodelsdk";
import {TemplateData} from "./templateData";
import {getModules} from "../../sdk";
import {createModuleFilter} from "../filter";
import {GenerateDocumentationConfig} from "../generateDocumentation";
import {moduleTemplateData} from "./module";

export const projectTemplateData = async (model: IModel, config: GenerateDocumentationConfig): Promise<TemplateData> => {
    const modules = getModules(model)
        .filter(createModuleFilter(new RegExp(config.modulesRegex)));

    return {
        Name: "Documentation",
        Modules: await Promise.all(
            modules
                .map(module => moduleTemplateData(module, config)))
    }
};
