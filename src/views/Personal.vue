<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="userInfoOBJ.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{userInfoOBJ.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <!-- 列表 -->
    <ul>
      <li>
        <router-link class="list" to>
          <p>我的关注</p>
          <span>关注的用户 ></span>
        </router-link>
      </li>
      <li>
        <router-link class="list" to>
          <p>我的跟帖</p>
          <span>跟帖/回复 ></span>
        </router-link>
      </li>
      <li>
        <router-link class="list" to>
          <p>我的收藏</p>
          <span>文章/视频 ></span>
        </router-link>
      </li>
      <li>
        <router-link class="list" to>
          <p>设置</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      userInfoOBJ: {}
    }
  },
  async mounted () {
    let id = this.$route.params.id
    const { data: res } = await getUserInfo(id)
    console.log(res)
    this.userInfoOBJ = res.data
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
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

.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  p {
    font-size: 16px;
    color: #333;
  }
  span {
    font-size: 14px;
  }
}
</style>
