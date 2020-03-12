import { MendixSdkClient } from "mendixplatformsdk";
import { Arguments, CommandBuilder } from "yargs";
import { OutputArguments, outputOptions } from "../options/output";
import { ProjectArguments, projectOptions } from "../options/project";
import { DefaultProcessor } from "../../documentation/defaultprocessor";
import { TemplateArguments, templateOptions } from "../options/templates";
import {
	createGlobDocumentFilter,
	createRegexModuleFilter,
	FilterConfig
} from "../../documentation/filters";
import { FilterArguments, filterOptions } from "../options/filters";
import { defaultTemplateConfig, TemplateConfig } from "../../documentation/templates";
import { MpkProjectConfig, SvnProjectConfig, WorkingCopyProjectConfig } from "../../sdk/projects";
import { ClientArguments, clientOptions } from "../options/client";
import { generateDocumentation } from "../../documentation/generatedocumentation";
import { OutputConfig } from "../../documentation/output";

interface GenerateCommandArguments
	extends Arguments,
		ClientArguments,
		ProjectArguments,
		FilterArguments,
		TemplateArguments,
		OutputArguments {}

export const command = "generate";
export const describe = "Generate documentation";

export const builder: CommandBuilder = {
	...clientOptions,
	...filterOptions,
	...outputOptions,
	...projectOptions,
	...templateOptions
};

export const handler = async (args: GenerateCommandArguments) => {
	const client = new MendixSdkClient(args.username, args.apikey);

	const projectConfig = getProjectConfig(args);
	const filterConfig = getFilterConfig(args);
	const templateConfig = getTemplateConfig(args);
	const outputConfig = getOutputConfig(args);

	const moduleFilter = createRegexModuleFilter(new RegExp(filterConfig.modulesRegex));
	const documentFilter = createGlobDocumentFilter(filterConfig.documentIgnorePatterns ?? []);

	const processor = new DefaultProcessor(moduleFilter, documentFilter);

	if (!projectConfig) throw new Error("Invalid project configuration");

	await generateDocumentation(client, {
		project: projectConfig,
		filters: filterConfig,
		templates: templateConfig,
		output: outputConfig,
		processor
	});
};

const getProjectConfig: (
	args: GenerateCommandArguments
) => MpkProjectConfig | SvnProjectConfig | WorkingCopyProjectConfig | undefined = args =>
	args.mpk
		? {
				mpk: args.mpk
		  }
		: args.workingcopyid
		? {
				workingCopyId: args.workingcopyid
		  }
		: args.projectid && args.branch && args.revision
		? {
				projectId: args.projectid,
				branch: args.branch,
				revision: args.revision
		  }
		: undefined;

const getFilterConfig: (args: GenerateCommandArguments) => FilterConfig = args => ({
	modulesRegex: args.modules,
	documentIgnorePatterns: args.ignore
});

const getTemplateConfig: (args: GenerateCommandArguments) => TemplateConfig = args => ({
	directory: args.templatedir ?? defaultTemplateConfig.directory,
	extension: args.templateext ?? defaultTemplateConfig.extension,
	mainTemplate: args.maintemplate ?? defaultTemplateConfig.mainTemplate
});

const getOutputConfig: (args: GenerateCommandArguments) => OutputConfig = args => ({
	directory: args.outputdir,
	filename: args.outputfile
});
