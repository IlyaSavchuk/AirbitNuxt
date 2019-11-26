export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.user = { ...user }
  },
  clearUser(state) {
    state.user = null
  }
}

export const getters = {
  authenticated(state) {
    return !!state.user
  }
}

export const actions = {
  logout({ store, commit }) {
    commit('clearUser', null)
  }
}
