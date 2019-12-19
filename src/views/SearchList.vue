<template>
  <div class="search">
    <div class="header">
      <div @click="$router.go(-2)">
        <van-icon name="arrow-left" style="font-size:20px" />
      </div>
      <div class="searchInput">
        <van-icon name="search" class="searchIcon" />
        <input type="text" :value="$route.params.keyword" ref="inputSearch" />
      </div>
      <div class="searchBtn" @click="searchNews">搜索</div>
    </div>
    <div class="content">
      <hmPostCell v-for="post in cateList" :key="post.id" :post="post"></hmPostCell>
    </div>
  </div>
</template>

<script>
import { getSearchTotal } from '@/api/post.js'
import hmPostCell from '@/components/hm_postCell'

export default {
  components: {
    hmPostCell
  },
  data () {
    return {
      cateList: []
    }
  },
  mounted () {
    this.getSearchResult()
  },
  methods: {
    searchNews () {
      this.getSearchResult(this.$refs.inputSearch.value)
    },
    async getSearchResult (keyword) {
      // console.log(this.$route.params.keyword)
      keyword = this.$route.params.keyword
      const res = await getSearchTotal({
        keyword,
        pageIndex: 1,
        pageSize: 99
      })
      console.log(res)
      this.cateList = res.data.data
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
