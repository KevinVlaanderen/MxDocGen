import {Argv} from "yargs";
import {GlobalArguments} from "../cli";
import {
    availableDocumentTypes,
    defaultFilterConfig,
    defaultTemplateConfig,
    defaultTemplateData,
    generateDocumentation
} from "../../documentation";

interface GenerateCommandArguments extends GlobalArguments {
    modules: string;
    ignore: string[];
    types: string[];
    templateDirectory: string;
    templateExtension: string;
    templateMain: string;
    output: string;
}

export const commandGenerateBuilder = (yargs: Argv<GlobalArguments>) =>
    yargs
        .options({
            modules: {type: "string", requiresArg: true, default: defaultFilterConfig.modulesRegex},
            ignore: {type: "array", requiresArg: true, default: defaultFilterConfig.ignorePatterns},
            types: {
                type: "array",
                requiresArg: true,
                default: defaultFilterConfig.types,
                choices: availableDocumentTypes
            },
            templatedir: {type: "string", requiresArg: true},
            templateext: {type: "string", requiresArg: true},
            templatemain: {type: "string", requiresArg: true},
            output: {type: "string", requiresArg: true, demandOption: true}
        })
        .implies({
            templatedir: ["templateext", "templatemain"],
            templateext: ["templatedir", "templatemain"],
            templatemain: ["templatedir", "templateext"]
        })
        .argv;

export const commandGenerateHandler = async (args: GenerateCommandArguments) => {
    console.log('Generating documentation...');

    await generateDocumentation(args.client!, {
        outputDir: args.output,
        filterConfig: {
            modulesRegex: args.modules,
            ignorePatterns: args.ignore,
            types: args.types
        },
        templateConfig: {
            directory: args.templateDirectory ?? defaultTemplateConfig.directory,
            extension: args.templateExtension ?? defaultTemplateConfig.extension,
            main: args.templateMain ?? defaultTemplateConfig.main
        },
        workingCopyConfig: {
            mpk: args.mpk,
            projectId: args.projectid,
            branch: args.branch,
            revision: args.revision,
            workingCopyId: args.workingcopyid
        },
        templateData: defaultTemplateData
    });
};
