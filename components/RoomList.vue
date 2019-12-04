<template>
  <div class="room-list">
    <transition-group name="flip-list" tag="div">
      <div
        v-for="room in rooms"
        :key="room.id"
        @click="selectRoom(room)"
        :class="{ active: activeRoom(room.id) }"
        class="room-list-item"
      >
        <el-badge
          :value="room.unreadCount"
          :max="99"
          :hidden="hideNotification(room.id, room.unreadCount)"
          class="unread"
        >
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
    </transition-group>
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
    selectRoom(room) {
      this.chooseRoom(room)
      this.$emit('choose-room')
    },
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
    },
    activeRoom(roomId) {
      return roomId === this.currentRoom.id
    },
    hideNotification(roomId, unreadMessagesCount) {
      if (this.activeRoom(roomId)) return true

      return unreadMessagesCount === 0
    }
  }
}
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
</style>
