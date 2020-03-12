import path from "path";
import * as fs from "fs";
import pkgDir from "pkg-dir";
import Mustache from "mustache";

export interface TemplateConfig {
	directory: string;
	extension: string;
	mainTemplate: string;
}

export interface TemplateData {
	[property: string]: string | number | boolean | undefined | TemplateData | Array<TemplateData>;
}

export const defaultTemplateConfig: TemplateConfig = {
	directory: path.join(pkgDir.sync(__dirname)!, "templates"),
	extension: ".html",
	mainTemplate: "Main"
};

export const render = (config: TemplateConfig, templateData: TemplateData): string => {
	const templates = loadTemplates(config.directory, config.extension, config.mainTemplate);

	return Mustache.render(templates.main, templateData, templates.partials);
};

const loadTemplates = (directory: string, extension: string, main: string) => ({
	main: loadTemplate(directory, extension, main),
	partials: (partialName: string) => loadTemplate(directory, extension, partialName)
});

const loadTemplate = (directory: string, extension: string, name: string): string => {
	const cleanExtension = extension.match(/^[.\\/]*(.*)$/)![1];
	return fs.readFileSync(path.join(directory, `${name}.${cleanExtension}`), {
		encoding: "utf8"
	});
};
