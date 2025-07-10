import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Typography, 
  Space, 
  Descriptions, 
  Image, 
  Tag, 
  Badge,
  Divider,
  Grid,
  Row,
  Col
} from 'antd'
import ErrorCard from '@/components/ErrorCard'
import LoadingCard from '@/components/LoadingCard'
import PageHeader from '@/components/PageHeader'
import DetailLayout from '@/components/DetailLayout'
import { 
  StarOutlined,
  DollarOutlined,
  TagOutlined
} from '@ant-design/icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import { productsApi } from '@/services/api'
import type { Product } from '@/types'

const { Title, Text } = Typography
const { useBreakpoint } = Grid

/**
 * Product detail page component
 * 
 * Features:
 * - Displays detailed product information
 * - Product CRUD operations (edit, delete)
 * - Favorites management
 * - Responsive design
 * 
 * @returns JSX element containing the product detail page
 */
const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const screens = useBreakpoint()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(Number(id)),
    enabled: !!id,
  })

  const deleteMutation = useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      navigate('/products')
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate(product!.id)
  }

  if (isLoading) {
    return <LoadingCard message="Loading product details..." />
  }

  if (error || !product) {
    return <ErrorCard message="Product not found or error loading product." />
  }

  const leftContent = (
    <Image
      src={product.thumbnail}
      alt={product.title}
      style={{ 
        width: '100%', 
        borderRadius: 8,
        maxWidth: screens.xs ? '100%' : '400px'
      }}
    />
  )

  const rightContent = (
    <>
      <Title level={screens.xs ? 3 : 2}>{product.title}</Title>
      <Text type="secondary" style={{ fontSize: screens.xs ? 14 : 16 }}>
        {product.description}
      </Text>
      
      <Divider />
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={screens.xs ? 5 : 4}>
            <DollarOutlined style={{ marginRight: 8 }} />
            Price: ${product.price}
          </Title>
          {product.discountPercentage > 0 && (
            <Tag color="red">-{product.discountPercentage}% OFF</Tag>
          )}
        </div>
        
        <div>
          <Title level={screens.xs ? 5 : 4}>
            <StarOutlined style={{ marginRight: 8 }} />
            Rating: {product.rating.toFixed(1)} ⭐
          </Title>
        </div>
        
        <div>
          <Title level={screens.xs ? 5 : 4}>
            <TagOutlined style={{ marginRight: 8 }} />
            Stock: 
          </Title>
          <Badge 
            count={product.stock} 
            style={{ 
              backgroundColor: product.stock > 50 ? '#52c41a' : product.stock > 20 ? '#faad14' : '#f5222d' 
            }} 
          />
        </div>
      </Space>
    </>
  )

  const fullContent = (
    <>
      <Divider />
      <Descriptions 
        title="Product Details" 
        bordered 
        size={screens.xs ? 'small' : 'default'}
        column={screens.xs ? 1 : screens.sm ? 2 : 3}
      >
        <Descriptions.Item label="Brand" span={screens.xs ? 1 : 3}>
          <Tag color="blue">{product.brand}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Category" span={screens.xs ? 1 : 3}>
          <Tag color="green">{product.category}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Price" span={screens.xs ? 1 : 3}>
          ${product.price}
        </Descriptions.Item>
        <Descriptions.Item label="Discount" span={screens.xs ? 1 : 3}>
          {product.discountPercentage}%
        </Descriptions.Item>
        <Descriptions.Item label="Rating" span={screens.xs ? 1 : 3}>
          {product.rating.toFixed(1)} / 5
        </Descriptions.Item>
        <Descriptions.Item label="Stock" span={screens.xs ? 1 : 3}>
          {product.stock} units
        </Descriptions.Item>
      </Descriptions>

      {product.images.length > 1 && (
        <>
          <Divider />
          <Title level={screens.xs ? 4 : 3}>Product Images</Title>
          <Image.PreviewGroup>
            <Row gutter={[16, 16]}>
              {product.images.map((image, index) => (
                <Col 
                  key={index} 
                  xs={12} 
                  sm={8} 
                  md={6} 
                  lg={6}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    style={{ 
                      width: '100%', 
                      borderRadius: 8,
                      objectFit: 'cover'
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Image.PreviewGroup>
        </>
      )}
    </>
  )

  return (
    <DetailLayout
      header={
        <PageHeader
          title="Products"
          backUrl="/products"
          editUrl={`/products/${id}/edit`}
          onDelete={handleDelete}
          showFavorite={true}
          product={product as Product}
        />
      }
      leftContent={leftContent}
      rightContent={rightContent}
      fullContent={fullContent}
    />
  )
}

export default ProductDetailPage 