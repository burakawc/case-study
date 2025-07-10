import React, { useState, useCallback, useMemo } from 'react'
import { 
  Table, 
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
  Grid
} from 'antd'
const { useBreakpoint } = Grid
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  ShoppingOutlined,
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
 * @returns JSX element containing the products page
 */
const ProductsPage: React.FC = () => {
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

  /**
   * Handles table pagination and sorting changes
   * @param pagination - Pagination object from Ant Design Table
   */
  const handleTableChange = (pagination: any) => {
    setFilters(prev => ({ 
      ...prev, 
      page: pagination.current,
      limit: pagination.pageSize 
    }))
  }

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

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 80,
      render: (thumbnail: string) => (
        <Image
          src={thumbnail}
          alt="Product"
          width={50}
          height={50}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Product) => (
        <Tooltip title={record.description}>
          <span style={{ fontWeight: 500 }}>{title}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand: string) => <Tag color="blue">{brand}</Tag>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="green">{category}</Tag>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
      sorter: true,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Badge 
          count={stock} 
          style={{ 
            backgroundColor: stock > 50 ? '#52c41a' : stock > 20 ? '#faad14' : '#f5222d' 
          }} 
        />
      ),
      sorter: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Tag color={rating >= 4 ? 'green' : rating >= 3 ? 'orange' : 'red'}>
          {rating.toFixed(1)} ⭐
        </Tag>
      ),
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Product) => {
        const isFavorite = favorites.some((fav: any) => fav.id === record.id)
        
        return (
          <Space size="small">
            <Tooltip title="View Details">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/products/${record.id}`)}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => navigate(`/products/${record.id}/edit`)}
              />
            </Tooltip>
            <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
              <Button
                type="text"
                icon={isFavorite ? <HeartFilled style={{ color: '#f5222d' }} /> : <HeartOutlined />}
                onClick={() => dispatch(toggleFavorite(record))}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure you want to delete this product?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        )
      },
    },
  ]

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

        {/* Mobile/Tablet Card Layout */}
        {screens.xs || screens.sm ? (
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
          /* Desktop Table Layout */
          <Table
            columns={columns}
            dataSource={productsData?.data || []}
            loading={isLoading}
            rowKey="id"
            pagination={{
              current: filters.page || 1,
              pageSize: filters.limit || 10,
              total: productsData?.total || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} items`,
              responsive: true,
            }}
            onChange={handleTableChange}
            scroll={{ x: 1200 }}
            size={screens.md ? 'middle' : 'small'}
          />
        )}
      </Card>
    </div>
  )
}

export default ProductsPage 