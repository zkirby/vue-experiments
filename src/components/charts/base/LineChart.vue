<template>
  <div>
    <canvas ref="canvas" id="line-chart" />
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "line-chart",
  data() {
    return {
      chart: null
    };
  },
  props: {
    opt: {
      default() {
        return {};
      },
      type: Object
    },
    chartData: {
      default() {
        return {};
      },
      type: Object
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.opt);
  },
  methods: {
    renderChart(data, opt) {
      if (this.chart) this.chart.destroy();
      this.chart = new Chart(this.$refs.canvas.getContext("2d"), {
        type: "line",
        data,
        options: opt
      });
    }
  },
  watch: {
    chartData(newData) {
      this.renderChart(newData, this.opt);
    }
  },
  beforeDestroy() {
    if (this.chart) this.chart.destroy();
  }
};
</script>
