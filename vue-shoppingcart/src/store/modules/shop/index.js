import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { productGetters, manufacturerGetter } from "./getters";
import {
  productMutations,
  cartMutations,
  manufacturerMutations,
} from "./mutations";
import { productActions, manufacturerActions } from "./actions";

const statesProduct = () => ({
  // bought items
  cart: [],
  // ajax loader
  showLoader: false,
  // selected product
  product: {},
  // all products
  products: [],
  // all manufacturers
  manufacturers: [],
});
const getters = Object.assign({}, productGetters, manufacturerGetter);
const mutations = Object.assign(
  {},
  productMutations,
  cartMutations,
  manufacturerMutations
);
const actions = Object.assign({}, productActions, manufacturerActions);

export default {
  state: statesProduct(),
  mutations,
  actions,
  getters,
};
