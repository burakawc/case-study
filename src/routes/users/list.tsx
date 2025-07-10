import React, { useState, useCallback, useMemo } from 'react'
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Card, 
  Typography, 
  Tag, 
  Avatar,
  Popconfirm,
  message,
  Tooltip,
  Badge,
  Grid,
  Row,
  Col
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { usersApi } from '@/services/api'
import { debounce } from '@/utils/debounce'
import type { User, TableFilters } from '@/types'

const { Title } = Typography
const { Search } = Input
const { useBreakpoint } = Grid

/**
 * Users listing page component
 * 
 * Features:
 * - Displays paginated list of users
 * - Search and filtering functionality
 * - User CRUD operations (view, edit, delete)
 * - Responsive table with sorting
 * - Mobile-friendly card layout
 * 
 * @returns JSX element containing the users listing page
 */
const UsersList: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const screens = useBreakpoint()
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
      message.success('User deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      message.error('Failed to delete user')
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

  const handleTableChange = (pagination: any) => {
    setFilters(prev => ({ 
      ...prev, 
      page: pagination.current,
      limit: pagination.pageSize 
    }))
  }

  // Mobile card component
  const UserCard: React.FC<{ user: User }> = React.memo(({ user }) => {
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
              onClick={() => navigate(`/users/${user.id}`)}
            />
          </Tooltip>,
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`/users/${user.id}/edit`)}
            />
          </Tooltip>,
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(user.id)}
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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <Avatar 
            src={user.image} 
            size={60}
            icon={<UserOutlined />}
            style={{ marginRight: 12 }}
          />
          <div style={{ flex: 1 }}>
            <Title level={5} style={{ margin: 0, marginBottom: 4 }}>
              {user.firstName} {user.lastName}
            </Title>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: 8 }}>
              @{user.username}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: 8 }}>
              {user.email}
            </div>
            <Space size="small">
              <Tag color={user.gender === 'male' ? 'blue' : user.gender === 'female' ? 'pink' : 'default'}>
                {user.gender}
              </Tag>
              <Tag color="red">{user.bloodGroup}</Tag>
            </Space>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Age: {user.age}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {user.company.name}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Badge count={user.age} style={{ backgroundColor: '#1890ff' }} />
          </div>
        </div>
      </Card>
    )
  })

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string) => (
        <Avatar 
          src={image} 
          size={50}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (record: User) => (
        <div>
          <div style={{ fontWeight: 500 }}>
            {record.firstName} {record.lastName}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            @{record.username}
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <Tooltip title={email}>
          <span style={{ fontSize: '12px' }}>
            {email.length > 25 ? `${email.substring(0, 25)}...` : email}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (age: number) => (
        <Badge count={age} style={{ backgroundColor: '#1890ff' }} />
      ),
      sorter: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'male' ? 'blue' : gender === 'female' ? 'pink' : 'default'}>
          {gender}
        </Tag>
      ),
    },
    {
      title: 'Blood Group',
      dataIndex: 'bloodGroup',
      key: 'bloodGroup',
      render: (bloodGroup: string) => (
        <Tag color="red">{bloodGroup}</Tag>
      ),
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
      render: (companyName: string, record: User) => (
        <Tooltip title={`${record.company.title} at ${companyName}`}>
          <span style={{ fontSize: '12px' }}>
            {companyName}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: User) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/users/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`/users/${record.id}/edit`)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this user?"
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
      ),
    },
  ]

  if (error) {
    return (
      <Card>
        <Title level={4} style={{ color: '#f5222d' }}>
          Error loading users. Please try again.
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
          onClick={() => navigate('/users/new')}
        >
          Add User
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search users..."
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
          {usersData?.data.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ color: '#666' }}>
              Showing {usersData?.data.length || 0} of {usersData?.total || 0} users
            </span>
          </div>
        </div>
      ) : (
        /* Desktop: Grid Layout */
        <div>
          <Row gutter={[16, 16]}>
            {usersData?.data.map((user: User) => (
              <Col key={user.id} xs={24} sm={12} md={8}>
                <UserCard user={user} />
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ color: '#666' }}>
              Showing {usersData?.data.length || 0} of {usersData?.total || 0} users
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersList 