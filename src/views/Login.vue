<template>
  <div class="login">
    <div id="app">
      <div class="container">
        <div class="close" @click="$router.go(-1)">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <hminput
            v-model="userForm.username"
            placeholder="请输入账户/手机号"
            msg_err="请输入正确的手机号码"
            :rules="/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/"
          ></hminput>
          <hminput type="password" msg_err="请输入密码" placeholder="请输入密码" v-model="userForm.password"></hminput>
        </div>
        <p class="tips">
          没有账号？
          <router-link to="register">去注册</router-link>
        </p>
        <hmbutton text="登录" @click="login"></hmbutton>
      </div>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
import { userLogin } from '@/api/user.js'
export default {
  data () {
    return {
      userForm: {
        username: '10086',
        password: '123'
      }
    }
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    // 发起登录请求
    async login () {
      const { data: res } = await userLogin(this.userForm).catch(err => err)
      if (res.message !== '登录成功') {
        return this.$toast(res.message)
      }
      let id = res.data.user.id
      // 把token存到localStorage中
      window.localStorage.setItem('hm_token', res.data.token)
      // 跳转到个人页面
      this.$router.push({ path: `/personal/${id}` })
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
