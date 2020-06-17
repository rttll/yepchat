import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import Home from './views/Home.vue'
const router = new VueRouter({
  routes: [
    {
      path: '/', component: Home
    }
  ]
})

import './app.css'

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})