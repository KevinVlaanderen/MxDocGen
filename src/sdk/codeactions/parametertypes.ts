import { codeactions, javaactions, javascriptactions } from "mendixmodelsdk";
import { humanReadableType } from "./types";
import IParameterType = codeactions.IParameterType;
import BasicParameterType = codeactions.BasicParameterType;
import EntityTypeParameterType = codeactions.EntityTypeParameterType;
import ExportMappingJavaActionParameterType = javaactions.ExportMappingJavaActionParameterType;
import ImportMappingJavaActionParameterType = javaactions.ImportMappingJavaActionParameterType;
import MicroflowJavaActionParameterType = javaactions.MicroflowJavaActionParameterType;
import NanoflowJavaScriptActionParameterType = javascriptactions.NanoflowJavaScriptActionParameterType;
import StringTemplateParameterType = codeactions.StringTemplateParameterType;

export const isBasicParameterType = (
	parameterType: IParameterType
): parameterType is BasicParameterType =>
	parameterType.structureTypeName === BasicParameterType.structureTypeName;
export const isEntityTypeParameterType = (
	parameterType: IParameterType
): parameterType is EntityTypeParameterType =>
	parameterType.structureTypeName === EntityTypeParameterType.structureTypeName;
export const isExportMappingJavaActionParameterType = (
	parameterType: IParameterType
): parameterType is ExportMappingJavaActionParameterType =>
	parameterType.structureTypeName === ExportMappingJavaActionParameterType.structureTypeName;
export const isImportMappingJavaActionParameterType = (
	parameterType: IParameterType
): parameterType is ImportMappingJavaActionParameterType =>
	parameterType.structureTypeName === ImportMappingJavaActionParameterType.structureTypeName;
export const isMicroflowJavaActionParameterType = (
	parameterType: IParameterType
): parameterType is MicroflowJavaActionParameterType =>
	parameterType.structureTypeName === MicroflowJavaActionParameterType.structureTypeName;
export const isNanoflowJavaScriptActionParameterType = (
	parameterType: IParameterType
): parameterType is NanoflowJavaScriptActionParameterType =>
	parameterType.structureTypeName === NanoflowJavaScriptActionParameterType.structureTypeName;
export const isStringTemplateParameterType = (
	parameterType: IParameterType
): parameterType is StringTemplateParameterType =>
	parameterType.structureTypeName === StringTemplateParameterType.structureTypeName;

export const humanReadableParameterType = (parameterType: IParameterType): string => {
	if (isBasicParameterType(parameterType)) return humanReadableType(parameterType.type);
	if (isEntityTypeParameterType(parameterType))
		return parameterType.typeParameter?.qualifiedName || "Type Parameter";
	if (isExportMappingJavaActionParameterType(parameterType)) return "Export Mapping";
	if (isImportMappingJavaActionParameterType(parameterType)) return "Import Mapping";
	if (isMicroflowJavaActionParameterType(parameterType)) return "Microflow";
	if (isNanoflowJavaScriptActionParameterType(parameterType)) return "Nanoflow";
	if (isStringTemplateParameterType(parameterType)) return "String Template";

	return "Unknown";
};
