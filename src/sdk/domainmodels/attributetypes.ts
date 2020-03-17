import { domainmodels } from "mendixmodelsdk";
import IAttributeType = domainmodels.IAttributeType;
import BinaryAttributeType = domainmodels.BinaryAttributeType;
import AutoNumberAttributeType = domainmodels.AutoNumberAttributeType;
import BooleanAttributeType = domainmodels.BooleanAttributeType;
import CurrencyAttributeType = domainmodels.CurrencyAttributeType;
import DateTimeAttributeType = domainmodels.DateTimeAttributeType;
import LongAttributeType = domainmodels.LongAttributeType;
import StringAttributeType = domainmodels.StringAttributeType;
import DecimalAttributeType = domainmodels.DecimalAttributeType;
import IntegerAttributeTypeBase = domainmodels.IntegerAttributeTypeBase;
import DecimalAttributeTypeBase = domainmodels.DecimalAttributeTypeBase;
import FloatAttributeTypeBase = domainmodels.FloatAttributeTypeBase;
import FloatAttributeType = domainmodels.FloatAttributeType;
import HashedStringAttributeType = domainmodels.HashedStringAttributeType;
import IntegerAttributeType = domainmodels.IntegerAttributeType;
import EnumerationAttributeType = domainmodels.EnumerationAttributeType;
import NumericAttributeTypeBase = domainmodels.NumericAttributeTypeBase;

export const isAutoNumberAttributeType = (
	attributeType: IAttributeType
): attributeType is AutoNumberAttributeType =>
	attributeType.structureTypeName === AutoNumberAttributeType.structureTypeName;
export const isBinaryAttributeType = (
	attributeType: IAttributeType
): attributeType is BinaryAttributeType =>
	attributeType.structureTypeName === BinaryAttributeType.structureTypeName;
export const isBooleanAttributeType = (
	attributeType: IAttributeType
): attributeType is BooleanAttributeType =>
	attributeType.structureTypeName === BooleanAttributeType.structureTypeName;
export const isCurrencyAttributeType = (
	attributeType: IAttributeType
): attributeType is CurrencyAttributeType =>
	attributeType.structureTypeName === CurrencyAttributeType.structureTypeName;
export const isDateTimeAttributeType = (
	attributeType: IAttributeType
): attributeType is DateTimeAttributeType =>
	attributeType.structureTypeName === DateTimeAttributeType.structureTypeName;
export const isDecimalAttributeType = (
	attributeType: IAttributeType
): attributeType is DecimalAttributeType =>
	attributeType.structureTypeName === DecimalAttributeType.structureTypeName;
export const isDecimalAttributeTypeBase = (
	attributeType: IAttributeType
): attributeType is DecimalAttributeTypeBase =>
	attributeType.structureTypeName === DecimalAttributeTypeBase.structureTypeName;
export const isEnumerationAttributeType = (
	attributeType: IAttributeType
): attributeType is EnumerationAttributeType =>
	attributeType.structureTypeName === EnumerationAttributeType.structureTypeName;
export const isFloatAttributeType = (
	attributeType: IAttributeType
): attributeType is FloatAttributeType =>
	attributeType.structureTypeName === FloatAttributeType.structureTypeName;
export const isFloatAttributeTypeBase = (
	attributeType: IAttributeType
): attributeType is FloatAttributeTypeBase =>
	attributeType.structureTypeName === FloatAttributeTypeBase.structureTypeName;
export const isHashedStringAttributeType = (
	attributeType: IAttributeType
): attributeType is HashedStringAttributeType =>
	attributeType.structureTypeName === HashedStringAttributeType.structureTypeName;
export const isIntegerAttributeType = (
	attributeType: IAttributeType
): attributeType is IntegerAttributeType =>
	attributeType.structureTypeName === IntegerAttributeType.structureTypeName;
export const isIntegerAttributeTypeBase = (
	attributeType: IAttributeType
): attributeType is IntegerAttributeTypeBase =>
	attributeType.structureTypeName === IntegerAttributeTypeBase.structureTypeName;
export const isLongAttributeType = (
	attributeType: IAttributeType
): attributeType is LongAttributeType =>
	attributeType.structureTypeName === LongAttributeType.structureTypeName;
export const isNumericAttributeTypeBase = (
	attributeType: IAttributeType
): attributeType is NumericAttributeTypeBase =>
	attributeType.structureTypeName === NumericAttributeTypeBase.structureTypeName;
export const isStringAttributeType = (
	attributeType: IAttributeType
): attributeType is StringAttributeType =>
	attributeType.structureTypeName === StringAttributeType.structureTypeName;

export const humanReadableAttributeType = (attributeType: IAttributeType): string => {
	if (isAutoNumberAttributeType(attributeType)) return "AutoNumber";
	if (isBinaryAttributeType(attributeType)) return "Binary";
	if (isBooleanAttributeType(attributeType)) return "Boolean";
	if (isCurrencyAttributeType(attributeType)) return "Currency";
	if (isDateTimeAttributeType(attributeType)) return "DateTime";
	if (isDecimalAttributeType(attributeType)) return "Decimal";
	if (isEnumerationAttributeType(attributeType)) return "Enumeration";
	if (isFloatAttributeType(attributeType)) return "Float";
	if (isHashedStringAttributeType(attributeType)) return "HashedString";
	if (isIntegerAttributeType(attributeType)) return "Integer";
	if (isLongAttributeType(attributeType)) return "Long";
	if (isStringAttributeType(attributeType))
		return `String (${attributeType.length > 0 ? attributeType.length : "unlimited"})`;

	return "Unknown";
};
