// 用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit'
import { request, setToken as _setToken, getToken, removeToken } from '@/utils'

const userStore = createSlice({
  // 模块名
  name: 'user',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    // state 是当前的状态，action 是触发的方法传递的参数
    setToken (state, action) {
      state.token = action.payload
      // 将token存入到localStorage中
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送异步请求
    const res = await request.post('/authorizations', loginForm)
    // 提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

// 异步方法 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    // 获取用户信息
    const res = await request.get('/user/profile')
    // 提交同步action进行用户信息的保存
    dispatch(setUserInfo(res.data))
  }
}

export {
  setToken,
  fetchLogin,
  fetchUserInfo,
  clearUserInfo
}

export default userReducer
