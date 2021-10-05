import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import './style/index.less'

// 生产完成提示
Vue.config.productionTip = false

// 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
