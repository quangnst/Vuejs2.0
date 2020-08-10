<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <!-- Logo Image -->
          <img
            src="https://res.cloudinary.com/mhmd/image/upload/v1557368579/logo_iqjuay.png"
            width="45"
            alt=""
            class="d-inline-block align-middle mr-2"
          />
          <!-- Logo Text -->
          <span class="text-uppercase font-weight-bold">Company</span>
        
        </router-link>

        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin"
                ><i class="fa fa-user"></i> Admin</router-link
              >
            </li>
            <li>
              <router-link to="/cart"
                ><i class="fa fa-shopping-cart"></i> Cart ({{
                  cartItemsCount
                }})</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
    <div class="overlay" v-show="showLoader">
      <div class="loading-spinner">
        <div class="dot dotOne"></div>
        <div class="dot dotTwo"></div>
        <div class="dot dotThree"></div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from "toastr";

import {
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS,
} from "./store/mutation-types";
export default {
  name: "app",
  data() {
    return {
      cartItems: this.$store.state.cart,
    };
  },
  created() {
    // Subscriptions for mutation
    this.$store.subscribe((mutation) => {
      if (mutation.payload) {
        switch (mutation.type) {
          case ADD_PRODUCT_SUCCESS:
            toastr.success("Product created.", "Success!");
            break;
          case UPDATE_PRODUCT_SUCCESS:
            toastr.success("Product updated.", "Success!");
            break;
          case REMOVE_PRODUCT_SUCCESS:
            toastr.warning("Product deleted.", "Deleted!");
            break;
        }
      }
    });
  },
  computed: {
    cartItemsCount() {
      // Cart count
      return this.cartItems.length;
    },
    showLoader() {
      // Loading spinner
      return this.$store.state.showLoader;
    },
  },
};
</script>
