import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import Home from './views/Home.vue'
import Account from './views/Account.vue'

const router = new VueRouter({
  routes: [
    {
      name: 'Home',
      path: '/', component: Home
    },
    {
      name: 'Account',
      path: '/account', component: Account
    },
  ]
})

import './app.css'

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})