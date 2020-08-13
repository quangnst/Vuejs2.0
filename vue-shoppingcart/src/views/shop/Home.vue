<template>
  <div class="min-vh-100 bg-white">
    <product-list></product-list>
  </div>
</template>

<script>
import ProductList from "@/components/shop/ProductList.vue";
export default {
  name: "home",
  components: {
    "product-list": ProductList,
  },
};
</script>
