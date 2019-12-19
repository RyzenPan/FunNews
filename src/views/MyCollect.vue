<template>
  <div class="MyCollect">
    <!-- 头部 -->
    <hmHeader title="我的收藏">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
    </hmHeader>
    <!-- 收藏列表 -->
    <van-swipe-cell v-for="(item,index) in collectList" :key="item.id">
      <hmPostCell :post="item"></hmPostCell>
      <template slot="right">
        <van-button square type="danger" text="删除" @click="delCollect(item.id,index)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import hmHeader from '@/components/hm_header'
import hmPostCell from '@/components/hm_postCell'
import { getCollectData } from '@/api/user'
import { ArticleStar } from '@/api/post'
export default {
  components: {
    hmHeader,
    hmPostCell
  },
  data() {
    return {
      collectList: []
    }
  },
  async mounted() {
    //   获取用户收藏文章列表
    const res = await getCollectData()
    this.collectList = res.data.data
    console.log(res)
  },
  methods: {
    async delCollect(id, index) {
      //   获取用户收藏文章列表
      const res = await getCollectData()
      res.data.data.forEach(async item => {
        if (item.id === id) {
          const res1 = await ArticleStar(id)
          if (res1.data.message === '取消成功') {
            this.$toast.success(res1.data.message)
          }
        }
      })
      this.collectList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.MyCollect {
  height: 100vh;
}
.van-button {
  height: 100%;
  padding: 5px 10px;
}
</style>
