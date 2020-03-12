import { TemplateData } from "./templates";
import { IModel } from "mendixmodelsdk";

export interface Processor<T extends TemplateData> {
	process: (model: IModel) => Promise<T>;
}
