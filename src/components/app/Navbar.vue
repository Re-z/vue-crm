<template>
<nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
        <div class="navbar-left">
            <a href="#" @click.prevent="$emit('burgerClick')">
                <i class="material-icons black-text">dehaze</i>
            </a>
            <!-- используем фильтр dateFilter, который подключен глобально -->
            <span class="black-text">{{ date | dateFilter('datetime') }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
            <li>
                <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
                    USER NAME
                    <i class="material-icons right">arrow_drop_down</i>
                </a>

                <ul id="dropdown" class="dropdown-content">
                    <li>
                        <router-link to="profile" class="black-text">
                            <i class="material-icons">account_circle</i>Профиль
                        </router-link>
                    </li>
                    <li class="divider" tabindex="-1"></li>
                    <li>
                        <a href="#" class="black-text" @click.prevent="logout">
                            <i class="material-icons">assignment_return</i>Выйти
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            date: new Date
        }
    },

    methods: {
       async logout() {
            await this.$store.dispatch('logout')
            this.$router.push('/login?msg=logout')
        }
    },
    mounted() {
        // каждую секунду обновляем дату
        setInterval(() => {
            this.date = new Date
        }, 1000)
        // ф-я, инициализирующая dropdown в materialize.css
        // первый параметр - дом элемент-триггер дропдауна, который
        // мы берем с помощью ссылки по $refs, второй - объект настроек
        window.M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: true,
        });
    },
}
</script>
