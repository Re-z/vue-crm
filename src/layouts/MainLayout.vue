<template>
<!-- Шаблон для отображения основного контента -->
<div class="app-main-layout">
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
        <a class="btn-floating btn-large blue" href="#">
            <i class="large material-icons">add</i>
        </a>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
    data() {
        return {
            sideBarIsOpen: true
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
    }
}
</script>
