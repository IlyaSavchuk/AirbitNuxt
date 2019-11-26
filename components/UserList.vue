<template>
  <div class="users-list">
    <el-row
      v-for="(user, key) in otherUsers"
      :key="key"
      @click.native="startConversation(user)"
      :class="{ 'users-list__item_active': user.id === currentCompanionId }"
      :title="user.name"
      class="users-list__item"
    >
      <el-col :span="3">
        <el-avatar :size="avatar.size" :src="avatar.url" />
      </el-col>
      <el-col :span="21" class="users-list__item-text">{{ user.name }}</el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

const MOCK_AVATAR = {
  size: 25,
  url: '/images/avatar.png'
}

export default {
  name: 'UserList',
  data: () => ({
    avatar: MOCK_AVATAR
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
