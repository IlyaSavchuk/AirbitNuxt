import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import axios from 'axios'

const INSTANCE_LOCATOR = process.env.CHATKIT_INSTANCE_LOCATOR
const TOKEN_URL = process.env.CHATKIT_TOKEN_PROVIDER
const SERVER_BASE_URL = process.env.SERVER_BASE_URL

let currentUser = null

export default {
  createUser(userId, name) {
    return axios.post(`${SERVER_BASE_URL}/users`, { userId, name })
  },

  async connectUser(userId) {
    const chatManager = new ChatManager({
      instanceLocator: INSTANCE_LOCATOR,
      tokenProvider: new TokenProvider({ url: TOKEN_URL }),
      userId
    })

    currentUser = await chatManager.connect()

    return currentUser
  },

  createRoom(userId) {
    return currentUser.createRoom({
      creatorId: currentUser.id,
      name: this.generateRoomName(currentUser.id, userId),
      private: true,
      userIds: [userId]
    })
  },

  addUserToRoom(roomId, userId) {
    currentUser.addUserToRoom({ userId, roomId })
  },

  async subscribeToRoom(roomId, handlers) {
    const activeRoom = await currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onMessage: handlers.onMessage
      }
    })

    return activeRoom
  },

  getUsers() {
    return axios.get(`${SERVER_BASE_URL}/users`)
  },

  getUserRooms() {
    return currentUser.rooms
  },

  async sendMessage(text, roomId) {
    const messageId = await currentUser.sendMessage({
      text,
      roomId
    })

    return messageId
  },

  generateRoomName(userId, targetId) {
    const names = [userId, targetId]

    names.sort()

    return `${names[0]}-${names[1]}`
  }
}
