import request from '@/utils/request'

// 注册登录
export const login = data => {
  return request ({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
} 

// 发送验证码
export const sendSms = mobile => {
  return request ({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
} 

// 获取当前用户信息
export const getCurrentUser = () => {
  return request ({
    method: 'GET',
    url: '/v1_0/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 用户频道列表
export const getUserChannel = () => {
  return request ({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export const addFollow = userId => {
  return request ({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const deleteFollow = userId => {
  return request ({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}