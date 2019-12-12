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
