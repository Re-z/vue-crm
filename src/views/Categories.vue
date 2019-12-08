<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <app-loader v-if="loading === true" />

      <div v-else class="row">
        <app-category-create @created="addNewCategory" />
        <app-category-edit
                v-if="categories.length"
                :categories="categories"
                @updated="updateCategories"
                :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорий пока нет</p>
      </div>

    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  data() {
    return {
      categories: [], //тут хранятся все категории для трат
      loading: true,
      updateCount: 0
    };
  },
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory);
      console.log(this.categories);
    },
    updateCategories(category) {
      const index = this.categories.findIndex(el => el.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      // используется для форсированной перерисовки компонента, чтобы подтянулись все актуальные данные
      this.updateCount++
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

  },
  components: {
    "app-category-create": CategoryCreate,
    "app-category-edit": CategoryEdit
  }
}
</script>