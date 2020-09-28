<template>
  <v-app>
    <AppHeader v-if="showNav"></AppHeader>
    <v-main>
      <router-view />
      <Snackbar></Snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from '@/components/AppHeader'
import Snackbar from '@/components/Snackbar.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    AppHeader,
    Snackbar
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>