import AcquisitionPackage from "@/store/acquisitionPackage";
import DescriptionOfWork from "@/store/descriptionOfWork";

import router from "@/router";

const actionHandlerNames = {
  sampleAdditionalButtonAction: "sampleAdditionalButtonAction",
  deleteServiceOfferingGroup: "deleteServiceOfferingGroup",
  confirmComputeDeletion: "confirmComputeDeletion",
}

const actions =  {
  [actionHandlerNames.sampleAdditionalButtonAction]: sampleAdditionalButtonAction,
  [actionHandlerNames.deleteServiceOfferingGroup]: deleteServiceOfferingGroup,
  [actionHandlerNames.confirmComputeDeletion]: confirmComputeDeletion,
};

async function actionHandler(actionName: string, actionArgs: string[]): Promise<void> {
  await actions[actionName](actionArgs);
} 

function sampleAdditionalButtonAction(actionArgs: string[]) {
  // commented code for demonstration purposes only
  // console.log('args in actionHandler:', actionArgs);
  // const [foo, bar] = actionArgs;
  // console.log("in action-handler: foo: " + foo + "bar: " + bar);
  AcquisitionPackage.sampleAdditionalButtonActionInStore(actionArgs);
  alert("\"Cancel\" will navigate to JWCC intro when completed.");
}

// used in Performance Requirements when user clicks "I don't need these cloud resources" button
async function deleteServiceOfferingGroup() {
  await DescriptionOfWork.removeCurrentOfferingGroup();

  router.push({
    name: "pathResolver",
    params: {
      resolver: "OfferGroupOfferingsPathResolver",
      direction: "next"
    },
  }).catch(() => console.log("avoiding redundant navigation"));
}

// used in Compute when user clicks "I don't need compute resources" button
async function confirmComputeDeletion() {
  DescriptionOfWork.setConfirmOtherOfferingDelete(true);
}

export default actionHandler;
