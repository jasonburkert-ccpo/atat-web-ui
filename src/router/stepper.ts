import {StepperRouteConfig, StepperStep} from "../../types/Global";


// Step 1 - Acquisition Package Details
import AcquisitionPackageDetails from "../steps/01-AcquisitionPackageDetails/Index.vue";
import ProjectOverview from "../steps/01-AcquisitionPackageDetails/ProjectOverview.vue";
import ContactInfo from "../steps/01-AcquisitionPackageDetails/ContactInfo.vue";
import OrganizationInfo from "../steps/01-AcquisitionPackageDetails/Organization.vue";
import CorInfo from "../steps/01-AcquisitionPackageDetails/COR_ACOR/CorInfo.vue";
import AcorInfo from "../steps/01-AcquisitionPackageDetails/COR_ACOR/AcorInfo.vue";
import AlternateCOR from "../steps/01-AcquisitionPackageDetails/COR_ACOR/AlternateCOR.vue";
import Summary from "../steps/Summary.vue";

// Step 2 - Fair Opportunity Process
import FairOpportunityProcess from "../steps/02-FairOpportunityProcess/Index.vue"
import Exceptions from "../steps/02-FairOpportunityProcess/Exceptions.vue";
import JustificationAndApproval from 
  "../steps/02-FairOpportunityProcess/JustificationAndApproval.vue";

//Step 3 - Background
import Background from "../steps/03-Background/Index.vue";
import CurrentContract from "../steps/03-Background/CurrentContract/CurrentContract.vue";
import CurrentContractDetails from 
  "../steps/03-Background/CurrentContract/CurrentContractDetails.vue";
import CurrentEnvironment 
  from "../steps/03-Background/CurrentEnvironment/CurrentEnvironment.vue";

// Step 4 - Performance requirements
import PerformanceRequirements from "../steps/04-PerformanceRequirements/Index.vue"
import OptimizeCurrentEnvironment from 
  "../steps/04-PerformanceRequirements/OptimizeCurrentEnvironment.vue";
import AnythingAsAServiceXaas from "../steps/04-PerformanceRequirements/AnythingAsAServiceXaas.vue";
import CloudSupportPackages from "../steps/04-PerformanceRequirements/CloudSupportPackages.vue";

// Step 5 - Contract Details
import ContractDetails from "../steps/05-ContractDetails/Index.vue";
import PeriodOfPerformance from "../steps/05-ContractDetails/PeriodOfPerformance.vue";
import RecurringRequirement from "../steps/05-ContractDetails/RecurringRequirement.vue";
import ContractType from "../steps/05-ContractDetails/ContractType.vue";
import ConflictOfInterest from "../steps/05-ContractDetails/ConflictOfInterest.vue";
import PackagingPackingAndShipping from 
  "../steps/05-ContractDetails/PackagingPackingAndShipping.vue";
import Training from "../steps/05-ContractDetails/Training.vue";
import POPStart from "@/steps/05-ContractDetails/POPStart.vue";
import TrainingPage1 from "@/steps/05-ContractDetails/TainingPage1.vue";


// Step 6 - Government Furnished Equipment
import GovtFurnishedEquipment from "../steps/06-GovtFurnishedEquipment/Index.vue"
import PropertyDetails from "../steps/06-GovtFurnishedEquipment/PropertyDetails.vue";
import Justification from "../steps/06-GovtFurnishedEquipment/Justification.vue";

// step 7 - Other Contract Considerations
import OtherContractConsiderations from "../steps/07-OtherContractConsiderations/Index.vue";
import PII from "../steps/07-OtherContractConsiderations/PII.vue";
import BAA from "../steps/07-OtherContractConsiderations/BAA.vue";
import PIIRecord from "../steps/07-OtherContractConsiderations/PIIRecord.vue";
import FOIA from "../steps/07-OtherContractConsiderations/FOIA.vue";
import FOIACoordinator from "../steps/07-OtherContractConsiderations/FOIACoordinator.vue";
import Section508Standards from "../steps/07-OtherContractConsiderations/Section508Standards.vue";
import Section508AccessibilityRequirements
  from "../steps/07-OtherContractConsiderations/Section508AccessibilityRequirements.vue"

