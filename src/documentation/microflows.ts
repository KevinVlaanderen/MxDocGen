import {stringifyDataType} from "../sdk/dataTypes";
import {DocumentPropertyMapping} from "./propertyMapping";
import {microflows} from "mendixmodelsdk";
import Microflow = microflows.Microflow;
import MicroflowParameterObject = microflows.MicroflowParameterObject;

export const microflowPropertyMapping: DocumentPropertyMapping<Microflow> = {
    name: (microflow: Microflow) => microflow.name,
    documentation: (microflow: Microflow) => microflow.documentation,
    hasParameters: (microflow: Microflow) =>
        microflow.objectCollection.objects
            .filter(microflowObject => microflowObject.structureTypeName === MicroflowParameterObject.structureTypeName)
            .length > 0,
    parameters: (microflow: Microflow) =>
        microflow.objectCollection.objects
            .filter(microflowObject => microflowObject.structureTypeName === MicroflowParameterObject.structureTypeName)
            .map(microflowObject => microflowObject as MicroflowParameterObject)
            .map(microflowParameter => ({
                name: microflowParameter.name,
                type: stringifyDataType(microflowParameter.variableType),
                documentation: microflowParameter.documentation
            })),
    returnType: (microflow: Microflow) => stringifyDataType(microflow.microflowReturnType)
};
