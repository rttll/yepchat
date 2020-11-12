import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'

import store from '../store/index'

const router = new VueRouter({
  routes: [
    {
      name: 'Home',
      path: '/', 
      component: Home,
      meta: { auth: true }
    },
    {
      name: 'Account',
      path: '/account', 
      component: Account
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && store.state.user === null) next({name: 'Account'})
  else next()
})


export default router