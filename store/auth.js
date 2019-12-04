import { auth } from '@/services/firebase'

export const state = () => ({
  user: null,
  authenticated: false
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAuthenticated(state, payload) {
    state.authenticated = payload
  }
}

export const actions = {
  login({ commit }, userData) {
    commit('setUser', userData)
    commit('setAuthenticated', true)
  },
  async logout({ commit }) {
    await auth.signOut()

    commit('setUser', null)
    commit('setAuthenticated', false)
  }
}
