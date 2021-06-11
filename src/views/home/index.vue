<template>
  <div class="header">
    <HomeHeader
      :category="category"
      @setCurrentCategory="setCurrentCategory"
    />
    <div class="container">
      <Suspense>
        <!-- default 加载完成显示的内容 -->
        <template #default>
          <Swiper />
        </template>
        <!-- fallback 加载中显示的内容 -->
        <template #fallback>
          <div>拼命加载中...</div>
        </template>
      </Suspense>

      我是默认类型{{category}}
      <List />
      <van-button
        type="primary"
        @click="setCurrentCategory(2)"
      >点击</van-button>
    </div>
    
  </div>
</template>

<script lang="ts">
import IGlobalState from "@/typings";
import { Store, useStore } from "vuex";
import { computed, defineComponent } from "vue";
// import data from '@/static/data.json';
import HomeHeader from "./header.vue";
import List from "./list.vue";
import Swiper from "./swiper.vue";
import { CATEGORY_TYPES } from "@/typings/home";

// vue2中需要把computed和methods写到不同地方，而Composition Api可以把他们都封装到一个函数中
function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory); // 如果不用计算属性，category是一个固定的值，store改变不会变化

  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit("home/SET_CATEGORY", category);
  }

  return { category, setCurrentCategory };
}

// defineCompoent包裹可以有提示(此提示是ts提示，不是vuter提示)
export default defineComponent({
  components: {
    HomeHeader,
    List,
    Swiper,
  },
  // Composition Api 入口
  setup() {
    let store = useStore<IGlobalState>();
    let { category, setCurrentCategory } = useCategory(store);

    return { category, setCurrentCategory };
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 105px);
  margin-top: 55px;
}
</style>
