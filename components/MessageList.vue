<template>
  <div ref="list" class="messages" v-chat-scroll="{ always: false, smooth: true, scrollonremoved: true }">
    <message-list-item v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import MessageListItem from '@/components/MessageListItem'

export default {
  name: 'MessageList',
  components: {
    MessageListItem
  },
  computed: {
    ...mapState('chat', ['user']),
    ...mapState('chat', { room: 'currentRoom' }),
    ...mapGetters('chat', { messages: 'getMessages' }),
    lastMessage() {
      return this.messages[this.messages.length - 1]
    }
  },
  watch: {
    'room.unreadCount'(newValue, oldValue) {
      this.scrollToBottom()
    },
    messages(newValue, oldValue) {
      this.$nextTick(() => {
        if (this.messages.length) {
          this.$refs.list.scrollTop = this.$refs.list.scrollHeight
          this.setReadMessage(this.lastMessage)
        }
      })
    }
  },
  methods: {
    ...mapActions('chat', ['setReadMessage', 'fetchMessages']),
    scrollToBottom() {
      if (this.messages.length) {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight
        this.setReadMessage(this.lastMessage)
      }
    }
  }
}
</script>
