import { request } from '@/utils'

// 获取文章列表
export const getArticleListAPI = (params) => request.get('/mp/articles', { params })

// 删除文章
export const delArticleAPI = (id) => request.delete(`/mp/articles/${id}`)
