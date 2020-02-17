import { MendixSdkClient, OnlineWorkingCopy } from 'mendixplatformsdk';
import { domainmodels } from 'mendixmodelsdk';

import minimist from "minimist";
import {Config} from "./config";

const config: Config = require("./config.json");

const args = minimist(process.argv.slice(2), {
    string: "path"
});

const username = config.sdk.username;
const apikey = config.sdk.apikey;
const client = new MendixSdkClient(username, apikey);

async function generateDocumentation(path: string) {
    console.log(path);

    const project = await client.model().createAndOpenWorkingCopy({
        name: path,
        template: path
    });

    let moduleRegex: RegExp;
    if (config.project?.modulePattern)
        moduleRegex = new RegExp(config.project.modulePattern);

    const modules = project.allModules().filter(module => moduleRegex ? module.name.match(moduleRegex) : true);



    await project.deleteWorkingCopy();
}

generateDocumentation(args.path);
