import {Argv} from "yargs";
import {availableDocumentTypes, defaultFilterConfig} from "../../documentation/filters";

export interface FilterArguments {
    modules: string;
    ignore: string[];
    types: string[];
}

export const registerFilterOptions = (yargs: Argv) => yargs
    .options({
        modules: {type: "string", requiresArg: true, default: defaultFilterConfig.modulesRegex},
        ignore: {type: "array", requiresArg: true, default: defaultFilterConfig.ignorePatterns},
        types: {
            type: "array",
            requiresArg: true,
            default: defaultFilterConfig.types,
            choices: availableDocumentTypes.map(value => value.structureTypeName.split("$")[1].toLowerCase())
        }
    })
    .group(["modules", "ignore", "types"], "Filters:");
