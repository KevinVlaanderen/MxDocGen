import {ProjectStructure} from "../sdk/projectStructure";

export const logProjectStructure = (projectStructure: ProjectStructure) =>
    projectStructure.modules.forEach(module => {
        console.debug(module.name);

        module.documents.forEach(document => {
            const path = document.folder ? [document.folder, document.name].join("/") : document.name;
            console.debug(`   ${path}`);
        })
    });
