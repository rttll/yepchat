import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations';

Vue.use(Vuex)

const localAPI = 'http://localhost:9000';
const productionAPI = 'https://yepchat-server.herokuapp.com'

const api = window.location.hostname === 'localhost' ? localAPI : productionAPI
// const api = productionAPI

const pusherAuthEndpoint = window.location.hostname === 'localhost' ? `${localAPI}/pusher/auth` : `${productionAPI}/pusher/auth`
// const pusherAuthEndpoint = `${productionAPI}/pusher/auth`

const store = new Vuex.Store({
  state: {
    api: api, 
    pusherAuthEndpoint: pusherAuthEndpoint, 
    user_id: null,
    user: null,
    avatar: null,
    socket: null,
    messages: [],
  },
  actions: actions,
  mutations: mutations
})

export default store