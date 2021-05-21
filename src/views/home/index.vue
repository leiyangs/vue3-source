<template>
  <div>
    <homeHeader :category="category" @setCurrentCategory="setCurrentCategory"/>
    <swiper/>
    我是默认类型{{category}}
    <list/>
    <van-button type="primary" @click="setCurrentCategory(2)">点击</van-button>
  </div>
</template>

<script lang="ts">
import IGlobalState from '@/typings';
import { Store, useStore } from 'vuex';
import { computed, defineComponent } from 'vue'
// import data from '@/static/data.json';
import homeHeader from './header.vue';
import list from './list.vue';
import swiper from './swiper.vue';
import { CATEGORY_TYPES } from '@/typings/home';

// vue2中需要把computed和methods写到不同地方，而Composition Api可以把他们都封装到一个函数中
function useCategory(store:Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory); // 如果不用计算属性，category是一个固定的值，store改变不会变化
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit('home/SET_CATEGORY', category);
  }
  return {category,setCurrentCategory}
}
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
    let {category, setCurrentCategory} = useCategory(store);

    return {category, setCurrentCategory}
  },
})
</script>


