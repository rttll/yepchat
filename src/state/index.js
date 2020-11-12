const localAPI = 'http://localhost:9000';
const productionAPI = 'https://yepchat-server.herokuapp.com'

const api = window.location.hostname === 'localhost' ? localAPI : productionAPI
// const api = productionAPI

const pusherAuthEndpoint = window.location.hostname === 'localhost' ? `${localAPI}/pusher/auth` : `${productionAPI}/pusher/auth`
// const pusherAuthEndpoint = `${productionAPI}/pusher/auth`

var store = {
  state: {
    api: api, 
    pusherAuthEndpoint: pusherAuthEndpoint, 
    user_id: null,
    user: null,
    avatar: null,
    socket: null,
    messages: [],
  },
  updateUser (id, name) {
    this.state.user_id = id
    this.state.user = name
  },
  updateAvatar (val) {
    this.state.avatar = val
  },
  updateSocket (val) {
    this.state.socket = val
  },
  addMessage (data) {
    this.state.messages.push(data)
  }
}

module.exports = store