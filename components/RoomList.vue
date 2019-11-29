<template>
  <div class="room-list">
    <h3>Room list</h3>
    <ul>
      <li v-for="room in rooms" :key="room.id" @click="chooseRoom(room)">
        {{ room.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const MOCK_AVATAR = {
  size: 25,
  url: '/images/avatar.png'
}

export default {
  data: () => ({
    avatar: MOCK_AVATAR
  }),
  computed: {
    ...mapGetters('chat', {
      rooms: 'getRooms'
    })
  },
  async beforeMount() {
    // await this.setUsers()
  },
  methods: {
    ...mapActions('chat', ['chooseRoom']),

    startConversation(user) {
      // this.startConversationWithUser(user)
    }
  }
}
</script>
