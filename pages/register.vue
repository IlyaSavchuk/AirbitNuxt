<template>
  <div class="register">
    <el-card>
      <h2 class="register__title">Register</h2>
      <el-form ref="form" :model="registerData" :rules="rules" @submit.native.prevent="register" class="register__form">
        <el-form-item prop="name">
          <el-input v-model="registerData.name" placeholder="Name" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerData.email" placeholder="Email" prefix-icon="el-icon-message" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerData.password" prefix-icon="el-icon-setting" placeholder="Password" show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" class="register__button" type="primary" native-type="submit" block
            >Register
          </el-button>
        </el-form-item>
      </el-form>
      <nuxt-link :to="{ name: 'login' }">
        <el-link type="info">Already have account? Click here to login.</el-link>
      </nuxt-link>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { createUser as ChatCreateUser } from './../services/chatkit'
import authRules from '@/rules/auth'
import { auth } from '@/services/firebase'

export default {
  data: () => ({
    registerData: {
      name: '',
      email: '',
      password: ''
    },
    loading: false,
    rules: authRules.register
  }),
  methods: {
    ...mapActions('chat', {
      loginUser: 'login'
    }),
    async register() {
      const valid = await this.$refs.form.validate()

      if (!valid) {
        return
      }

      this.loading = true

      try {
        await auth.createUserWithEmailAndPassword(this.registerData.email, this.registerData.password)

        await auth.currentUser.updateProfile({
          displayName: this.registerData.name
        })

        await ChatCreateUser(this.registerData.email, this.registerData.name)
        await this.loginUser(this.registerData.email)

        this.$router.push('messages')
      } catch (exception) {
        this.$message.error(exception)
      }

      this.loading = false
    }
  }
}
</script>
