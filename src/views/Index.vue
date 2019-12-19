<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <span class="iconfont iconnew logoIcon"></span>
      <router-link to="/search" class="center">
        <van-icon name="search" class="searchIcon" />&nbsp;&nbsp;搜索新闻
      </router-link>
      <div @click="myPersonal" class="right">
        <van-icon name="user-circle-o" class="headerICON" />
      </div>
    </div>
    <!-- Tab导航栏 -->
    <!-- <van-tabs v-model="active" sticky swipeable animated>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <van-list
          v-model="cate.loading"
          :immediate-check="false"
          :offset="10"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <hmPostCell v-for="post in cate.postList" :key="post.id" :post="post"></hmPostCell>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>-->
    <van-tabs v-model="active" sticky swipeable animated>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <van-list
          v-model="cate.loading"
          :immediate-check="false"
          :offset="10"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <hmPostCell v-for="post in cate.postList" :key="post.id" :post="post"></hmPostCell>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getPostList } from '@/api/post.js'
import hmPostCell from '@/components/hm_postCell.vue'
export default {
  components: {
    hmPostCell
  },
  data() {
    return {
      active: localStorage.getItem('hm_token') ? 1 : 0,
      // active: 1,
      cateList: []
    }
  },
  async mounted() {
    const res = await getCateList()
    if (res.status !== 200) {
      return this.$toast.fail('请求数据失败')
    }
    this.cateList = res.data.data
    // 数据改造
    this.cateList = this.cateList.map(item => {
      return {
        ...item,
        pageIndex: 1,
        pageSize: 6,
        postList: [],
        finished: false,
        loading: false,
        isLoading: false
      }
    })
    // this.cateList.push({ name: '分类管理' })
    console.log(this.cateList)
    this.getPostListFunc()
  },
  watch: {
    active() {
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostListFunc()
      }
    }
  },
  methods: {
    async getPostListFunc() {
      const res = await getPostList({
        category: this.cateList[this.active].id,
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize
      })
      console.log(res)
      this.cateList[this.active].postList.push(...res.data.data)
      this.cateList[this.active].loading = false
      this.cateList[this.active].isLoading = false
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    // 加载更多插件
    onLoad() {
      this.cateList[this.active].pageIndex++
      setTimeout(() => {
        this.getPostListFunc()
      }, 2000)
    },
    // 下拉刷新
    onRefresh() {
      this.cateList[this.active].pageIndex = 1
      this.cateList[this.active].finished = false
      setTimeout(() => {
        // 清除数组的所有数据，可以避免反复的创建新的数组
        this.cateList[this.active].postList.length = 0
        this.getPostListFunc()
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    // 跳转到个人信息页面
    myPersonal() {
      this.$router.push({
        // 如果本地存储中没有id，则直接返回1，然后通过拦截器跳转到登录页面
        path: `/personal/${window.localStorage.getItem('hm_userId') || 1}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  height: 100vh;
  .header {
    padding: 0 10px;
    height: 49 * 100vw /360;
    background-color: #ff0000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .center {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 34px;
    border-radius: 17px;
    padding-left: 15px;
    color: #fff;
  }
  .right {
    width: 60px;
    color: #fff;
    .headerICON {
      font-size: 30px;
      margin-left: 20px;
    }
  }
  .logoIcon {
    font-size: 60px;
    margin-right: 10px;
  }
}
</style>
