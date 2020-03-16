import { TemplateData } from "./templates";

export interface DefaultTemplateData extends TemplateData {
	Name: string;
	Modules: DefaultModuleTemplateData[];
}

export interface DefaultModuleTemplateData extends TemplateData {
	ID: string;
	Name: string;
	DomainModel: DefaultDomainModelTemplateData;
	HasMicroflows: boolean;
	Microflows?: {
		ID: string;
		TypeName: string;
		Microflows: DefaultMicroflowTemplateData[];
	};
}

export interface DefaultDomainModelTemplateData extends TemplateData {
	ID: string;
	Documentation: string;
	HasEntities: boolean;
	Entities?: DefaultEntityTemplateData[];
}

export interface DefaultEntityTemplateData extends TemplateData {
	ID: string;
	Name: string;
	Documentation: string;
	Generalization?: string;
	HasAttributes: boolean;
	Attributes?: DefaultAttributeTemplateData[];
	HasAssociations: boolean;
	Associations?: DefaultAssociationTemplateData[];
}

export interface DefaultAttributeTemplateData extends TemplateData {
	Name: string;
	Documentation: string;
	Type: string;
	DefaultValue: string;
}

export interface DefaultAssociationTemplateData extends TemplateData {
	Name: string;
	Documentation: string;
	OtherSide: string;
	Multiplicity: string;
}

export interface DefaultMicroflowTemplateData extends TemplateData {
	ID: string;
	Name: string;
	Documentation: string;
	TypeName: string;
	LowerTypeName: string;
	HasParameters: boolean;
	Parameters?: DefaultMicroflowParametersTemplateData[];
	ReturnType: string;
	"Return type": string;
}

export interface DefaultMicroflowParametersTemplateData extends TemplateData {
	Name: string;
	Type: string;
	Documentation: string;
}
