<template>
  <div class="focus">
    <hmheader title="我的关注">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
      <!-- <span slot="right">退出</span> -->
    </hmheader>
    <!-- 关注列表 -->
    <hmFocusCell title="火星新闻播报" date="2019-10-10">
      <div slot="rightBtn" class="cancelBtn">取消关注</div>
    </hmFocusCell>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header'
import hmFocusCell from '@/components/hm_focusCell.vue'
import { getFocusListInfo } from '@/api/user'
export default {
  data () {
    return {
      focusList: {}
    }
  },
  mounted () {
    this.getFocusList()
  },
  components: {
    hmheader,
    hmFocusCell
  },
  methods: {
    async getFocusList () {
      // 发ajax请求获取数据
      console.log(this.$route)
      const { data: res } = await getFocusListInfo(this.$route.params.id)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.cancelBtn {
  padding: 10px;
  font-size: 14px;
  color: #333;
  background-color: #e1e1e1;
  border-radius: 17px;
}
</style>
