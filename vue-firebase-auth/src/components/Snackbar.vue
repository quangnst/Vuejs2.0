<template>
  <div name="snackbars">
    <v-snackbar v-model="show" :color="color" :timeout="timeout" :top="'top'">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showMessage") {
        this.text = state.snackbar.text;
        this.color = state.snackbar.color;
        this.timeout = state.snackbar.timeout;
        this.show = true;
      }
    });
  },
  data() {
    return {
      show: false,
      color: "",
      text: "",
      timeout: 0,
    };
  },
};
</script>