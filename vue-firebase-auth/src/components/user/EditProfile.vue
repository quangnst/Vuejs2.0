<template>
  <div class="editProfile">
    <v-form>
      <Validation-observer ref="form" tag="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                name="Full Name"
                rules="required|min:3"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="userProfile.name"
                  label="Full Name"
                  hide-details
                ></v-text-field>
                <span class="red--text subtitle-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>

            <v-col cols="12">
              <ValidationProvider
                name="Location"
                rules="required|min:3"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="userProfile.location"
                  label="Location"
                  hide-details
                ></v-text-field>
                <span class="red--text subtitle-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>

            <v-col cols="12">
              <ValidationProvider
                name="Phone"
                rules="required|digits:2"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="userProfile.phone"
                  label="Phone"
                  hide-details
                ></v-text-field>
                <span class="red--text subtitle-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>

            <v-col cols="12">
              <v-btn x-large elevation="0" color="primary" 
                class="primary text-h6 white--text px-12 mt-2 text-capitalize rounded-0" @click="updateProfile()">
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </Validation-observer>
    </v-form>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
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
  name: "EditProfile",
  props: ["userProfile"],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      modifyProfile: false,
      saving: false,
    };
  },
  computed: {},
  methods: {
    updateProfile() {
      const userUpdate = {
        name: this.userProfile.name,
        location: this.userProfile.location,
        phone: this.userProfile.phone ? this.userProfile.phone : "",
      };
      this.$store.dispatch("updateProfile", userUpdate);
      this.modifyProfile = false;
    },
  },
};
</script>
