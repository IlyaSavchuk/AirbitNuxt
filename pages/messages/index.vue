<template>
  <div class="chat">
    <el-alert v-if="error" title="error" type="error" center="" />
    <el-container>
      <el-aside width="" class="left-side">
        <el-header class="chat__header chat__header_users">
          Messages
        </el-header>
        <user-list />
      </el-aside>
      <el-container>
        <el-header class="chat__header chat__header_message">
          <messages-header />
        </el-header>
        <el-main>
          <message-list />
          <message-form />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  MessageForm,
  MessageList,
  MessagesHeader,
  UserList
} from '@/components'

export default {
  name: 'Messages',
  components: { MessageForm, MessageList, MessagesHeader, UserList },
  middleware: ['auth'],
  computed: {
    ...mapState('chat', ['currentRoom', 'error'])
  }
}
</script>
