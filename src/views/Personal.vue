<template>
  <div class="personal">
    <div @click="editUser">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="userInfoOBJ.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              :class="['iconfont',userInfoOBJ.gender === 1 ? 'iconxingbienan' : 'iconxingbienv'] "
            ></span>
            {{userInfoOBJ.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 信息栏 -->
    <hmcell title="我的关注" desc="关注的用户 " @click="$router.push({ name: 'MyFocus' })"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复 " @click="$router.push({ name: 'MyKeeps' })"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频 " @click="$router.push({ name: 'MyCollect' })"></hmcell>
    <hmcell title="设置" desc @click="editUser"></hmcell>
    <hmButton text="退出登录" @click="outLine"></hmButton>
    <hmButton text="看新闻" @click="$router.push({name:'Index'})"></hmButton>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user.js'
import hmcell from '@/components/hm_cell.vue'
import hmButton from '@/components/hm_button.vue'
export default {
  components: {
    hmcell,
    hmButton
  },
  data () {
    return {
      userInfoOBJ: {}
    }
  },
  async mounted () {
    let id = this.$route.params.id
    const { data: res } = await getUserInfo(id)
    this.userInfoOBJ = res.data
    if (res.data.head_img) {
      this.userInfoOBJ.head_img =
        localStorage.getItem('hm_baseURL') + res.data.head_img
    } else {
      this.userInfoOBJ.head_img =
        localStorage.getItem('hm_baseURL') + '/uploads/image/default.jpeg'
    }
  },
  methods: {
    editUser () {
      this.$router.push({ path: `/userUpdate/${this.userInfoOBJ.id}` })
    },
    outLine () {
      localStorage.removeItem('hm_baseURL')
      localStorage.removeItem('hm_token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}

.btn {
  margin: 50px auto;
}
</style>
