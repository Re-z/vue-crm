<template>
	 <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitForm">
              <div class="input-field">
                <select ref="select" v-model="current">
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{category.title}}
                  </option>
                </select>
                <label>Выберите категорию</label>
              </div>

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
                Обновить
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
</template>
<script>
  import {minValue, required} from "vuelidate/lib/validators";

  export default  {
    data() {
      return {
        select: null,
        title: '',
        limit: 10,
        current: null, //дефолтная категория
      }
    },
    methods: {
      async submitForm() {
        if(this.$v.invalid) {
          this.$v.$touch();
          return;
        } else {
          try {
            const categoryData = {
              id: this.current,
              title: this.title,
              limit: this.limit,
            };
            await this.$store.dispatch('updateCategory', categoryData)
            alert("Категория успешно обновлена")
            this.$emit('updated', categoryData);
          } catch (e) {

          }
        }
      }
    },
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select);
      // при загрузке - обновляем значение текстовых полей с помощью метода из materialize,
      // для того, чтобы не было поехавшей верстки с плавающими названиями инпутов
      // (label наезжает на значение инпута)
      M.updateTextFields();
    },
    created() {
      //дефолтная категория - первый элемент массива,
      // который принимаем из firebase. Дальше деструктурируем
      // и задаем значения полей
      const {id, title, limit} = this.categories[0];
      this.title = title;
      this.limit = limit;
      this.current = id; // ??
    },
    //предотвращаем утечки памяти
    beforeDestroy() {
      if(this.select && this.select.destroy) {
        this.select.destroy();
      }
    },
    props: {
      categories: {
        type: Array,
        required: true,
      }
    },
    validations: {
      title: {required},
      limit: {minValue: minValue(10)}
    },
    watch: {
      //следим, когда меняется select - и меняем значение полей
      // в зависимости от выбранной категории
      current(categoryId) {
        const {title, limit} = this.categories.find(el => {
          return  el.id === categoryId
        });
        this.title = title;
        this.limit = limit;
      }
    }

  }
</script>

