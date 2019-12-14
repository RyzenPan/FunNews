<template>
  <div class="edit">
    <header>
      <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      <p>编辑资料</p>
      <div></div>
    </header>
    <div class="userPic">
      <img src="http://img2.imgtn.bdimg.com/it/u=3432277981,2726991059&fm=26&gp=0.jpg" alt />
    </div>
    <ul>
      <li>
        <router-link class="list" to>
          <p>昵称</p>
          <span>
            火星网友
            <span class="iconfont iconjiantou1"></span>
          </span>
        </router-link>
        <router-link class="list" to>
          <p>密码</p>
          <span>
            ******
            <span class="iconfont iconjiantou1"></span>
          </span>
        </router-link>
        <router-link class="list" to>
          <p>性别</p>
          <span>
            男
            <span class="iconfont iconjiantou1"></span>
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  p {
    font-size: 16px;
    color: #333;
  }
  span {
    font-size: 14px;
    color: #999;
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  span {
    font-size: 20px;
    margin-left: 20px;
  }
  p {
    font-size: 18px;
    font-weight: bold;
    transform: translateX(-19px);
  }
}
.userPic {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
