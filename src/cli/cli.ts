import {commandGenerateBuilder, commandGenerateHandler} from "./commands/generate";
import {mendixSdkClientMiddleware} from "./middleware/mendix";
import {MendixSdkClient} from "mendixplatformsdk";
import yargs = require('yargs');

export interface ProjectArguments {
    mpk?: string;
    projectid?: string;
    revision?: number;
    branch?: string;
}

export interface ClientCredentialsArguments {
    username: string;
    apikey: string;
}

export interface GlobalArguments extends ClientCredentialsArguments, ProjectArguments {
    client?: MendixSdkClient;
}

yargs
    .options({
        username: { type: "string", demandOption: true, requiresArg: true },
        apikey: { type: "string", demandOption: true, requiresArg: true },
        mpk: { type: "string", conflicts: "projectId", requiresArg: true },
        projectid: { type: "string", conflicts: "mpk", requiresArg: true, implies: ["revision", "branch"] },
        revision: { type: "number", requiresArg: true },
        branch: { type: "string", requiresArg: true }
    })
    .group(["username", "apikey"], "Credentials:")
    .group(["mpk", "projectid", "revision", "branch"], "Project:")
    .middleware(mendixSdkClientMiddleware)
    .command('generate', 'generate documentation', commandGenerateBuilder, commandGenerateHandler)
    .argv;
