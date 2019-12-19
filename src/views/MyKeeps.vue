<template>
  <div class="keeps">
    <!-- 头部 -->
    <myheader title="我的跟帖">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
    </myheader>
    <div class="commentItem" v-for="item in keepsList" :key="item.id">
      <div class="answer">
        <div class="time">2019-12-9 10:09</div>
        <div class="sour">
          <p>回复：{{item.parent.user.nickname}}</p>
          <div>{{item.post.title}}</div>
        </div>
        <div class="myanswer">{{item.content}}</div>
        <div class="content">原文：{{item.post.title}}</div>
      </div>
    </div>

    <!-- <div class="commentItem">
      <div class="answer">
        <div class="time">1029-9-9 10:09</div>
        <div class="sour">
          <p>回复：火星</p>
          <div>朱婷佩服巩俐演郎平：让人震惊 感觉郎导就在眼前</div>
        </div>
        <div class="myanswer">很好</div>
        <div
          class="content"
        >原文：近日，朱婷谈到此前参与到陈可辛电影《中国女排》的拍摄时，朱婷表示，“这是我第一次参加电影拍摄，我感觉演员比较难，运动员只要把技术展现出来就好，演员要根据导演要求，打球的同时，还要从表情和情绪展现出来内涵</div>
      </div>
    </div>
    <div class="commentItem">
      <div class="answer">
        <div class="time">1029-9-9 10:09</div>
        <div class="sour">
          <p>回复：火星</p>
          <div>朱婷佩服巩俐演郎平：让人震惊 感觉郎导就在眼前</div>
        </div>
        <div class="myanswer">很好</div>
        <div
          class="content"
        >原文：近日，朱婷谈到此前参与到陈可辛电影《中国女排》的拍摄时，朱婷表示，“这是我第一次参加电影拍摄，我感觉演员比较难，运动员只要把技术展现出来就好，演员要根据导演要求，打球的同时，还要从表情和情绪展现出来内涵</div>
      </div>
    </div>
    <div class="commentItem">
      <div class="answer">
        <div class="time">1029-9-9 10:09</div>
        <div class="sour">
          <p>回复：火星</p>
          <div>朱婷佩服巩俐演郎平：让人震惊 感觉郎导就在眼前</div>
        </div>
        <div class="myanswer">很好</div>
        <div
          class="content"
        >原文：近日，朱婷谈到此前参与到陈可辛电影《中国女排》的拍摄时，朱婷表示，“这是我第一次参加电影拍摄，我感觉演员比较难，运动员只要把技术展现出来就好，演员要根据导演要求，打球的同时，还要从表情和情绪展现出来内涵</div>
      </div>
    </div>-->
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
  mounted() {
    getUserComments().then(res => {
      console.log(res)
      if (res.status === 200) {
        this.keepsList = res.data.data
      }
    })
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
    padding: 15px 0;
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
</style>
