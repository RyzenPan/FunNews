<template>
  <div class="category">
    <hmheader title="栏目管理">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.go(-1)"></span>
      <!-- <span slot="right">退出</span> -->
    </hmheader>
    <!-- 管理频道-已有频道 -->
    <div class="channel">
      <p>点击删除一下频道</p>
      <div class="oldChannel">
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
        <van-tag plain type="danger" size="large" closeable>标签</van-tag>
      </div>
    </div>

    <!-- 管理频道-添加频道 -->
    <div class="channel">
      <p>点击添加一下频道</p>
      <div class="addChannel">
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
        <van-tag plain type="success" size="large" closeable>标签</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header.vue'
export default {
  components: {
    hmheader
  }
}
</script>

<style lang="less" scoped>
.channel {
  padding: 15px;
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }
  .oldChannel {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 6px;
    .van-tag,
    .van-tag--large {
      font-size: 16px;
      padding: 6px 10px;
      margin-bottom: 10px;
    }
  }
}

.addChannel {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 6px;
  .van-tag,
  .van-tag--large {
    font-size: 16px;
    padding: 6px 10px;
    margin-bottom: 10px;
  }
}
</style>
