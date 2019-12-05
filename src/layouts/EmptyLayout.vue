<template>
<!-- Шаблон для отображения попапов регистрации и логина~ -->
<div class="grey darken-1 empty-layout">
    {{error}}
    <router-view></router-view>
</div>
</template>

<script>
export default {
    computed: {
        //используется для отображения проблем с регистрацией логином
        error() {
            return this.$store.getters.error
        }
    },
    
}
</script>
