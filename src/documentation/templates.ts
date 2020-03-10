import path from "path";
import * as fs from "fs";
import pkgDir from "pkg-dir";

export interface TemplateConfig {
	directory: string;
	extension: string;
	main: string;
}

export interface Templates {
	main: string;
	partials: Record<string, string> | ((name: string) => string);
}

export const defaultTemplateConfig: TemplateConfig = {
	directory: path.join(pkgDir.sync(__dirname)!, "templates"),
	extension: ".html",
	main: "Main"
};

export const loadTemplates = (directory: string, extension: string, main: string): Templates => ({
	main: loadTemplate(directory, extension, main),
	partials: (partialName: string) => loadTemplate(directory, extension, partialName)
});

const loadTemplate = (directory: string, extension: string, name: string): string => {
	let cleanExtension = extension.match(/^[\.\\/]*(.*)$/)![1];
	return fs.readFileSync(path.join(directory, `${name}.${cleanExtension}`), {
		encoding: "utf8"
	});
};
