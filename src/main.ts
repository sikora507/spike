import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import SingleNeuron from './spike/SingleNeuron.vue'
import FixedNetwork from './spike/FixedNetwork.vue'

Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [
  { path: '/', component: SingleNeuron },
  { path: '/singleNeuron', component: SingleNeuron },
  { path: '/fixedNetwork', component: FixedNetwork }
]
const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
