// 封装和文章相关的接口函数
import { request } from '@/utils'

// 获取频道列表
export const getChannelsAPI = () => request.get('/channels')

// 新增文章
export const createArticleAPI = (data, draft = false) => request.post(`/mp/articles?draft=${draft}`, data)

// 获取文章详情
export const getArticleDetailAPI = (id) => request.get(`/mp/articles/${id}`)

// 修改文章
export const updateArticleAPI = ({id, ...data}, draft = false) => request.put(`/mp/articles/${id}?draft=${draft}`, data)
