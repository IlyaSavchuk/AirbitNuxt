<template>
  <div @keydown.esc="esc" class="chat">
    <el-alert v-if="error" title="error" type="error" center="" />
    <el-container>
      <el-row :class="{ hide: showAside }" class="left-side">
        <el-row type="flex" justify="space-between" align="middle" class="chat__header chat__header_users">
          <span>Messages</span>
          <el-row>
            <el-button @click="logout" icon="el-icon-right" circle />
            <el-badge :value="commonUnreadCount" :hidden="!commonUnreadCount" class="aside-button" is-dot>
              <el-button @click="asideToggle" icon="el-icon-close" circle />
            </el-badge>
          </el-row>
        </el-row>
        <room-list />
      </el-row>
      <el-container>
        <el-header class="chat__header chat__header_message">
          <messages-header>
            <template slot="button">
              <el-badge :value="commonUnreadCount" :hidden="!commonUnreadCount" is-dot class="aside-button">
                <el-button @click="asideToggle" icon="el-icon-more" circle />
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
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { MessageForm, MessageList, MessagesHeader, RoomList } from '@/components'

export default {
  name: 'Messages',
  middleware: 'isAuth',
  components: { MessageForm, MessageList, MessagesHeader, RoomList },
  data: () => ({
    showAside: false
  }),
  computed: {
    ...mapState('chat', ['currentRoom', 'error']),
    ...mapGetters('chat', ['commonUnreadCount'])
  },
  methods: {
    ...mapActions('auth', {
      logoutUser: 'logout'
    }),
    esc() {
      alert(1)
    },
    asideToggle() {
      this.showAside = !this.showAside
    },
    logout() {
      this.logoutUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
