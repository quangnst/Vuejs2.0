<template>
  <div class="h-100 bg-white">
    <product-list></product-list>
  </div>
</template>

<script>
  import ProductList from '@/components/product/ProductList.vue'
  export default {
    name: 'home',
    components: {
      'product-list': ProductList
    }
  }
</script>