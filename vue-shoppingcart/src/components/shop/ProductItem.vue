<template>
  <div class="col-lg-4 col-md-6 mb-3">
    <!-- Card-->
    <div class="card rounded bg-light shadow-sm border-0 h-100">
      <div class="card-body p-0">
        <div class="product">
          <router-link :to="'/details/' + product.id" class="product-link">
            <div class="product__image">
              <img
                class="img-fluid d-block mx-auto mb-3"
                :src="product.image"
                alt
              />
            </div>
            <div class="product__description px-4">
              <div class="product__info text-dark">
                <small>{{ product.manufacturer.name }}</small>
                <h4>{{ product.name }}</h4>
              </div>
              <div class="product__price-cart">${{ product.price }}</div>
            </div>
          </router-link>
          <div class="product__action p-4">
            <product-button :product="product"></product-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductButton from "./ProductButton.vue";
export default {
  name: "product-item",
  props: ["product"],
  components: {
    "product-button": ProductButton,
  },
};
</script>
