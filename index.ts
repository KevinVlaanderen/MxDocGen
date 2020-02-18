import {MendixSdkClient} from 'mendixplatformsdk';
import {commandGenerateBuilder, commandGenerateHandler} from "./commands/generate";
import {mendixSdkClientMiddleware} from "./middleware/mendix";
import yargs = require('yargs');

export interface ProjectArguments {
    mpk?: string;
    projectId?: string;
}

export interface ClientArguments {
    username: string;
    apikey: string;
    client?: MendixSdkClient;
}

export interface GlobalArguments extends ClientArguments, ProjectArguments {}

yargs
    .options({
        username: { type: "string", demandOption: true, requiresArg: true },
        apikey: { type: "string", demandOption: true, requiresArg: true },
        mpk: { type: "string", conflicts: "projectId", requiresArg: true },
        projectId: { type: "string", conflicts: "mpk", requiresArg: true }
    })
    .command('generate', 'generate documentation', commandGenerateBuilder, commandGenerateHandler)
    .middleware(mendixSdkClientMiddleware)
    .argv;

