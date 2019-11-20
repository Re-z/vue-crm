<template>
<div id="#wrap">
    <component :is="layout">
        <!-- тут будет отображаться шаблон, 
        по которому будут генерироваться страницы (
        или же окна логина\авторизации
        или же основной layout)  -->
    </component>
</div>
</template>


<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import "../node_modules/materialize-css/dist/js/materialize.min.js";

export default {
    computed: {
        layout() {
            //данные для отображения типа шаблона
            // берутся из метаданных каждой страницы в роутере
            return (this.$route.meta.layout || 'EmptyLayout');
            //вовзратит или EmptyLayout, если это окна авторизации
            // или MainLayout, если обычные окно
        }
    },
    components: {
        EmptyLayout,
        MainLayout
    }
    

};

</script>

<style lang="scss">
@import url("~materialize-css/dist/css/materialize.min.css");
@import url("assets/css/index.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
