import React from 'react'
import { Layout, Menu, Typography, Avatar, Dropdown, Space, Button } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  ShoppingOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Grid } from 'antd'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout
const { Title } = Typography
const { useBreakpoint } = Grid

/**
 * Main layout component that provides the application shell
 * 
 * Features:
 * - Collapsible sidebar navigation
 * - Header with user menu
 * - Responsive design
 * - Route-based navigation highlighting
 * - Mobile-friendly navigation
 * 
 * @returns JSX element containing the layout structure
 */
const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = React.useState(false)

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/'),
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: 'Products',
      onClick: () => navigate('/products'),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/users'),
    },
  ]

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ]

  const selectedKey = location.pathname === '/' ? '/' : location.pathname

  // Mobile menu items for header
  const mobileMenuItems = menuItems.map(item => {
    if (item && 'onClick' in item) {
      return {
        ...item,
        onClick: (e: any) => {
          item.onClick?.(e)
          setCollapsed(true)
        }
      }
    }
    return item
  })

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!screens.xs && (
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          theme="light"
          style={{
            boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          }}
          breakpoint="lg"
          onBreakpoint={(broken) => {
            if (broken) {
              setCollapsed(true)
            }
          }}
        >
          <div style={{ 
            height: 64, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              {collapsed ? 'BC' : 'Buavci CMS'}
            </Title>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>
      )}
      
      <Layout>
        <Header style={{ 
          padding: screens.xs ? '0 12px' : '0 24px', 
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          height: screens.xs ? '56px' : '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile menu button */}
            {screens.xs ? (
              <Dropdown 
                menu={{ items: mobileMenuItems }} 
                placement="bottomLeft"
                trigger={['click']}
              >
                <Button
                  type="text"
                  icon={<MenuUnfoldOutlined />}
                  style={{ fontSize: '18px', marginRight: 12 }}
                />
              </Dropdown>
            ) : (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '18px', marginRight: 12 }}
              />
            )}
            
            {/* Mobile title */}
            {screens.xs && (
              <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                BC
              </Title>
            )}
          </div>
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} size={screens.xs ? 'small' : 'default'} />
              {!screens.xs && <span>Admin User</span>}
            </Space>
          </Dropdown>
        </Header>
        
        <Content style={{ 
          margin: screens.xs ? '12px 8px' : '24px 16px',
          padding: screens.xs ? 12 : 24,
          background: '#fff',
          borderRadius: 6,
          minHeight: 280,
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout 