import React, { useState, useCallback, useMemo } from 'react'
import { 
  Button, 
  Row,
  Col,
  Spin
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productsApi } from '@/services/api'
import { toggleFavorite } from '@/store/favoritesSlice'
import { debounce } from '@/utils/debounce'
import type { Product, TableFilters } from '@/types'
import type { RootState } from '@/store'
import ErrorCard from '@/components/cards/ErrorCard'
import SearchBar from '@/components/SearchBar'
import DataCard from '@/components/cards/DataCard'



/**
 * Products listing page component
 * 
 * Features:
 * - Displays paginated list of products
 * - Search and filtering functionality
 * - Product CRUD operations (view, edit, delete)
 * - Favorites management with Redux
 * - Responsive card layout
 * - Mobile-friendly design
 * 
 * @returns JSX element containing the products listing page
 */
const ProductsList: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.products)
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
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: () => {
      // Error handling is done in the component
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

  if (error) {
    return <ErrorCard message="Error loading products. Please try again." />
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
        <SearchBar
          placeholder="Search products..."
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {productsData?.data?.map((product: Product) => {
            const isFavorite = favorites.some((fav: Product) => fav.id === product.id)
            
            return (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <DataCard
                  data={product}
                  type="product"
                  onView={() => navigate(`/products/${product.id}`)}
                  onEdit={() => navigate(`/products/${product.id}/edit`)}
                  onDelete={() => handleDelete(product.id)}
                  onToggleFavorite={() => dispatch(toggleFavorite(product))}
                  isFavorite={isFavorite}
                  showFavorite={true}
                />
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}

export default ProductsList 