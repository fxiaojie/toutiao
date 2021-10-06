import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import './style/index.less'

// 引入 Vant 组件库
import Vant from 'vant';

// 加载 Vant 组件库样式
import 'vant/lib/index.css';

// 自动设置 rem 基准值
import 'amfe-flexible'

// 加载字体图标
import { Icon } from 'vant';

// 全局注册 Vant 中的组件
Vue.use(Vant);

// 
Vue.use(Icon);

// 生产完成提示
Vue.config.productionTip = false

// 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
