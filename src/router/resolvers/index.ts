import AcquisitionPackage from "@/store/acquisitionPackage";
import GovtFurnishedEquipment from "@/store/govtFurnishedEquipment";
import OtherContractConsiderations from "@/store/otherContractConsiderations";

import { routeNames } from "../stepper";
import { StepRouteResolver } from "@/store/steps/types";

export const AcorsRouteResolver = (current: string): string => {
  const hasAlternativeContactRep = AcquisitionPackage.hasAlternativeContactRep;

  //routing from alternate cor and the user does not have
  //and alternatative contact rep
  if (
    current === routeNames.Alternate_Cor &&
    hasAlternativeContactRep === false
  ) {
    return routeNames.Summary;
  }

  //routing from summary and user does not have
  if (current === routeNames.Summary && hasAlternativeContactRep === false) {
    return routeNames.Alternate_Cor;
  }

  return routeNames.Acor_Information;
};

export const CustodianRouteResolver = (current: string): string => {
  const needsPropertyCustodian = GovtFurnishedEquipment.needsPropertyCustodian;

  // if government equipment will be furnished, route to Property Custodian page
  if (
    current === routeNames.Will_Govt_Equip_Be_Furnished &&
    needsPropertyCustodian
  ) {
    return routeNames.Property_Custodian;
  }

  // else stay on same page until next step after Property Custodian is completed
  alert(
    'Business rule is to skip Property Custodian page if answer is "No" (or unanswered) here. ' +
      "Navigation will temporarily stay on this page until the substep after Property " +
      'Custodian has been completed. Select "Yes" to continue to Property Custodian page.'
  );
  // todo - change this routeName when page after Property Custodian is completed
  return routeNames.Will_Govt_Equip_Be_Furnished;
};

export const CurrentContractRouteResolver = (current: string): string => {
  const hasCurrentContract 
    = AcquisitionPackage.currentContract?.current_contract_exists === "true";
  if (hasCurrentContract) {
    return routeNames.Current_Contract_Details;
  }
  return current === routeNames.Current_Contract
    ? routeNames.Performance_Requirements
    : routeNames.Current_Contract;
};

export const PIIRecordResolver = (current: string): string => {
  const hasSystemOfRecord = OtherContractConsiderations.PIIRecordIncluded;
  // if system of record will be included, route to system of records page
  if (hasSystemOfRecord) {
    return routeNames.PIIRecord;
  }
  return current === routeNames.PII ? routeNames.BAA : routeNames.PII;
};

export const FOIARecordResolver = (current: string): string => {
  const needsFOIACoordinator 
    = AcquisitionPackage.sensitiveInformation?.potential_to_be_harmful === "true";
  // if user selects "Yes" on FOIA (Public Disclosure of Information) page,
  // then need to collect information about the FOIA Coordinator
  if (needsFOIACoordinator) {
    return routeNames.FOIA_Coordinator;
  }
  return current === routeNames.FOIA
    ? routeNames.Public_Disclosure_of_Information
    : routeNames.FOIA;
};


// add resolver here so that it can be found by invoker
const resolvers: Record<string, StepRouteResolver> = {
  AcorsRouteResolver,
  CurrentContractRouteResolver,
  CustodianRouteResolver,
  PIIRecordResolver,
  FOIARecordResolver,
};

export const InvokeResolver = (
  resolverName: string,
  currentStep: string
): string => resolvers[resolverName](currentStep);
