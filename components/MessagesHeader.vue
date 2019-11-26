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
import { auth } from 'firebase'

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
      auth().signOut()
      this.logoutUser()
      this.$router.push({ name: 'index', force: true })
    }
  }
}
</script>
