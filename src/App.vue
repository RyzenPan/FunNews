<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="less">
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  opacity: 0;
  transition: all 0.3s;
}
</style>
