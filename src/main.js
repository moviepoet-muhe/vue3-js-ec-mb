
import './assets/base.css'
// 引入适配插件
import '../node_modules/amfe-flexible/index.min'



import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'


// 引入 vant4 组件库
import vant from 'vant'
// 引入 vant4 组件库的样式
import 'vant/lib/index.css';


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vant)
app.mount('#app')
