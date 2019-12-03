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
            {{ getRecipient(room) }}
          </el-badge>
          <!--          {{ getStatus(room) }}-->
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

const MOCK_AVATAR = {
  size: 25,
  url: '/images/avatar.png'
}

export default {
  data: () => ({
    avatar: MOCK_AVATAR
  }),
  computed: {
    ...mapState('chat', ['currentRoom', 'user']),
    ...mapGetters('chat', {
      rooms: 'getRooms'
    })
  },
  methods: {
    ...mapActions('chat', ['chooseRoom']),
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

      console.log(user)
    }
  }
}
</script>

<style lang="scss">
.room-list {
  &-item {
    width: 100%;
    padding: 20px 15px 20px;
    transition: 0.2s;

    &:hover {
      background: #eee;
      cursor: pointer;
    }

    .status {
      position: relative;

      > sup {
        position: absolute;
        top: 50%;
        left: 100%;
        width: 10px;
        height: 10px;
      }
    }

    .unread {
      width: 100%;
      > sup {
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: calc(100% - 5px);
        width: 30px;
        transform: none;
      }
    }

    &.active {
      background: #585353;
      color: #fff;
    }
  }
}
</style>
