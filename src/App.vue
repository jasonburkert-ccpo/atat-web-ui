<template>
  <v-app id="app">
    <div v-if="appContentComponent">
      <component :is="appContentComponent" />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Component as VueComponent } from "vue";

import AppPackageBuilder from "@/AppPackageBuilder.vue";
import TaskOrderLookup from "@/TaskOrderLookup.vue";
import JWCCDashboard from "@/dashboards/JWCC.vue";
import PortfolioDashboard from "@/dashboards/Portfolio.vue";

import AppSections from "@/store/appSections";

@Component({})

export default class App extends Vue {

  public get activeAppSection(): string {
    return AppSections.activeAppSection;
  }

  @Watch("activeAppSection")
  public activeAppSectionChanged(newActiveSection: string): void {
    switch (newActiveSection) {
    case this.sectionTitles.AcquisitionPackage:
      AppSections.setAppContentComponent(AppPackageBuilder);
      break;
    case this.sectionTitles.JWCCDashboard:
      AppSections.setAppContentComponent(JWCCDashboard);
      break;
    case this.sectionTitles.PortfolioDashboard:
      AppSections.setAppContentComponent(PortfolioDashboard);
      break;
    case this.sectionTitles.TOLookup:
      AppSections.setAppContentComponent(TaskOrderLookup);
      break;
    }
  }

  public get appContentComponent(): VueComponent {
    return AppSections.appContentComponent || {};
  }

  public sectionTitles: Record<string, string> = {};

  public async loadOnEnter(): Promise<void> {
    const storeData = await AppSections.getSectionData();
    if (storeData) {
      this.sectionTitles = storeData.sectionTitles;
    }
  }

  public async mounted(): Promise<void> {
    await this.loadOnEnter();
  }

  public async beforeMount(): Promise<void> {
    await AppSections.setAppContentComponent(AppPackageBuilder);
  }

}

</script>
