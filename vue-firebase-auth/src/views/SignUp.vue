<template>
  <v-app id="auth">
    <v-container class="fill-height" fluid>
      <v-layout
        align-center
        justify-end
        class="mx-auto "
        style="max-width: 1200px"
      >
        <v-flex class="login-form">
          <v-card light="light">
            <v-card-text class="pa-8">
              <div class="my-2 text-center">
                <img
                  src="../assets/img/logo.png"
                  width="180"
                  class="mx-auto"
                />
              </div>
              <v-form class="pb-4">
                <Validation-observer ref="form" tag="form" v-slot="{ invalid }">
                  <ValidationProvider
                    name="User Name"
                    rules="required|min:3"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model.trim="signupForm.name"
                      light
                      outlined
                      large
                      hide-details="auto"
                      append-icon="mdi-account"
                      label="Username"
                      class="mt-4 rounded-0"
                    ></v-text-field>
                    <span class="red--text subtitle-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <ValidationProvider
                    name="User Name"
                    rules="required|min:3"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model.trim="signupForm.location"
                      light
                      outlined
                      large
                      hide-details="auto"
                      append-icon="mdi-map-marker"
                      label="Location"
                      class="mt-4 rounded-0"
                    ></v-text-field>
                    <span class="red--text subtitle-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model.trim="signupForm.email"
                      light
                      outlined
                      large
                      hide-details="auto"
                      append-icon="mdi-email"
                      label="Email"
                      class="mt-4 rounded-0"
                    ></v-text-field>
                    <span class="red--text subtitle-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Password"
                    rules="required|min:8"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model.trim="signupForm.password"
                      light
                      outlined
                      large
                      hide-details="auto"
                      append-icon="mdi-lock"
                      label="Password"
                      type="password"
                      class="mt-4 rounded-0"
                    ></v-text-field>
                    <span class="red--text subtitle-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <p
                    v-if="errorsAuth"
                    class="red--text text-center subtitle-2 mt-2 mb-0"
                  >
                    {{ errorsAuth }}
                  </p>
                  <div class="text-center">
                    <v-btn
                      x-large
                      @click="signup"
                      :disabled="invalid"
                      text
                      class="primary text-h6 white--text px-12 mt-8 text-capitalize rounded-0"
                      >Sign up</v-btn
                    >
                  </div>
                </Validation-observer>
              </v-form>
            </v-card-text>
          </v-card>

          <div class="extras text-right mt-5">
            <v-btn text @click="$router.push({ name: 'login' })"
              >Back to login</v-btn
            >
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize({
  en: {
    messages: {
      required: "This field is required",
      min: "This field must have no less than {length} characters",
    },
  },
});

export default {
  data() {
    return {
      signupForm: {
        name: "",
        email: "",
        password: "",
        location: ""
      },
      errorsAuth: "",
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    signup() {
      this.$store
        .dispatch("signup", {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
          location: this.signupForm.location
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            this.errorsAuth = error.message;
          }
        );
    },
  },
};
</script>
