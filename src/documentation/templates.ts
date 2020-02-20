import path from "path";
import pkgDir from "pkg-dir";
import * as fs from "fs";
import {IAbstractUnit} from "mendixmodelsdk";

export type TemplateDataFactory<T extends IAbstractUnit> = (unit: T) => Promise<TemplateData>;

export interface TemplatesConfig {
    base: string;
    partials: {
        [name: string]: string;
    }
}

export interface TemplateData {
    [property: string]: string | boolean | TemplateData | Array<string | TemplateData>;
}

const defaultTemplate = path.join(pkgDir.sync(__dirname)!, "templates", "Main.html");

export const loadDefaultTemplates = (): TemplatesConfig => loadTemplates(defaultTemplate);

export const loadTemplates = (templatePath: string): TemplatesConfig => ({
    base: fs.readFileSync(templatePath, {encoding: "utf8"}),
    partials: loadPartials(templatePath)
});

const loadPartials = (templatePath: string) =>
    fs.readdirSync(path.dirname(templatePath))
        .filter(relativePath => fs.statSync(path.join(path.dirname(templatePath), relativePath)).isFile())
        .filter(relativePath => path.join(path.dirname(templatePath), relativePath) !== templatePath)
        .reduce((obj: any, relativePath) => {
            const name = relativePath.split(".")[0];
            obj[name] = fs.readFileSync(path.join(path.dirname(templatePath), relativePath), {encoding: "utf8"});
            return obj;
        }, {});

