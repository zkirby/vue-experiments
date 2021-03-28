<template>
  <div id="app">
    <h1>What's moving?</h1>
    <watch-list />
  </div>
</template>

<script>
import WatchList from "./components/WatchList.vue";

export default {
  name: "App",
  components: {
    WatchList
  }
};
</script>

<style>
#app {
}

h1 {
}
</style>
