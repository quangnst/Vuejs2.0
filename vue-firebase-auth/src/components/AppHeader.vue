<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="primary"
    dark
  >
    <v-toolbar-title style="width: 350px">
      <router-link to="/">
        <v-icon class="text-h4">mdi-shopping</v-icon>
      </router-link>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down pl-10 ml-4"
    />
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn icon>
      <v-badge content="2" value="2" color="green" overlap>
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
    <router-link to="/cart" class="mx-2">
      <v-badge :content="itemsInCart" color="green" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </router-link>
    <router-link to="/admin" class="mx-2 white--text text-decoration-none">
      Admin
    </router-link>
    <v-btn text @click="logout()">Logout</v-btn>
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
