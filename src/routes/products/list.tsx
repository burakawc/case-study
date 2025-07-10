import React, { useState, useCallback, useMemo } from 'react'
import { 
  Button, 
  Input, 
  Space, 
  Card, 
  Typography, 
  Tag, 
  Image,
  Popconfirm,
  message,
  Tooltip,
  Badge,
  Grid,
  Row,
  Col,
  Statistic
} from 'antd'
const { useBreakpoint } = Grid
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productsApi } from '@/services/api'
import { toggleFavorite } from '@/store/favoritesSlice'
import { debounce } from '@/utils/debounce'
import type { Product, TableFilters } from '@/types'
import type { RootState } from '@/store'
import { useQuery as useQueryUsers } from '@tanstack/react-query'
import { usersApi } from '@/services/api'

const { Title } = Typography
const { Search } = Input

/**
 * Products listing page component
 * 
 * Features:
 * - Displays paginated list of products
 * - Search and filtering functionality
 * - Product CRUD operations (view, edit, delete)
 * - Favorites management with Redux
 * - Responsive table with sorting
 * - Mobile-friendly card layout
 * 
 * @returns JSX element containing the products listing page
 */
const ProductsList: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => (state as any).favorites.products)
  const screens = useBreakpoint()
  const [filters, setFilters] = useState<TableFilters>({
    page: 1,
    limit: 10,
    search: '',
  })

  // Query for products
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.getProducts(filters),
    keepPreviousData: true,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      message.success('Product deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: () => {
      message.error('Failed to delete product')
    },
  })

  /**
   * Handles product deletion with confirmation
   * @param id - Product ID to delete
   */
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const debouncedSearch = useMemo(() => debounce((value: string) => {
    setFilters(prev => ({ ...prev, search: value, page: 1 }))
  }, 400), [])

  const handleSearch = useCallback((value: string) => {
    debouncedSearch(value)
  }, [debouncedSearch])



  // Mobile card component
  const ProductCard: React.FC<{ product: Product }> = React.memo(({ product }) => {
    const isFavorite = favorites.some((fav: any) => fav.id === product.id)
    
    return (
      <Card
        hoverable
        style={{ marginBottom: 16 }}
        bodyStyle={{ padding: 16 }}
        actions={[
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/products/${product.id}`)}
            />
          </Tooltip>,
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`/products/${product.id}/edit`)}
            />
          </Tooltip>,
          <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
            <Button
              type="text"
              icon={isFavorite ? <HeartFilled style={{ color: '#f5222d' }} /> : <HeartOutlined />}
              onClick={() => dispatch(toggleFavorite(product))}
            />
          </Tooltip>,
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this product?"
              onConfirm={() => handleDelete(product.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>,
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{
            width: 56,
            height: 56,
            minWidth: 56,
            minHeight: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            marginRight: 14,
            overflow: 'hidden',
          }}>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={48}
              height={48}
              style={{ objectFit: 'cover', borderRadius: 8, background: 'transparent' }}
              preview={false}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Title level={5} style={{ margin: 0, marginBottom: 4, wordBreak: 'break-word' }}>
              {product.title}
            </Title>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: 8, wordBreak: 'break-word' }}>
              {product.description.length > 50 
                ? `${product.description.substring(0, 50)}...` 
                : product.description
              }
            </div>
            <Space size="small" wrap>
              <Tag color="blue">{product.brand}</Tag>
              <Tag color="green">{product.category}</Tag>
            </Space>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
              ${product.price}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Stock: {product.stock}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Tag color={product.rating >= 4 ? 'green' : product.rating >= 3 ? 'orange' : 'red'}>
              {product.rating.toFixed(1)} ⭐
            </Tag>
          </div>
        </div>
      </Card>
    )
  })



  if (error) {
    return (
      <Card>
        <Title level={4} style={{ color: '#f5222d' }}>
          Error loading products. Please try again.
        </Title>
      </Card>
    )
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/products/new')}
        >
          Add Product
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search products..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ 
            width: screens.xs ? '100%' : screens.sm ? '100%' : 300,
            maxWidth: 400
          }}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      {/* Responsive Card Layout */}
      {screens.xs ? (
        /* Mobile: Single Column */
        <div>
          {productsData?.data.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ color: '#666' }}>
              Showing {productsData?.data.length || 0} of {productsData?.total || 0} products
            </span>
          </div>
        </div>
      ) : (
        /* Desktop: Grid Layout */
        <div>
          <Row gutter={[16, 16]}>
            {productsData?.data.map((product: Product) => (
              <Col key={product.id} xs={24} sm={12} md={8}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ color: '#666' }}>
              Showing {productsData?.data.length || 0} of {productsData?.total || 0} products
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsList; 