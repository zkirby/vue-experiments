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
  props: {
    markers: {
      type: Array
    },
    timeframe: {
      type: String,
      default: "15min"
    }
  },
  data() {
    return {
      stockData: ["S"],
      borderColor: "red"
    };
  },
  mounted() {
    this.markers.forEach(async m => {
      const rawDataResponse = await getStockDataForTimeFrameMarker(
        m,
        this.timeframe
      );
      //const rawData = await rawDataResponse.json();
      const rawData = await rawDataResponse;
      let lastClose = 0;
      this.stockData.push([
        m,
        rawData
          .map(({ date, close }) => {
            let iy = close - lastClose;
            let y = (iy / lastClose) * 100;
            lastClose = close;
            return {
              t: moment(date),
              y
            };
          })
          //.filter(o => o.t.dayOfYear() === moment().dayOfYear())
          .slice(1)
      ]);
    });
  },
  computed: {
    // borderColor() {
    //   let first = this.stockData[0];
    //   let last = this.stockData[this.stockData.length - 1];
    //   return last >= first ? "#00b894" : "#d63031";
    // },
    chartData() {
      return {
        datasets: this.stockData.map(([m, data]) => ({
          label: `${m} for ${this.timeframe}`,
          borderColor: this.borderColor,
          backgroundColor: this.borderColor,
          fill: false,
          data
        }))
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
