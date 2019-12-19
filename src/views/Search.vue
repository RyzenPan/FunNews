<template>
  <div class="search">
    <div class="header">
      <div @click="$router.go(-1)">
        <van-icon name="arrow-left" style="font-size:20px" />
      </div>

      <div class="searchInput">
        <van-icon name="search" class="searchIcon" />
        <input type="text" placeholder="输入搜索" ref="inputSearch" autofocus />
      </div>
      <div class="searchBtn" @click="searchNews">搜索</div>
    </div>
    <div class="history">
      <h4>历史记录</h4>
      <div class="historyContent">
        <van-tag
          type="warning"
          @click="tagSearch(item)"
          size="medium"
          v-for="(item,index) in hotSearch"
          :key="index"
        >{{item}}</van-tag>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="hotSearch">
      <h4>热门搜索</h4>
      <div class="hotContent">
        <van-tag
          plain
          type="danger"
          @click="tagSearch(item)"
          size="medium"
          v-for="(item,index) in hotSearch"
          :key="index"
        >{{item}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchList } from '@/api/post.js'

export default {
  data () {
    return {
      historyList: [
        '没有披风的超人',
        '张鲁一王子文不在一个季节',
        '武汉大学清退92名国际学生',
        '安娜卡里娜去世',
        '岳岳北京藏宝'
      ],
      hotSearch: [
        '北京暴雪蓝色预警新',
        '艺术家陆建艺去世',
        '中国女足0-3日本',
        '黄心颖返回香港',
        'AmazingJ离队新',
        '周杰伦新歌上线'
      ]
    }
  },
  async mounted () {
    const res = await getSearchList()
    console.log(res)
  },
  methods: {
    tagSearch (value) {
      // 获得点击标签tag的值
      console.log(value)
      this.$refs.inputSearch.focus()
    },
    async searchNews () {
      // let searchKeywords = this.$refs.inputSearch.value
      // console.log(searchKeywords)
      // const { data: res } = await getSearchTotal({
      //   pageIndex: 1,
      //   pageSize: 2,
      //   keyword: searchKeywords
      // })
      // console.log(res)
      // 抓取输入框内容带到搜索内容页
      let keyword = this.$refs.inputSearch.value
      console.log(keyword)
      this.$router.push({ name: 'SearchList', params: { keyword } })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 100vh;
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .searchInput {
      height: 38px;
      border: 1px solid #d7d7d7;
      border-radius: 19px;
      line-height: 38px;
      width: 260px;
      input {
        border: none;
        background-color: transparent;
        font-size: 14px;
      }
      .searchIcon {
        padding: 0 10px;
      }
    }
    .searchBtn {
      padding: 10px;
      // border: 1px solid #ddd;
      color: #fff;
      background-color: #e93b3d;
      border-radius: 10px;
    }
  }
  .history {
    padding: 15px;
    border-bottom: 1px solid #ccc;
    h4 {
      padding-bottom: 20px;
    }
    .van-tag--medium {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
  .hotSearch {
    padding: 15px;
    h4 {
      padding-bottom: 20px;
    }
    .van-tag--medium {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}
</style>
