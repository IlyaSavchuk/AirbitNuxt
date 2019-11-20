<template>
  <div class="users-list">
    <el-row
      v-for="(user, key) in otherUsers"
      :key="key"
      @click.native="startConversation(user)"
      :class="{ 'users-list__item_active': user.id === currentCompanionId }"
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
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserList',
  data: () => ({
    avatar: {
      size: 25,
      url: '/images/avatar.png'
    }
  }),
  computed: {
    ...mapState('chat', ['currentUserId']),
    ...mapGetters('chat', ['otherUsers', 'currentCompanionId'])
  },
  async beforeMount() {
    await this.setUsers()
  },
  methods: {
    ...mapActions('chat', ['setUsers', 'startConversationWithUser']),

    startConversation(user) {
      this.startConversationWithUser(user)
    }
  }
}
</script>
