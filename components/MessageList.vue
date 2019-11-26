<template>
  <div ref="messages" class="messages">
    <message-list-item
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :my="currentUserId === message.username"
      v-if="message.roomId === currentRoom.id"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageListItem from '@/components/MessageListItem'

export default {
  name: 'MessageList',
  components: {
    MessageListItem
  },
  computed: {
    ...mapState('chat', ['messages', 'currentUserId', 'currentRoom'])
  },
  watch: {
    messages() {
      if (this.messages.length) this.$nextTick(() => this.scrollToBottom())
    }
  },
  methods: {
    scrollToBottom() {
      const elem = this.$refs.messages
      elem.scrollTop = elem.scrollHeight
    }
  }
}
</script>
