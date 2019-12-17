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
