import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import './app.css'
import Store from './state/index'
import router from './routes'

router.beforeEach((to, from, next) => {
  if (to.name !== 'Account' && Store.state.user === null) next({name: 'Account'})
  else next()
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})