<template>
  <div id="app">
    <h1>What are we watching?</h1>
    <watch-list-chart />
  </div>
</template>

<script>
import WatchListChart from "./components/charts/WatchListChart.vue";

export default {
  name: "App",
  components: {
    WatchListChart
  }
};
</script>

<style>
#app {
}

h1 {
}
</style>
