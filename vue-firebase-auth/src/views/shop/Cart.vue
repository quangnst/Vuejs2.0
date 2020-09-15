<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-simple-table v-if="carts.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ITEM</th>
                  <th class="text-center">PRICE</th>
                  <th class="text-center">QUANTITY</th>
                  <th class="text-center">TOTAL</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cart in carts" :key="cart.productId">
                  <td>
                    <v-list-item key="1">
                      <v-list-item-avatar>
                        <v-img
                          :src="cart.image"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content style="max-width: 200px">
                        <v-list-item-title>{{ cart.name }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                  <td class="text-center">${{ cart.price }}</td>
                  <td class="text-center">
                    {{ cart.quantity }}
                  </td>
                  <td class="text-center">${{ cart.quantity * cart.price}}</td>
                  <td><v-btn icon @click="removeFromCart(cart.id)">X</v-btn></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <p v-else>No item found</p>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">
            Shipping and additional costs are calculated based on values you
            have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Order Subtotal</td>
                  <td class="text-right" style="width: 50px;">${{total}}</td>
                </tr>
                <tr>
                  <td>Shipping Charges</td>
                  <td class="text-right" style="width: 50px;">${{shipping}}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td class="text-right" style="width: 50px;">${{tax}}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td class="text-right" style="width: 50px;">
                    <b>${{total + shipping + tax}}</b>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" outlined
              >PROCEED TO PAY</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    rating: 4.5,
    shipping: 10,
    tax: 5
  }),
  created() {
    
  },

  computed: {
    ...mapGetters({
      carts: 'cartProducts'
    }),
    total () {
      return this.carts.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    removeFromCart(id) {
      this.$store.commit('removeFromCart', id);
    },
  }
};
</script>
