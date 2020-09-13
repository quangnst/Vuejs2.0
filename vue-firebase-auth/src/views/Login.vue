<template>
  <div id="login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-account"
                  type="email"
                  v-model.trim="loginForm.email"
                ></v-text-field>

                <v-text-field
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model.trim="loginForm.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login()">Login</v-btn>
            </v-card-actions>
          </v-card>

          <div class="extras text-right mt-5">
            <v-btn text color="primary" @click="showPasswordReset = true">Forgot Password</v-btn>
            <v-btn text color="primary" @click="$router.push({ name: 'signup'})">Create an Account</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
  </div>
</template>

<script>
// import into file
import PasswordReset from '@/components/PasswordReset'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      showPasswordReset: false
    }
  },
  components: {
    PasswordReset
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    }
  }
}
</script>