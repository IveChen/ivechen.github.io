import '@/styles/base.less'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue3-lazyload'

createApp(App).use(router).use(ElementPlus).use(VueLazyLoad, {}).mount('#app')
