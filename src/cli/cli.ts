import {commandGenerateBuilder, commandGenerateHandler} from "./commands/generate";
import {mendixSdkClientMiddleware} from "./middleware/mendix";
import {MendixSdkClient} from "mendixplatformsdk";
import yargs = require('yargs');
import * as fs from "fs";

export interface ProjectArguments {
    mpk?: string;
    projectid?: string;
    revision?: number;
    branch?: string;
    workingcopyid?: string;
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
        mpk: { type: "string", requiresArg: true },
        projectid: { type: "string", requiresArg: true },
        revision: { type: "number", requiresArg: true },
        branch: { type: "string", requiresArg: true },
        workingcopyid: { type: "string", requiresArg: true }
    })
    .conflicts({
        mpk: ["projectid", "workingcopyid"],
        projectid: ["mpk", "workingcopyid"],
        workingcopyid: ["mpk", "projectid"]
    })
    .implies({
        projectid: ["revision", "branch"],
        revision: "projectid",
        branch: "projectid"
    })
    .group(["username", "apikey"], "Credentials:")
    .group(["mpk", "projectid", "revision", "branch", "workingcopyid"], "Project:")
    .config("config",  configPath => JSON.parse(fs.readFileSync(configPath, "utf-8")))
    .middleware(mendixSdkClientMiddleware)
    .command('generate', 'Generate documentation', commandGenerateBuilder, commandGenerateHandler)
    .demandCommand(1, 'You need at least one command before moving on')
    .argv;
