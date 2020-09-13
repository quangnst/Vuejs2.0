<template>
  <v-dialog v-model="diaglog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Reset Password</v-card-title>
      <div v-if="!showSuccess">
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <v-text-field
            v-model.trim="email"
            type="email"
            placeholder="you@email.com"
          ></v-text-field>
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <v-btn @click="resetPassword()" class="button">Reset</v-btn>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')">Agree</v-btn>
      </v-card-actions>
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
