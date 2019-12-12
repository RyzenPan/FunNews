<template>
  <input
    type="text"
    class="inp"
    @input="getInput"
    :class="{success:state,error:!state}"
    @blur="handlerBlur"
  />
</template>

<script>
export default {
  props: ['rules', 'msg_err'],
  data () {
    return {
      state: false
    }
  },
  methods: {
    getInput (e) {
      let value = e.target.value
      // 添加正则规则
      if (this.rules) {
        if (!this.rules.test(value)) {
          this.state = false
        } else {
          this.state = true
        }
      } else {
        this.state = !!value
      }
      this.$emit('input', value)
    },
    handlerBlur () {
      if (!this.state) {
        this.$toast(this.msg_err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inp {
  width: 318 * 100vw/360;
  height: 48 * 100vw/360;
  border: none;
  outline: none;
  border-bottom: 2px solid #757575;
  font-size: 18px;
  color: #333;
}

.success {
  border-bottom-color: greenyellow;
}

.error {
  border-bottom-color: red;
}
</style>
