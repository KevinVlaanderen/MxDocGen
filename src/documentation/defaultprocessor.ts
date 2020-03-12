import { IModel, microflows, projects } from "mendixmodelsdk";
import uuid from "uuid";
import { humanReadableDataType } from "../sdk/datatypes";
import {
	documentLowerTypeName,
	documentTypeName,
	isMicroflow,
	typeName
} from "../sdk/documenttypes";
import { DefaultMicroflowTemplateData, DefaultTemplateData } from "./defaulttemplatedata";
import { Processor } from "./processor";
import IModule = projects.IModule;
import MicroflowParameterObject = microflows.MicroflowParameterObject;
import IFolderBase = projects.IFolderBase;
import IMicroflow = microflows.IMicroflow;
import Microflow = microflows.Microflow;
import IDocument = projects.IDocument;

export class DefaultProcessor implements Processor<DefaultTemplateData> {
	constructor(
		private moduleFilter?: (module: IModule) => boolean,
		private documentFilter?: (document: IDocument) => boolean
	) {}

	async process(model: IModel): Promise<DefaultTemplateData> {
		return {
			Name: "Documentation",
			Modules: await Promise.all(
				Array.from(this.modules(model)).map(module => this.processModule(module))
			)
		};
	}

	protected *documents(module: IModule): Iterable<IDocument> {
		for (let document of this.listDocuments(module)) {
			if (!this.documentFilter || this.documentFilter(document)) {
				yield document;
			}
		}
	}

	protected listDocuments(folderBase: IFolderBase): Array<IDocument> {
		return [
			...folderBase.documents,
			...folderBase.folders.flatMap(folder => this.listDocuments(folder))
		];
	}

	private async processModule(module: IModule) {
		const documents = Array.from(this.documents(module));

		return {
			ID: uuid(),
			Name: module.name,
			HasMicroflows: documents.find(isMicroflow) !== undefined,
			Microflows: {
				ID: uuid(),
				TypeName: typeName(Microflow),
				Microflows: await Promise.all(
					documents.filter(isMicroflow).map(microflow => this.processMicroflow(microflow))
				)
			}
		};
	}

	private async processMicroflow(microflow: IMicroflow): Promise<DefaultMicroflowTemplateData> {
		const loadedMicroflow = await microflow.load();

		const microflowParameterObjects = loadedMicroflow.objectCollection.objects
			.filter(
				microflowObject =>
					microflowObject.structureTypeName === MicroflowParameterObject.structureTypeName
			)
			.map(microflowObject => microflowObject as MicroflowParameterObject);

		return {
			ID: uuid(),
			Name: microflow.name,
			Documentation: loadedMicroflow.documentation,
			TypeName: documentTypeName(loadedMicroflow),
			LowerTypeName: documentLowerTypeName(loadedMicroflow),
			HasParameters: microflowParameterObjects.length > 0,
			Parameters: microflowParameterObjects.map(microflowParameter => ({
				Name: microflowParameter.name,
				Type: humanReadableDataType(microflowParameter.variableType),
				Documentation: microflowParameter.documentation
			})),
			ReturnType: humanReadableDataType(microflow.microflowReturnType),
			"Return type": humanReadableDataType(microflow.microflowReturnType)
		};
	}

	private *modules(model: IModel): Iterable<IModule> {
		for (let module of model.allModules()) {
			if (!this.moduleFilter || this.moduleFilter(module)) {
				yield module;
			}
		}
	}
}
