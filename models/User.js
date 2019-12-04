const roomsConstructor = (rooms, subscribeToRoomMultipart, onMessage) =>
  rooms.map(room => {
    subscribeToRoomMultipart({
      roomId: room.id,
      hooks: {
        onMessage
      },
      messageLimit: 20
    })

    room.messages = []

    return room
  })

export default class User {
  constructor(
    {
      id,
      name,
      rooms,
      users,
      sendMessage,
      sendMultipartMessage,
      sendSimpleMessage,
      subscribeToRoomMultipart,
      fetchMultipartMessages,
      updateUser,
      setReadCursor,
      createRoom,
      roomStore
    } = {},
    handlers
  ) {
    this.id = id
    this.name = name
    this.sendSimpleMessage = sendSimpleMessage
    this.subscribeToRoomMultipart = subscribeToRoomMultipart
    this.fetchMultipartMessages = fetchMultipartMessages
    this.rooms = roomsConstructor(rooms, subscribeToRoomMultipart, handlers.onMessage)
    this.setReadCursor = setReadCursor
    this.createRoom = createRoom
  }

  fetchMessages(room, direction = 'newer', initialId = null) {
    if (!initialId)
      initialId = room.messages[room.messages.length - 1] ? room.messages[room.messages.length - 1].id : null
    const params = {
      roomId: room.id,
      direction,
      limit: 20
    }

    if (initialId) params.initialId = initialId

    return this.fetchMultipartMessages(params)
  }

  setReadMessage(room, message) {
    return this.setReadCursor({
      roomId: room.id,
      position: message.id
    })
  }

  sendMessage(room, message) {
    return this.sendSimpleMessage({
      roomId: room.id,
      text: message
    })
  }
}
