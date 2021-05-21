<template>
  <div>
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="category" :options="categoryList" />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from '@/typings/home'
import { defineComponent, PropType, reactive, toRef, toRefs } from 'vue'

export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES> // 类型断言 PropType是vue提供的
    }
  },
  emits: ['setCurrentCategory'],
  setup(props, context) {
    console.log(props.category);
    context.emit('setCurrentCategory')
    let state = reactive({
      categoryList: [
        { text: '全部类型', value: CATEGORY_TYPES.All },
        { text: '早餐', value: CATEGORY_TYPES.BREAKFAST },
        { text: '午餐', value: CATEGORY_TYPES.LUNCH },
        { text: '下午茶', value: CATEGORY_TYPES.AFTERNOON },
        { text: '晚餐', value: CATEGORY_TYPES.DINNER },
      ]
    })

    return {
      ...toRefs(state)
    }
  },
})
</script>

