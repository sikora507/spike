import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './spike/Home.vue'

Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [
  { path: '/', component: Home }
]
const router = new VueRouter({
  routes // short for routes: routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