// step 8 - Evaluation Criteria
import EvaluationCriteria from "../steps/08-EvaluationCriteria/Index.vue"
import EvaluationCriteriaStepOne from "../steps/08-EvaluationCriteria/EvaluationCriteriaStepOne.vue"

// step 9 - Classification Requirements
import ClassificationRequirements from "../steps/09-ClassificationRequirements/Index.vue"
import ClassificationRequirementsStepOne 
  from "../steps/09-ClassificationRequirements/ClassificationRequirementsStepOne.vue"

// step 10 - Financial Details
import FinancialDetails from "../steps/10-FinancialDetails/Index.vue";
import RequirementsCostEstimate from "../steps/10-FinancialDetails/RequirementsCostEstimate.vue";
import FundingPlan from "../steps/10-FinancialDetails/FundingPlan.vue";
import SeverabilityAndIncrementalFunding 
  from "../steps/10-FinancialDetails/SeverabilityAndIncrementalFunding.vue";

import ReviewRequiredForms from "../steps/11-ReviewRequiredForms/Index.vue";
import ReviewRequiredFormsStepOne 
  from "../steps/11-ReviewRequiredForms/ReviewRequiredFormsStepOne.vue";

import {
  AcorsRouteResolver,
  CurrentContractRouteResolver,
  PIIRecordResolver,
  FOIARecordResolver,
  A11yRequirementResolver,
} from "./resolvers";

export const routeNames = {
  ProjectOverview: "Project_Overview",
  OrganizationInfo: "Organization_Info",
  ContactInformation: "Contact_Information",
  CorInformation: "Cor_Information",
  AlternateCor: "Alternate_Cor",
  AcorInformation: "Acor_Information",
  ExistingContractBackground: "Existing_Contract_Background",
  Summary: "Summary",
  FairOpportunity: "Fair_Opportunity",
  Exceptions: "Exceptions",
  JustificationAndApproval: "Justification_and_Approval",
  Background: "Background",
  CurrentContract: "Current_Contract",
  CurrentContractDetails: "Current_Contract_Details",
  CurrentEnvironment:"Current_Environment",
  PerformanceRequirements: "Performance_Requirements",
  OptimizeCurrentEnvironment: "Optimize_Current_Environment",
  AnythingASAServiceXaas:"Anything_as_a_Service_Xaas",
  CloudSupportPackages: "Cloud_Support_Packages",
  PeriodOfPerformance: "Period_Of_Performance",
  RecurringRequirement: "Recurring_Requirement",
  ContractType: "Contract_Type",
  ConflictOfInterest: "Conflict_of_Interest",
  PackagingPackingAndShipping: "Packaging_Packing_and_Shipping",
  Training: "Training",
  PropertyDetails: "Property_Details",
  Justification: "Justification",
  OtherContractConsiderations: "Other_Contract_Considerations",
  PII: "PII",
  BAA: "BAA",
  PIIRecord: "PIIRecord",
  FinancialDetails: "Financial_Details",
  FOIA: "FOIA",
  FOIACoordinator: "FOIA_Coordinator",
  Section508Standards: "Section_508_Standards",
  EvaluationCriteria: "Evaluation_Criteria",
  EvaluationCriteriaStepOne: "Evaluation_Criteria_Step_One",
  ClassificationRequirements: "Classification_Requirements",
  ClassificationRequirementsStepOne: "Classification_Requirements_Step_One",
  RequirementsCostEstimate: "Requirements_Cost_Estimate",
  FundingPlan: "Funding_Plan",
  SeverabilityAndIncrementalFunding: "Severability_And_Incremental_Funding",
  ReviewRequiredForms: "Review_Required_Forms",
  ReviewRequiredFormsStepOne: "Review_Required_Forms_Step_One",
  POPStart: "POP_Start",
  Section508AccessibilityRequirements: "Section_508_Accessibility_Requirements",
  TrainingPage1: "Training_Page_1"
};

