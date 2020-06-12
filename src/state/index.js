var store = {
  state: {
    user: null,
  },
  updateUser (val) {
    this.state.user = val
  }
}

module.exports = store