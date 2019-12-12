<template>
  <div class="btn" @click="handlerClick">{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    handlerClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  width: 314 * 100vw/360;
  height: 48 * 100vw/360;
  background-color: #cc3300;
  font-size: 18px;
  color: #fff;
  border-radius: 24 * 100vw/360;
  text-align: center;
  line-height: 48 * 100vw/360;
}
</style>
