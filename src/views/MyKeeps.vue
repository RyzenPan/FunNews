<template>
  <div class="keeps">
    <!-- 头部 -->
    <myheader title="我的跟帖">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
    </myheader>
    <div class="commentItem" v-for="item in keepsList" :key="item.id">
      <div class="answer">
        <div class="time">2019-12-9 10:09</div>

        <div class="sour" v-if="item.parent">
          <p>回复：{{item.parent.user.nickname}}</p>
          <div>{{item.parent.content}}</div>
        </div>

        <div class="myanswer">{{item.content}}</div>
        <div class="title">
          <div
            class="content"
            @click="$router.push({path: `/articleDetail/${item.post.id}`})"
          >原文：{{item.post.title}}</div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/hm_header.vue'
import { getUserComments } from '@/api/user.js'
export default {
  data() {
    return {
      keepsList: []
    }
  },
  components: {
    myheader
  },
  async mounted() {
    const res = await getUserComments()
    console.log(res)
    this.keepsList = res.data.data
    console.log(this.keepsList)
  }
}
</script>

<style lang='less' scoped>
.commentItem {
  padding: 10px;
  > .source {
    > .time {
      color: #999;
      font-size: 13px;
    }
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    .title {
      font-size: 14px;
      padding: 20px 0;
    }
    .content {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > .answer {
    padding: 0 0 15px 0;
    border-bottom: 1px solid #ccc;
    > .time {
      color: #999;
      font-size: 13px;
      line-height: 30px;
    }
    .sour {
      background-color: #eee;
      padding: 10px;
      color: #999;
      line-height: 25px;
      > p {
        font-size: 12px;
      }
      > div {
        font-size: 13px;
      }
    }
    .myanswer {
      font-weight: bold;
      line-height: 40px;
    }
    .content {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
  }
}
</style>
