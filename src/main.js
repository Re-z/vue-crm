import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter.js'
import currencyFilter from '@/filters/currency.filter.js'
import Vuelidate from 'vuelidate'
import Loader from '@/components/app/Loader'

import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate);

Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.component('app-loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyB4go9is5197KSOmyVl3LUIL-DPtzbpnOY",
  authDomain: "vue-crm-745c5.firebaseapp.com",
  databaseURL: "https://vue-crm-745c5.firebaseio.com",
  projectId: "vue-crm-745c5",
  storageBucket: "vue-crm-745c5.appspot.com",
  messagingSenderId: "976534506150",
  appId: "1:976534506150:web:91fde9742f361aea88c267"
};

Firebase.initializeApp( firebaseConfig );
let app;

Firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
  
})


// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