/**
 * Stepper Route config definition
 * The menu items defined in this route drive both the Side Stepper Menu
 * and the Steps store both which invoke routing
 * Rules:
 * 1. Parent steps cannot have a name
 * 2. Parent steps need a page component with a router view defined
 * 3. All steps needs to have unique names
 * 4. If a stepper route isn't meant to be rendered set it's 'excludeFromMenu' value to true
 */
export const stepperRoutes: Array<StepperRouteConfig> = [
  {
    stepNumber: "01",
    menuText: "Acquisition Package Details",
    path: "/", // should be same as first substep route
    completePercentageWeight: 14,
    component: AcquisitionPackageDetails,
    completed: true,
    children: [
      {
        menuText: "Project Overview",
        path: "/", // should be same as parent route
        name: routeNames.ProjectOverview,
        completePercentageWeight: 4,
        completed: true,
        component: ProjectOverview,
        additionalButtons: [
          {
            name: routeNames.ProjectOverview,
            buttonText: "Cancel",
            buttonId: "CancelButton",
            buttonClass: "tertirary",
            emitText: "sampleEmitText",
            actionName: "sampleAdditionalButtonAction",
            actionArgs: ["foo", "bar"],
          },
        ],
      },
      {
        menuText: "Organization",
        path: "organization-info",
        name: routeNames.OrganizationInfo,
        completed: true,
        completePercentageWeight: 5,
        component: OrganizationInfo,
      },
      {
        menuText: "Contact Information",
        path: "contact-info",
        name: routeNames.ContactInformation,
        completePercentageWeight: 5,
        completed: true,
        component: ContactInfo,
      },
      {
        menuText: "Cor Info",
        path: "cor-info",
        name: routeNames.CorInformation,
        excludeFromMenu: true,
        completePercentageWeight: 5,
        component: CorInfo,
      },
      {
        menuText: "Alternate COR",
        path: "alt-cor",
        name: routeNames.AlternateCor,
        excludeFromMenu: true,
        component: AlternateCOR,
      },
      {
        menuText: "Acors",
        path: "acor-info",
        name: routeNames.AcorInformation,
        excludeFromMenu: true,
        completePercentageWeight: 5,
        component: AcorInfo,
        routeResolver: AcorsRouteResolver,
      },
      {
        menuText: "Summary",
        path: "summary",
        name: routeNames.Summary,
        excludeFromMenu: true,
        completePercentageWeight: 5,
        component: Summary,
        backButtonText: "Sample different Back text",
      }
    ],
  },
  {
    stepNumber: "02",
    menuText: "Fair Opportunity Process",
    path: "/exceptions",
    completePercentageWeight: 10,
    component: FairOpportunityProcess,
    completed: false,
    children: [
      {
        menuText: "Exceptions",
        path: "exceptions",
        name: routeNames.Exceptions,
        component: Exceptions,
        completePercentageWeight: 5,
        completed: false,
      },
      {
        menuText: "Justification and Approval",
        path: "justification-and-approval",
        name: routeNames.JustificationAndApproval,
        component: JustificationAndApproval,
        completePercentageWeight: 5,
        completed: false,
      },
    ],
  },
  {
    stepNumber: "03",
    menuText: "Background",
    path: "/current-contract",
    completePercentageWeight: 10,
    component: Background,
    completed: false,
    children: [
      {
        menuText: "Current Contract",
        path: "current-contract",
        name: routeNames.CurrentContract,
        completePercentageWeight: 0,
        component: CurrentContract,
        completed: false,
      },
      {
        menuText: "Details",
        path: "current-contract-details",
        excludeFromMenu: true,
        name: routeNames.CurrentContractDetails,
        completePercentageWeight: 0,
        component: CurrentContractDetails,
        completed: false,
        routeResolver: CurrentContractRouteResolver,
        additionalButtons: [
          {
            buttonText: "I don’t have an existing contract",
            buttonId: "NoExistingContract",
            buttonClass: "secondary",
            name: routeNames.PerformanceRequirements,
          },
        ],
      },
      {
        menuText: "Current Environment",
        path: "current-environment",
        name: routeNames.CurrentEnvironment,
        component: CurrentEnvironment,
        completePercentageWeight: 5,
        completed: false,
      },
    ]
  },
  {
    stepNumber: "04",
    component: PerformanceRequirements,
    completePercentageWeight: 7,
    menuText: "Performance Requirements",
    path: "/optimize_current_environment",
    completed: false,
    children: [
      {
        menuText: "Optimize Current Environment?",
        path: "optimize_current_environment",
        name: routeNames.OptimizeCurrentEnvironment,
        component: OptimizeCurrentEnvironment,
        completePercentageWeight: 0,
        completed: false,
      },
      {
        menuText: "Anything as a Service (Xaas)",
        path: "anything_as_a_service_xaas",
        name: routeNames.AnythingASAServiceXaas,
        component: AnythingAsAServiceXaas,
        completePercentageWeight: 0,
        completed: false,
      },
      {
        menuText: "Cloud Support Packages",
        path: "cloud-support-packages",
        name: routeNames.CloudSupportPackages,
        component: CloudSupportPackages,
        completePercentageWeight: 0,
        completed: false,
      },
    ],
  },
  {
    stepNumber: "05",
    completePercentageWeight: 7,
    menuText: "Contract Details",
    path: "/period-of-performance",
    component: ContractDetails,
    children: [
      {
        name: routeNames.PeriodOfPerformance,
        menuText: "Period of Performance",
        path: "period-of-performance",
        completePercentageWeight: 2,
        component: PeriodOfPerformance,
      },
      {
        name: routeNames.POPStart,
        menuText: "Period of Performance Start Date",
        path: "period-of-performance-start-date",
        excludeFromMenu: true,
        completePercentageWeight: 2,
        component: POPStart,
      },
      {
        name: routeNames.RecurringRequirement,
        menuText: "Recurring Requirement",
        excludeFromMenu: true,
        path: "recurring-requirement",
        completePercentageWeight: 2,
        component: RecurringRequirement,
      },
      {
        name: routeNames.ContractType,
        menuText: "Contract Type",
        excludeFromMenu: true,
        path: "contract-type",
        completePercentageWeight: 2,
        component: ContractType,
      },
      {
        name: routeNames.ConflictOfInterest,
        menuText: "Conflict of Interest",
        path: "conflict-of-interest",
        completePercentageWeight: 2,
        component: ConflictOfInterest,
      },
      {
        name: routeNames.PackagingPackingAndShipping,
        menuText: "Packaging, Packing, and Shipping",
        path: "packaging-packing-and-shipping",
        completePercentageWeight: 2,
        component: PackagingPackingAndShipping,
      },
      {
        name: routeNames.TrainingPage1,
        menuText: "Training",
        path: "training",
        completePercentageWeight: 2,
        component: TrainingPage1,
      },

    ]
  },
  {
    stepNumber: "06",
    completePercentageWeight: 7,
    menuText: "Government Furnished Equipment",
    path: "/property-details",
    component: GovtFurnishedEquipment,
    children: [
      {
        name: routeNames.PropertyDetails,
        menuText: "Property Details",
        path: "property-details",
        completePercentageWeight: 2,
        component: PropertyDetails,
      },
      {
        name: routeNames.Justification,
        menuText: "Justification",
        path: "justification",
        completePercentageWeight: 2,
        component: Justification,
      },
    ]
  },
  {
    stepNumber: "07",
    completePercentageWeight: 7,
    menuText: "Other Contract Considerations",
    path: "/personally-identifiable-information",
    component: OtherContractConsiderations,
    children: [
      {
        menuText: "Personally Identifiable Information (PII)",
        path: "/personally-identifiable-information",
        name: routeNames.PII,
        completePercentageWeight: 2,
        component: PII,
      },
      {
        menuText: "system of record",
        path: "/system-of-record",
        name: routeNames.PIIRecord,
        completePercentageWeight: 2,
        component: PIIRecord,
        excludeFromMenu: true,
        routeResolver: PIIRecordResolver
      },
      {
        menuText: "Business Associate Agreement (BAA)",
        path: "/business-associate-agreement",
        name: routeNames.BAA,
        completePercentageWeight: 2,
        component: BAA,
      },
      {
        menuText: "Public Disclosure of Information",
        path: "/foia",
        name: routeNames.FOIA,
        completePercentageWeight: 2,
        component: FOIA,
      },
      {
        menuText: "FOIA Coordinator",
        path: "/foia-coordinator",
        name: routeNames.FOIACoordinator,
        completePercentageWeight: 2,
        excludeFromMenu: true,
        component: FOIACoordinator,
        routeResolver: FOIARecordResolver
      },
      {
        menuText: "Section 508 Standards",
        path: "/508-standards",
        name: routeNames.Section508Standards,
        completePercentageWeight: 2,
        component: Section508Standards,
      },
      {
        menuText: "Section 508 Accessibility Requirements",
        path: "/508-accessibility-reqs",
        name: routeNames.Section508AccessibilityRequirements,
        excludeFromMenu: true,
        completePercentageWeight: 2,
        component: Section508AccessibilityRequirements,
        routeResolver: A11yRequirementResolver
      },

    ]
  },
  {
    stepNumber: "08",
    completePercentageWeight: 7,
    menuText: "Evaluation Criteria",
    path: "/evaluation-criteria",
    component: EvaluationCriteria,
    children: [
      {
        menuText: "Evaluation Criteria",
        path: "evaluation-criteria",
        excludeFromMenu: true,
        name: routeNames.EvaluationCriteriaStepOne,
        completePercentageWeight: 1,
        component: EvaluationCriteriaStepOne,
      },
    ],
  },
  {
    stepNumber: "09",
    completePercentageWeight: 7,
    menuText: "Classification Requirements",
    path: "/classification-requirements",
    component: ClassificationRequirements,
    children: [
      {
        menuText: "Classification Requirements",
        path:"classification-requirements",
        excludeFromMenu: true,
        name: routeNames.ClassificationRequirementsStepOne,
        completePercentageWeight: 1,
        component: ClassificationRequirementsStepOne,
      },
    ],
  },
  {
    stepNumber: "10",
    completePercentageWeight: 7,
    menuText: "Financial Details",
    path: "/requirements-cost-estimate",
    component: FinancialDetails,
    children: [
      {
        menuText: "Requirements Cost Estimate",
        path: "requirements-cost-estimate",
        name: routeNames.RequirementsCostEstimate,
        completePercentageWeight: 1,
        component: RequirementsCostEstimate,
      },
      {
        menuText: "Funding Plan",
        path: "funding-plan",
        name: routeNames.FundingPlan,
        completePercentageWeight: 1,
        component: FundingPlan,
      },
      {
        menuText: "Severability and Incremental Funding",
        path: "severability-and-incremental-funding",
        name: routeNames.SeverabilityAndIncrementalFunding,
        completePercentageWeight: 1,
        component: SeverabilityAndIncrementalFunding,
      },
    ]
  },
  {
    stepNumber: "11",
    completePercentageWeight: 7,
    menuText: "Review Required Forms",
    path: "/review-required-forms",
    component: ReviewRequiredForms,
    children: [
      {
        menuText: "Step One",
        path:"review-required-forms",
        excludeFromMenu: true,
        name: routeNames.ReviewRequiredFormsStepOne,
        completePercentageWeight: 1,
        component: ReviewRequiredFormsStepOne,
      },
    ],
  },
];

/**
 * Helper method to convert Stepper Route
 * to Stepper Step
 * @param stepperRouteConfig
 * @returns StepperStep
 */
const mapStepRouteToStepperData = (
  stepperRouteConfig: StepperRouteConfig
): StepperStep => {
  const {
    completePercentageWeight,
    excludeFromMenu,
    completed,
    menuText,
    path,
    stepNumber,
    additionalButtons,
    backButtonText,
  } = stepperRouteConfig;

  let {name} = stepperRouteConfig;
  name = name || "";

  const stepperStep: StepperStep = {
    stepNumber,
    menuText,
    excludeFromMenu,
    name,
    completed,
    completePercentageWeight,
    route: path,
    subSteps: stepperRouteConfig.children?.map((child) =>
      mapStepRouteToStepperData(child)
    ),
    additionalButtons,
    backButtonText,
  };
  return stepperStep;
};

export const buildStepperData = (): StepperStep[] =>
  stepperRoutes.map((step) => mapStepRouteToStepperData(step));
