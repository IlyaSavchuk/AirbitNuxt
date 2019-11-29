import ChatKit from '@/services/chatkit'
import User from '@/models/User'

export const state = () => ({
  user: {
    rooms: []
  },
  mess: [],
  currentRoomId: ''
})

export const mutations = {
  setUser: (state, user) => (state.user = user),

  setUsers(state, users) {
    state.users = [...users]
  },

  addMes: (state, message) => {
    state.mess.push({
      id: message,
      roomId: message.roomId,
      parts: message.parts,
      createdAt: message.createdAt,
      senderId: message.senderId
    })
  },
  setCurrentRoomId: (state, room) => (state.currentRoomId = room.id)
}

export const getters = {
  getRooms: (state) => {
    return state.user
      ? [...state.user.rooms].sort((a, b) => (+new Date(a.lastMessageAt) > +new Date(b.lastMessageAt) ? 1 : -1))
      : []
  }
}

export const actions = {
  async login({ commit, state, dispatch }, userId) {
    const user = await ChatKit(userId, {
      onAddedToRoom: (room) => dispatch('onAddedToRoom', room),
      onRemovedFromRoom: (room) => dispatch('onRemovedFromRoom', room),
      onRoomUpdated: (room) => dispatch('onRoomUpdated', room),
      onRoomDeleted: (room) => dispatch('onRoomDeleted', room),
      onUserStartedTyping: (room, user) => dispatch('onUserStartedTyping', { room, user }),
      onUserStoppedTyping: (room, user) => dispatch('onUserStoppedTyping', { room, user }),
      onUserJoinedRoom: (room, user) => dispatch('onUserJoinedRoom', { room, user }),
      onUserLeftRoom: (room, user) => dispatch('onUserLeftRoom', { room, user }),
      onPresenceChanged: (state, user) => dispatch('onPresenceChanged', { state, user }),
      onNewReadCursor: (cursor) => dispatch('onNewReadCursor', cursor)
    })

    console.log(user)

    commit('setUser', new User(user, (message) => dispatch('onMessage', message)))
  },

  onAddedToRoom({ commit }, room) {},
  onRemovedFromRoom({ commit }, room) {},
  onRoomUpdated({ commit }, room) {},
  onRoomDeleted({ commit }, room) {},
  onUserStartedTyping({ commit }, { room, user }) {},
  onUserStoppedTyping({ commit }, { room, user }) {},
  onUserJoinedRoom({ commit }, { room, user }) {},
  onUserLeftRoom({ commit }, { room, user }) {},
  onPresenceChanged({ commit }, { state, user }) {},
  onNewReadCursor({ commit }, cursor) {},

  onMessage({ commit }, message) {
    console.log(message)
    // commit('addMes', message)
  },
  chooseRoom({ commit, dispatch }, room) {
    commit('setCurrentRoomId', room)
    dispatch('fetchMessages', room)
  },
  async fetchMessages({ state, commit, dispatch }, room) {
    // eslint-disable-next-line no-unused-vars
    console.log(room)
    const messages = await state.user.fetchMessages(room)

    dispatch('setRoomMessages', { room, messages })
    console.log(messages)
    // commit('')
  },

  setRoomMessages({ state }, { room, messages }) {
    if (!room.messages) room.messages = []
    room.messages.push([...messages])
  }
}
