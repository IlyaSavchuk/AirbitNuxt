<template>
  <div class="companion">
    <div class="companion-user">
      <div class="companion__name">{{ user.name }}</div>
      <div class="companion__email">{{ user.id }}</div>
    </div>

    <button @click="logout" class="companion-logout">logout</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MessagesHeader',
  computed: {
    ...mapState('chat', ['currentRoom']),
    user() {
      return this.currentRoom.user
    }
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
