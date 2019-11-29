<template>
  <div class="register">
    <el-card>
      <h2 class="register__title">Login</h2>
      <el-form
        ref="form"
        :model="loginData"
        :rules="rules"
        @submit.native.prevent="login"
        class="register__form"
      >
        <el-form-item prop="email">
          <el-input
            v-model="loginData.email"
            placeholder="Email"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            prefix-icon="el-icon-setting"
            placeholder="Password"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="register__button"
            type="primary"
            native-type="submit"
            block
            >Login
          </el-button>
        </el-form-item>
      </el-form>
      <el-link type="info" href="/register">
        Don't have account yet? Click here to register.
      </el-link>
    </el-card>
  </div>
</template>

<script>
import { auth } from 'firebase'
import { mapActions } from 'vuex'
import authRules from '../../rules/auth'

export default {
  name: 'Index',
  data: () => ({
    loginData: {
      email: '',
      password: ''
    },
    loading: false,
    rules: authRules.login
  }),
  methods: {
    ...mapActions('chat', {
      loginUser: 'login'
    }),
    async login() {
      const valid = await this.$refs.form.validate()

      if (!valid) {
        return
      }

      this.loading = true

      try {
        await auth().signInWithEmailAndPassword(
          this.loginData.email,
          this.loginData.password
        )

        await this.loginUser(this.loginData.email)

        this.$router.push('messages')
      } catch (exception) {
        this.$message.error(exception)
      }

      this.loading = false
    }
  }
}
</script>
