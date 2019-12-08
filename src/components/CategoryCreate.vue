<template>
	<div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Создать</h4>
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="input-field">
				  <!-- показываем класс invalid
				  если до поля уже "дотрагивались" и оно не прошло проверку на required -->
                <input 
					v-model="title"
					id="name" 
					type="text" 
					:class="{'invalid': $v.title.$dirty && !$v.title.required}"
				/>
                <label for="name">Название</label>
                <span 
					v-if="$v.title.$dirty && !$v.title.required"
					class="helper-text invalid"
				>
					Введите название категории
				</span>
              </div>

              <div class="input-field">
                <input 
					v-model.number="limit"
					id="limit" 
					type="number" 
					:class="{'invalid': $v.limit.$dirty && !$v.limit.minValue}"

				/>

                <label for="limit">Лимит</label>
                <span 
					v-if="$v.limit.$dirty && !$v.limit.minValue"
					class="helper-text invalid"
				>
				<!-- минимальную велечину берем динамически из поля vuelidate -->
					Минимальная величина траты - {{$v.limit.$params.minValue.min}}
				</span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
</template>

<script>
import {required,minValue} from 'vuelidate/lib/validators'
export default {
	data() {
		return {
			title: '',
			limit: 10,
		}
	},
	mounted() {
		// при загрузке - обновляем значение текстовых полей с помощью метода из materialize,
		// для того, чтобы не было поехавшей верстки с плавающими названиями инпутов
		// (label наезжает на значение инпута)

		M.updateTextFields();
	},
	methods: {
		async handleSubmit() {
			if(this.$v.$invalid) {
				this.$v.$touch();
				return
			} else {
				try {
					const category = await this.$store.dispatch('createCategory', {
						title: this.title,
						limit: this.limit
					})
					// передаем объект с новосозданной категорией в родителя
					this.$emit('created', category);
					alert('Категория успешно добавленна')
					//после добавления категории на сервер - сбрасываем форму
					this.title = '',
					this.limit = 10
					// сбрасываем валидацию vuelidate и флаг touched в false
					this.$v.reset();
					
				} catch (error) {
					
				}
			}
		}
	},
	validations: {
		title: {required},
		limit: {minValue: minValue(10)}
	}
}
</script>