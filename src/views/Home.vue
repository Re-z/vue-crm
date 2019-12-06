<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      <button 
        @click="refreshCurrency"
        class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>


    <app-loader v-if="loading === true"></app-loader>
    <div class="row" v-else>
      <app-home-bill
        :rates="currency.rates"
      ></app-home-bill>

        <!-- передаем валюты и дату на которую эти валюты актуальны -->
      <app-home-currency
        :rates="currency.rates"
        :date="currency.date"
      >
      </app-home-currency>
    </div>
  </div>
</template>
<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  data() {
    return {
      loading: true,
      currency: null //тут хранится объект, с курсами валют, который мы получаем по API
    }
  },
  async mounted(){
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false
  },
  methods: {
    async refreshCurrency() {
    this.loading = true
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false

    }
  },
  components: {
    'app-home-bill' : HomeBill,
    'app-home-currency' : HomeCurrency

  }
}
</script>