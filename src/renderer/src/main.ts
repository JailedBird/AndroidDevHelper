import { createApp } from 'vue'
import App from './App.vue'
// https://doc-archive.element-plus.org/#/zh-CN/component/quickstart
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)
// https://www.yuque.com/jailedbird/ho06i8/gtsy0slw4debuqhe?singleDoc# 《Electron&Vue&element-ui 's problems》
app.use(ElementPlus)
app.mount('#app')
