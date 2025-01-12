<template>
  <v-dialog
    :max-width="width + 'px'"
    v-model="_showDialog"
    role="alertdialog"
    aria-labelledby="modalDialogTitle"
    aria-describedby="modalDialogMessage"
    id="ATATDialog"
    ref="atatDialog"
  >
    <v-card>
      <v-card-title class="h2 text-break" id="modalDialogTitle" tabindex="-1">
        {{ getTitle }}
      </v-card-title>
      <v-card-text class="body-lg black--text px-10" id="modalDialogMessage">
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          class="link-button no-focus-shift"
          :ripple="false"
          @click="onCancel"
          id="dialog_cancel"
          name="cancelDialog"
        >{{ cancelText }}
        </v-btn>
        <v-btn
          color="primary"
          :ripple="false"
          id="dialog_ok"
          :disabled="OKDisabled"
          @click="onOK"
        >
          {{ okText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, PropSync} from "vue-property-decorator";
import Vue from "vue";

@Component({})
export default class ATATDialog extends Vue {
  @Prop() private message!: string;
  @Prop({default: "Dialog-Title"}) private title!: string;
  @Prop() private id!: string;
  @Prop({default: "500px"}) private width!: string;
  @Prop({default: "Cancel"}) private cancelText!: string;
  @Prop({default: "OK"}) private okText!: string;
  @Prop() private focusOnCancel!: string;
  @Prop() private focusOnOk!: string;
  @Prop({ default: false }) private OKDisabled!: boolean;
  @Prop({ default: false }) private truncate!: boolean;

  @PropSync("showDialog") private _showDialog!: boolean;

  get getTitle(): string {
    if(this.truncate){
      if (this.title && this.title.length > 60) {
        return this.title.substring(0, 60) + "...";
      }
    }
    return this.title;
  }

  private onCancel() {
    this.$emit("cancelClicked");
    this._showDialog = false;
    this.returnFocus(this.focusOnCancel);
  }

  private onOK() {
    this.$emit("ok");
    this._showDialog = false;
    this.returnFocus(this.focusOnOk);
  }

  private returnFocus(elementId: string): void {
    this.$nextTick(() => {
      const focusEl =
        document.getElementById(elementId) ||
        document.getElementsByTagName("h1")[0];
      focusEl?.focus();
    });
  }
}
</script>
