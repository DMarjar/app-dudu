import Vue from "vue";
import VueRouter from "vue-router";
import { jwtDecode } from "jwt-decode";

Vue.use(VueRouter);

import Login from "../modules/auth-module/views/Login.vue";
import SignUp from "../modules/auth-module/views/SignUp.vue";
import ForgotPassword from "../modules/auth-module/views/ForgotPassword.vue";
import ChangePassword from "../modules/auth-module/views/ChangePassword.vue";
import ChangeTemporaryPassword from "../modules/auth-module/views/ChangeTemporaryPassword.vue";
import MissionsPage from "@/modules/missions/views/MissionsPage.vue";
import Test from "../modules/example-module/views/blocked_views/Test.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { title: "Login | DUDU" },
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUp,
    meta: { title: "Sign Up | DUDU" },
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
    meta: { title: "Forgot Password | DUDU" },
  },
  {
    path: "/change-password",
    name: "changePassword",
    component: ChangePassword,
    meta: { title: "Change Password | DUDU", requiresAuth: true },
  },
  {
    path: "/change-temporary-password",
    name: "changeTemporaryPassword",
    component: ChangeTemporaryPassword,
    meta: { title: "Change Temporary Password | DUDU" },
  },
  {
    path: "/missions",
    name: "missions",
    component: MissionsPage,
    meta: { title: "Missions | DUDU", requiresAuth: true },
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
  const loggedIn = localStorage.getItem("id_token");

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
        localStorage.removeItem("id_token");
        return next("/");
      }

      if (
        to.path === "/" ||
        to.path === "/sign-up" ||
        to.path === "/forgot-password" ||
        to.path === "/change-password" ||
        to.path === "/change-temporary-password"
      ) {
        return next("/blocked");
      }
    } catch (error) {
      console.error("Error decodificando el token: ", error);
      localStorage.removeItem("id_token");
      return next("/");
    }
  }

  next();
});

export default router;
