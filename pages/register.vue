<template>
  <div class="register">
    <el-card>
      <h2 class="register__title">Register</h2>
      <el-form ref="form" :model="registerData" :rules="rules" @submit.native.prevent="register" class="register__form">
        <el-form-item prop="name">
          <el-input v-model="registerData.name" placeholder="Name" prefix-icon="el-icon-user"> </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerData.email" placeholder="Email" prefix-icon="el-icon-message"> </el-input>
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
      <el-link type="info" href="/">
        Already have account? Click here to login.
      </el-link>
    </el-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
import authRules from '@/rules/auth'
import Chatkit from '@/services/chatkit'

export default {
  name: 'Register',
  middleware: ['guest'],
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
    ...mapActions({
      loginUser: 'chat/login'
    }),
    async register() {
      const valid = await this.$refs.form.validate()

      if (!valid) {
        return
      }

      this.loading = true

      try {
        await firebase.auth().createUserWithEmailAndPassword(this.registerData.email, this.registerData.password)

        await firebase.auth().currentUser.updateProfile({
          displayName: this.registerData.name
        })

        await Chatkit.createUser(this.registerData.email, this.registerData.name)

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
