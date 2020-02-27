import {IModel, projects} from "mendixmodelsdk";
import {createModuleFilter, FilterConfig} from "../filters";
import {moduleTemplateData} from "./module";
import IModule = projects.IModule;
import {TemplateData} from "../templates";

export const projectTemplateData = async (model: IModel, config: FilterConfig): Promise<TemplateData> => {
    const modules = getModules(model)
        .filter(createModuleFilter(new RegExp(config.modulesRegex)));

    return {
        Name: "Documentation",
        Modules: await Promise.all(
            modules
                .map(module => moduleTemplateData(module, config)))
    }
};

const getModules = (model: IModel): IModule[] => model.allModules();
