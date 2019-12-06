<template>
    <!-- Шаблон для отображения основного контента -->
<div>
    <app-loader v-if="loading === true"></app-loader>
    <div v-else class="app-main-layout">
        <app-navbar @burgerClick="toggleSidebar"></app-navbar>

        <!-- передаем пропс в сайдбар, чтобы там убрать класс, который его закрывает  -->
        <app-sidebar :sideBarIsOpen="sideBarIsOpen"></app-sidebar>

        <!-- когда сайдбар закрыт, то основному блоку
        присваивается класс, который растягивает его ширину  -->
        <main class="app-content" :class="{'full': !sideBarIsOpen}">
            <div class="app-page">
                <router-view></router-view>
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</div>

</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
    data() {
        return {
            sideBarIsOpen: true,
            loading: true,
        }
    },
    methods: {
        toggleSidebar() {
            this.sideBarIsOpen = !this.sideBarIsOpen
        }
    },

    components: {
        'app-navbar': Navbar,
        'app-sidebar': Sidebar
    },
    async mounted() {
        //если обьект с данными о пользователе пуст - делаем запрос на сервер
        // и получаем данные
        if(Object.keys(this.$store.getters.info).length  === 0) {
            await this.$store.dispatch('fetchInfo')
        }
        //после этого скрываем лоадер и показываем контент, чтобы не было пустых данных
        this.loading = false;
    }
}
</script>
