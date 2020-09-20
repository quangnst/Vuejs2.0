<template>
  <v-dialog v-model="diaglog" persistent max-width="520">
    <v-card class="px-4 py-6">
      <v-card-title class="headline pl-0 pt-2">Reset Password</v-card-title>
      <div v-if="!showSuccess">
        <p>Enter your email to reset your password</p>

        <v-btn absolute right top icon color="#000" @click="$emit('close')"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-form class="pb-6">
          <v-text-field
            v-model.trim="email"
            type="email"
            placeholder="you@email.com"
            light
            outlined
            large
            rounded
            hide-details="auto"
            append-icon="mdi-account"
            class="mt-4"
          ></v-text-field>
          <p v-if="errorMsg !== ''" class="red--text pt-0">{{ errorMsg }}</p>
        </v-form>

        <div class="text-center">
          <v-btn
            x-large
            @click="resetPassword"
            rounded
            text
            class="btn-cyan text-h5 white--text px-12 mt-2 text-capitalize"
            >Reset</v-btn
          >
        </div>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
    </v-card>
  </v-dialog>
</template>
<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      email: "",
      showSuccess: false,
      errorMsg: "",
      diaglog: true,
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";

      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>
