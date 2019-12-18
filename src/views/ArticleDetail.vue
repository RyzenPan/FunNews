<template>
  <div class="articaldetail">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span
        :class="{'active':articleDetailData.has_follow}"
        @click="userFollowBtn(articleDetailData.user.id)"
      >{{articleDetailData.has_follow?'已关注':'关注'}}</span>
    </div>
    <!-- 内容区域 -->
    <div class="detail">
      <div class="title">{{articleDetailData.title}}</div>
      <div class="desc">
        <span>{{articleDetailData.user &&articleDetailData.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-12-9</span>
      </div>
      <div class="content" v-html="articleDetailData.content" v-if="articleDetailData.type === 1"></div>
      <div class="video" v-if="articleDetailData.type === 2">
        <video :src="articleDetailData.content" autoplay controls></video>
      </div>
      <div class="opt">
        <span
          :class="['like',{'active':articleDetailData.has_like}]"
          @click="likeBtn(articleDetailData.id)"
        >
          <van-icon name="good-job-o" />
          {{articleDetailData.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="comment in commentData" :key="comment.id">
        <div class="head">
          <img :src="'http://127.0.0.1:3000'+comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{comment.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部固定评论 -->
    <hmCommentArea :article="articleDetailData"></hmCommentArea>
  </div>
</template>

<script>
import { getArticleDetail, ArticleLike, getCommentData } from '@/api/post.js'
import { userFollow, UnuserFollow } from '@/api/user.js'
import hmCommentArea from '@/components/hm_commentArea'
export default {
  components: {
    hmCommentArea
  },
  data () {
    return {
      articleDetailData: {},
      commentData: []
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    const res = await getArticleDetail(this.$route.params.id)
    console.log(res)
    if (res.status !== 200) {
      return this.$toast.fail('获取数据失败')
    }
    this.articleDetailData = res.data.data

    // 获取评论列表
    const res1 = await getCommentData(this.$route.params.id)
    this.commentData = res1.data.data
    console.log(res1)
    console.log(this.commentData)
  },
  methods: {
    async userFollowBtn (uid) {
      let res = {}
      if (!localStorage.getItem('hm_token')) {
        return this.$router.push({ name: 'Login' })
      }
      if (!this.articleDetailData.has_follow) {
        res = await userFollow(uid)
        if (res.status !== 200) {
          return this.$toast.fail('关注失败')
        }
        this.$toast.success('关注成功')
      } else {
        res = await UnuserFollow(uid)
        if (res.status !== 200) {
          return this.$toast.fail('取消关注失败')
        }
        this.$toast.success('取消关注成功')
      }
      this.articleDetailData.has_follow = !this.articleDetailData.has_follow
    },
    async likeBtn (id) {
      if (!localStorage.getItem('hm_token')) {
        return this.$router.push({ name: 'Login' })
      }
      const res = await ArticleLike(id)
      if (res.data.message === '取消成功') {
        this.$toast.fail('取消点赞')
        this.articleDetailData.like_length--
      } else {
        this.$toast.success('点赞成功')
        this.articleDetailData.like_length++
      }
      this.articleDetailData.has_like = !this.articleDetailData.has_like
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    color: #000;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      color: #fff;
      background-color: #f00;
      border: none;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    &.active {
      color: red;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
/deep/.photo {
  img {
    width: 82%;
  }
}
.video {
  video {
    width: 100%;
  }
  margin-bottom: 10px;
}
</style>
