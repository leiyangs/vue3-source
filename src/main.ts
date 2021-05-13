import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css'

createApp(App).use(Vant).use(store).use(router).mount('#app')

// shims-vue.d 文件用来提示引入 .vue的文件是vue文件
