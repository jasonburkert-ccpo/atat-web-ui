<template>
  <canvas :id="chartId" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({})
export default class BarChart extends Vue {
  @Prop({ required: true, default: "MyBarChart" }) public chartId!: string;
  @Prop({ required: true, default: {} }) public chartData!: ChartData;
  @Prop({ required: true, default: {} }) public chartOptions!: any;  
  @Prop({ required: false, default: false }) public useChartDataLabels?: boolean;  

  private myChart!: Chart;

  @Watch("chartData", { deep: true })
  public chartDataUpdate(newData: ChartData): void {
    this.myChart.data = newData;
    this.myChart.update();
  }

  private mounted() {
    this.createChart();
  }

  public createChart(): void {
    if (this.chartId) {
      let plugins: any = [];
      const ctx = document.getElementById(this.chartId) as HTMLCanvasElement;
      if (this.useChartDataLabels) {
        plugins.push(ChartDataLabels);
      }

      this.myChart = new Chart(ctx, {
        type: "bar",
        data: this.chartData,
        options: this.chartOptions,
        plugins: plugins,
      });
    }
  }

}

</script>
