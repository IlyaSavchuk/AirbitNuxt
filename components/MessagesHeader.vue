<template>
  <el-row type="flex" justify="space-between" class="companion">
    <el-col>
      <div class="companion-user">
        <div class="companion__name">{{ user.name }}</div>
        <div class="companion__email">{{ user.id }}</div>
      </div>
    </el-col>
    <el-col>
      <button @click="logout" class="companion-logout">logout</button>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MessagesHeader',
  computed: {
    ...mapState('chat', ['user'])
    // user() {
    //   // return this.currentRoom.user
    // }
  },
  methods: {
    ...mapActions('auth', {
      logoutUser: 'logout'
    }),
    logout() {
      this.logoutUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
