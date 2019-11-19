<template>
  <div class="companion">
    <div class="companion__name">{{ user.name }}</div>
    <div class="companion__email">{{ user.email }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MessagesHeader',
  computed: {
    ...mapState('chat', ['currentRoom']),
    user() {
      return this.currentRoom.user
    }
  }
}
</script>

<style scoped></style>
