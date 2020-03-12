import { TemplateData } from "./templates";

export interface DefaultTemplateData extends TemplateData {
	Name: string;
	Modules: DefaultModuleTemplateData[];
}

export interface DefaultModuleTemplateData extends TemplateData {
	ID: string;
	Name: string;
	HasMicroflows: boolean;
	Microflows?: {
		ID: string;
		TypeName: string;
		Microflows: DefaultMicroflowTemplateData[];
	};
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
