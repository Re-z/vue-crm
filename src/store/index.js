import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state,error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error(state) {
      return state.error
    }
  },
  actions: {
    
    async fetchCurrency() {
      //для того, чтобы api ключ сервиса fixer не был виден другим
      // мы положили его в файл .env, и сейчас оттуда забираем
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);;
      return await res.json();
    }
  },
  modules: {
    auth,
    info
  },
});
