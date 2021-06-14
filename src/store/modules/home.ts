import IGlobalState from "@/typings";
import { CATEGORY_TYPES, IGoodsList, IHomeState, ISlider } from "@/typings/home";
import { Module } from "vuex";
const data = require('@/static/data.json');

const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.All,
  sliders: [],
  goods: {
    hasMore: true, // 是否又更多数据
    loading: false,
    offset: 0,
    limit: 5,
    list: [], // 当前数据
  },
};

// vuex提供的泛型Module，需要传入S(自己的状态) R(根状态)
const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    SET_CATEGORY(state: IHomeState, payload: CATEGORY_TYPES) {
      state.currentCategory = payload;
    },
    SET_SLIDER_LIST(state: IHomeState, payload: ISlider[]) {
      state.sliders = payload;
    },
    SET_GOODS_LIST() {

    },
    SET_LOADING(state: IHomeState, payload: boolean) {
      state.goods.loading = payload;
    },
  },
  actions: {
    async SET_GOODS_LIST({commit}) {
      await new Promise((resolve, reject) => {
        setTimeout(() => { // 假装是dispatch掉接口
          commit('SET_GOODS_LIST', data.seller.sliders);
          resolve(true);
        }, 600);
      })
    },
    async SET_LESSON_LIST({commit}) {
      if(state.goods.loading) {
        return
      }
      if(!state.goods.hasMore) {
        return
      }
      commit('SET_GOODS_LIST', true);
      await new Promise((resolve, reject) => {
        setTimeout(() => { // 假装是dispatch掉接口
          commit('SET_LESSON_LIST', data.goods.list);
          resolve(true);
        }, 600);
      })
      commit('SET_LOADING', false);
    },
  },
};

export default home;
