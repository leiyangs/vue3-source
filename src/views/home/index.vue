<template>
  <div>
    <homeHeader/>
    <swiper/>
    我是默认类型{{cuurrentCategory}}
    <list/>
    <van-button type="primary" url="/vant/mobile.html">URL 跳转</van-button>
  </div>
</template>

<script lang="ts">
import IGlobalState from '@/typings';
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue'
// import data from '@/static/data.json';
import homeHeader from './header.vue';
import list from './list.vue';
import swiper from './swiper.vue';

// defineCompoent包裹可以有提示(此提示是ts提示，不是vuter提示)
export default defineComponent({
  components: {
    homeHeader,
    list,
    swiper
  },
  // Composition Api 入口
  setup() {
    let store = useStore<IGlobalState>();
    console.log(store.state.home.currentCategory)
    let cuurrentCategory = computed(() => store.state.home.currentCategory);

    return {
      cuurrentCategory
    }
  },
})
</script>


