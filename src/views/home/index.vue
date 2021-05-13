<template>
  <div>
    home
    <van-button type="primary" url="/vant/mobile.html">URL 跳转</van-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import data from '@/static/data.json';

export default defineComponent({ 
  setup() {
    console.log(data)
  },
})
</script>

