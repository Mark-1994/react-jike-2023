import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const onMenuClick = (item) => {
    const path = item.key
    navigate(path)
  }
  const selectedKeys = location.pathname
  const dispatch = useDispatch()
  // 触发个人用户信息action
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  // 获取redux中用户信息
  const name = useSelector(state => state.user.userInfo.name)
  // 退出登录确认回调
  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{ name }</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '/',
                icon: <HomeOutlined />,
                label: '数据概览'
              },
              {
                key: '/article',
                icon: <DiffOutlined />,
                label: '内容管理'
              },
              {
                key: '/publish',
                icon: <EditOutlined />,
                label: '发布文章'
              }
            ]}
            onClick={onMenuClick}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由的出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
