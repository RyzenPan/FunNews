<template>
  <div class="hm_focusCell">
    <div class="left">
      <img :src="picURL" alt />
      <div>
        <h3>{{title}}</h3>
        <p>{{date}}</p>
      </div>
    </div>
    <div class="right">
      <slot name="rightBtn" @click="cancelFocus"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'date', 'picURL'],
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    },
    cancelFocus (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scope>
.hm_focusCell {
  height: 80 * 100vw / 360;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: space-between;
    transform: translate(15px);
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    div {
      transform: translate(10px);
      h3 {
        font-size: 18px;
        font-weight: normal;
      }
      p {
        font-size: 14px;
        color: #666;
        padding-top: 5px;
      }
    }
  }
  .right {
    transform: translate(-15px);
  }
}
</style>
