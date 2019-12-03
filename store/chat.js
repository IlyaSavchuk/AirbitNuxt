import ChatKit from '@/services/chatkit'
import User from '@/models/User'

export const state = () => ({
  user: {
    rooms: []
  },
  currentRoom: ''
})

export const mutations = {
  setUser: (state, user) => (state.user = user),

  setCurrentRoom: (state, room) => (state.currentRoom = room),

  addMessagesToCurrentRoom: (state, messages) => state.currentRoom.messages.push(...messages),

  addMessageToCurrentRoom: (state, message) => state.currentRoom.messages.push(message),

  addMessagesToRoom: (state, { roomId, messages }) =>
    state.user.rooms.find(room => room.id === roomId).messages.push(...messages),

  addMessageToRoom: (state, { roomId, message }) =>
    state.user.rooms.find(room => room.id === roomId).messages.push(message),

  addOldMessageToRoom: (state, { roomId, message }) =>
    state.user.rooms.find(room => room.id === roomId).messages.unshift(message)
}

export const getters = {
  getRooms: state => {
    return state.user
      ? [...state.user.rooms].sort((a, b) => (+new Date(a.lastMessageAt) < +new Date(b.lastMessageAt) ? 1 : -1))
      : []
  },
  commonUnreadCount: state =>
    state.user.rooms ? state.user.rooms.map(room => room.unreadCount).reduce((sum, value) => sum + value, 0) : 0
}

export const actions = {
  async login({ commit, state, dispatch }, userId) {
    const user = await ChatKit(userId, {
      onAddedToRoom: room => dispatch('onAddedToRoom', room),
      onRemovedFromRoom: room => dispatch('onRemovedFromRoom', room),
      onRoomUpdated: room => dispatch('onRoomUpdated', room),
      onRoomDeleted: room => dispatch('onRoomDeleted', room),
      onUserStartedTyping: (room, user) => dispatch('onUserStartedTyping', { room, user }),
      onUserStoppedTyping: (room, user) => dispatch('onUserStoppedTyping', { room, user }),
      onUserJoinedRoom: (room, user) => dispatch('onUserJoinedRoom', { room, user }),
      onUserLeftRoom: (room, user) => dispatch('onUserLeftRoom', { room, user }),
      onPresenceChanged: (state, user) => dispatch('onPresenceChanged', { state, user }),
      onNewReadCursor: cursor => dispatch('onNewReadCursor', cursor)
    })

    console.log(user)

    const userHandlers = {
      onMessage: message => dispatch('onMessage', message)
    }

    commit('setUser', new User(user, userHandlers))
  },

  onAddedToRoom({ state, commit }, room) {},
  onRemovedFromRoom({ commit }, room) {},
  onRoomUpdated({ commit }, room) {},
  onRoomDeleted({ commit }, room) {},
  onUserStartedTyping({ commit }, { room, user }) {},
  onUserStoppedTyping({ commit }, { room, user }) {},
  onUserJoinedRoom({ commit }, { room, user }) {},
  onUserLeftRoom({ commit }, { room, user }) {},
  onPresenceChanged({ commit }, { state, user }) {},
  onNewReadCursor({ commit }, cursor) {},

  onMessage({ state, dispatch, commit }, message) {
    commit('addMessageToRoom', { roomId: message.roomId, message })
  },

  async chooseRoom({ commit, dispatch }, room) {
    commit('setCurrentRoom', room)
    const messages = await dispatch('fetchMessages', room)
    dispatch('fillRoomMessages', { room, messages })
  },

  async fetchMessages({ state, commit, dispatch }, room) {
    const messages = await state.user.fetchMessages(room)
    return messages
  },

  async fetchOldMessages({ state, commit }) {
    const messages = await state.user.fetchMessages(state.currentRoom, 'older', state.currentRoom.messages[0].id)

    commit('addOldMessageToRoom', { roomId: state.currentRoom.id, messages })
  },

  // async updateMessages({ state, commit, dispatch }, { room, initialId }) {
  //   const messages = await state.user.fetchMessages(room, initialId)
  //   return messages
  // },

  fillRoomMessages({ state, commit }, { room, messages }) {
    commit('addMessagesToRoom', { roomId: room.id, messages })
  },
  sendMessage({ state, dispatch }, message) {
    state.user.sendMessage(state.currentRoom, message)
    console.log(state.currentRoom)
    // dispatch('updateMessages')
  },
  setReadMessage({ state }, message) {
    state.user.setReadMessage(state.currentRoom, message)
  }
}
