<template>
  <div class="watch-list-charts">
    <watch-list-chart :markers="markers" :timeframe="timeframe" />
  </div>
</template>

<style></style>

<script>
import WatchListChart from "./charts/WatchListChart.vue";

export default {
  name: "watch-list",
  components: {
    WatchListChart
  },
  data() {
    return {
      t: "d",
      timeframe: "1hour",
      markers: [] //SPY", "BA", "AMC", "USO"]
    };
  }
};
</script>
