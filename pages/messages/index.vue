<template>
  <div class="chat">
    <el-alert v-if="error" title="error" type="error" center="" />
    <el-container>
      <el-aside width="" class="left-side">
        <el-header class="chat__header chat__header_users">
          Messages
        </el-header>
        <users />
      </el-aside>
      <el-container v-if="currentRoom.id">
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
import UserList from '../../components/UserList'
import MessagesHeader from '../../components/MessagesHeader'
import MessageList from '../../components/MessageList'
import MessageForm from '../../components/MessageForm'

export default {
  name: 'Messages',
  components: { MessageForm, MessageList, MessagesHeader, UserList },
  middleware: ['auth'],
  computed: {
    ...mapState('chat', ['currentRoom', 'error'])
  }
}
</script>
