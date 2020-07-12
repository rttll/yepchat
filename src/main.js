import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import './app.css'

import Store from './state/index'

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
      path: '/account', 
      component: Account
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Account' && Store.state.user === null) next({name: 'Account'})
  else next()
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})