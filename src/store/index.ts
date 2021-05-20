import IGlobalState from '@/typings';
import { createStore } from 'vuex'
import home from './modules/home'


const store =  createStore<IGlobalState>({
  // state: {
  // },
  mutations: {
  },
  actions: {
  },
  modules: {
    home
  }
})

export default store;
