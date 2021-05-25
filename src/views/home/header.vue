<template>
  <div class="header">
    <div>
      吃了么
    </div>
    <van-dropdown-menu active-color="#1989fa">
      <!-- v-model在vue3中会变为:modelValue -->
      <van-dropdown-item :modelValue="category" :options="categoryList" @change="change" />
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
  // props 是父组件传递的参数；context 中有attr slots emit
  setup(props, context) {
    // reactive 响应式方法，可以创建响应式数据
    let state = reactive({
      categoryList: [
        { text: '全部类型', value: CATEGORY_TYPES.All },
        { text: '早餐', value: CATEGORY_TYPES.BREAKFAST },
        { text: '午餐', value: CATEGORY_TYPES.LUNCH },
        { text: '下午茶', value: CATEGORY_TYPES.AFTERNOON },
        { text: '晚餐', value: CATEGORY_TYPES.DINNER },
      ],
      value:1
    })
    console.log(toRefs(state))
    function change(value: CATEGORY_TYPES) {
      context.emit('setCurrentCategory', value); // 调用父组件方法
    }
    
    return {
      // toRefs 解构state，并且返回响应式数据
      ...toRefs(state),
      change,
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
