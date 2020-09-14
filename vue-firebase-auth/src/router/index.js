import Vue from "vue";
import VueRouter from "vue-router";
import Shop from "../views/shop/Shop.vue";
import Product from "../views/shop/Product.vue";
import Cart from "../views/shop/Cart.vue";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Shop,
    name: "shop",

    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/product",
    name: "product",
    component: Product,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
