import {Argv} from "yargs";
import {DocumentType, documentTypes} from "../documentTypes";
import {IModel} from "mendixmodelsdk";
import {generateDocumentation} from "../documentation";
import {GlobalArguments} from "../index";

interface GenerateCommandArguments extends GlobalArguments {
    modules: string;
    documents: string[];
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

    let model: IModel | undefined;

    if (args.mpk) {
        model = await args.client!.model().createAndOpenWorkingCopy({
            name: args.mpk,
            template: args.mpk
        });
    } else {
        throw new Error("No project configured");
    }

    return generateDocumentation(model, {
        modules: args.modules,
        documents: args.documents
    });
};
