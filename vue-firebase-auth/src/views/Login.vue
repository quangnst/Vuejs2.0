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
            <v-card-text class="px-6">
              <div class="my-2 text-center">
                <img
                  src="../assets/img/logo.webp"
                  style="max-width: 88px"
                  class="mx-auto"
                />
              </div>
              <v-form class="pb-6 pb-sm-8">
                <Validation-observer ref="form" tag="form" v-slot="{ invalid }">
                  <ValidationProvider
                    name="Email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model.trim="loginForm.email"
                      light
                      outlined
                      large
                      rounded
                      hide-details="auto"
                      append-icon="mdi-account"
                      label="Email"
                    ></v-text-field>
                    <span class="red--text subtitle-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Password"
                    rules="required|min:8"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model.trim="loginForm.password"
                      light
                      outlined
                      large
                      rounded
                      hide-details="auto"
                      append-icon="mdi-lock"
                      label="Password"
                      type="password"
                      class="mt-4"
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
                      @click="login"
                      :disabled="invalid"
                      :loading="loadingButton"
                      rounded
                      text
                      class="btn-cyan text-h5 white--text px-12 mt-8"
                      >Login</v-btn
                    >
                  </div>
                </Validation-observer>
              </v-form>
            </v-card-text>
          </v-card>

          <div class="extras text-right mt-5">
            <v-btn text @click="showPasswordReset = true"
              >Forgot Password</v-btn
            >
            <v-btn text @click="$router.push({ name: 'signup' })"
              >Create an Account</v-btn
            >
          </div>
        </v-flex>
      </v-layout>
      <PasswordReset
        v-if="showPasswordReset"
        @close="togglePasswordReset()"
      ></PasswordReset>
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
// import into file
import PasswordReset from "@/components/PasswordReset";

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
      loginForm: {
        email: "",
        password: "",
      },
      showPasswordReset: false,
      togglePass: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      errorsAuth: null,
      loadingButton: false
    };
  },
  components: {
    PasswordReset,
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    login() {
      this.loadingButton = true;
      this.$store
        .dispatch("login", {
          email: this.loginForm.email,
          password: this.loginForm.password,
        })
        .then(
          (response) => {
            console.log(response);
            this.loadingButton = false;
          },
          (error) => {
            console.log(error);
            this.errorsAuth = "Email or password not correct";
            this.loadingButton = false;
          }
        );
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
  },
};
</script>