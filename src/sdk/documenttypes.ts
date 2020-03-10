import {
	appservices,
	codeactions,
	constants,
	datasets,
	documenttemplates,
	domainmodels,
	enumerations,
	exportmappings,
	images,
	importmappings,
	javaactions,
	javascriptactions,
	jsonstructures,
	mappings,
	menus,
	messagedefinitions,
	microflows,
	nativepages,
	pages,
	projects,
	regularexpressions,
	rest,
	scheduledevents,
	webservices,
	xmlschemas
} from "mendixmodelsdk";
import IModuleDocument = projects.IModuleDocument;
import BuildingBlock = pages.BuildingBlock;
import CodeAction = codeactions.CodeAction;
import ConsumedAppService = appservices.ConsumedAppService;
import NativeLayout = nativepages.NativeLayout;
import PublishedServiceBase = webservices.PublishedServiceBase;
import DataSet = datasets.DataSet;
import ImportMapping = importmappings.ImportMapping;
import MicroflowBase = microflows.MicroflowBase;
import PageTemplate = pages.PageTemplate;
import Constant = constants.Constant;
import MappingDocument = mappings.MappingDocument;
import PublishedWebService = webservices.PublishedWebService;
import Page = pages.Page;
import Document = projects.Document;
import MenuDocument = menus.MenuDocument;
import ServerSideMicroflow = microflows.ServerSideMicroflow;
import ConsumedODataService = rest.ConsumedODataService;
import ImportedWebService = webservices.ImportedWebService;
import RemoteEntitySourceDocument = domainmodels.RemoteEntitySourceDocument;
import PublishedRestService = rest.PublishedRestService;
import FormBase = pages.FormBase;
import ImageCollection = images.ImageCollection;
import DocumentTemplate = documenttemplates.DocumentTemplate;
import PublishedAppService = webservices.PublishedAppService;
import Nanoflow = microflows.Nanoflow;
import JavaAction = javaactions.JavaAction;
import Microflow = microflows.Microflow;
import MxSchema = xmlschemas.MxSchema;
import RegularExpression = regularexpressions.RegularExpression;
import ScheduledEvent = scheduledevents.ScheduledEvent;
import Enumeration = enumerations.Enumeration;
import PublishedODataService = rest.PublishedODataService;
import JavaScriptAction = javascriptactions.JavaScriptAction;
import Snippet = pages.Snippet;
import MessageDefinitionCollection = messagedefinitions.MessageDefinitionCollection;
import NativePage = nativepages.NativePage;
import TemplateFormBase = pages.TemplateFormBase;
import Layout = pages.Layout;
import XmlSchema = xmlschemas.XmlSchema;
import ExportMapping = exportmappings.ExportMapping;
import Rule = microflows.Rule;
import JsonStructure = jsonstructures.JsonStructure;
import DomainModel = domainmodels.DomainModel;
import ModuleDocument = projects.ModuleDocument;

export const documentTypeName = (document: IModuleDocument) =>
	document.structureTypeName.split("$")[1];
export const documentLowerTypeName = (document: IModuleDocument) =>
	documentTypeName(document).toLowerCase();

export const typeName = (documentType: typeof ModuleDocument) =>
	documentType.structureTypeName.split("$")[1];
export const lowerTypeName = (documentType: typeof ModuleDocument) =>
	typeName(documentType).toLowerCase();

export const isBuildingBlock = (document: IModuleDocument): document is BuildingBlock =>
	document.structureTypeName === BuildingBlock.structureTypeName;
export const isCodeAction = (document: IModuleDocument): document is CodeAction =>
	document.structureTypeName === CodeAction.structureTypeName;
export const isConstant = (document: IModuleDocument): document is Constant =>
	document.structureTypeName === Constant.structureTypeName;
export const isConsumedAppService = (document: IModuleDocument): document is ConsumedAppService =>
	document.structureTypeName === ConsumedAppService.structureTypeName;
export const isConsumedODataService = (
	document: IModuleDocument
): document is ConsumedODataService =>
	document.structureTypeName === ConsumedODataService.structureTypeName;
export const isDataSet = (document: IModuleDocument): document is DataSet =>
	document.structureTypeName === DataSet.structureTypeName;
export const isDocument = (document: IModuleDocument): document is Document =>
	document.structureTypeName === Document.structureTypeName;
export const isDocumentTemplate = (document: IModuleDocument): document is DocumentTemplate =>
	document.structureTypeName === DocumentTemplate.structureTypeName;
export const isDomainModel = (document: IModuleDocument): document is DomainModel =>
	document.structureTypeName === DomainModel.structureTypeName;
export const isEnumeration = (document: IModuleDocument): document is Enumeration =>
	document.structureTypeName === Enumeration.structureTypeName;
export const isExportMapping = (document: IModuleDocument): document is ExportMapping =>
	document.structureTypeName === ExportMapping.structureTypeName;
