<template>
  <div class="users-list">
    <el-row
      v-for="user in otherUsers"
      @click.native="startConversation(user)"
      :class="{ 'users-list__item_active': user.id === currentChatWith }"
      class="users-list__item"
    >
      <el-col :span="3">
        <el-avatar :size="avatar.size" :src="avatar.url"></el-avatar>
      </el-col>
      <el-col :span="21">{{ user.name }}</el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserList',
  data: () => ({
    avatar: {
      size: 25,
      url: '/images/avatar.png'
    },
    currentChatWith: null
  }),
  computed: {
    ...mapState('chat', ['users', 'currentUserId']),
    otherUsers() {
      return this.users.filter((user) => user.id !== this.currentUserId)
    }
  },
  async beforeMount() {
    await this.setUsers()
  },
  methods: {
    ...mapActions('chat', ['setUsers', 'chatWithUser']),
    startConversation(user) {
      this.currentChatWith = user.id
      this.chatWithUser(user)
    }
  }
}
</script>
