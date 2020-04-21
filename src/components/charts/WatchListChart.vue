<template>
  <line-chart :chartData="chartData" :opt="options" />
</template>

<script>
import LineChart from "./base/LineChart.vue";
import moment from "moment";
import { getStockDataForTimeFrameMarker } from "../../utils/API.js";

export default {
  name: "watch-list-chart",
  components: {
    LineChart
  },
  data() {
    return {
      stockData: []
    };
  },
  async mounted() {
    const rawDataResponse = await getStockDataForTimeFrameMarker(
      "SPY",
      "1hour"
    );
    const rawData = await rawDataResponse.json();
    this.stockData = rawData.map(({ date, close }) => ({
      t: moment(date),
      y: close
    }));
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            label: "Price Data for TOPS at 15min",
            borderColor: "#00b894",
            backgroundColor: "#00b894",
            fill: false,
            data: this.stockData
          }
        ]
      };
    },
    options() {
      return {
        scales: {
          xAxes: [{ type: "time" }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      };
    }
  }
};
</script>
