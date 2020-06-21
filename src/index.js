import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import Home from './views/Home.vue'
import Account from './views/Account.vue'
import Bye from './views/Bye.vue'

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
    {
      name: 'Bye',
      path: '/bye', component: Bye
    }
  ]
})

const hasAccount = () => {
  // localStorage.removeItem('yepchat')
  let config = JSON.parse(localStorage.getItem('yepchat'))
  return config !== null && config.user !== null
}

router.beforeEach((to, from, next) => {
  if (to.name !== 'Account' && to.name !== 'Bye' && !hasAccount()) next({ name: 'Account' })
  else next()
})

import './app.css'

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})