import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Space, 
  Button, 
  Descriptions, 
  Image, 
  Tag, 
  Badge,
  Row,
  Col,
  Divider
} from 'antd'
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DeleteOutlined,
  StarOutlined,
  DollarOutlined,
  TagOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { productsApi } from '@/services/api'
import { format } from 'date-fns'
import { toggleFavorite } from '@/store/favoritesSlice'
import type { RootState } from '@/store'

const { Title, Text } = Typography

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => (state as any).favorites.products)

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

  const isFavorite = product ? favorites.some((fav: any) => fav.id === product.id) : false

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product))
    }
  }

  if (isLoading) {
    return (
      <Card>
        <div>Loading...</div>
      </Card>
    )
  }

  if (error || !product) {
    return (
      <Card>
        <Title level={4} style={{ color: '#f5222d' }}>
          Product not found
        </Title>
      </Card>
    )
  }

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => navigate(`/products/${id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => deleteMutation.mutate(product.id)}
          >
            Delete
          </Button>
          <Button 
            type={isFavorite ? "primary" : "default"}
            icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Space>

        <Row gutter={24}>
          <Col span={12}>
            <Image
              src={product.thumbnail}
              alt={product.title}
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Col>
          <Col span={12}>
            <Title level={2}>{product.title}</Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              {product.description}
            </Text>
            
            <Divider />
            
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>
                  <DollarOutlined style={{ marginRight: 8 }} />
                  Price: ${product.price}
                </Title>
                {product.discountPercentage > 0 && (
                  <Tag color="red">-{product.discountPercentage}% OFF</Tag>
                )}
              </div>
              
              <div>
                <Title level={4}>
                  <StarOutlined style={{ marginRight: 8 }} />
                  Rating: {product.rating.toFixed(1)} ⭐
                </Title>
              </div>
              
              <div>
                <Title level={4}>
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
          </Col>
        </Row>

        <Divider />

        <Descriptions title="Product Details" bordered>
          <Descriptions.Item label="Brand" span={3}>
            <Tag color="blue">{product.brand}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Category" span={3}>
            <Tag color="green">{product.category}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Price" span={3}>
            ${product.price}
          </Descriptions.Item>
          <Descriptions.Item label="Discount" span={3}>
            {product.discountPercentage}%
          </Descriptions.Item>
          <Descriptions.Item label="Rating" span={3}>
            {product.rating.toFixed(1)} / 5
          </Descriptions.Item>
          <Descriptions.Item label="Stock" span={3}>
            {product.stock} units
          </Descriptions.Item>
          <Descriptions.Item label="Created" span={3}>
            {format(new Date(product.createdAt), 'PPP')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated" span={3}>
            {format(new Date(product.updatedAt), 'PPP')}
          </Descriptions.Item>
        </Descriptions>

        {product.images.length > 1 && (
          <>
            <Divider />
            <Title level={4}>Product Images</Title>
            <Image.PreviewGroup>
              <Row gutter={[16, 16]}>
                {product.images.map((image, index) => (
                  <Col key={index} span={6}>
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      style={{ borderRadius: 4 }}
                    />
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
          </>
        )}
      </Card>
    </div>
  )
}

export default ProductDetailPage 