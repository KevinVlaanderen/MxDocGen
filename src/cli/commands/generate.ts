import {Argv} from "yargs";
import {GlobalArguments} from "../cli";
import {DocumentType, documentTypes} from "../../sdk";
import {generateDocumentation, loadDefaultTemplates, loadTemplates, TemplatesConfig} from "../../documentation";

interface GenerateCommandArguments extends GlobalArguments {
    modules: string;
    ignore: string[];
    types: DocumentType[];
    template: string;
    output: string;
}

export const commandGenerateBuilder = (yargs: Argv<GlobalArguments>) =>
    yargs.options({
        "modules": {type: "string", default: ".*"},
        "ignore": {type: "array", default: "**"},
        "types": {type: "array", choices: documentTypes, default: documentTypes},
        "template": {type: "string"},
        "output": {type: "string", demandOption: true, requiresArg: true}
    }).argv;

export const commandGenerateHandler = async (argv: GenerateCommandArguments) => await commandGenerateDocumentation(argv);

const commandGenerateDocumentation = async (args: GenerateCommandArguments) => {
    console.log('Generating documentation...');

    const typesConfig = args.types.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = true;
        return previousValue;
    }, {} as any);

    const templates: TemplatesConfig = args.template ? loadTemplates(args.template) : loadDefaultTemplates();

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
