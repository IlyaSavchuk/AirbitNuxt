<template>
  <div ref="messages" class="messages">
    <div
      v-for="message in messages"
      :class="{ messages__item_me: currentUserId === message.username }"
      class="messages__item"
    >
      <el-card class="messages__item-text">
        {{ message.text }}
      </el-card>
      <span class="messages__item-date">{{ message.date }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MessageList',
  computed: {
    ...mapState('chat', ['messages', 'currentUserId'])
  },
  watch: {
    messages() {
      if (this.messages.length) {
        this.$nextTick(() => this.scrollToBottom())
      }
    }
  },
  methods: {
    scrollToBottom() {
      const elem = this.$refs.messages
      elem.scrollTop = elem.lastElementChild.offsetTop
    }
  }
}
</script>
