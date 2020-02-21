import path from "path";
import * as fs from "fs";
import {IAbstractUnit} from "mendixmodelsdk";

export type TemplateDataFactory<T extends IAbstractUnit> = (unit: T) => Promise<TemplateData>;

export interface TemplateConfig {
    directory: string;
    extension: string;
    main: string;
}

export interface Templates {
    main: string;
    partials: Record<string, string> | ((name: string) => string);
}

export interface TemplateData {
    [property: string]: string | boolean | TemplateData | Array<string | TemplateData>;
}

export const loadTemplates = (directory: string, extension: string, main: string): Templates => ({
    main: loadTemplate(directory, extension, main),
    partials: (partialName: string) => loadTemplate(directory, extension, partialName)
});

const loadTemplate = (directory: string, extension: string, name: string): string => {
    let cleanExtension = extension.match(/^[\.\\/]*(.*)$/)![1];
    return fs.readFileSync(path.join(directory, `${name}.${cleanExtension}`), {encoding: "utf8"});
};
