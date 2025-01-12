
<template>
  <section class="mt-10">
    <hr />
    <h2 id="ContactInfoHeader" class="form-section-heading">
      Your {{ corOrAcor }}’s Contact Information
    </h2>

    <ATATRadioGroup
      id="ContactAffiliation"
      :legend="
        'What role best describes your ' +
        corOrAcor +
        '’s affiliation with the DoD?'
      "
      :items="contactRoles"
      :value.sync="_selectedRole"
      :rules="[
        $validators.required('Please enter your ' + corOrAcor + '’s role.'),
      ]"
      class="mb-10"
      @radioButtonSelected="contactTypeChange"
    />

    <v-form ref="CORACORContactForm">
      <ATATSelect
        id="Branch"
        v-show="_selectedRole === 'MILITARY'"
        v-model="_selectedBranch"
        class="_input-max-width mb-10"
        label="Service Branch"
        placeholder=""
        :items="branchData"
        :selectedValue.sync="_selectedBranch"
        :showAccessRadioButtons.sync="_showAccessRadioButtons"
        :returnObject="true"
        :rules="[
          $validators.required(
            'Please select your ' + corOrAcor + '’s service branch.'
          ),
        ]"
      />

      <div v-show="(_selectedBranch && _selectedBranch.value) || _selectedRole === 'CIVILIAN'">
        <ATATAutoComplete
          id="Rank"
          v-show="_selectedRole === 'MILITARY'"
          label="Rank"
          titleKey="name"
          :items="selectedBranchRanksData"
          :searchFields="['name', 'grade']"
          :selectedItem.sync="_selectedRank"
          :rules="[
            $validators.required(
              'Please select your ' + corOrAcor + '’s rank.'
            ),
          ]"
          class="_input-max-width mb-7"
          icon="arrow_drop_down"
        />

        <ATATSelect
          id="Salutation"
          v-show="_selectedRole === 'CIVILIAN'"
          class="_input-max-width mb-7"
          label="Salutation"
          :optional="true"
          placeholder=""
          :items="salutationData"
          :selectedValue.sync="_selectedSalutation"
        />

        <v-row class="form-section mb-7">
          <v-col class="col-12 col-lg-3">
            <ATATTextField
              label="First name"
              id="FirstName"
              class="_input-max-width"
              :value.sync="_firstName"
              :rules="[
                $validators.required(
                  'Please enter your ' + corOrAcor + '’s first name.'
                ),
              ]"
            />
          </v-col>
          <v-col class="col-12 col-lg-3">
            <ATATTextField
              label="Middle name"
              id="MiddleName"
              :optional="true"
              class="_input-max-width"
              :value.sync="_middleName"
            />
          </v-col>
          <v-col class="col-12 col-lg-3">
            <ATATTextField
              label="Last name"
              id="LastName"
              class="_input-max-width"
              :value.sync="_lastName"
              :rules="[
                $validators.required(
                  'Please enter your ' + corOrAcor + '’s last name.'
                ),
              ]"
            />
          </v-col>
          <v-col class="col-12 col-lg-3">
            <ATATTextField
              label="Suffix"
              id="Suffix"
              :optional="true"
              width="80"
              :value.sync="_suffix"
            />
          </v-col>
        </v-row>

        <ATATPhoneInput
          id="PhoneNumber"
          label="Phone number"
          class="width-100 mb-10"
          :value.sync="_phone"
          :country.sync="_selectedPhoneCountry"
          :extensionValue.sync="_phoneExt"
          :rules="[
            $validators.required(
              'Please enter your ' + corOrAcor + '’s phone number'
            ),
            $validators.isPhoneNumberValid(this._selectedPhoneCountry),
          ]"
        />

        <ATATTextField
          id="EmailAddress"
          label="Email address"
          class="_input-max-width mb-10"
          helpText="Enter a .mil or .gov email address."
          :value.sync="_email"
          :rules="[
            $validators.required(
              'Please enter your ' + corOrAcor + '’s email address.'
            ),
            $validators.isEmail(),
          ]"
        />

        <ATATTextField
          id="DoDAAC"
          label="DoD Activity Address Code (DoDAAC)"
          class="_input-max-width"
          tooltipText="A DoDAAC is a 6-character code that uniquely identifies a 
          unit, activity, or organization that has the authority to requisition, 
          contract for, or fund/pay bills for materials and services."
          :value.sync="_dodaac"
          :mask="['^[0-9A-Za-z]{1,6}$']"
          :isMaskRegex=true
          :rules="[
            $validators.required(
              'Please enter your ' + corOrAcor + '’s 6-character DoDAAC.'
            ),
          ]"
        />
       
      </div>
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, PropSync } from "vue-property-decorator";
import ATATAutoComplete from "@/components/ATATAutoComplete.vue";
import ATATPhoneInput from "@/components/ATATPhoneInput.vue";
import ATATRadioGroup from "@/components/ATATRadioGroup.vue";
import ATATSelect from "@/components/ATATSelect.vue";
import ATATTextField from "@/components/ATATTextField.vue";

import { RadioButton, SelectData, RankData } from "../../../../types/Global";

@Component({
  components: {
    ATATAutoComplete,
    ATATPhoneInput,
    ATATRadioGroup,
    ATATSelect,
    ATATTextField,
  },
})
export default class ContactInfoForm extends Vue {
  $refs!: {
    CORACORContactForm: Vue & {
      resetValidation: () => void;
      reset: () => void;
    };
  };

  //props

  @Prop() private corOrAcor!: string;
  @Prop() private branchData!: SelectData[];
  @Prop() private selectedBranchRanksData!: SelectData[];
  @Prop() private contactRoles!: RadioButton[];

  @PropSync("showAccessRadioButtons") private _showAccessRadioButtons!: boolean;
  @PropSync("selectedPhoneCountry") private _selectedPhoneCountry?: string;

  @PropSync("selectedRole") private _selectedRole?: string;
  @PropSync("selectedRank") private _selectedRank?: RankData;
  @PropSync("selectedBranch") private _selectedBranch?: SelectData;
  @PropSync("selectedSalutation") private _selectedSalutation?: SelectData;
  @PropSync("firstName") private _firstName?: string;
  @PropSync("middleName") private _middleName?: string;
  @PropSync("lastName") private _lastName?: string;
  @PropSync("suffix") private _suffix?: string;
  @PropSync("email") private _email?: string;
  @PropSync("phone") private _phone?: string;
  @PropSync("phoneExt") private _phoneExt?: string;
  @PropSync("dodaac") private _dodaac?: string;

  // data

  private salutationData: SelectData[] = [
    { text: "Mr.", value: "MR" },
    { text: "Mrs.", value: "MRS" },
    { text: "Miss", value: "MISS" },
    { text: "Ms.", value: "MS" },
    { text: "Dr.", value: "DR" },
  ];

  private loaded = false;
  private contactTypeChange(): void {
    if (this.loaded) {
      this.resetData();
    }
    this.loaded = true;
  }

  public resetData(): void {
    Vue.nextTick(() => {
      //iterate over the forms children ref manually set their 'errorMessages' array to empty
      const formChildren = this.$refs.CORACORContactForm.$children;

      formChildren.forEach((ref)=> {
        ((ref as unknown) as {errorMessages:[], _value: string}).errorMessages = [];
      });
      Vue.nextTick(() => {
        this.$refs.CORACORContactForm.reset();
        this.$refs.CORACORContactForm.resetValidation();
      });
    });
  }
}
</script>
