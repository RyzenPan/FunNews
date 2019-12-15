<template>
  <div class="editPersonal">
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
      <!-- <span slot="right">退出</span> -->
    </hmheader>
    <div class="head">
      <img alt :src="current.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="current.nickname " @click="nickshow = !nickshow"></hmcell>
    <hmcell title="密码" desc="***** " @click="pwdshow = !pwdshow"></hmcell>
    <hmcell title="性别" :desc="gender " @click="showPicker = true"></hmcell>

    <!-- 昵称弹出框 -->
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="confirmNickname">
      <van-field
        :value="current.nickname"
        required
        ref="nicknameDialog"
        label="昵称"
        right-icon="question-o"
        placeholder="请输入昵称"
        @click-right-icon="$toast('请输入3到16位的用户名')"
      />
    </van-dialog>
    <!-- 密码弹出框 -->
    <van-dialog
      v-model="pwdshow"
      title="修改密码"
      show-cancel-button
      :before-close="beforeClose"
      :confirm="confirmPwd"
    >
      <van-field
        required
        ref="oldPwd"
        label="原密码"
        right-icon="question-o"
        placeholder="请输入原密码"
        @click-right-icon="$toast('请输入原有密码')"
      />
      <van-field
        required
        ref="newPwd"
        label="新密码"
        right-icon="question-o"
        placeholder="请输入新密码"
        @click-right-icon="$toast('请输入要设置的密码')"
      />
    </van-dialog>
    <!-- 性别选择 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="['女', '男']"
        @cancel="showPicker = false"
        @confirm="genderConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header.vue'
import hmcell from '@/components/hm_cell.vue'
import { uploadFile } from '@/api/uploadFile.js'
import { editUser, getUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      id: '',
      current: {
        head_img: ''
      },
      // 控制昵称弹窗
      nickshow: false,
      // 控制密码弹窗
      pwdshow: false,
      // 性别选择数据
      gender: '',
      showPicker: false
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    const { data: res } = await getUserInfo(this.id)
    this.current = res.data
    if (res.data.gender === 1) {
      this.gender = '男'
    } else {
      this.gender = '女'
    }
    if (res.data.head_img) {
      this.current.head_img =
        localStorage.getItem('hm_baseURL') + res.data.head_img
    } else {
      this.current.head_img =
        localStorage.getItem('hm_baseURL') + '/uploads/image/default.jpeg'
    }
  },
  components: {
    hmheader,
    hmcell
  },
  methods: {
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      let formData = new FormData()
      formData.append('file', file.file)
      const { data: res } = await uploadFile(formData)
      if (res.message !== '文件上传成功') {
        return this.$toast.fail('文件上传失败')
      }
      this.$toast.success('文件上传成功')
      const { data: res1 } = await editUser(this.id, { head_img: res.data.url })
      if (res1.message !== '修改成功') {
        return this.$toast.fail('修改失败')
      }
      this.current.head_img = localStorage.getItem('hm_baseURL') + res.data.url
    },
    // 昵称修改框
    async confirmNickname () {
      let nicknameVal = this.$refs.nicknameDialog.$refs.input.value
      const { data: res } = await editUser(this.id, { nickname: nicknameVal })
      if (res.message !== '修改成功') {
        return this.$toast.fail('修改失败，请重试')
      }
      this.$toast.success('修改成功')
      this.current.nickname = nicknameVal
    },
    // 修改密码对话框
    async confirmPwd () {
      if (this.current.password !== this.$refs.oldPwd.$refs.input.value) {
        return this.$toast.fail('原密码输入错误')
      }
      let password = this.$refs.newPwd.$refs.input.value
      const { data: res } = await editUser(this.id, { password })
      if (res.message !== '修改成功') {
        return this.$toast.fail('修改失败，请重试')
      }
      this.$toast.success('修改成功')
      this.pwdshow = false
    },
    // 控制密码框按钮
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (this.current.password !== this.$refs.oldPwd.$refs.input.value) {
          this.$toast.fail('原密码输入错误')
        }
        done(false)
      } else {
        done()
      }
    },
    // 性别选择器
    async genderConfirm (value, index) {
      let gender = index
      const { data: res } = await editUser(this.id, { gender })
      if (res.message !== '修改成功') {
        return this.$toast.fail('修改失败，请重试')
      }
      this.$toast.success('修改成功')
      if (gender === 1) {
        this.gender = '男'
      } else if (gender === 0) {
        this.gender = '女'
      }
      this.showPicker = false
    }
  }
}
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  border-bottom: 2px solid #ddd;
  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  /deep/.van-uploader__upload {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
.editPersonal {
  background-color: #f2f2f2;
  height: 100vh;
}
</style>
