<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <app-loader v-if="loading === true" />

      <div v-else class="row">
        <app-category-create @created="addNewCategory" />
        <app-category-edit :categories="categories"/>
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
    };
  },
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory);
      console.log(this.categories);
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