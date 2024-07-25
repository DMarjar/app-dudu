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
    path: "/log-in",
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
    meta: { role: "ROLE" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = [
//     "/login",
//     "/",
//     "/signup",
//     "/unauthorized",
//     "/token-confirmation",
//     "/not-found",
//     "/reviews",
//   ];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("token");

//   if (to.path === "/login" && loggedIn) {
//     const decoded = jwtDecode(loggedIn);
//     const rol = decoded.roles[0].authority;
//     if (rol === "ADMIN") {
//       return next("/administrator-home");
//     } else if (rol === "COMMON_USER") {
//       return next("/client-home");
//     } else {
//       return next("/worker-home");
//     }
//   } else if (to.path === "/" && loggedIn) {
//     const decoded = jwtDecode(loggedIn);
//     const rol = decoded.roles[0].authority;
//     if (rol === "ADMIN") {
//       return next("/administrator-home");
//     } else if (rol === "COMMON_USER") {
//       return next("/client-home");
//     } else {
//       return next("/worker-home");
//     }
//   }

//   if (authRequired && !loggedIn) {
//     return next("/login");
//   }

//   if (loggedIn) {
//     try {
//       const decoded = jwtDecode(loggedIn);
//       const roles = decoded.roles.map((r) => r.authority);
//       if (to.meta.role && !roles.includes(to.meta.role)) {
//         return next("/unauthorized");
//       }
//     } catch (error) {
//       console.error("Error decodificando el token: ", error);
//       localStorage.removeItem("token");
//       return next("/login");
//     }
//   }
//   next();
// });

export default router;
