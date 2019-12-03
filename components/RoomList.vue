<template>
  <div class="room-list">
    <div
      v-for="room in rooms"
      :key="room.id"
      @click="chooseRoom(room)"
      :class="{ active: room.id === currentRoom.id }"
      class="room-list-item"
    >
      <el-badge :value="room.unreadCount" :max="99" :hidden="!room.unreadCount" class="unread">
        <el-row>
          <el-badge :max="99" :hidden="!getStatus(room)" is-dot type="success" class="status">
            {{ room.name }}
          </el-badge>
        </el-row>
        <el-row>
          <small>{{ getRecipient(room) }}</small>
        </el-row>
        <el-row>
          <small>{{ lastMessageAt(room) }}</small>
        </el-row>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('chat', ['currentRoom', 'user']),
    ...mapGetters('chat', {
      rooms: 'getRooms'
    })
  },
  methods: {
    ...mapActions('chat', ['chooseRoom', 'getUsers']),
    getRecipient(room) {
      return room.userIds.find(user => user !== this.user.id)
    },
    getStatus(room) {
      const user = room.users.find(user => user.id !== this.user.id)
      if (!user) return false

      return user.presence.state === 'online'
    },
    lastMessageAt(room) {
      return this.$moment(room.lastMessageAt).format('DD-MM-YYYY HH:mm:ss')
    },
    getLastActive(room) {
      const user = room.users.find(user => user.id !== this.user.id)
      if (!user) return null
    }
  }
}
</script>
