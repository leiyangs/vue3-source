<template>
  <!-- vue3可以使用多个标签啦，不需要根标签包裹 -->
  <div id="nav">
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/goods" icon="goods-collect-o">商品</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
  <!-- <router-view/> -->
  <!-- keep-alive用法 -->
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}
</style>
