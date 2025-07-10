import React from 'react'
import { Outlet } from 'react-router-dom'
import { Card, Typography } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'

const { Title } = Typography

/**
 * Products Layout Component
 * 
 * This component serves as a layout wrapper for all product-related pages.
 * It provides a consistent header and structure for the products section.
 * 
 * @returns JSX element containing the products layout with outlet
 */
const ProductsLayout: React.FC = () => {
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
            <ShoppingOutlined style={{ marginRight: 8 }} />
            Products
          </Title>
        </div>
        
        {/* Render nested routes */}
        <Outlet />
      </Card>
    </div>
  )
}

export default ProductsLayout 