<template>
  <div id="SearchWrapper">

    <div class="d-flex align-center mb-2" v-if="label">
      <label
        :id="id + '_Label'"
        class="form-field-label mr-1"
        :for="id + '_SearchInput'"
      >
        {{ label }}
      </label>
      <ATATTooltip 
        :tooltipText="tooltipText"
        :tooltipTitle="tooltipTitle"
        :id="id"
        :label="label"
      />
    </div>
    <div 
      class="d-flex"
      :style="'width: ' + width + 'px'"
    >
      <v-text-field
        ref="atatSearchInput"
        :id="id + '_SearchInput'"
        class="_search-input"
        clearable
        @input="onInput"
        outlined
        dense
        :height="40"
        :value.sync="_value"
        :placeholder="placeHolder"
        :rules="rules"
        :validate-on-blur="validateOnBlur"
        @update:error="setErrorMessage"
        @click:clear="clearErrorMessages"
        @blur="onBlur"
        autocomplete="off"
        @keydown.enter="search"
      />
      <v-btn
        :id="id + '_SearchButton'" 
        class="primary _search-button"
        @click="search"

      >
        <ATATSVGIcon 
          name="search"
          color="white"
          width="18"
          height="18"
        />
      </v-btn>
    </div>

    <div class="max-width-500 mt-3" v-show="errorMessages.length">
      <ATATErrorValidation :errorMessages="errorMessages" />
    </div>

    <div v-if="helpText && showHelpText" class="help-text mt-2">
      {{ helpText }}
    </div>

    <div id="Progress" v-show="showLoader" class="mt-4">
      <v-progress-circular
        indeterminate
        color="#544496"
        size="24"
        width="3"
        class="mr-2"
      />
      <span class="text-base">
        Locating your order in {{ searchType }}
      </span>
    </div>

    <ATATAlert
      :id="id + '_SearchAlertError'"
      type="error"
      v-show="showErrorAlert"
      maxWidth="740"
      class="mt-5"
    >
      <template v-slot:content>
        <p>
          We could not find your order within {{ searchType }}. Please enter a valid
          order number and search again.
        </p>
        <p class="mb-0">
          If you confirmed your order number within {{ searchType }} and continue to
          receive this message, please reach out to our User Engagement Team for
          support.
        </p>
      </template>
    </ATATAlert>

    <ATATAlert
      :id="id + '_SearchAlertSuccess'"
      type="success"
      v-show="showSuccessAlert"
      maxWidth="740"
      class="mt-5"
    >
      <template v-slot:content>
        <p class="mb-0">
          Good news! We found your order within {{ searchType }} and synced your funding
          details with this acquisition.          
        </p>
      </template>
    </ATATAlert>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, PropSync, Watch } from "vue-property-decorator";
import ATATAlert from "@/components/ATATAlert.vue";
import ATATTooltip from "@/components/ATATTooltip.vue"
import ATATSVGIcon from "@/components/icons/ATATSVGIcon.vue";
import ATATErrorValidation from "@/components/ATATErrorValidation.vue";
import api from "@/api";

import { mask } from "types/Global";
import Inputmask from "inputmask/";

@Component({
  components: {
    ATATAlert,
    ATATSVGIcon,
    ATATTooltip,
    ATATErrorValidation,
  },
})

export default class ATATSearch extends Vue {

  $refs!: {
    atatSearchInput: Vue & { 
      errorBucket: string[]; 
      errorCount: number 
      resetValidation(): void
    };
  }; 

  @Prop({ default: "Search" }) private id!: string;
  @Prop({ default: "" }) private placeHolder!: string;
  @Prop({ default: "320" }) private width!: string;
  @Prop({ default: "" }) private label!: string;
  @Prop({ default: "" }) private tooltipTitle!: string;
  @Prop({ default: "" }) private tooltipText!: string;
  @Prop({ default: "" }) private helpText!: string;
  @Prop({ default: ()=>[] }) private mask!: string[];
  @Prop({ default: false }) private isMaskRegex!: boolean;
  @Prop({ default: () => [] }) private rules!: Array<unknown>;
  @Prop({ default: true }) private showErrorMessages?: boolean;
  @Prop({ default: false }) private validateOnBlur!: boolean;
  @Prop({ default: "G-Invoicing" }) private searchType!: string;



  @PropSync("value", { default: "" }) private _value!: string;

  private error = false;
  private errorMessages: string[] = [];

  private showHelpText = true;
  private showLoader = false;
  
  private searchCount = 0;          // for search simulation
  private showSuccessAlert = false; // for search simulation
  private showErrorAlert = false;   // for search simulation

  @Watch("errorMessages")
  private errorMessagesChanged(newVal: Array<unknown>): void {
    this.showHelpText = newVal.length === 0 && !this.showLoader;
  }

  private onInput(v: string) {
    this._value = v;
    if (this.errorMessages.length > 0) {
      this.clearErrorMessages();
    }
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
    this.showHelpText = true;
  }

  private async search(): Promise<void> {
    if (this.searchType !=="EDA" && this.errorMessages.length === 0 && this._value) {

      // simulate success on first search, error on second.
      this.showLoader = true;
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
      this.showHelpText = false;
      this.searchCount = this.searchCount + 1;

      setTimeout(() => {
        this.showLoader = false;
        this.showSuccessAlert = this.searchCount % 2 !== 0;
        this.showErrorAlert = !this.showSuccessAlert;
      }, 3000);
    }
    
    if(this.searchType === "EDA"){

      try {

        this.showLoader = true;
        this.showLoader = true;
        this.showSuccessAlert = false;
        this.showErrorAlert = false;
        this.showHelpText = false;

        const response = await api.edaApi.search(this._value);
        if(response.success){
          this.showSuccessAlert = true;
        }
        else{
          this.showErrorAlert = true;
        }
        
      } catch (error) {
        this.showErrorAlert = true;
      }finally{

        this.showLoader = false;
      }

    }

  }

  private setErrorMessage(): void {
    Vue.nextTick(()=>{
      this.errorMessages = this.$refs.atatSearchInput.errorBucket;
    });
  }

  private clearErrorMessages(): void {
    Vue.nextTick(()=>{
      this.$refs.atatSearchInput.errorBucket = [];
      this.errorMessages = [];
    });
  }

  private onBlur(e: FocusEvent) : void{
    const input = e.target as HTMLInputElement;
    this.setErrorMessage();
    this.$emit('blur', input.value);
  }

  public resetValidation(): void {
    this.$refs.atatSearchInput.errorBucket = [];
    this.$refs.atatSearchInput.resetValidation();
  }

  private setMask(): void {
    const maskObj: mask = {};

    if (this.mask.length > 0) {
      if (this.isMaskRegex){
        maskObj.regex = this.mask[0] || "";
      } else {
        maskObj.mask = this.mask || [];
      }
    }

    if (Object.keys(maskObj).length > 0){
      maskObj.placeholder = "";
      maskObj.jitMasking = true;
      Vue.nextTick(() => {
        const inputField = document.getElementById(
          this.id + '_SearchInput'
        ) as HTMLInputElement;
        Inputmask(maskObj).mask(inputField);
      });
    }
  }

  private mounted(): void{
    this.setMask();
  }

}

</script>
