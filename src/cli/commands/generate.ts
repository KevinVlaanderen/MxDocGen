import {Argv} from "yargs";
import {
    availableDocumentTypes,
    defaultFilterConfig,
    defaultTemplateConfig,
    defaultTemplateData,
    generateDocumentation
} from "../../documentation";
import {MendixSdkClient} from "mendixplatformsdk";
import {GlobalArguments} from "../cli";
import {ClientArguments, ProjectArguments, setClientOptions, setProjectOptions} from "../options";

interface FilterArguments {
    modules: string;
    ignore: string[];
    types: string[];
}

interface TemplateArguments {
    templateDirectory: string;
    templateExtension: string;
    templateMain: string;
}

interface GenerateCommandArguments extends GlobalArguments, ClientArguments, ProjectArguments, FilterArguments, TemplateArguments {
    output: string;
}

export const addGenerateCommand = (yargs: Argv) =>
    yargs
        .command("generate <target>", "Generate documentation",
            generateCommandBuilder,
            generateCommandHandler);

const generateCommandBuilder = (yargs: Argv) => {
    yargs = setClientOptions(yargs);
    yargs = setProjectOptions(yargs);

    return yargs
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
};

const generateCommandHandler = async (args: GenerateCommandArguments) => {
    const client = new MendixSdkClient(args.username, args.apikey);

    await generateDocumentation(client, {
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
