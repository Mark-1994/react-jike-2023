// 封装高阶组件
// 有token正常跳转，无token跳转到登录页
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace />
  }
}

export default AuthRoute
