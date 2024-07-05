import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from "vue-sweetalert2";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'

// Use BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Use VueSweetalert2
Vue.use(VueSweetalert2);

// Set route title
router.beforeEach((to, from, next) => {
  document.title = to.meta!.title || 'DUDU';
  next();
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
