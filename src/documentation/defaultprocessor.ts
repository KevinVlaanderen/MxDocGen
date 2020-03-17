import { domainmodels, IModel, microflows, projects } from "mendixmodelsdk";
import uuid from "uuid";
import { humanReadableDataType } from "../sdk/datatypes";
import {
	documentLowerTypeName,
	documentTypeName,
	isMicroflow,
	isRule,
	typeName
} from "../sdk/documenttypes";
import { Processor } from "./processor";
import {
	DefaultAssociationTemplateData,
	DefaultAttributeTemplateData,
	DefaultDomainModelTemplateData,
	DefaultEntityTemplateData,
	DefaultMicroflowTemplateData,
	DefaultTemplateData
} from "./defaulttemplatedata";
import { humanReadableAttributeType } from "../sdk/attributetypes";
import { multiplicity } from "../sdk/associations";
import IModule = projects.IModule;
import MicroflowParameterObject = microflows.MicroflowParameterObject;
import IFolderBase = projects.IFolderBase;
import Microflow = microflows.Microflow;
import IDocument = projects.IDocument;
import IDomainModel = domainmodels.IDomainModel;
import IEntity = domainmodels.IEntity;
import IAttribute = domainmodels.IAttribute;
import IAssociation = domainmodels.IAssociation;
import StoredValue = domainmodels.StoredValue;
import Generalization = domainmodels.Generalization;
import AssociationOwner = domainmodels.AssociationOwner;
import Rule = microflows.Rule;
import IMicroflowBase = microflows.IMicroflowBase;

export class DefaultProcessor implements Processor<DefaultTemplateData> {
	constructor(
		private moduleFilter?: (module: IModule) => boolean,
		private documentFilter?: (document: IDocument) => boolean
	) {}

	async process(model: IModel): Promise<DefaultTemplateData> {
		return {
			Name: "Documentation",
			Modules: await Promise.all(
				Array.from(this.modules(model))
					.sort((a, b) => a.name.localeCompare(b.name))
					.map(module => this.processModule(module))
			)
		};
	}

	protected async processModule(module: IModule) {
		const documents = Array.from(this.documents(module));

		return {
			ID: uuid(),
			Name: module.name,
			DomainModel: await this.processDomainModel(module.domainModel),
			HasMicroflows: documents.find(isMicroflow) !== undefined,
			Microflows: {
				ID: uuid(),
				TypeName: typeName(Microflow),
				Microflows: await Promise.all(
					documents
						.filter(isMicroflow)
						.sort((a, b) => a.name.localeCompare(b.name))
						.map(microflow => this.processMicroflow(microflow))
				)
			},
			HasRules: documents.find(isRule) !== undefined,
			Rules: {
				ID: uuid(),
				TypeName: typeName(Rule),
				Microflows: await Promise.all(
					documents
						.filter(isRule)
						.sort((a, b) => a.name.localeCompare(b.name))
						.map(rule => this.processMicroflow(rule))
				)
			}
		};
	}

	protected async processDomainModel(
		domainModel: IDomainModel
	): Promise<DefaultDomainModelTemplateData> {
		const loadedDomainModel = await domainModel.load();

		const entities = loadedDomainModel.entities
			.slice()
			.sort((a, b) => a.name.localeCompare(b.name));

		return {
			ID: loadedDomainModel.id,
			Documentation: loadedDomainModel.documentation,
			HasEntities: entities.length > 0,
			Entities: await Promise.all(
				entities.map(entity => this.processEntity(entity, loadedDomainModel))
			)
		};
	}

	protected async processEntity(
		entity: IEntity,
		domainModel: IDomainModel
	): Promise<DefaultEntityTemplateData> {
		const loadedEntity = await entity.load();

		const attributes = loadedEntity.attributes
			.slice()
			.sort((a, b) => a.name.localeCompare(b.name));
		const associations = domainModel.associations
			.filter(
				association =>
					association.parent === entity ||
					(association.child === entity && association.owner === AssociationOwner.Both)
			)
			.sort((a, b) => a.name.localeCompare(b.name));

		return {
			ID: loadedEntity.id,
			Name: loadedEntity.name,
			Documentation: loadedEntity.documentation,
			Generalization:
				loadedEntity.generalization instanceof Generalization
					? loadedEntity.generalization.generalizationQualifiedName
					: undefined,
			HasAttributes: attributes.length > 0,
			Attributes: await Promise.all(
				attributes.map(attribute => this.processAttribute(attribute))
			),
			HasAssociations: associations.length > 0,
			Associations: await Promise.all(
				associations.map(association => this.processAssociation(association, loadedEntity))
			)
		};
	}

	protected async processAttribute(attribute: IAttribute): Promise<DefaultAttributeTemplateData> {
		const loadedAttribute = await attribute.load();

		return {
			Name: loadedAttribute.name,
			Documentation: loadedAttribute.documentation,
			Type: humanReadableAttributeType(loadedAttribute.type),
			DefaultValue: (loadedAttribute.value as StoredValue)?.defaultValue
		};
	}

	protected async processAssociation(
		association: IAssociation,
		entity: IEntity
	): Promise<DefaultAssociationTemplateData> {
		const loadedAssociation = await association.load();

		return {
			Name: loadedAssociation.name,
			Documentation: loadedAssociation.documentation,
			Multiplicity: multiplicity(loadedAssociation),
			OtherSide:
				loadedAssociation.parent === entity
					? loadedAssociation.child.qualifiedName!
					: loadedAssociation.parent.qualifiedName!
		};
	}

	protected async processMicroflow(
		microflow: IMicroflowBase
	): Promise<DefaultMicroflowTemplateData> {
		const loadedMicroflow = await microflow.load();

		const microflowParameterObjects = loadedMicroflow.objectCollection.objects
			.filter(
				microflowObject =>
					microflowObject.structureTypeName === MicroflowParameterObject.structureTypeName
			)
			.map(microflowObject => microflowObject as MicroflowParameterObject)
			.sort((a, b) => a.name.localeCompare(b.name));

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

	protected *modules(model: IModel): Iterable<IModule> {
		for (let module of model.allModules()) {
			if (!this.moduleFilter || this.moduleFilter(module)) {
				yield module;
			}
		}
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
}
