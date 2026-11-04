import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import AuthRoute from '@/components/AuthRoute'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true, // index 路由，当路径为 / 时默认渲染它
        element: <Home />
      },
      {
        path: 'article', // 相对路径，无 /
        element: <Article />
      },
      {
        path: 'publish', // 相对路径，无 /
        element: <Publish />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
