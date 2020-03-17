import { codeactions } from "mendixmodelsdk";
import IType = codeactions.IType;
import BooleanType = codeactions.BooleanType;
import ConcreteEntityType = codeactions.ConcreteEntityType;
import DateTimeType = codeactions.DateTimeType;
import DecimalType = codeactions.DecimalType;
import EnumerationType = codeactions.EnumerationType;
import FloatType = codeactions.FloatType;
import IntegerType = codeactions.IntegerType;
import ListType = codeactions.ListType;
import ParameterizedEntityType = codeactions.ParameterizedEntityType;
import StringType = codeactions.StringType;
import VoidType = codeactions.VoidType;

export const isBooleanType = (type: IType): type is BooleanType =>
	type.structureTypeName === BooleanType.structureTypeName;
export const isConcreteEntityType = (type: IType): type is ConcreteEntityType =>
	type.structureTypeName === ConcreteEntityType.structureTypeName;
export const isDateTimeType = (type: IType): type is DateTimeType =>
	type.structureTypeName === DateTimeType.structureTypeName;
export const isDecimalType = (type: IType): type is DecimalType =>
	type.structureTypeName === DecimalType.structureTypeName;
export const isEnumerationType = (type: IType): type is EnumerationType =>
	type.structureTypeName === EnumerationType.structureTypeName;
export const isFloatType = (type: IType): type is FloatType =>
	type.structureTypeName === FloatType.structureTypeName;
export const isIntegerType = (type: IType): type is IntegerType =>
	type.structureTypeName === IntegerType.structureTypeName;
export const isListType = (type: IType): type is ListType =>
	type.structureTypeName === ListType.structureTypeName;
export const isParameterizedEntityType = (type: IType): type is ParameterizedEntityType =>
	type.structureTypeName === ParameterizedEntityType.structureTypeName;
export const isStringType = (type: IType): type is StringType =>
	type.structureTypeName === StringType.structureTypeName;
export const isVoidType = (type: IType): type is VoidType =>
	type.structureTypeName === VoidType.structureTypeName;

export const humanReadableType = (type: IType): string => {
	if (isBooleanType(type)) return "Boolean";
	if (isConcreteEntityType(type)) return type.entityQualifiedName;
	if (isDateTimeType(type)) return "DateTime";
	if (isDecimalType(type)) return "Decimal";
	if (isEnumerationType(type)) return `Enumeration ${type.enumerationQualifiedName}`;
	if (isFloatType(type)) return "Float";
	if (isIntegerType(type)) return "Integer";
	if (isListType(type)) return `List of ${humanReadableType(type.parameter)}`;
	if (isParameterizedEntityType(type)) return `Type Parameter "${type.typeParameter.name}"`;
	if (isStringType(type)) return "String";
	if (isVoidType(type)) return "Void";

	return "Unknown";
};
