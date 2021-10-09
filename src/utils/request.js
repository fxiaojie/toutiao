// 封装 axios 请求模块
import axios from "axios"

// 在非组件模块中获取 store 必须通过这种方式
import store from '@/store/'

const request = axios.create({
  baseURL: "http://toutiao-app.itheima.net" // 基础路径
})

// 请求拦截器 
request.interceptors.request.use(function (config) {
  const {user} = store.state
  // 如果用户已登录，统一给接口设置 token 信息
  if(user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完之后一定要把 config return，否则会停在这里
  return config
}, function (error) {
  return Promise.reject(error);
})

// 导出
export default request