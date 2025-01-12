<template>
  <v-container class="container-max-width" fluid>
    <v-row>
      <v-col class="col-12">
        <h1 class="page-header mb-3">
          Do you have an existing environment?
        </h1>
        <div class="copy-max-width">
          <p class="mb-10">
            If you select “Yes” below, we’ll gather details about your current compute resources
            next. This info will be included in your Description of Work to provide CSPs with a
            better understanding of what currently exists. This environment may not align with your
            current needs for this acquisition, but you’ll have an opportunity to tell us about your
            performance requirements later.
          </p>
          <ATATRadioGroup
            id="ExistingEnvOptions"
            :card="true"
            :items="existingEnvOption"
            :rules="[$validators.required('Please select an option')]"
            :value.sync="currentEnvironmentExists"
            class="copy-max-width mb-10 max-width-740"
            width="180"

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
export default class CurrentEnvironment extends Mixins(SaveOnLeave) {
  private existingEnvOption: RadioButton[] = [
    {
      id: "Yes",
      label: "Yes.",
      value: "true",
    },
    {
      id: "No",
      label: "No.",
      value: "false",
    },
  ];
  public currentEnvironmentExists
    = AcquisitionPackage.currentEnvironment?.current_environment_exists || ""
  private get currentData(): CurrentEnvironmentDTO {
    return {
      // eslint-disable-next-line camelcase
      current_environment_exists: this.currentEnvironmentExists || "",
    };
  }

  private savedData: CurrentEnvironmentDTO = {
    // eslint-disable-next-line camelcase
    current_environment_exists: "",
  }

  private hasChanged(): boolean {
    return hasChanges(this.currentData, this.savedData);
  }

  public async loadOnEnter(): Promise<void> {
    const storeData = await AcquisitionPackage
      .loadData<CurrentEnvironmentDTO>(
        { storeProperty: StoreProperties.CurrentEnvironment }
      );
    if (storeData) {
      this.savedData = {
        // eslint-disable-next-line camelcase
        current_environment_exists: storeData.current_environment_exists,
      }
    }
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

  public async mounted(): Promise<void> {
    await this.loadOnEnter();
  }
}
</script>

