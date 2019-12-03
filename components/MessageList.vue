<template>
  <div ref="list" class="messages">
    <message-list-item
      v-for="message in currentRoom.messages"
      :key="message.id"
      :message="message"
      :my="user.id === message.sender.id"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MessageListItem from '@/components/MessageListItem'

export default {
  name: 'MessageList',
  components: {
    MessageListItem
  },
  computed: {
    ...mapState('chat', ['user', 'currentRoom']),
    lastMessage() {
      return this.currentRoom.messages[this.currentRoom.messages.length - 1]
    }
  },
  watch: {
    'currentRoom.unreadCount'(newValue, oldValue) {
      this.scrollToBottom()
    },
    'currentRoom.messages'(newValue, oldValue) {
      this.scrollToBottom()
      this.$nextTick(() => {
        if (this.currentRoom.messages.length) {
          this.$refs.list.scrollTop = this.$refs.list.scrollHeight
          this.setReadMessage(this.lastMessage)
        }
      })
    }
  },
  mounted() {
    this.$el.addEventListener('scroll', event => {})
  },
  methods: {
    ...mapActions('chat', ['setReadMessage', 'fetchOldMessages']),
    scrollToBottom() {
      this.$el.scrollTop = this.$el.scrollHeight
    }
  }
}
</script>
