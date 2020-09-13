<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-btn @click="$router.push({ name: '/' })">Vue Authen</v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn @click="$router.push({ name: '/' })">Dashboard</v-btn>
    <v-btn @click="$router.push({ name: 'settings' })">Settings</v-btn>
    <v-btn @click="logout()">Logout</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
  
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
};
</script>
