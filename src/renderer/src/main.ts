import { createApp } from 'vue'
import App from './App.vue'
// https://doc-archive.element-plus.org/#/zh-CN/component/quickstart
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
