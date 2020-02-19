import {Argv} from "yargs";
import {GlobalArguments} from "../cli";
import {DocumentType, documentTypes} from "../../sdk/projectStructure";
import {generateDocumentation} from "../../documentation/documentation";

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

    const typesConfig = args.types.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = true;
        return previousValue;
    }, {} as any);

    await generateDocumentation(args.client!, {
        mpk: args.mpk,
        projectId: args.projectid,
        branch: args.branch,
        revision: args.revision,
        workingCopyId: args.workingcopyid,
        modulesRegex: args.modules,
        ignorePatterns: args.ignore,
        types: typesConfig
    });
};
