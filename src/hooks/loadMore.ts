import { computed, onMounted, Ref } from "vue";
import IGlobalState from "@/typings";
import { debounce } from "@/utils";
import { Store } from "vuex";
// import { debounce } from "../utils/index.js";

export default function loadMore(element: Ref<null | HTMLElement>, store: Store<IGlobalState>, type:string) {
  let ele: HTMLElement;
  function _loadMore() {
    let containerHeight = ele.clientHeight; // 可视区域高度
    let scrollTop = ele.scrollTop; // 滚动的高度
    let scrollHeight = ele.scrollHeight; // 元素的高度

    // 如果滚动条离底部有20像素，那么就继续加载goods
    if(containerHeight + scrollTop + 20 >= scrollHeight) {
      store.dispatch(type);
    }
  }

  onMounted(() => {
    ele = element.value as HTMLElement; // as断言，此处加载完成，element一定是一个html元素
    ele.addEventListener('scroll', debounce(_loadMore, 200))
  })

  const isLoading = computed(() => store.state.home.goods.loading);
  const hasMore = computed(() => store.state.home.goods.hasMore);

  return { isLoading, hasMore };
}