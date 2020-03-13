import { MendixSdkClient } from "mendixplatformsdk";
import { generate } from "../dist/documentation/generate";
import { defaultOutputConfig } from "../dist/documentation/output";
import { defaultFilterConfig } from "../dist/documentation/filters";
import { defaultTemplateConfig } from "../dist/documentation/templates";
import { DefaultProcessor } from "../dist/documentation/defaultprocessor";

async function main() {
	const username = process.argv[2];
	const apikey = process.argv[3];

	if (!username || !apikey) {
		console.error("You must pass a username and apikey as parameters");
		process.exit(1);
	}

	const client = new MendixSdkClient(username, apikey);

	const mpk = process.argv[4] ?? "./EventApp.mpk";
	console.log(`Using MPK file "${mpk}"`);

	await generate(client, {
		output: defaultOutputConfig,
		filters: defaultFilterConfig,
		templates: defaultTemplateConfig,
		project: {
			mpk
		},
		processor: new DefaultProcessor()
	});
}

main().then(() => console.log("Done...")).catch(reason => console.error(reason));
