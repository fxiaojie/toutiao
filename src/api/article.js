// 文章列表
import request from '@/utils/request'

// 文章列表
export const getArticles = params => {
  return request ({
    method: 'GET',  // 频道id
    url: '/v1_1/articles',  // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
    params  // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
  })
}