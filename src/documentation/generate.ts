import * as fs from "fs";
import { MendixSdkClient } from "mendixplatformsdk";
import path from "path";
import { OutputConfig } from "./output";
import { Processor } from "./processor";
import { render, TemplateConfig, TemplateData } from "./templates";
import {
	MpkProjectConfig,
	openWorkingCopy,
	SvnProjectConfig,
	WorkingCopyProjectConfig
} from "../sdk/projects";
import { FilterConfig } from "./filters";

export interface GenerateDocumentationConfig {
	output: OutputConfig;
	filters: FilterConfig;
	templates: TemplateConfig;
	project: MpkProjectConfig | SvnProjectConfig | WorkingCopyProjectConfig;
	processor: Processor<TemplateData>;
}

export const generate = async (
	client: MendixSdkClient,
	config: GenerateDocumentationConfig
): Promise<void> => {
	const templateConfig = config.templates;
	const workingCopyConfig = config.project;

	const model = await openWorkingCopy(client, workingCopyConfig);
	const templateData = await config.processor.process(model);

	const output = render(templateConfig, templateData);

	if (!fs.existsSync(config.output.directory)) fs.mkdirSync(config.output.directory);

	fs.writeFileSync(path.join(config.output.directory, config.output.filename), output);
};
