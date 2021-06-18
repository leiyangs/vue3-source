<template>
  <div class="header">
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory" />
    <div class="container" ref="refreshDom">
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

      <List :goodsList="goodsList" />
      <div v-if="isLoading">加载中...</div>
      <div v-if="!hasMore">没有更多了</div>
    </div>
  </div>
</template>

<script lang="ts">
import IGlobalState from "@/typings";
import { Store, useStore } from "vuex";
import { computed, defineComponent, onMounted, ref } from "vue";
// import data from '@/static/data.json';
import HomeHeader from "./header.vue";
import List from "./list.vue";
import Swiper from "./swiper.vue";
import { CATEGORY_TYPES } from "@/typings/home";
import loadMore from "@/hooks/loadMore";

// vue2中需要把computed和methods写到不同地方，而Composition Api可以把他们都封装到一个函数中
function useCategory(store: Store<IGlobalState>) {
  const category = computed(() => store.state.home.currentCategory); // 如果不用计算属性，category是一个固定的值，store改变不会变化

  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit("home/SET_CATEGORY", category);
  }

  return { category, setCurrentCategory };
}

function useGoodsList(store: Store<IGlobalState>) {
  const goodsList = computed(() => store.state.home.goods.list);
  onMounted(() => {
    // 初始化加载
    // 计算属性如果获取的是数组，要取他的value
    if (goodsList.value.length === 0) {
      store.dispatch("home/SET_GOODS_LIST");
    }
  });

  return { goodsList };
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
    let { goodsList } = useGoodsList(store);
    // ref获取dom
    const refreshDom = ref<null | HTMLElement>(null); // ref用法和react差不多
    let { isLoading, hasMore } = loadMore(
      refreshDom,
      store,
      "home/SET_GOODS_LIST"
    );

    return {
      category,
      setCurrentCategory,
      goodsList,
      refreshDom,
      isLoading,
      hasMore,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 105px);
  margin-top: 55px;
  overflow-y: scroll;
}
</style>
