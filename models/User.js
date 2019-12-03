const roomsConstructor = (rooms, subscribeToRoomMultipart, onMessage) =>
  rooms.map(room => {
    subscribeToRoomMultipart({
      roomId: room.id,
      hooks: {
        onMessage
      },
      messageLimit: 10
    })

    room.messages = []
    // room.users = []

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
      subscribeToRoom,
      fetchMultipartMessages,
      updateUser,
      setReadCursor
    } = {},
    handlers
  ) {
    this.id = id
    this.name = name
    // this.users = users
    // this.sendMessage = sendMessage
    this.sendMultipartMessage = sendMultipartMessage
    this.sendSimpleMessage = sendSimpleMessage
    this.subscribeToRoomMultipart = subscribeToRoomMultipart
    this.subscribeToRoom = subscribeToRoom
    this.fetchMultipartMessages = fetchMultipartMessages
    // this.rooms = rooms
    this.rooms = roomsConstructor(rooms, subscribeToRoomMultipart, handlers.onMessage)
    // console.log(this.rooms)
    this.updateUser = updateUser
    this.setReadCursor = setReadCursor

    console.log(this)
  }

  fetchMessages(room, direction = 'newer', initialId = null) {
    if (!initialId)
      initialId = room.messages[room.messages.length - 1] ? room.messages[room.messages.length - 1].id : null
    const params = {
      roomId: room.id,
      direction,
      limit: 50
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
