<template>
  <div class="focus">
    <hmheader title="我的关注">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
      <!-- <span slot="right">退出</span> -->
    </hmheader>
    <!-- 关注列表 -->
    <div class="list">
      <hmFocusCell
        v-for="(item,index) in focusList"
        :key="item.id"
        :title="item.nickname"
        :picURL="item.head_img"
        date="2019-10-10"
      >
        <div slot="rightBtn" class="cancelBtn" @click="cancelFocus(item.id,index)">取消关注</div>
      </hmFocusCell>
    </div>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header'
import hmFocusCell from '@/components/hm_focusCell.vue'
import { getFocusListInfo, UnuserFollow } from '@/api/user'
export default {
  data() {
    return {
      focusList: {}
    }
  },
  mounted() {
    this.getFocusList()
  },
  components: {
    hmheader,
    hmFocusCell
  },
  methods: {
    // 获取关注列表
    async getFocusList() {
      const res = await getFocusListInfo()
      if (res.status === 200) {
        this.focusList = res.data.data.map(item => {
          item.head_img = localStorage.getItem('hm_baseURL') + item.head_img
          return item
        })
      }
    },
    // 取消关注用户
    async cancelFocus(id, index) {
      const res = await UnuserFollow(id)
      if (res.data.message === '取消关注成功') {
        this.$toast.success(res.data.message)
        this.focusList.splice(index, 1)
      }
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
.focus {
  height: 100vh;
}
</style>
