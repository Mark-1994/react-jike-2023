// axios封装处理
import axios from 'axios'
import { getToken, removeToken } from '@/utils/token'
import router from '@/router'

// 根域名配置
// 超时时间
const request = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0',
  timeout: 5000
})

// 请求/响应拦截器
request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  // 状态码 2XX 范围内都会触发该函数
  return response.data
}, (error) => {
  // 超出 2XX 状态码都会触发该函数
  // 监控401 token失效
  if (error.response.status === 401) {
    // 删除token
    removeToken()
    // 跳转到登录页面
    router.navigate('/login')
    window.location.reload()
  }
  return Promise.reject(error)
})

export {
  request
}
