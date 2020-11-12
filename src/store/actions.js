module.exports = {
  updateUser ({commit}, payload) {
    commit('UPDATE_USER', payload)
  },
  updateAvatar ({commit}, payload) {
    commit('UPDATE_AVATAR', payload)
  },
  updateSocket ({commit}, payload) {
    commit('UPDATE_SOCKET', payload)
  },
  addMessage ({commit}, payload) {
    commit('ADD_MESSAGE', payload)
  }  
}
