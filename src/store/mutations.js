module.exports = {
  UPDATE_USER(state, payload) {
    state.user_id = payload.id
    state.user = payload.name
  },
  UPDATE_AVATAR (state, payload) {
    state.avatar = payload.avatar
  },
  UPDATE_SOCKET (state, payload) {
    state.socket = payload.socket
  },
  ADD_MESSAGE (state, payload) {
    state.messages.push(payload.message)
  }    
}