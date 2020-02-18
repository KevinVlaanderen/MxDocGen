import {Argv} from "yargs";
import {DocumentType, documentTypes} from "../documentTypes";
import {generateDocumentation} from "../documentation";
import {GlobalArguments} from "../cli";

interface GenerateCommandArguments extends GlobalArguments {
    modulesRegex: string;
    ignorePatterns: string[];
    types: DocumentType[]
}

export const commandGenerateBuilder = (yargs: Argv<GlobalArguments>): GlobalArguments =>
    yargs.options({
        "modules": {type: "string", default: ".*"},
        "documents": {type: "array", default: "**"},
        "types": {type: "array", choices: documentTypes, default: documentTypes}
    }).argv;

export const commandGenerateHandler = async (argv: GenerateCommandArguments) => await commandGenerateDocumentation(argv);

const commandGenerateDocumentation = async (args: GenerateCommandArguments): Promise<void> => {
    console.log('Generating documentation...');

    return generateDocumentation(args.client!, {
        mpk: args.mpk,
        projectId: args.projectId,
        modulesRegex: args.modulesRegex,
        ignorePatterns: args.ignorePatterns
    });
};
