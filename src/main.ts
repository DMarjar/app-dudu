import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@asika32764/vue-animate/dist/vue-animate.css";
import "@asika32764/vue-animate/dist/vue-animate.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "../src/assets/styles/toast-styles.css";
import VModal from 'vue-js-modal';

// Use BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Use VueSweetalert2
Vue.use(VueSweetalert2);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// Use vue-js-modal
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

Vue.prototype.$http = axios;

// Set route title
router.beforeEach((to, from, next) => {
  document.title = to.meta!.title || "DUDU";
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
