const path = require("path");
const shell = require("shelljs");

async function getHelpOutput(command) {
    return new Promise((resolve) =>
        shell.exec(`node ./dist/cli/cli.js ${command ? command : ''} --help`, { silent: true }, (code, stdout) => resolve(stdout)));
}

function renderAsMarkdownCode(value) {
    return `\`\`\`\n${value}\`\`\`\n`;
}

function replaceCommand(text, originalCommand, targetCommand) {
    return text.replace(new RegExp(originalCommand, "g"), targetCommand);
}

async function run() {
    shell.cd(path.resolve(__dirname, ".."));

    const noCommandHelpOutput = await getHelpOutput();
    const generateCommandHelpOutput = await getHelpOutput("generate");
    const copyTemplatesCommandHelpOutput = await getHelpOutput("copy-templates");

    shell.mkdir("-p", path.join(__dirname, "generated/readme"));

    shell.ShellString(renderAsMarkdownCode(replaceCommand(noCommandHelpOutput, "cli.js", "mxdocgen")))
        .to(path.join(__dirname, "generated/readme/nocommand.md"));
    shell.ShellString(renderAsMarkdownCode(replaceCommand(generateCommandHelpOutput, "cli.js", "mxdocgen")))
        .to(path.join(__dirname, "generated/readme/generatecommand.md"));
    shell.ShellString(renderAsMarkdownCode(replaceCommand(copyTemplatesCommandHelpOutput, "cli.js", "mxdocgen")))
        .to(path.join(__dirname, "generated/readme/copytemplatescommand.md"));

    shell.rm("README.md");
    shell.exec("npx readme -y -p build/templates/default.md.ejs");
}

run().then(r => console.log("Done."));
