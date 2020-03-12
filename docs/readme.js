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

    shell.mkdir("-p", "./docs/generated/readme");

    shell.ShellString(renderAsMarkdownCode(noCommandHelpOutput))
        .to("./docs/generated/readme/nocommand.md");
    shell.ShellString(renderAsMarkdownCode(generateCommandHelpOutput))
        .to("./docs/generated/readme/generatecommand.md");
    shell.ShellString(renderAsMarkdownCode(copyTemplatesCommandHelpOutput))
        .to("./docs/generated/readme/copytemplatescommand.md");

    shell.rm("README.md");
    shell.exec("npx readme -y -p ./docs/templates/default.md");
}

run().then(r => console.log("Done."));
