<template>
  <van-card
    v-for="good in goodsList"
    :key="good.name"
    :desc="good.foods[0].info"
    tag="热销"
    :title="good.name"
    :thumb="good.foods[0].image"
  />
</template>

<script lang="ts">
import IGlobalState from '@/typings'
import { IGoods } from '@/typings/home'
import { computed, defineComponent, onMounted, PropType, toRaw } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    goodsList: Array as PropType<IGoods[]>
  },
  setup(props, ctx) {
    let store = useStore<IGlobalState>();
    let currentCategory = computed(() => store.state.home.currentCategory);
    onMounted(() => {
      let arr = JSON.parse(JSON.stringify(props.goodsList));
      console.log(arr)
    })
    return {currentCategory}
  }
})
</script>

