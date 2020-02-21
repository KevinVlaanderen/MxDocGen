import {datatypes} from "mendixmodelsdk";
import IDataType = datatypes.IDataType;
import BinaryType = datatypes.BinaryType;
import BooleanType = datatypes.BooleanType;
import DateTimeType = datatypes.DateTimeType;
import DecimalType = datatypes.DecimalType;
import EmptyType = datatypes.EmptyType;
import EntityType = datatypes.EntityType;
import EnumerationType = datatypes.EnumerationType;
import FloatType = datatypes.FloatType;
import IntegerType = datatypes.IntegerType;
import ListType = datatypes.ListType;
import ObjectType = datatypes.ObjectType;
import StringType = datatypes.StringType;
import UnknownType = datatypes.UnknownType;
import VoidType = datatypes.VoidType;

export const isBinaryType = (dataType: IDataType): dataType is BinaryType => dataType.structureTypeName === BinaryType.structureTypeName;
export const isBooleanType = (dataType: IDataType): dataType is BooleanType => dataType.structureTypeName === BooleanType.structureTypeName;
export const isDateTimeType = (dataType: IDataType): dataType is DateTimeType => dataType.structureTypeName === DateTimeType.structureTypeName;
export const isDecimalType = (dataType: IDataType): dataType is DecimalType => dataType.structureTypeName === DecimalType.structureTypeName;
export const isEmptyType = (dataType: IDataType): dataType is EmptyType => dataType.structureTypeName === EmptyType.structureTypeName;
export const isEntityType = (dataType: IDataType): dataType is EntityType => dataType.structureTypeName === EntityType.structureTypeName;
export const isEnumerationType = (dataType: IDataType): dataType is EnumerationType => dataType.structureTypeName === EnumerationType.structureTypeName;
export const isFloatType = (dataType: IDataType): dataType is FloatType => dataType.structureTypeName === FloatType.structureTypeName;
export const isIntegerType = (dataType: IDataType): dataType is IntegerType => dataType.structureTypeName === IntegerType.structureTypeName;
export const isListType = (dataType: IDataType): dataType is ListType => dataType.structureTypeName === ListType.structureTypeName;
export const isObjectType = (dataType: IDataType): dataType is ObjectType => dataType.structureTypeName === ObjectType.structureTypeName;
export const isStringType = (dataType: IDataType): dataType is StringType => dataType.structureTypeName === StringType.structureTypeName;
export const isUnknownType = (dataType: IDataType): dataType is UnknownType => dataType.structureTypeName === UnknownType.structureTypeName;
export const isVoidType = (dataType: IDataType): dataType is VoidType => dataType.structureTypeName === VoidType.structureTypeName;

export const humanReadableDataType = (dataType: IDataType): string => {
    if (isBinaryType(dataType)) return "Binary";
    if (isBooleanType(dataType)) return "Boolean";
    if (isDateTimeType(dataType)) return "DateTime";
    if (isDecimalType(dataType)) return "Decimal";
    if (isEmptyType(dataType)) return "Empty";
    if (isEntityType(dataType)) return "Entity";
    if (isEnumerationType(dataType)) return dataType.enumerationQualifiedName;
    if (isFloatType(dataType)) return "Float";
    if (isIntegerType(dataType)) return "Integer";
    if (isListType(dataType)) return `List of ${(dataType as ListType).entityQualifiedName}`;
    if (isObjectType(dataType)) return dataType.entityQualifiedName;
    if (isStringType(dataType)) return "String";
    if (isUnknownType(dataType)) return "Unknown";
    if (isVoidType(dataType)) return "Void";

    return "Unknown"
};
