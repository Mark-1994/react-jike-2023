// 封装高阶组件
// 有token正常跳转，无token跳转到登录页
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const token = getToken()
  if (token) {
    // <> 就是 <React.Fragment> 的语法糖（简写）
    // 组件必须返回一个单一的根节点，<>作为一个整体返回，但不生成任何实际的 DOM 标签
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace />
  }
}

export default AuthRoute
