<template>
  <div class="search">
    <div class="header">
      <div @click="$router.go(-1)">
        <van-icon name="arrow-left" style="font-size:20px" />
      </div>

      <div class="searchInput">
        <van-icon name="search" class="searchIcon" />
        <input
          type="text"
          v-model="searchInputContent"
          placeholder="输入搜索"
          ref="inputSearch"
          @keyup="searchChange"
        />
      </div>
      <div class="searchBtn" @click="searchNews">搜索</div>
    </div>
    <!-- 推荐列表 -->
    <div class="recomm" v-if="searchInputContent">
      <ul v-for="item in searchRecomm" :key="item.id">
        <li @click="goRecommList(item.id)">
          {{item.title}}
          <span class="iconfont iconjiantou1"></span>
        </li>
      </ul>
    </div>
    <!-- 历史记录 -->
    <div class="history" v-if="!searchInputContent">
      <h4>历史记录</h4>
      <div class="historyContent">
        <van-tag
          type="warning"
          @click="searchNews(item)"
          size="medium"
          v-for="(item,index) in historyList"
          :key="index"
        >{{item}}</van-tag>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="hotSearch" v-if="!searchInputContent">
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
  data() {
    return {
      historyList: [],
      hotSearch: [
        '北京暴雪蓝色预警新',
        '艺术家陆建艺去世',
        '中国女足0-3日本',
        '黄心颖返回香港',
        'AmazingJ离队新',
        '周杰伦新歌上线'
      ],
      searchInputContent: '',
      searchRecomm: []
    }
  },
  // watch: {
  //   async searchInputContent() {
  //     const res = await getSearchList({
  //       keyword: this.searchInputContent
  //     })
  //     console.log(res)
  //     this.searchInputContent = res.data.data
  //   }
  // },
  async mounted() {
    this.historyList =
      JSON.parse(localStorage.getItem('hm_SearchHistory')) || []
    // const res = await getSearchList()
    // console.log(res)
  },
  methods: {
    tagSearch(value) {
      // 获得点击标签tag的值
      // console.log(value)
      // this.$refs.inputSearch.focus()
    },
    async searchNews(searchResult) {
      // let searchKeywords = this.$refs.inputSearch.value
      // console.log(searchKeywords)
      // const { data: res } = await getSearchTotal({
      //   pageIndex: 1,
      //   pageSize: 2,
      //   keyword: searchKeywords
      // })
      // console.log(res)
      // 抓取输入框内容带到搜索内容页
      let keywordArr =
        JSON.parse(localStorage.getItem('hm_SearchHistory')) || []

      // this.searchInputContent =
      let keyword = this.searchInputContent || searchResult
      keywordArr.forEach((item, index) => {
        if (item === keyword) {
          keywordArr.splice(index, 1)
        }
      })
      keywordArr.unshift(keyword)
      localStorage.setItem('hm_SearchHistory', JSON.stringify(keywordArr))

      this.$router.push({ name: 'SearchList', params: { keyword } })
    },
    // 实现输入文字推荐搜索结果
    async searchChange() {
      if (this.searchInputContent !== ' ') {
        const res = await getSearchList({
          keyword: this.searchInputContent
        })
        this.searchRecomm = res.data.data
      }
    },
    goRecommList(id) {
      let keywordArr =
        JSON.parse(localStorage.getItem('hm_SearchHistory')) || []

      let keyword = this.searchInputContent
      keywordArr.forEach((item, index) => {
        if (item === keyword) {
          keywordArr.splice(index, 1)
        }
      })
      keywordArr.unshift(keyword)
      localStorage.setItem('hm_SearchHistory', JSON.stringify(keywordArr))
      this.$router.push({ path: `/articleDetail/${id}` })
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
.recomm {
  li {
    height: 60px;
    border-bottom: 1px solid #ccc;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
  }
}
</style>
