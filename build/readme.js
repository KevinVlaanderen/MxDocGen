const path = require("path");
const shell = require("shelljs");

async function getHelpOutput(command) {
    return new Promise((resolve) =>
        shell.exec(`node ./dist/cli/cli.js ${command ? command : ''} --help`, { silent: true }, (code, stdout) => resolve(stdout)));
}

function renderAsMarkdownCode(value) {
    return `\`\`\`\n${value}\`\`\`\n`;
}

async function run() {
    shell.cd(path.resolve(__dirname, ".."));

    const noCommandHelpOutput = await getHelpOutput();
    const generateCommandHelpOutput = await getHelpOutput("generate");
    const copyTemplatesCommandHelpOutput = await getHelpOutput("copy-templates");

    shell.mkdir("-p", path.join(__dirname, "generated/readme"));

    shell.ShellString(renderAsMarkdownCode(noCommandHelpOutput))
        .to(path.join(__dirname, "generated/readme/nocommand.md"));
    shell.ShellString(renderAsMarkdownCode(generateCommandHelpOutput))
        .to(path.join(__dirname, "generated/readme/generatecommand.md"));
    shell.ShellString(renderAsMarkdownCode(copyTemplatesCommandHelpOutput))
        .to(path.join(__dirname, "generated/readme/copytemplatescommand.md"));

    shell.rm("README.md");
    shell.exec("npx readme -y -p build/templates/default.md.ejs");
}

run().then(r => console.log("Done."));
