<template>
  <form class="card auth-card" @submit.prevent="handleRegForm">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input 
          id="email" 
          type="text" 
          :class="{'invalid' : ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" 
          v-model.trim="email" 

        />
        <label for="email">Email</label>
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
        v-model="password"
        />
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
      <div class="input-field">
        <input id="name" 
          type="text" 
          class="validate" 
          v-model="name"
          :class="{'invalid' : ($v.name.$dirty && !$v.name.required)}" 
        />
        <label for="name">Имя</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Введите имя</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
  data() {
        return {
            email: '',
            password: '',
            name: '',
            agree: false,
        }
    },
    //новое поле из vuelidate
    validations: {
    // для модели email применяем проверки email и required
      email: {email, required},
      password: {required, minLength: minLength(6)},
      name: {required},
      agree: {function() {return this.agree}} //если чекбокс чекнут - возвращаем true
    },
    methods: {
      handleRegForm(){
        if(this.$v.$invalid) {
            this.$v.$touch(); //устанавливает флаг dirty в true
          }
          else {
            //   const formData = {
        //       email: this.email,
        //       password: this.passwordб
                // name: this.name
        //   }
              this.$router.push('/')
          }
      }
    },
    
}
</script>