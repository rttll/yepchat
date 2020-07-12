const localAPI = 'http://localhost:9000';
const productionAPI = 'https://yepchat.herokuapp.com'

var store = {
  state: {
    api: window.location.hostname === 'localhost' ? localAPI : productionAPI,
    pusherAuthEndpoint: window.location.hostname === 'localhost' ? `${localAPI}/pusher/auth` : productionAPI,
    user_id: null,
    user: null,
    avatar: null,
    socket: null
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
  }
}

module.exports = store