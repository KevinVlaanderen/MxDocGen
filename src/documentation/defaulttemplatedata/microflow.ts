import {humanReadableDataType, lowerTypeName, typeName} from "../../sdk";
import {microflows} from "mendixmodelsdk";
import {v4 as uuid} from "uuid";
import {TemplateData, TemplateDataFactory} from "../templates";
import Microflow = microflows.Microflow;
import MicroflowParameterObject = microflows.MicroflowParameterObject;

export const microflowTemplateData: TemplateDataFactory<Microflow> = async (microflow: Microflow): Promise<TemplateData> => {
    await microflow.load();

    const microflowParameterObjects = microflow.objectCollection.objects
        .filter(microflowObject => microflowObject.structureTypeName === MicroflowParameterObject.structureTypeName)
        .map(microflowObject => microflowObject as MicroflowParameterObject);

    return {
        ID: uuid(),
        Name: microflow.name,
        Documentation: microflow.documentation,
        TypeName: typeName(Microflow),
        LowerTypeName: lowerTypeName(Microflow),
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
