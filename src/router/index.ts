import Vue from "vue";
import VueRouter from "vue-router";
import { jwtDecode } from "jwt-decode";

Vue.use(VueRouter);

import Login from "../modules/auth-module/views/Login.vue";
import SignUp from "../modules/auth-module/views/SignUp.vue";
import ForgotPassword from "../modules/auth-module/views/ForgotPassword.vue";
import ChangePassword from "../modules/auth-module/views/ChangePassword.vue";
import Test from "../modules/example-module/views/blocked_views/Test.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/change-password",
    name: "changePassword",
    component: ChangePassword,
  },
  {
    path: "/blocked",
    name: "blocked",
    component: Test,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((record) => record.meta.requiresAuth);
  const loggedIn = localStorage.getItem("access_token");

  console.log(loggedIn);

  if (authRequired && !loggedIn) {
    return next("/");
  }

  if (loggedIn) {
    try {
      const decodedToken = jwtDecode(loggedIn);
      if (!decodedToken || !decodedToken.exp) {
        throw new Error("Invalid token");
      }

      const tokenExpired = decodedToken.exp < Date.now() / 1000;

      if (tokenExpired) {
        localStorage.removeItem("access_token");
        return next("/");
      }

      if (
        to.path === "/" ||
        to.path === "/sign-up" ||
        to.path === "/forgot-password" ||
        to.path === "/change-password"
      ) {
        return next("/blocked");
      }
    } catch (error) {
      console.error("Error decodificando el token: ", error);
      localStorage.removeItem("access_token");
      return next("/");
    }
  }

  next();
});

export default router;
