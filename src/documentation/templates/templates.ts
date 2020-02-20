import path from "path";
import pkgDir from "pkg-dir";
import * as fs from "fs";

const readTemplates = (templatesDir: string) =>
    fs.readdirSync(templatesDir)
        .filter(relativePath => fs.statSync(path.join(templatesDir, relativePath)).isFile())
        .map(relativePath => ({
            name: relativePath.split(".")[0],
            template: fs.readFileSync(path.join(templatesDir, relativePath), {encoding: "utf8"})
        }))
        .reduce((obj: any, value) => {
            obj[value.name] = value.template;
            return obj;
        }, {});

export const defaultPartials = readTemplates(path.join(pkgDir.sync(__dirname)!, "templates"));
export const defaultTemplate = defaultPartials.Main;
