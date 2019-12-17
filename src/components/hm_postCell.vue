<template>
  <div @click="$router.push({path: `/articleDetail/${post.id}`})">
    <!-- 一图 -->
    <div class="single" v-if="post.type===1&& post.cover.length <= 2">
      <div class="left">
        <p class="content">{{post.title}}</p>
        <p class="info">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </p>
      </div>
      <img :src="post.cover[0].url" alt />
    </div>
    <!-- 三图 -->
    <div class="single1" v-else-if="post.type===1 && post.cover.length > 2">
      <div class="left">
        <p class="content">{{post.title}}</p>
        <div class="imgs">
          <img v-for="item in post.cover" :key="item.id" :src="item.url" alt />
        </div>
        <p class="info">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </p>
      </div>
    </div>
    <!-- 视频 -->
    <div class="single2" v-else-if="post.type===2">
      <div class="left">
        <p class="content">{{post.title}}</p>
        <div class="video">
          <img :src="post.cover[0].url" alt />
          <div class="playbtn">
            <van-icon name="play" />
          </div>
        </div>
      </div>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // post:当前需要渲染的新闻对象
  props: ['post']
}
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}

.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}

.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.imgs {
  display: flex;
  padding: 10px 0 0 0;
  margin-bottom: 5px;
  > img {
    flex: 1;
    width: 30%;
    padding: 0 5px;
    box-sizing: border-box;
    display: block;
  }
}
.single1,
.single2 {
  border-bottom: 1px solid #ccc;
  padding: 15px 0px;
}
.video {
  padding: 5px;
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
  position: relative;
  > img {
    width: 100%;
    display: block;
  }
  .playbtn {
    width: 50 * 100vw/360;
    height: 50 * 100vw/360;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    box-shadow: 0px 0px 10px #fff;
    text-align: center;
    color: #fff;
    font-size: 40px;
    .van-icon {
      line-height: 50 * 100vw/360;
    }
  }
}
</style>
