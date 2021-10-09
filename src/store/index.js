import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 获取当前用户的登录状态，token 等信息
    user: getItem(USER_KEY)
  },
  mutations: {
    // 存储当前的用户登录状态
    setUser(state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
