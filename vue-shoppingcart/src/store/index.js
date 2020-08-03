import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { productGetters, manufacturerGetter } from "./getters"
import { productMutations, cartMutations, manufacturerMutations } from "./mutations"

export default new Vuex.Store({
    strict: true,
    state: {
        // bought items
        cart: [],
        // ajax loader
        showLoader: false,
        // selected product
        product: {},
        // all products
        products: [],
        // all manufacturers
        manufacturers: []
    },
    getters: Object.assign({}, productGetters, manufacturerGetter),
    mutations: Object.assign({}, productMutations, cartMutations, manufacturerMutations)
})