<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        
        <app-category-create @created="addNewCategory" />
       <app-category-edit />
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
      categories: [] //тут хранятся все категории для трат
    }
  },
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory);
      console.log(this.categories);
    }
  },
  components: {
    'app-category-create' : CategoryCreate,
    'app-category-edit' : CategoryEdit,
    
  }
}
</script>