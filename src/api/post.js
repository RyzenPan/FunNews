import axios from '@/utils/myaxios.js'

export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

export const getSearchList = () => {
  return axios({
    url: '/post_search_recommend'
  })
}

export const getSearchTotal = (params) => {
  return axios({
    url: '/post_search',
    params
  })
}
// 获取文章详情
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 文章点赞
export const ArticleLike = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 获取评论列表
export const getCommentData = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}

// 文章收藏
export const ArticleStar = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 发布评论
export const coommentSend = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
