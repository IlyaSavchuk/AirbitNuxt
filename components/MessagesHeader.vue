<template>
  <el-row class="companion">
    <slot name="button" />
    <el-row>
      <div v-if="currentRoom" class="companion-user">
        <div class="companion__name">{{ recipier.name }} ({{ currentRoom.name }})</div>
        <div class="companion__email">{{ recipier.id }}</div>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MessagesHeader',
  computed: {
    ...mapState('chat', ['user', 'currentRoom']),
    recipier() {
      return this.currentRoom.users ? this.currentRoom.users.find(user => user.id !== this.user.id) : {}
    }
  }
}
</script>
