<template>
<form class="card auth-card" @submit.prevent="handleLoginForm">
    <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
            <!-- если в форме стоял фокус (dirty) методы validate required и email для v-model email
            возвращают false (что означает, что есть ошибки валидации), то сетим на инпут класс ошибки.
            $v - ссылка на глобальный обьект валидации vuelidate -->
            <input 
                id="email" 
                type="text" 
                :class="{'invalid' : ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" 
                v-model.trim="email" 
            />
            <label for="email">Email</label>
            <!-- показываем ошибку, если инпут не не проходит проверку vuelidate -->
            <small
                v-if="$v.email.$dirty && !$v.email.required"
                class="helper-text invalid"
            >Введите эмейл</small>
             <small
                v-else-if="$v.email.$dirty && !$v.email.email"
                class="helper-text invalid"
            >Введите корректный эмейл</small>
        </div>
        <div class="input-field">
            <input 
                id="password" 
                type="password" 
                :class="{'invalid' : ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" 
                v-model="password"/>
            <label for="password">Пароль</label>
            <small 
                v-if="$v.password.$dirty && !$v.password.required"
                class="helper-text invalid">
                Введите пароль</small>
            <small 
                v-if="$v.password.$dirty && !$v.password.minLength"
                class="helper-text invalid" >
                <!-- Для того, чтобы заданное количество символов не хардкодить, а выводить динамически,
                выводим его из объекта vuelidate. Мы его установили в поле validations > password > minLength -->
                Пароль должен состоять минимум из {{$v.password.$params.minLength.min}} символов
            </small>
        </div>
    </div>
    <div class="card-action">
        <div>
            <button class="btn waves-effect waves-light auth-submit" type="submit">
                Войти
                <i class="material-icons right">send</i>
            </button>
        </div>

        <p class="center">
            Нет аккаунта??
            <router-link to="/register">Зарегистрироваться</router-link>
        </p>
    </div>
</form>
</template>

<script>
//импортируем нужные функции-валидаторы из vuelidate
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    //новое поле из vuelidate
    validations: {
    // для модели email применяем проверки email и required
      email: {email, required},
      password: {required, minLength: minLength(6)}
    },
    methods: {
       async handleLoginForm() {
          if(this.$v.$invalid) {
            this.$v.$touch(); //устанавливает флаг dirty в true
          }
          else {
                const formData = {
                    email: this.email,
                    password: this.password
                }
                try {
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/')
                } catch(err) {
                    console.log(err)
                    alert('no user!')
                }
          }
        }
    }
}
</script>
