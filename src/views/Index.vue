<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <span class="iconfont iconnew logoIcon"></span>
      <div class="center">
        <van-icon name="search" class="searchIcon" />&nbsp;&nbsp;搜索新闻
      </div>
      <router-link to="/login" class="right">
        <van-icon name="user-circle-o" class="headerICON" />
      </router-link>
    </div>
    <!-- Tab导航栏 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <hmPostCell v-for="post in cate.postList" :key="post.id" :post="post"></hmPostCell>
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
  data () {
    return {
      active: localStorage.getItem('hm_token') ? 1 : 0,
      cateList: []
    }
  },
  async mounted () {
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
        pageSize: 100,
        postList: []
      }
    })
    console.log(this.cateList)
    this.getPostListFunc()
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostListFunc()
      }
    }
  },
  methods: {
    async getPostListFunc () {
      const res = await getPostList({
        category: this.cateList[this.active].id,
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize
      })
      // console.log(res1)
      this.cateList[this.active].postList = res.data.data
      console.log(this.cateList[this.active].postList)
    }
  }
}
</script>

<style lang="less" scoped>
.index {
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
