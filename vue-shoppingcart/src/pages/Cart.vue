<template>
  <div v-if="cart.length > 0" class="py-5">
    <template v-for="product in cart">
      <cart-item :product="product" :key="product.id" ></cart-item>
    </template>
  </div>
  <div v-else class="title py-5"><h1><i class="fa fa-superpowers"></i> Your Cart is Empty</h1></div>
</template>

<script>
  import CartItem from '@/components/product/CartItem'
  export default {
    data () {
      return {
        cart: this.$store.state.cart
      }
    },
    components: {
      CartItem
    }
  }
</script>