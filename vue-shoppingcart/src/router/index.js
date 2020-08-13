import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/shop/Home";
import Cart from "@/views/shop/Cart";
import Details from "@/views/shop/Details";

import store from "@/store";

// Auth
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// Admin
import Index from "@/views/shop/admin/Index";
import Products from "@/views/shop/admin/Products";
import Edit from "@/views/shop/admin/Edit";
import New from "@/views/shop/admin/New";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
        title: "Home",
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        title: "Register",
      },
    },
    {
      path: "/admin",
      component: Index,
      meta: {
        requiresAuth: true,
        title: "Admin",
      },
      children: [
        {
          path: "new",
          name: "New",
          component: New,
        },
        {
          path: "",
          name: "Products",
          component: Products,
        },
        {
          path: "edit/:id",
          name: "Edit",
          component: Edit,
        },
      ],
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
      meta: {
        requiresAuth: true,
        title: "Cart",
      },
    },
    {
      path: "/details/:id",
      name: "Details",
      component: Details,
      meta: {
        requiresAuth: true,
        title: "Details",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `Shopping - ${to.meta.title}`;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(store.state);
    if (store.state.auth.token === "") {
      next({
        path: "/login",
        // query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
