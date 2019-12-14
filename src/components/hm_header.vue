<template>
  <div class="header">
    <span>
      <slot name="left"></slot>
    </span>
    <span class="main">{{title}}</span>
    <span>
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
.header {
  height: 50 * 100vw /360;
  border-bottom: 2px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  .main {
    transform: translate(-5px);
  }
}
</style>
