<template>
	<div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Курс валют</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Валюта</th>
                  <th>Курс</th>
                  <th>Дата</th>
                </tr>
              </thead>

              <tbody>
                <tr
					v-for="currency in currencies"
					:key="currency"
				>
                  <td>{{currency}}</td>
				  <!-- выводим котировку валюты и округляем до 3х точек после запятой -->
                  <td>{{rates[currency].toFixed(3)}}</td>
                  <td>{{date}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
</template>
<script>
export default {
	data() {
		return {
			currencies: ['RUB', 'USD', 'EUR']
		}
	},
	props: ['rates','date'],
	
}
</script>