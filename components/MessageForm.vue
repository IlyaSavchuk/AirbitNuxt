<template>
  <el-form @submit.native.prevent="send" class="message-form">
    <el-form-item prop="message" class="message-form__text">
      <el-input
        v-model="message"
        :rows="2"
        placeholder="Message"
        type="textarea"
      />
    </el-form-item>
    <el-form-item class="message-form__send-button">
      <el-button
        type="primary"
        native-type="submit"
        icon="el-icon-edit"
        circle
        block
        size="small"
      >
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MessageForm',
  data: () => ({
    message: ''
  }),
  methods: {
    ...mapActions('chat', ['sendMessage']),
    async send() {
      const message = this.message
      if (message.trim() === '') {
        return
      }

      this.message = ''

      await this.sendMessage(message)
    }
  }
}
</script>
