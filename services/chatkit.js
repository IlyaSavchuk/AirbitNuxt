import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import axios from 'axios'

export const createUser = (userId, name) => axios.post(`${process.env.SERVER_BASE_URL}/users`, { userId, name })

export const getUsers = () => axios.get(`${process.env.SERVER_BASE_URL}/users`)

export default (userId, handlers) => {
  const chatManager = new ChatManager({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({
      url: process.env.CHATKIT_TOKEN_PROVIDER
    }),
    userId
  })

  return chatManager.connect({
    onAddedToRoom: handlers.onAddedToRoom,
    onRemovedFromRoom: handlers.onRemovedFromRoom,
    onRoomUpdated: handlers.onRoomUpdated,
    onRoomDeleted: handlers.onRoomDeleted,
    onUserStartedTyping: handlers.onUserStartedTyping,
    onUserStoppedTyping: handlers.onUserStoppedTyping,
    onPresenceChanged: handlers.onPresenceChanged
  })
}
