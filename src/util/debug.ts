import {ProjectDescription} from "../sdk/projectDescription";

export const logProjectStructure = (projectStructure: ProjectDescription) =>
    projectStructure.modules.forEach(module => {
        console.debug(module.name);

        module.documents.forEach(document => {
            const path = document.folder ? [document.folder, document.name].join("/") : document.name;
            console.debug(`   ${path}`);
        })
    });
