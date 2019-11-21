import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter.js'

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);

Vue.filter('dateFilter', dateFilter)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
