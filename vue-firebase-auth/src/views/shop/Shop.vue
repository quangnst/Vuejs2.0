<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined>
            <v-card-title>Filters</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview
                :items="items"
                v-model="selectionCategory"
                @input="getFilterCaterogy"
                selectable
                dense
                open-all
                item-key="name"
              ></v-treeview>
            </template>
            <v-divider></v-divider>
            <v-card-title>Price</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
              @click="getFilterCaterogy"
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-12 of 200 products</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="selectOrder"
                item-text="state"
                item-value="value"
                @change="orderSorting"
                :items="options"
                return-object
                style="margin-bottom: -20px;"
                outline
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div class="row text-center">
            <template v-if="$store.state.isLoading">
              <div
                v-for="number in 6"
                :key="number"
                class="col-md-4 col-sm-6 col-xs-12"
              >
                <v-skeleton-loader
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </div>
            </template>

            <template v-if="products.length">
              <div
                class="col-md-4 col-sm-6 col-xs-12"
                :key="pro.id"
                v-for="pro in products"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="mx-auto"
                    color="grey lighten-4"
                    max-width="600"
                  >
                    <v-img
                      class="white--text align-end"
                      :aspect-ratio="16 / 9"
                      height="200px"
                      :src="pro.image"
                    >
                      <v-card-title>{{ pro.category }}</v-card-title>
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                          style="height: 100%;"
                        >
                          <v-btn
                            v-if="hover"
                            @click="
                              $router.push({
                                name: 'product',
                                params: { product_id: pro.id },
                              })
                            "
                            outlined
                            >VIEW</v-btn
                          >
                        </div>
                      </v-expand-transition>
                    </v-img>
                    <v-card-text class="text--primary">
                      <div>
                        <v-btn
                          text
                          @click="
                            $router.push({
                              name: 'product',
                              params: { product_id: pro.id },
                            })
                          "
                        >
                          {{ pro.name }}
                        </v-btn>
                      </div>
                      <div>${{ pro.price }}</div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </div>
            </template>
          </div>
          <div class="text-center mt-12">
            <v-pagination v-model="page" :length="6"></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      range: [0, 200],
      selectOrder: 1,
      rate: 0,
      options: [
        { state: "Price: Low to High", value: 1 },
        { state: "Price: High to Low", value: 2 },
      ],
      page: 1,
      min: 0,
      max: 200,
      items: [
        {
          id: 2,
          name: "Shoes",
          children: [
            { id: 2, name: "Casuals" },
            { id: 3, name: "Formals" },
            { id: 4, name: "Sneakers" },
          ],
        },
        {
          id: 1,
          name: "Clothing",
          children: [
            { id: 5, name: "Shirts" },
            { id: 6, name: "Tops" },
            { id: 7, name: "Tunics" },
            { id: 8, name: "Bodysuit" },
          ],
        },
      ],
      listItems: ["Casuals", "Formals", "Sneakers", "Shirts", "Tops", "Tunics", "Bodysuit"],
 
      selectionCategory: [],
      productsShow: this.products,
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  mounted() {
    this.$store.dispatch("fetchAllProduct");
  },
  methods: {
    getFilterCaterogy() {
      this.$store.dispatch("filterProducts", {
          category: this.selectionCategory.length ? this.selectionCategory : this.listItems,
          priceMin: this.range[0],
          priceMax: this.range[1]
        });
    },
    orderSorting() {
      this.$store.dispatch("fetchAllProduct", this.selectOrder.value);
    },
  },
};
</script>