export const isFormBase = (document: IModuleDocument): document is FormBase =>
	document.structureTypeName === FormBase.structureTypeName;
export const isImageCollection = (document: IModuleDocument): document is ImageCollection =>
	document.structureTypeName === ImageCollection.structureTypeName;
export const isImportMapping = (document: IModuleDocument): document is ImportMapping =>
	document.structureTypeName === ImportMapping.structureTypeName;
export const isImportedWebService = (document: IModuleDocument): document is ImportedWebService =>
	document.structureTypeName === ImportedWebService.structureTypeName;
export const isJavaAction = (document: IModuleDocument): document is JavaAction =>
	document.structureTypeName === JavaAction.structureTypeName;
export const isJavaScriptAction = (document: IModuleDocument): document is JavaScriptAction =>
	document.structureTypeName === JavaScriptAction.structureTypeName;
export const isJsonStructure = (document: IModuleDocument): document is JsonStructure =>
	document.structureTypeName === JsonStructure.structureTypeName;
export const isLayout = (document: IModuleDocument): document is Layout =>
	document.structureTypeName === Layout.structureTypeName;
export const isMappingDocument = (document: IModuleDocument): document is MappingDocument =>
	document.structureTypeName === MappingDocument.structureTypeName;
export const isMenuDocument = (document: IModuleDocument): document is MenuDocument =>
	document.structureTypeName === MenuDocument.structureTypeName;
export const isMessageDefinitionCollection = (
	document: IModuleDocument
): document is MessageDefinitionCollection =>
	document.structureTypeName === MessageDefinitionCollection.structureTypeName;
export const isMicroflow = (document: IModuleDocument): document is Microflow =>
	document.structureTypeName === Microflow.structureTypeName;
export const isMicroflowBase = (document: IModuleDocument): document is MicroflowBase =>
	document.structureTypeName === MicroflowBase.structureTypeName;
export const isModuleDocument = (document: IModuleDocument): document is ModuleDocument =>
	document.structureTypeName === ModuleDocument.structureTypeName;
export const isMxSchema = (document: IModuleDocument): document is MxSchema =>
	document.structureTypeName === MxSchema.structureTypeName;
export const isNanoflow = (document: IModuleDocument): document is Nanoflow =>
	document.structureTypeName === Nanoflow.structureTypeName;
export const isNativeLayout = (document: IModuleDocument): document is NativeLayout =>
	document.structureTypeName === NativeLayout.structureTypeName;
export const isNativePage = (document: IModuleDocument): document is NativePage =>
	document.structureTypeName === NativePage.structureTypeName;
export const isPage = (document: IModuleDocument): document is Page =>
	document.structureTypeName === Page.structureTypeName;
export const isPageTemplate = (document: IModuleDocument): document is PageTemplate =>
	document.structureTypeName === PageTemplate.structureTypeName;
export const isPublishedAppService = (document: IModuleDocument): document is PublishedAppService =>
	document.structureTypeName === PublishedAppService.structureTypeName;
export const isPublishedODataService = (
	document: IModuleDocument
): document is PublishedODataService =>
	document.structureTypeName === PublishedODataService.structureTypeName;
export const isPublishedRestService = (
	document: IModuleDocument
): document is PublishedRestService =>
	document.structureTypeName === PublishedRestService.structureTypeName;
export const isPublishedServiceBase = (
	document: IModuleDocument
): document is PublishedServiceBase =>
	document.structureTypeName === PublishedServiceBase.structureTypeName;
export const isPublishedWebService = (document: IModuleDocument): document is PublishedWebService =>
	document.structureTypeName === PublishedWebService.structureTypeName;
export const isRegularExpression = (document: IModuleDocument): document is RegularExpression =>
	document.structureTypeName === RegularExpression.structureTypeName;
export const isRemoteEntitySourceDocument = (
	document: IModuleDocument
): document is RemoteEntitySourceDocument =>
	document.structureTypeName === RemoteEntitySourceDocument.structureTypeName;
export const isRule = (document: IModuleDocument): document is Rule =>
	document.structureTypeName === Rule.structureTypeName;
export const isScheduledEvent = (document: IModuleDocument): document is ScheduledEvent =>
	document.structureTypeName === ScheduledEvent.structureTypeName;
export const isServerSideMicroflow = (document: IModuleDocument): document is ServerSideMicroflow =>
	document.structureTypeName === ServerSideMicroflow.structureTypeName;
export const isSnippet = (document: IModuleDocument): document is Snippet =>
	document.structureTypeName === Snippet.structureTypeName;
export const isTemplateFormBase = (document: IModuleDocument): document is TemplateFormBase =>
	document.structureTypeName === TemplateFormBase.structureTypeName;
export const isXmlSchema = (document: IModuleDocument): document is XmlSchema =>
	document.structureTypeName === XmlSchema.structureTypeName;
