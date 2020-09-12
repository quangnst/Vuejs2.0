<template>
  <div id="signup">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Signup form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model.trim="signupForm.name"
                ></v-text-field>

                <v-text-field
                  label="Title"
                  name="title"
                  prepend-icon="mdi-lock"
                  type="text"
                  v-model.trim="signupForm.title"
                ></v-text-field>

                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-lock"
                  type="email"
                  v-model.trim="signupForm.email"
                ></v-text-field>

                <v-text-field
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="text"
                  v-model.trim="signupForm.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="button" color="primary" @click="signup()">Sign Up</v-btn>
            </v-card-actions>
          </v-card>

          <div class="extras text-right mt-5">
            <v-btn text color="primary"  @click="$router.push({ name: 'login'})">Back to Log In</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>