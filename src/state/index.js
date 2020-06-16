const localAPI = 'http://localhost:9000';
const productionAPI = 'https://yepchat.herokuapp.com'

var store = {
  state: {
    api: window.location.hostname === 'localhost' ? localAPI : productionAPI,
    user: null,
    socket: null
  },
  updateUser (val) {
    this.state.user = val
  },
  updateSocket (val) {
    this.state.socket = val
  }
}

module.exports = store