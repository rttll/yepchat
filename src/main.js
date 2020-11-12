import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import './app.css'
import store from './store/index'
import router from './router'

const app = new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
