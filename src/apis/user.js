// 用户相关的请求
import { request } from '@/utils'

// 登录接口
export const loginAPI = (data) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getProfileAPI = () => {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}
