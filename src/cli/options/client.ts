import {Argv} from "yargs";

export interface ClientArguments {
    username: string;
    apikey: string;
}

export const registerClientOptions = (yargs: Argv) => yargs
    .options({
        username: {type: "string", demandOption: true, requiresArg: true},
        apikey: {type: "string", demandOption: true, requiresArg: true}
    })
    .group(["username", "apikey"], "Credentials:");
