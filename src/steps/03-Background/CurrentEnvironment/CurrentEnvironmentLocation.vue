<template>
  <v-container class="container-max-width" fluid>
    <v-row>
      <v-col class="col-12">
        <h1 class="page-header mb-3">
          Where is your current environment located?
        </h1>
        <div class="copy-max-width">
          <p class="mb-10">
            If you have instances in a hybrid environment, then we will gather details about the
            location for each instance later.
          </p>
          <ATATRadioGroup
            id="EnvLocationButtons"
            :card="true"
            :items="envLocationOption"
            :rules="[$validators.required('Please select an option')]"
            :value.sync="currentEnvironmentLocation"
            class="copy-max-width mb-10 max-width-740"
            name="radioButton-card"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">

import { Component, Mixins } from "vue-property-decorator";
import { RadioButton } from "../../../../types/Global";
import SaveOnLeave from "@/mixins/saveOnLeave";
import AcquisitionPackage, { StoreProperties } from "@/store/acquisitionPackage";
import { CurrentEnvironmentDTO } from "@/api/models";
import { hasChanges } from "@/helpers";
import ATATRadioGroup from "@/components/ATATRadioGroup.vue";

@Component({
  components: {
    ATATRadioGroup,
  },
})
export default class CurrentEnvironmentLocation extends Mixins(SaveOnLeave) {
  /* eslint-disable camelcase */
  public currentEnvironmentLocation
    = AcquisitionPackage.currentEnvironment?.additional_information || ""
  private envLocationOption: RadioButton[] = [
    {
      id: "CloudComputingEnvironment",
      label: "Cloud computing environment",
      value: "Cloud computing environment",
      description: `Instances are hosted by a third-party provider in an
       off-site, cloud-based server.`
    },
    {
      id: "OnPremises",
      label: "On-premises",
      value: "On-premises",
      description: "Instances are deployed in-house and within an enterprise IT infrastructure.",
    },
    {
      id: "HybridCloudEnvironment",
      label: "Hybrid cloud environment",
      value: "Hybrid cloud environment",
      description: `Computing environment that combines an on-premises datacenter (private cloud)
       with a public cloud, allowing data and applications to be shared between them.`,
    },
  ];
  private savedData: CurrentEnvironmentDTO = {
    additional_information: "",
  }

  private get currentData(): CurrentEnvironmentDTO {
    return {
      additional_information: this.currentEnvironmentLocation || "",
    };
  }

  public async loadOnEnter(): Promise<void> {
    const storeData = await AcquisitionPackage
      .loadData<CurrentEnvironmentDTO>(
        {storeProperty: StoreProperties.CurrentEnvironment}
      );
    if (storeData) {
      this.savedData = {
        additional_information: storeData.additional_information,
      }
    }
  }

  public async mounted(): Promise<void> {
    await this.loadOnEnter();
  }

  protected async saveOnLeave(): Promise<boolean> {
    try {
      if (this.hasChanged()) {
        await AcquisitionPackage.saveData<CurrentEnvironmentDTO>({
          data: this.currentData,
          storeProperty: StoreProperties.CurrentEnvironment
        });
      }
    } catch (error) {
      console.log(error);
    }

    return true;
  }

  private hasChanged(): boolean {
    return hasChanges(this.currentData, this.savedData);
  }
}
</script>

