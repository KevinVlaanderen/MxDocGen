import {IAbstractUnit, StructuralUnit} from "mendixmodelsdk";

export interface TemplateData {
    [property: string]: string | boolean | TemplateData | Array<string | TemplateData>;
}

export type TemplateDataFactory<T extends IAbstractUnit> = (unit: T) => TemplateData;
