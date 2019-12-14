<template>
  <div class="cell" @click="handleClick">
    <div class="left">{{title}}</div>
    <div class="right">
      <span>{{desc}}</span>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc'],
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  height: 60 * 100vw/360;
  font-size: 16px;
  span {
    font-size: 14px;
    color: #aaa;
  }
}
</style>
