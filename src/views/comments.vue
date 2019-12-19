<template>
  <div class="comments">
    <hmheader title="精彩跟帖">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
      <!-- <span slot="right">退出</span> -->
    </hmheader>
    <!-- 评论列表 -->
    <div class="commentKeeps" v-for="comment in commentData" :key="comment.id">
      <div class="item">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replaceBtn(comment)">回复</span>
        </div>

        <!-- 盖楼区域 -->
        <hmCommentItem v-if="comment.parent" :comment="comment.parent" @sendReply="replaceBtn"></hmCommentItem>

        <div class="text">{{comment.content}}</div>
      </div>
    </div>

    <!-- 底部固定评论 -->
    <hmCommentArea
      :replayObj="replayObj"
      :article="articleDetailData"
      @cencelArea="replayObj = null"
      @refresh="init"
    ></hmCommentArea>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header.vue'
import hmCommentItem from '@/components/hm_comment_item.vue'
import { getCommentData, getArticleDetail } from '@/api/post.js'
import hmCommentArea from '@/components/hm_commentArea'
export default {
  data() {
    return {
      commentData: [],
      articleDetailData: {},
      replayObj: {}
    }
  },
  components: {
    hmheader,
    hmCommentItem,
    hmCommentArea
  },
  mounted() {
    this.init()
  },
  methods: {
    replaceBtn(comment) {
      this.replayObj = comment
    },
    async init() {
      // 获取评论列表
      const res1 = await getCommentData(this.$route.params.id)
      this.commentData = res1.data.data.map(item => {
        item.user.head_img =
          localStorage.getItem('hm_baseURL') + item.user.head_img
        return item
      })

      // 根据id获取文章的详情，实现文章详情的动态渲染
      const res = await getArticleDetail(this.$route.params.id)
      console.log(res)
      if (res.status !== 200) {
        return this.$toast.fail('获取数据失败')
      }
      this.articleDetailData = res.data.data

      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.commentKeeps {
  padding: 0 15px;
  border-bottom: 1px solid #ccc;
}
.item {
  padding: 10px 0;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>