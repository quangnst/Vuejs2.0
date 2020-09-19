import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";

import router from "../router/index";

Vue.use(Vuex);

// realtime firebase
fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let postsArray = [];

  snapshot.forEach((doc) => {
    let post = doc.data();
    post.id = doc.id;

    postsArray.push(post);
  });

  store.commit("setPosts", postsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    products: [],
    product: [],
    carts: [],
    quality: null,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      state.posts = val;
    },
    setProducts(state, val) {
      state.products = val;
    },
    getProductId(state, val) {
      state.product = val;
    },
    getProductFilter(state, val) {
      state.products.push(val);
    },
    addToCart(state, { product_id, quantity }) {
      const record = state.carts.find((p) => p.product_id === product_id);
      if (!record) {
        state.carts.push({
          product_id,
          quantity: parseInt(quantity, 10),
        });
      } else {
        record.quantity = record.quantity + parseInt(quantity, 10);
      }
    },
    removeFromCart(state, val) {
      const index = state.carts.findIndex((p) => p.product_id === val);
      state.carts.splice(index, 1);
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async createPost({ state }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0,
      });
    },
    async createProduct({ state }, product) {
      await fb.productsCollection.add({
        createdOn: new Date(),
        name: product.name,
        type: product.type,
        price: product.price,
        image: product.image,
        productDesc: product.desc,
        uploadBy: state.userProfile.name,
        comments: 0,
        likes: 0,
        product_id: state.products.length + 1,
      });
    },
    async fetchAllProduct({commit},orderSorting = 1) {
      //Get Products
      let productsArray = [];
      fb.productsCollection
        .orderBy("createdOn", "desc")
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            let product = doc.data();
            product.id = doc.id;
            if (orderSorting > 1) {
              productsArray.push(product);
            } else {
              productsArray.unshift(product);
            }
          });
        });
        commit("setProducts", productsArray);
    },
    async fetchProductById({ commit }, product_id) {
      // fetch user profile
      const productById = await fb.productsCollection.doc(product_id).get();

      // set user profile in state
      commit("getProductId", productById.data());
    },
    async filterProducts({ state, commit }, { key, value }) {
      state.products = [];
      // Create a reference to the products collection
      const db = firebase.firestore();
      const productsRef = db.collection("products");
      let operator = "in";
      if (key == "price") {
        operator = "<";
      }
      productsRef
        .where(key, operator, value)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, "=>", doc.data());
            let post = doc.data();
            post.id = doc.id;
            commit("getProductFilter", post);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
  },
  getters: {
    cartProducts: (state) => {
      return state.carts.map(({ product_id, quantity }) => {
        const product = state.products.find((p) => p.product_id === product_id);
        return {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        };
      });
    },
  },
  modules: {},
});

export default store;
