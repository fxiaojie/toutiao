// 封装 axios 请求模块
import axios from "axios"
import JSONBig from 'json-bigint'

// 在非组件模块中获取 store 必须通过这种方式
import store from '@/store/'
import { Toast } from "vant"
import router from "@/router/"

// 刷新 token
const refreshTokenReq = axios.create({
  baseURL: "http://toutiao-app.itheima.net"
})

const request = axios.create({
  baseURL: "http://toutiao-app.itheima.net", // 基础路径

  // 处理后端返回的数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
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
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 响应成功进入这里
  
  return response
}, async function (error) {
  // 响应失败进入这里
  // 超过 2xx 的状态码都会进入这里

  const status = error.response.status 

  if (status === 400) {
    // 客户端请求参数错误

    Toast.fail('客户端请求参数异常')
  }else if(status === 401) {
    // token 无效
    const {user} = store.state

    if(!user || !user.token) {
      // 直接跳转到登录页
      return resdirectLogin()
    }

    // 使用 refresh_token 请求获取新的 token
    try {
      const {data} = await refreshTokenReq({
        method: 'PUT',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      // 拿到新的 token 之后把它更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)

      // 把失败的请求重新发出去
      return request(error.config)
    }catch(err) {
      // 刷新token 失败，跳转到登录页
      resdirectLogin()
    }
   
  }else if(status === 403) {
    // 没有权限操作

    Toast.fail('没有权限操作')
  }else if(status >= 500) {
    // 服务端异常

    Toast.fail('服务端异常')
  }

  // 抛出异常
  return Promise.reject(error)
})

// 跳转到登录页
function resdirectLogin() {
  router.replace({
    name: 'login',
    // router.currentRouter.fullPath 当前路径
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 导出
export default request