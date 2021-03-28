import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import { printTree } from "./debugging/logging.js";
Vue.config.productionTip = false;
//Vue.mixin({
// mounted: function() {
//  numDeps(this, true);
// getComputedDataObservers(this, true);
//getDataObservers(this);
//}
//});

const v = new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

setTimeout(() => printTree(v), 1000);
