// 封装和文章相关的接口函数
import { request } from '@/utils'

// 获取频道列表
export const getChannelsAPI = () => request.get('/channels')

// 新增文章
export const createArticleAPI = (data, draft = false) => request.post(`/mp/articles?draft=${draft}`, data)
