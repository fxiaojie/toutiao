// 频道相关

import request from '@/utils/request'

// 文章列表
export const getAllChannels = () => {
  return request ({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 用户频道列表
export const addUserChannel = data => {
  return request ({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}

// 
export const deleteUserChannel = channelId => {
  return request ({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}