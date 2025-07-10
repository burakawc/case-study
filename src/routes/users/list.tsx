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
import { usersApi } from '@/services/api'
import { debounce } from '@/utils/debounce'
import type { User, TableFilters } from '@/types'
import ErrorCard from '@/components/ErrorCard'
import SearchBar from '@/components/SearchBar'
import DataCard from '@/components/DataCard'



/**
 * Users listing page component
 * 
 * Features:
 * - Displays paginated list of users
 * - Search and filtering functionality
 * - User CRUD operations (view, edit, delete)
 * - Responsive card layout
 * - Mobile-friendly design
 * 
 * @returns JSX element containing the users listing page
 */
const UsersList: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<TableFilters>({
    page: 1,
    limit: 10,
    search: '',
  })

  // Query for users
  const { data: usersData, isLoading, error } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => usersApi.getUsers(filters),
    keepPreviousData: true,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      // Error handling is done in the component
    },
  })

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
    return <ErrorCard message="Error loading users. Please try again." />
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
          onClick={() => navigate('/users/new')}
        >
          Add User
        </Button>
        <SearchBar
          placeholder="Search users..."
          onSearch={handleSearch}
        />
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {usersData?.data?.map((user: User) => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <DataCard
                data={user}
                type="user"
                onView={() => navigate(`/users/${user.id}`)}
                onEdit={() => navigate(`/users/${user.id}/edit`)}
                onDelete={() => handleDelete(user.id)}
                showFavorite={false}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default UsersList 