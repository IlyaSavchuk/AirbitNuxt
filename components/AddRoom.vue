<template>
  <el-dialog :visible.sync="dialogVisible" @close="close" title="Add room" width="300px" class="add_room-dialog">
    <span class="dialog-footer">
      <el-form ref="addRoomForm" :rules="roomAddRule" :model="createRoomData">
        <el-form-item prop="name">
          <el-input
            v-model="createRoomData.name"
            placeholder="Name"
            prefix-icon="el-icon-user"
            class="add_room-dialog-name"
          />
        </el-form-item>
        <el-form-item prop="userId">
          <el-select v-model="createRoomData.userId" placeholder="User" class="add_room-dialog-user">
            <el-option v-for="user in otherUsers" :key="user.id" :label="user.name" :value="user.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="createRoom" :loading="createRoomLoading" type="primary">Add</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getUsers } from '../services/pusher'
import { name as validateName } from '@/rules/validate'
import rule from '@/rules/room'

export default {
  model: {
    prop: 'visible',
    event: 'close'
  },
  props: {
    visible: {
      default: false
    }
  },
  data: () => ({
    createRoomData: {},
    createRoomLoading: false,
    roomAddRule: rule.add,
    dialogVisible: false,
    users: []
  }),
  computed: {
    ...mapState('chat', ['user']),
    otherUsers() {
      return this.users.filter(user => user.id !== this.user.id)
    }
  },
  watch: {
    visible() {
      this.updateDialogVisible(this.visible)
    }
  },
  created() {
    this.updateDialogVisible(this.visible)
    this.setValidate()
    this.getAndFilterUsers()
  },
  methods: {
    ...mapActions('chat', {
      createOwnRoom: 'createRoom'
    }),
    async getAndFilterUsers() {
      const {
        data: { users }
      } = await getUsers()
      this.users = users
    },
    async createRoom() {
      const valid = await this.$refs.addRoomForm.validate()

      if (!valid) return

      this.createRoomLoading = true
      try {
        await this.createOwnRoom({ userId: this.createRoomData.userId, name: this.createRoomData.name })
      } catch (e) {
        this.$message.error(e)
      }

      this.createRoomData = {}
      this.createRoomLoading = false
      this.close()
    },
    setValidate() {
      this.roomAddRule.name.push({
        validator: validateName,
        trigger: 'blur'
      })
    },
    close() {
      this.$emit('close', false)
    },
    updateDialogVisible(visible) {
      this.dialogVisible = visible
    }
  }
}
</script>
