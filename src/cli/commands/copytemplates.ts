import os from "os";
import {Argv} from "yargs";
import {defaultTemplateConfig} from "../../documentation";
import {GlobalArguments} from "../cli";
import fs from "fs-extra";
import path from "path";

interface CopyTemplatesCommandArguments extends GlobalArguments {
    target: string;
}

export const addCopyTemplatesCommand = (yargs: Argv) =>
    yargs
        .command("copy-templates <target>", "Copy the default templates to another location for modification",
            copyTemplatesCommandBuilder,
            copyTemplatesCommandHandler);

const copyTemplatesCommandBuilder = (yargs: Argv) =>
    yargs.argv;

const copyTemplatesCommandHandler = async (args: CopyTemplatesCommandArguments) => {
    const targetDirectory = args.target.startsWith("~/")
        ? path.join(os.homedir(), args.target.slice(2))
        : args.target;

    fs.ensureDirSync(targetDirectory);

    fs.copySync(defaultTemplateConfig.directory, targetDirectory);
};
