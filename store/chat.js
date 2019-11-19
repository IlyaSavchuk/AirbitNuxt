import Chatkit from '../services/chatkit'

function handleError(commit, error) {
  const message = error.message || error.info.error_description
  commit('setError', message)
}

export const state = () => ({
  users: [],
  rooms: [],
  currentRoom: {
    id: null,
    name: null
  },
  currentUserId: null,
  messages: [],
  error: null
})

export const mutations = {
  setUsers(state, users) {
    state.users = [...users]
  },
  setRooms(state, rooms) {
    state.rooms = [...rooms]
  },
  setCurrentUserId(state, id) {
    state.currentUserId = id
  },
  setCurrentRoom(state, room) {
    state.currentRoom = { ...room }
  },
  addMessage(state, message) {
    state.messages.push(message)
  },
  clearMessages(state) {
    state.messages = []
  },
  setError(state, error) {
    state.error = error
  }
}

export const getters = {
  authenticated(state) {
    return state.currentUserId
  }
}

export const actions = {
  async login({ commit, dispatch }, email) {
    try {
      commit('setError', '')

      const { id } = await Chatkit.connectUser(email)

      commit('setCurrentUserId', id)
      dispatch('setUserRooms')
    } catch (error) {
      handleError(commit, error)
    }
  },

  async setUsers({ commit }) {
    try {
      commit('setError', '')

      const {
        data: { users }
      } = await Chatkit.getUsers()

      commit('setUsers', users)
    } catch (error) {
      handleError(commit, error)
    }
  },

  setUserRooms({ commit }) {
    try {
      commit('setError', '')

      const rooms = Chatkit.getUserRooms().map((room) => ({
        id: room.id,
        name: room.name
      }))

      commit('setRooms', rooms)
    } catch (error) {
      handleError(commit, error)
    }
  },

  async chatWithUser({ state, commit, dispatch }, user) {
    try {
      commit('setError', '')
      const roomName = Chatkit.generateRoomName(state.currentUserId, user.id)
      dispatch('setUserRooms')

      let room = state.rooms.find((room) => room.name === roomName)

      if (!room) {
        room = await Chatkit.createRoom(user.id)
        Chatkit.addUserToRoom(room.id, user.id)
      }

      commit('setCurrentRoom', {
        id: room.id,
        name: room.name,
        user: {
          name: user.name,
          email: user.id
        }
      })
      commit('clearMessages')

      await Chatkit.subscribeToRoom(room.id, {
        onMessage: (message) => {
          commit('addMessage', {
            name: message.sender.name,
            username: message.senderId,
            text: message.text,
            date: this.$moment(message.createdAt).format('hh:mm:ss D-MM-YYYY')
          })
        }
      })
    } catch (error) {
      handleError(commit, error)
    }
  },

  async sendMessage({ commit, state }, message) {
    try {
      commit('setError', '')
      const messageId = await Chatkit.sendMessage(message, state.currentRoom.id)

      return messageId
    } catch (error) {
      handleError(commit, error)
    }
  }
}
