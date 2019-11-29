const roomsConstructor = (rooms, subscribeToRoomMultipart, onMessage) =>
  rooms.map((room) => {
    subscribeToRoomMultipart({
      roomId: room.id,
      hooks: {
        onMessage
      },
      messageLimit: 10
    })

    return {
      id: room.id,
      name: room.name,
      lastMessageAt: room.lastMessageAt,
      updatedAt: room.updatedAt,
      isPrivate: room.isPrivate,
      createdByUserId: room.createdByUserId
    }
  })

export default class User {
  constructor(
    { id, name, rooms, users, sendMessage, subscribeToRoomMultipart, subscribeToRoom, fetchMultipartMessages } = {},
    onMessage
  ) {
    this.id = id
    this.name = name
    // this.users = users
    this.sendMessage = sendMessage
    this.subscribeToRoomMultipart = subscribeToRoomMultipart
    this.subscribeToRoom = subscribeToRoom
    this.fetchMultipartMessages = fetchMultipartMessages
    this.rooms = rooms

    this.rooms = roomsConstructor(rooms, subscribeToRoomMultipart, onMessage)
  }

  // getSubscriptionRooms() {
  //   return this.rooms.map((room) => {
  //     this.subscribeToRoom()
  //   })
  // }

  fetchMessages(room) {
    return this.fetchMultipartMessages({
      roomId: room.id,
      direction: 'older',
      limit: 50
    })
  }

  getNameWithId() {
    return this.id + this.name
  }
}
