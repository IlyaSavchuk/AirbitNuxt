import ChatKit, { getUsers } from '@/services/chatkit'
import User from '@/models/User'

export const state = () => ({
  user: {
    rooms: []
  },
  currentRoom: '',
  users: []
})

export const mutations = {
  setUser: (state, user) => (state.user = user),

  setCurrentRoom: (state, room) => (state.currentRoom = room),

  addRoom: (state, room) => state.user.rooms.push(room),

  addMessagesToRoom: (state, { roomId, messages }) =>
    state.user.rooms.find(room => room.id === roomId).messages.push(...messages),

  addMessageToRoom: (state, { roomId, message }) => {
    const room = state.user.rooms.find(room => room.id === roomId)
    room.messages.push(message)
  },

  addOldMessageToRoom: (state, { roomId, message }) =>
    state.user.rooms.find(room => room.id === roomId).messages.unshift(message),

  setUsers: (state, users) => (state.users = [...users])
}

export const getters = {
  getRooms: state =>
    [...state.user.rooms].sort((a, b) => {
      const aDate = a.lastMessageAt ? a.lastMessageAt : a.createdAt
      const bDate = b.lastMessageAt ? b.lastMessageAt : b.createdAt

      return +new Date(aDate) < +new Date(bDate) ? 1 : -1
    }),
  commonUnreadCount: state =>
    state.user.rooms ? state.user.rooms.map(room => room.unreadCount).reduce((sum, value) => sum + value, 0) : 0,

  otherUsers: state => state.users.filter(user => user.id !== state.user.id)
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

    const userHandlers = {
      onMessage: message => dispatch('onMessage', message)
    }

    commit('setUser', new User(user, userHandlers))
  },

  async onAddedToRoom({ state, commit, dispatch }, room) {
    const subscribeRoom = await state.user.subscribeToRoomMultipart({
      roomId: room.id,
      hooks: {
        onMessage: message => dispatch('onMessage', message)
      },
      messageLimit: 10
    })

    subscribeRoom.messages = []

    commit('addRoom', subscribeRoom)
  },
  // TODO: events for future
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

  fillRoomMessages({ state, commit }, { room, messages }) {
    commit('addMessagesToRoom', { roomId: room.id, messages })
  },

  async sendMessage({ state, dispatch }, message) {
    await state.user.sendMessage(state.currentRoom, message)
  },

  setReadMessage({ state }, message) {
    state.user.setReadMessage(state.currentRoom, message)
  },

  async getUsers({ state, commit }) {
    const { data } = await getUsers()
    commit('setUsers', data.users)
  },

  async createRoom({ state, dispatch }, { name, userId }) {
    await state.user.createRoom({
      name,
      private: true,
      addUserIds: [userId]
    })
  }
}
