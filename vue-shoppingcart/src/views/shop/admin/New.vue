<template>
  <product-form
    @save-product="addProduct"
    :model="model"
    :manufacturers="manufacturers"
  ></product-form>
</template>

<script>
import ProductFrom from "@/components/shop/ProductForm.vue";
export default {
  data() {
    return {
      model: {},
    };
  },
  created() {
    this.$store.dispatch("allManufacturers");
  },
  computed: {
    manufacturers() {
      return this.$store.getters.allManufacturers;
    },
  },
  methods: {
    addProduct(model) {
      model.manufacturer = this.$store.getters.allManufacturers.filter(
        (x) => x.id === model.manufacturer
      )[0];
      this.$store.dispatch("addProduct", model);
    },
  },
  components: {
    "product-form": ProductFrom,
  },
};
</script>
