<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="white"
    light
    height="70"
  >
    <v-toolbar-title>
      <router-link to="/">
        <v-img src="../assets/img/logo.png" width="100"/>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <router-link to="/" class="mx-4 text-decoration-none">
      Shop
    </router-link>
    <router-link to="/admin" class="mx-4 text-decoration-none">
      Admin
    </router-link>
    <router-link text to="/profile" class="mx-4 text-decoration-none">
      My Account
    </router-link>
    <v-spacer />
    <v-btn icon>
      <v-badge content="2" value="2" color="primary" overlap>
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
    <router-link text to="/cart" class="mr-1 ml-4">
      <v-badge :content="itemsInCart" :color=" itemsInCart > 0 ? 'primary' : 'transparent'" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </router-link>
    <v-btn text @click="logout()"><v-icon>mdi-logout</v-icon></v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    itemsInCart(){
      let cart = this.$store.getters.cartProducts;
      return cart.reduce((accum, item) => accum + item.quantity, 0)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
