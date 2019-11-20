<template>
<!-- Если сайдбар открыт - добавляем ему класс open,
который получаем через props  -->
<ul class="sidenav app-sidenav" :class="{'open': sideBarIsOpen}">
	<!-- аттрибут exact будет присвоен только ссылке на главную / -->
	<router-link
		tag="li"
		:to="link.url"
		active-class="active"
		v-for="link in links"
		:key="link.url"
		:exact="link.exact"
	>
		<a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
	</router-link>

</ul>
</template>

<script>
export default {
	data(){
		return {
			links: [
				{url: '/', title: 'Счет', exact: true},
				{url: '/history', title: 'История'},
				{url: '/planning', title: 'Планирование'},
				{url: '/record', title: 'Новая запись'},
				{url: '/categories', title: 'Категории'},
			]
		}
	},
	props: ['sideBarIsOpen']
}
</script>