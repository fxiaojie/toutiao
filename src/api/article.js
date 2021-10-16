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

// 文章详情
export const getArticleById = articleId => {
  return request ({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollect = articleId => {
  return request ({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

// 取消收藏文章
export const deleteCollect = articleId => {
  return request ({
    method: 'DELETE',
    url: `/v1_0/article/collections/${articleId}`
  })
}

// 文章点赞
export const addLike = articleId => {
  return request ({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

// 取消文章点赞
export const deleteLike = articleId => {
  return request ({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}