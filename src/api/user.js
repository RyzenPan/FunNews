import axios from '@/utils/myaxios.js'

export const userLogin = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

export const getUserInfo = id => {
  return axios({
    url: `/user/${id}`
  })
}

export const userRegister = data => {
  return axios({
    url: `/register`,
    method: 'post',
    data
  })
}

export const editUser = (id, data) => {
  return axios({
    url: `/user_update/${id}`,
    method: 'post',
    data
  })
}

export const getFocusListInfo = (id) => {
  return axios({
    url: `/user_follows`
  })
}
// 关注用户
export const userFollow = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
// 取消关注用户
export const UnuserFollow = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
