<template>
  <v-app>
    <AppHeader v-if="showNav"></AppHeader>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from '@/components/AppHeader'

export default {
  data() {
    return {
    }
  },
  components: {
    AppHeader
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>