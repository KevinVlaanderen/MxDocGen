import os from "os";
import fs from "fs-extra";
import {Argv} from "yargs";
import path from "path";
import {GlobalArguments} from "../cli";
import {defaultTemplateConfig} from "../../documentation/templates";

interface CopyTemplatesCommandArguments extends GlobalArguments {
    target: string;
}

export const registerCopyTemplatesCommand = (yargs: Argv) =>
    yargs
        .command("copy-templates <target>", "Copy the default templates to another location for modification",
            copyTemplatesCommandBuilder,
            copyTemplatesCommandHandler);

const copyTemplatesCommandBuilder = (yargs: Argv) =>
    yargs
        .positional("target", {
            describe: "Target directory for the templates",
            type: "string"
        })
        .argv;

const copyTemplatesCommandHandler = async (args: CopyTemplatesCommandArguments) => {
    const targetDirectory = args.target.startsWith("~/")
        ? path.join(os.homedir(), args.target.slice(2))
        : args.target;

    fs.ensureDirSync(targetDirectory);

    fs.copySync(defaultTemplateConfig.directory, targetDirectory);
};
