import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const onMenuClick = (item) => {
    const path = item.key
    navigate(path)
  }
  const selectedKeys = location.pathname
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
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
