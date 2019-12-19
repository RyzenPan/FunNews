<template>
  <div class="test">
    <van-tabs v-model="active" background="pink">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3" :dot="true">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 2
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  background-color: #ddd;
  height: 100vh;
}
.van-ellipsis {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
