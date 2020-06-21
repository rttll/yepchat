const localAPI = 'http://localhost:9000';
const productionAPI = 'https://yepchat.herokuapp.com'

const setStorage = (k, v) => {
  var current = JSON.parse(localStorage.getItem('yepchat'))
  let update = {}
  update[k] = v
  let merged = {...current, ...update}
  localStorage.setItem('yepchat', JSON.stringify({...current, ...update}))
} 

var store = {
  state: {
    api: window.location.hostname === 'localhost' ? localAPI : productionAPI,
    pusherAuthEndpoint: window.location.hostname === 'localhost' ? `${localAPI}/pusher/auth` : productionAPI,
    user: null,
    avatar: null,
    socket: null
  },
  updateUser (val) {
    this.state.user = val
    setStorage('user', val)
  },
  updateavatar (val) {
    this.state.avatar = val
    setStorage('avatar', val)
  },
  updateSocket (val) {
    this.state.socket = val
  }
}

module.exports = store