import {Argv} from "yargs";
import {GlobalArguments} from "../cli";
import {
    availableDocumentTypes,
    defaultFilterConfig,
    defaultTemplateConfig,
    generateDocumentation,
    loadTemplates,
    TemplatesConfig
} from "../../documentation";

interface GenerateCommandArguments extends GlobalArguments {
    modules: string;
    ignore: string[];
    types: string[];
    template: string;
    output: string;
}


export const commandGenerateBuilder = (yargs: Argv<GlobalArguments>) => {
    const filterConfig = defaultFilterConfig();

    return yargs.options({
        "modules": {type: "string", requiresArg: true, default: filterConfig.modulesRegex},
        "ignore": {type: "array", requiresArg: true, default: filterConfig.ignorePatterns},
        "types": {type: "array", requiresArg: true, default: filterConfig.types, choices: availableDocumentTypes},
        "template": {type: "string", requiresArg: true},
        "output": {type: "string", requiresArg: true, demandOption: true}
    }).argv;
};

export const commandGenerateHandler = async (argv: GenerateCommandArguments) => await commandGenerateDocumentation(argv);

const commandGenerateDocumentation = async (args: GenerateCommandArguments) => {
    console.log('Generating documentation...');

    const typesConfig = args.types.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = true;
        return previousValue;
    }, {} as any);

    const templates: TemplatesConfig = args.template ? loadTemplates(args.template) : defaultTemplateConfig();

    await generateDocumentation(args.client!, {
        filter: {
            modulesRegex: args.modules,
            ignorePatterns: args.ignore,
            types: typesConfig
        },
        templates: templates,
        workingCopy: {
            mpk: args.mpk,
            projectId: args.projectid,
            branch: args.branch,
            revision: args.revision,
            workingCopyId: args.workingcopyid
        },
        outputDir: args.output
    });
};
