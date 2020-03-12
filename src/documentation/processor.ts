import { IModel } from "mendixmodelsdk";
import { TemplateData } from "./templates";

export interface Processor<T extends TemplateData> {
	process: (model: IModel) => Promise<T>;
}
