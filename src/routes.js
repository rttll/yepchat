import VueRouter from 'vue-router'
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

export default router