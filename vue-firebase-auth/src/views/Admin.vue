<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="createProduct">
          <!-- <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p> -->
          <div class="create-product">
            <v-form>
              <Validation-observer ref="form" tag="form" v-slot="{ invalid }">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider
                        name="Product Name"
                        rules="required|min:3"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="product.name"
                          label="Product Name"
                          placeholder="Black Tee"
                        ></v-text-field>
                        <span class="red--text subtitle-2">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                      <ValidationProvider
                        name="Product Category"
                        rules="required|min:3"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="product.category"
                          label="Product Category"
                          placeholder="Casuals"
                        ></v-text-field>
                        <span class="red--text subtitle-2">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                      <ValidationProvider
                        name="Product Price"
                        rules="required|digits:2"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="product.price"
                          label="Product Price"
                          placeholder="20.00"
                        ></v-text-field>
                        <span class="red--text subtitle-2">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                      <ValidationProvider
                        name="Product Image"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="product.image"
                          label="Product Image"
                        ></v-text-field>
                        <span class="red--text subtitle-2">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                      <ValidationProvider
                        name="Product Description"
                        rules="required|min:20"
                        v-slot="{ errors }"
                      >
                        <v-textarea
                          v-model="product.desc"
                          label="Product Description"
                        ></v-textarea>
                        <span class="red--text subtitle-2">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                      <v-btn :disabled="invalid" @click="createProduct()">
                        Add Product
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </Validation-observer>
            </v-form>
          </div>
        </div>
      </div>
    </section>
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
  data() {
    return {
      product: {
        name: "",
        category: "",
        price: "",
        desc: "",
        image: "",
        rate: 0
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    createProduct() {
      this.$store.dispatch("createProduct", {
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
        desc: this.product.desc,
        image: this.product.image,
        rate: this.product.rate
      });
    },
  },
};
</script>
