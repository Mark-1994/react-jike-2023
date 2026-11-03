// 封装和token相关的方法
const TOKENKEY = 'token_key'
// 设置token
const setToken = (token) => localStorage.setItem(TOKENKEY, token)

// 获取token
const getToken = () => localStorage.getItem(TOKENKEY)

// 移除token
const removeToken = () => localStorage.removeItem(TOKENKEY)

// 导出方法
export { setToken, getToken, removeToken }
