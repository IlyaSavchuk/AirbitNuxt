import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

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
