<template>
  <div class="login">
    <div id="app">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <!-- <input data-v-744880be placeholder="请输入手机号" class="input" />
          <input data-v-744880be placeholder="密码" class="input" type="password" />-->
          <hminput
            v-model="userForm.username"
            placeholder="请输入账户/手机号"
            msg_err="搞错手机号了"
            :rules="/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/"
          ></hminput>
          <hminput type="password" placeholder="请输入密码" v-model="userForm.password"></hminput>
        </div>
        <p class="tips">
          没有账号？
          <a href="#/register" class>去注册</a>
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
        username: '',
        password: ''
      }
    }
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    login () {
      // console.log(this.userForm)
      // console.log(userLogin)
      userLogin(this.userForm)
        .then(res => {
          console.log(res)
          let id = res.data.data.user.id
          window.localStorage.setItem('hm_token', res.data.data.token)
          if (res.data.message === '登录成功') {
            this.$router.push({ path: `/personal/${id}` })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
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
