// 搜索
import request from '@/utils/request'

// 搜索联想建议
export const getSearchSuggestions = q => {
  return request ({
    method: 'GET',  
    url: '/v1_0/suggestion',
    params: {
      q   // 联想建议关键词
    }
  })
}

// 获取搜索结果
export const getSearchResults = params => {
  return request ({
    method: 'GET',  
    url: '/v1_0/search',
    params
  })
}

// 获取搜索历史
export const getSearchHistories = () => {
  return request ({
    method: 'GET',  
    url: '/v1_0/search/histories'
  })
}

// 删除所有搜索历史
export const deleteSearchHistories = () => {
  return request ({
    method: 'DELETE',  
    url: '/v1_0/search/histories'
  })
}