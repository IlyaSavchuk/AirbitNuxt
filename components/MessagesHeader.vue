<template>
  <el-row type="flex" justify="space-between" class="companion">
    <el-row type="flex" justify="space-between" class="companion">
      <div>
        <div class="companion-user">
          <div class="companion__name">{{ user.name }}</div>
          <div class="companion__email">{{ user.id }}</div>
        </div>
      </div>
      <div v-if="Object.keys(recipier).length">
        <el-icon name="right" />
      </div>
      <div>
        <div class="companion-user">
          <div class="companion__name">{{ recipier.name }}</div>
          <div class="companion__email">{{ recipier.id }}</div>
        </div>
      </div>
    </el-row>
    <slot name="button" />
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
  },
  methods: {}
}
</script>
