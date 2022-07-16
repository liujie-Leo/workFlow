import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import globalComponents from '@/components/global/register'
import store from 'store/index'
import 'assets/style/index.scss'
import { startRouteMonitor } from 'utils/permission'

let app = createApp(App)
app.use(router)
app.use(store)

globalComponents(app) // 全局注册组件
startRouteMonitor(router) // 开启路由守卫

app.mount('#app')
