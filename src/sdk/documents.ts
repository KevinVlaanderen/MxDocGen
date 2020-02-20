import {
    appservices,
    codeactions, constants,
    datasets, documenttemplates, domainmodels, enumerations, exportmappings, images,
    importmappings, javaactions, javascriptactions, jsonstructures, mappings, menus, messagedefinitions, microflows,
    nativepages,
    pages,
    projects, regularexpressions, rest, scheduledevents,
    webservices, xmlschemas
} from "mendixmodelsdk";
import IDocument = projects.IDocument;
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

export const isBuildingBlock = (document: IDocument): document is BuildingBlock => document.structureTypeName === BuildingBlock.structureTypeName;
export const isCodeAction = (document: IDocument): document is CodeAction => document.structureTypeName === CodeAction.structureTypeName;
export const isConstant = (document: IDocument): document is Constant => document.structureTypeName === Constant.structureTypeName;
export const isConsumedAppService = (document: IDocument): document is ConsumedAppService => document.structureTypeName === ConsumedAppService.structureTypeName;
export const isConsumedODataService = (document: IDocument): document is ConsumedODataService => document.structureTypeName === ConsumedODataService.structureTypeName;
export const isDataSet = (document: IDocument): document is DataSet => document.structureTypeName === DataSet.structureTypeName;
export const isDocument = (document: IDocument): document is Document => document.structureTypeName === Document.structureTypeName;
export const isDocumentTemplate = (document: IDocument): document is DocumentTemplate => document.structureTypeName === DocumentTemplate.structureTypeName;
export const isEnumeration = (document: IDocument): document is Enumeration => document.structureTypeName === Enumeration.structureTypeName;
export const isExportMapping = (document: IDocument): document is ExportMapping => document.structureTypeName === ExportMapping.structureTypeName;
export const isFormBase = (document: IDocument): document is FormBase => document.structureTypeName === FormBase.structureTypeName;
export const isImageCollection = (document: IDocument): document is ImageCollection => document.structureTypeName === ImageCollection.structureTypeName;
export const isImportMapping = (document: IDocument): document is ImportMapping => document.structureTypeName === ImportMapping.structureTypeName;
export const isImportedWebService = (document: IDocument): document is ImportedWebService => document.structureTypeName === ImportedWebService.structureTypeName;
export const isJavaAction = (document: IDocument): document is JavaAction => document.structureTypeName === JavaAction.structureTypeName;
export const isJavaScriptAction = (document: IDocument): document is JavaScriptAction => document.structureTypeName === JavaScriptAction.structureTypeName;
export const isJsonStructure = (document: IDocument): document is JsonStructure => document.structureTypeName === JsonStructure.structureTypeName;
export const isLayout = (document: IDocument): document is Layout => document.structureTypeName === Layout.structureTypeName;
export const isMappingDocument = (document: IDocument): document is MappingDocument => document.structureTypeName === MappingDocument.structureTypeName;
export const isMenuDocument = (document: IDocument): document is MenuDocument => document.structureTypeName === MenuDocument.structureTypeName;
export const isMessageDefinitionCollection = (document: IDocument): document is MessageDefinitionCollection => document.structureTypeName === MessageDefinitionCollection.structureTypeName;
export const isMicroflow = (document: IDocument): document is Microflow => document.structureTypeName === Microflow.structureTypeName;
export const isMicroflowBase = (document: IDocument): document is MicroflowBase => document.structureTypeName === MicroflowBase.structureTypeName;
export const isMxSchema = (document: IDocument): document is MxSchema => document.structureTypeName === MxSchema.structureTypeName;
export const isNanoflow = (document: IDocument): document is Nanoflow => document.structureTypeName === Nanoflow.structureTypeName;
export const isNativeLayout = (document: IDocument): document is NativeLayout => document.structureTypeName === NativeLayout.structureTypeName;
export const isNativePage = (document: IDocument): document is NativePage => document.structureTypeName === NativePage.structureTypeName;
export const isPage = (document: IDocument): document is Page => document.structureTypeName === Page.structureTypeName;
export const isPageTemplate = (document: IDocument): document is PageTemplate => document.structureTypeName === PageTemplate.structureTypeName;
export const isPublishedAppService = (document: IDocument): document is PublishedAppService => document.structureTypeName === PublishedAppService.structureTypeName;
export const isPublishedODataService = (document: IDocument): document is PublishedODataService => document.structureTypeName === PublishedODataService.structureTypeName;
export const isPublishedRestService = (document: IDocument): document is PublishedRestService => document.structureTypeName === PublishedRestService.structureTypeName;
export const isPublishedServiceBase = (document: IDocument): document is PublishedServiceBase => document.structureTypeName === PublishedServiceBase.structureTypeName;
export const isPublishedWebService = (document: IDocument): document is PublishedWebService => document.structureTypeName === PublishedWebService.structureTypeName;
export const isRegularExpression = (document: IDocument): document is RegularExpression => document.structureTypeName === RegularExpression.structureTypeName;
export const isRemoteEntitySourceDocument = (document: IDocument): document is RemoteEntitySourceDocument => document.structureTypeName === RemoteEntitySourceDocument.structureTypeName;
export const isRule = (document: IDocument): document is Rule => document.structureTypeName === Rule.structureTypeName;
export const isScheduledEvent = (document: IDocument): document is ScheduledEvent => document.structureTypeName === ScheduledEvent.structureTypeName;
export const isServerSideMicroflow = (document: IDocument): document is ServerSideMicroflow => document.structureTypeName === ServerSideMicroflow.structureTypeName;
export const isSnippet = (document: IDocument): document is Snippet => document.structureTypeName === Snippet.structureTypeName;
export const isTemplateFormBase = (document: IDocument): document is TemplateFormBase => document.structureTypeName === TemplateFormBase.structureTypeName;
export const isXmlSchema = (document: IDocument): document is XmlSchema => document.structureTypeName === XmlSchema.structureTypeName;
