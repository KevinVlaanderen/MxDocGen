import {Argv} from "yargs";
import {DocumentType, documentTypes} from "../documentTypes";
import {generateDocumentation} from "../documentation";
import {GlobalArguments} from "../cli";

interface GenerateCommandArguments extends GlobalArguments {
    modules: string;
    ignore: string[];
    types: DocumentType[]
}

export const commandGenerateBuilder = (yargs: Argv<GlobalArguments>) =>
    yargs.options({
        "modules": {type: "string", default: ".*"},
        "ignore": {type: "array", default: "**"},
        "types": {type: "array", choices: documentTypes, default: documentTypes}
    }).argv;

export const commandGenerateHandler = async (argv: GenerateCommandArguments) => await commandGenerateDocumentation(argv);

const commandGenerateDocumentation = async (args: GenerateCommandArguments) => {
    console.log('Generating documentation...');

    return generateDocumentation(args.client!, {
        mpk: args.mpk,
        projectId: args.projectid,
        modulesRegex: args.modules,
        ignorePatterns: args.ignore
    });
};
