// axios封装处理
import axios from 'axios'

// 根域名配置
// 超时时间
const request = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0',
  timeout: 5000
})

// 请求/响应拦截器
request.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export {
  request
}
