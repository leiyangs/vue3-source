import IGlobalState from "@/typings";
import { CATEGORY_TYPES, IHomeState } from "@/typings/home";
import { Module } from "vuex";

const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.All,
  sliders: [],
  goods: {
    hasMore: true, // 是否又更多数据
    loading: false,
    offset: 0,
    limit: 5,
    list: [], // 当前数据
  }
}

// vuex提供的泛型Module，需要传入S(自己的状态) R(根状态)
const home:Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    SET_CATEGORY(state:IHomeState, payload:CATEGORY_TYPES) {
      state.currentCategory = payload;
    }
  },
  actions: {
    
  }
}

export default home;
