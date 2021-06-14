<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-if="sliderList.length">
      <van-swipe-item v-for="image in sliderList" :key="image">
        <img :src="image"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import IGlobalState from "@/typings";

export default defineComponent({
  // 如果要给setup加async，父组件要用Suspense组件包裹(Suspense组件vue3自带)
  async setup() {
    let store = useStore<IGlobalState>();
    let sliderList = computed(() => store.state.home.sliders);
    // 计算属性如果获取的是数组，要取他的value
    if(sliderList.value.length === 0) {
      await store.dispatch('home/SET_SLIDER_LIST')
    }

    return {
      sliderList
    }
  },
});
</script>

<style lang="scss" scoped>
.swiper {
  img {
    width: 100%;
    height: 175px;
  }
}
</style>
