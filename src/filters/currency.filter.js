//первым параметром сюда получаем цифровое значение, вторым - тип валюты,
// RUB EUR или USD
export default function currencyFilter(val, currency = 'RUB') {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: currency
	}).format(val)
}