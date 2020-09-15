import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
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

//Get Products
fb.productsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let productsArray = [];

  snapshot.forEach((doc) => {
    let product = doc.data();
    product.id = doc.id;

    productsArray.push(product);
  });

  store.commit("setProducts", productsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    products: [],
    product: []
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
        productName: product.name,
        productType: product.type,
        productPrice: product.price,
        productImage: product.image,
        productDesc: product.desc,
        uploadBy: state.userProfile.name,
        comments: 0,
        likes: 0,
      });
    },

    async fetchProductById({ commit }, productId) {
      // fetch user profile
      const productById = await fb.productsCollection.doc(productId).get();

      // set user profile in state
      commit("getProductId", productById.data());
    },
  },
  modules: {},
});

export default store;
