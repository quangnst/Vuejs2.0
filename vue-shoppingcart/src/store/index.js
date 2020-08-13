import Vue from 'vue'
import Vuex from 'vuex'

/* Modules */
import auth from './modules/auth/index';
import product from "./modules/shop/index";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        product
    },
})