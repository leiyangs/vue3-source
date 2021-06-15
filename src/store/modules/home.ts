import IGlobalState from "@/typings";
import { CATEGORY_TYPES, IGoods, IGoodsList, IHomeState, ISlider } from "@/typings/home";
import { Module } from "vuex";
const data = require('@/static/data.json');
const GOODSLEN = 9;
let offset = 0;

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
    SET_GOODS_LIST(state: IHomeState, payload: IGoods) {
      state.goods.list = [...state.goods.list, ...payload.list];
    },
    SET_LOADING(state: IHomeState, payload: boolean) {
      state.goods.loading = payload;
    },
  },
  actions: {
    async SET_SLIDER_LIST({commit}) {
      await new Promise((resolve, reject) => {
        setTimeout(() => { // 假装是dispatch掉接口
          commit('SET_SLIDER_LIST', data.seller.sliders);
          resolve(true);
        }, 600);
      })
    },
    async SET_GOODS_LIST({commit}) {
      if(state.goods.loading) {
        return
      }
      if(!state.goods.hasMore) {
        return
      }
      commit('SET_LOADING', true);
      await new Promise((resolve, reject) => {
        setTimeout(() => { // 假装是dispatch掉接口
          let goods: IGoods = {
            hasMore: true,
            loading: false,
            offset: 3,
            limit: 1,
            list : []
          };
          // 假装分页获取数据
          goods.list = data.goods.list.slice(offset, offset + 3);
          goods.hasMore = true;
          if(offset >= GOODSLEN) {
            goods.list = data.goods.list.slice(offset, offset + 3);
            goods.hasMore = false;
          }
          commit('SET_GOODS_LIST', goods);
          resolve(true);
        }, 600);
      })
      commit('SET_LOADING', false);
    },
  },
};

export default home;
