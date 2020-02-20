import {humanReadableDataType} from "../../sdk";
import {microflows} from "mendixmodelsdk";
import {v4 as uuid} from "uuid";
import {TemplateDataFactory} from "./templateData";
import Microflow = microflows.Microflow;
import MicroflowParameterObject = microflows.MicroflowParameterObject;

export const microflowTemplateData: TemplateDataFactory<Microflow> = (microflow: Microflow) => {
    const microflowParameterObjects = microflow.objectCollection.objects
        .filter(microflowObject => microflowObject.structureTypeName === MicroflowParameterObject.structureTypeName)
        .map(microflowObject => microflowObject as MicroflowParameterObject);

    return {
        ID: uuid(),
        Name: microflow.name,
        Documentation: microflow.documentation,
        TypeName: microflow.structureTypeName.split("$")[1],
        LowerTypeName: microflow.structureTypeName.split("$")[1].toLowerCase(),
        HasParameters: microflowParameterObjects.length > 0,
        Parameters: microflowParameterObjects.map(microflowParameter => ({
            Name: microflowParameter.name,
            Type: humanReadableDataType(microflowParameter.variableType),
            Documentation: microflowParameter.documentation
        })),
        ReturnType: humanReadableDataType(microflow.microflowReturnType),
        "Return type": humanReadableDataType(microflow.microflowReturnType)
    }
};
