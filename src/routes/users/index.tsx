import React from 'react'
import { Outlet } from 'react-router-dom'
import { Card, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Title } = Typography

/**
 * Users Layout Component
 * 
 * This component serves as a layout wrapper for all user-related pages.
 * It provides a consistent header and structure for the users section.
 * 
 * @returns JSX element containing the users layout with outlet
 */
const UsersLayout: React.FC = () => {
  return (
    <div>
      <Card>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 16
        }}>
          <Title level={3} style={{ margin: 0 }}>
            <UserOutlined style={{ marginRight: 8 }} />
            Users
          </Title>
        </div>
        
        {/* Render nested routes */}
        <Outlet />
      </Card>
    </div>
  )
}

export default UsersLayout 