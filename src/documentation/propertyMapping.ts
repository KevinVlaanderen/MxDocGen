import {projects} from "mendixmodelsdk";
import Document = projects.Document;

export interface DocumentPropertyMapping<T extends Document> {
    [property: string]: (document: T) => unknown
}

export const getMappedProperties = async <T extends Document>(document: T, mapping: DocumentPropertyMapping<T>) => {
    const loadedDocument = await document.load();

    return Object.keys(mapping).reduce((obj, property) => {
        obj[property] = mapping[property](loadedDocument);
        return obj;
    }, {} as any)
};
