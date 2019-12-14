<template>
  <div class="register">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <hminput
          v-model="userForm.username"
          placeholder="用户名 / 手机号码"
          msg_err="请输入正确的手机号码"
          :rules="/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/"
        ></hminput>
        <hminput type="text" msg_err="请输入昵称" placeholder="昵称" v-model="userForm.nickname"></hminput>
        <hminput type="password" msg_err="请输入密码" placeholder="请输入密码" v-model="userForm.password"></hminput>
      </div>
      <hmbutton text="注册" @click="register"></hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
import { userRegister, userLogin } from '@/api/user.js'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    async register () {
      const { data: res } = await userRegister(this.userForm).catch(err => err)
      if (res.message !== '注册成功') {
        return this.$toast(res.message)
      }
      // this.$router.go(-1)
      this.$toast('注册成功')
      // 进行自动登录------------------------------
      const { data: res1 } = await userLogin(this.userForm).catch(err => err)
      if (res1.message !== '登录成功') {
        return this.$toast(res.message)
      }
      let id = res1.data.user.id
      // 把token存到localStorage中
      window.localStorage.setItem('hm_token', res1.data.token)
      // 跳转到个人页面
      this.$router.push({ path: `/personal/${id}` })
      // -----------------------------------------
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  background-color: #f2f2f2;
  height: 94vh;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
    background-color: transparent;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
