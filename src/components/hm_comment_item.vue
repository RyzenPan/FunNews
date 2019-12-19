<template>
  <div class="commentKeeps">
    <commentParent v-if="comment.parent" :comment="comment.parent" @sendReply="sendReply"></commentParent>
    <div class="item">
      <div class="head">
        <div>
          <span>{{comment.user.nickname}}</span>
          <span>2小时前</span>
        </div>
        <span @click="sendReply(comment)">回复</span>
      </div>
      <div class="text">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentParent',
  props: ['comment'],
  methods: {
    sendReply(comment) {
      this.$emit('sendReply', comment)
    }
  }
}
</script>

<style lang="less" scoped>
.commentKeeps {
  margin: 10px 0 0 0;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.item {
  padding: 8px 0;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      display: flex;
      > span {
        font-size: 12px;
        margin-right: 10px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 10px 0 0 0;
  }
}
</style>