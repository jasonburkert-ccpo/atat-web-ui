import Vue from "vue";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import ApplicationsEnvironmentsSummaryCard from "@/wizard/Step5/components/ApplicationsEnvironmentsSummaryCard.vue";
import VueRouter from "vue-router";

Vue.use(Vuetify);

describe("Testing ApplicationsEnvironmentsSummaryCard Component", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const routes = [
    {
      name: "addapplication",
      path: "/wizard/addapplication",
    },
  ];
  const router = new VueRouter({ routes });
  let vuetify: any;
  let wrapper: any;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(ApplicationsEnvironmentsSummaryCard, {
      localVue,
      vuetify,
      router,
      propsData: {
        applicationData: {
          name: "Tracker",
          description: "",
          dod_components: [],
          csp: "",
        },
      },
    });
  });

  it("renders successfully", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("onEdit function", async () => {
    await wrapper.vm.onEdit();
    expect(wrapper.vm.onEdit).toBeDefined();
  });
});
