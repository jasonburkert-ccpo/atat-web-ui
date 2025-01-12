<template>
    <v-container fluid class="container-max-width">
      <v-row>
        <v-col class="col-12">
          <h1 class="page-header mb-3">
            Do you have a current contract for this effort?
          </h1>
          <div class="copy-max-width">
            <p class="mb-10">
              If your acquisition is a follow-on requirement, 
              we’ll gather some details about your contract next.
            </p>
            <ATATRadioGroup                                  
              class="copy-max-width mb-10 max-width-740"
              id="currentContractOptions"
              :card="true"
              :items="currentContractOptions" 
              :value.sync="currentContractExists"
              :rules="[$validators.required('Please select an option')]"            
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { Component, Mixins } from "vue-property-decorator";

import ATATRadioGroup from "@/components/ATATRadioGroup.vue"

import { RadioButton } from "../../../../types/Global";
import AcquisitionPackage, {StoreProperties} from "@/store/acquisitionPackage";
import SaveOnLeave from "@/mixins/saveOnLeave";
import { ContractTypeDTO, CurrentContractDTO } from "@/api/models";
import { hasChanges } from "@/helpers";

@Component({
  components: {
    ATATRadioGroup,
  },
})

export default class CurrentContract extends Mixins(SaveOnLeave) {
  private currentContractOptions: RadioButton[] = [
    {
      id: "Yes",
      label: "Yes. There is a current contract for this effort.",
      value: "YES",
    },
    {
      id: "No",
      label: "No. This is a new requirement.",
      value: "NO",
    },
  ];

  public currentContractExists 
    = AcquisitionPackage.currentContract?.current_contract_exists || "";

  private get currentData(): CurrentContractDTO {
    return {
      current_contract_exists: this.currentContractExists,
    };
  }

  private savedData: CurrentContractDTO = { 
    current_contract_exists: "" 
  };

  public async mounted(): Promise<void> {
    await this.loadOnEnter();
  }

  public async loadOnEnter(): Promise<void> {
    const storeData = await AcquisitionPackage.
      loadData<CurrentContractDTO>({storeProperty: StoreProperties.CurrentContract})
    if (storeData) {
      if (Object.prototype.hasOwnProperty.call(storeData, 'current_contract_exists')) {
        this.savedData = {
          current_contract_exists: storeData.current_contract_exists,
        }
      }
    } else {
      AcquisitionPackage.setCurrentContract(this.currentData);
    }
  }

  private hasChanged(): boolean {
    return hasChanges(this.currentData, this.savedData);
  }

  protected async saveOnLeave(): Promise<boolean> {
    try {
      if (this.hasChanged()) {
        await AcquisitionPackage.saveData<CurrentContractDTO>({data: this.currentData,
          storeProperty: StoreProperties.CurrentContract});
      }
    } catch (error) {
      console.log(error);
    }

    return true;
  }

}
</script>
