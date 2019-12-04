<template>
  <div @keyup.esc.exact.native="esc" class="chat">
    <el-alert v-if="error" title="error" type="error" center="" />
    <el-container>
      <el-row :class="{ hide: asideIsHidden }" class="left-side">
        <el-row type="flex" justify="space-between" align="middle" class="chat__header chat__header_users">
          <span>{{ currentUserName }}</span>
          <el-row>
            <el-button @click="logout" round size="small">Sign out</el-button>
            <el-badge :value="commonUnreadCount" :hidden="!commonUnreadCount" class="aside-button" is-dot>
              <el-button @click="asideToggle" icon="el-icon-close" circle />
            </el-badge>
          </el-row>
        </el-row>
        <el-row class="chat__header_add_room">
          <el-button @click="roomDialogShow" size="small" round>Add room</el-button>
        </el-row>
        <room-list @choose-room="hideAside" />
      </el-row>
      <el-container>
        <el-header class="chat__header chat__header_message">
          <messages-header>
            <template slot="button">
              <el-badge :value="commonUnreadCount" :hidden="!commonUnreadCount" is-dot class="aside-button">
                <el-button @click="asideToggle" icon="el-icon-arrow-left" circle />
              </el-badge>
            </template>
          </messages-header>
        </el-header>
        <el-main v-if="currentRoom">
          <message-list />
          <message-form />
        </el-main>
      </el-container>
    </el-container>
    <add-room v-model="addRoomDialogShow" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { MessageForm, MessageList, MessagesHeader, RoomList, AddRoom } from '@/components'

export default {
  name: 'Messages',
  middleware: 'isAuth',
  components: { AddRoom, MessageForm, MessageList, MessagesHeader, RoomList },
  data: () => ({
    asideIsHidden: false,
    addRoomDialogShow: false
  }),
  computed: {
    ...mapState('chat', ['user', 'currentRoom', 'error']),
    ...mapGetters('chat', ['commonUnreadCount']),
    currentUserName() {
      return this.user.name
    }
  },
  methods: {
    ...mapActions('auth', {
      logoutUser: 'logout'
    }),
    ...mapActions('chat', ['getUsers']),
    ...mapActions('chat', {
      createOwnRoom: 'createRoom'
    }),
    asideToggle() {
      this.asideIsHidden = !this.asideIsHidden
    },
    hideAside() {
      this.asideIsHidden = true
    },
    roomDialogShow() {
      this.addRoomDialogShow = true
    },
    logout() {
      this.logoutUser()
      this.$router.push({ name: 'login' })
    },
    async createRoom() {
      const valid = await this.$refs.addRoomForm.validate()

      if (!valid) return

      this.createRoomLoading = true
      await this.createOwnRoom({ name: this.createRoomData.name, userId: this.createRoomData.userId })

      this.roomDialogToggle()
      this.createRoomData = {}
      this.createRoomLoading = false
    }
  }
}
</script>
<style lang="scss">
.add_room-dialog {
  padding: 15px;

  &-name,
  &-user {
    width: 100%;
  }
}
</style>
