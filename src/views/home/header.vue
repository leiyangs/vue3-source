<template>
  <div class="header">
    <div>
      吃了么
    </div>
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item :modelValue="category" :options="categoryList" />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from '@/typings/home'
import { defineComponent, PropType, reactive, toRefs } from 'vue'

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
    console.log(state)
    return {
      ...toRefs(state)
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #409EFF;
  color: #fff;
  padding: 0 10px;
  width: calc(100% - 20px); 
  height: 55px;
  line-height: 55px;
}
</style>
