import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 获取当前用户的登录状态，token 等信息
    user: getItem(USER_KEY),

    cachePages: ['LayoutIndex']
  },
  mutations: {
    // 存储当前的用户登录状态
    setUser(state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    },

    // 添加缓存页面
    addCachePage(state, pageName) {
      if(!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    // 移除缓存页面
    removeCachePage(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if(index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
