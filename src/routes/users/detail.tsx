import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Typography, 
  Space, 
  Descriptions, 
  Avatar, 
  Tag, 
  Badge,
  Divider
} from 'antd'
import ErrorCard from '@/components/cards/ErrorCard'
import LoadingCard from '@/components/cards/LoadingCard'
import PageHeader from '@/components/layout/PageHeader'
import DetailLayout from '@/components/layout/DetailLayout'
import { 
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import { usersApi } from '@/services/api'
import { format } from 'date-fns'

const { Title, Text } = Typography

/**
 * User detail page component
 * 
 * Features:
 * - Displays detailed user information
 * - User CRUD operations (edit, delete)
 * - Responsive design
 * 
 * @returns JSX element containing the user detail page
 */
const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUser(Number(id)),
    enabled: !!id,
  })

  const deleteMutation = useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: () => {
      navigate('/users')
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate(user!.id)
  }

  if (isLoading) {
    return <LoadingCard message="Loading user details..." />
  }

  if (error || !user) {
    return <ErrorCard message="User not found or error loading user." />
  }

  const leftContent = (
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        src={user.image} 
        size={120}
        icon={<UserOutlined />}
      />
      <Title level={3} style={{ marginTop: 16 }}>
        {user.firstName} {user.lastName}
      </Title>
      <Text type="secondary">@{user.username}</Text>
      
      <Divider />
      
      <Space direction="vertical" size="small">
        <div>
          <MailOutlined style={{ marginRight: 8 }} />
          {user.email}
        </div>
        <div>
          <PhoneOutlined style={{ marginRight: 8 }} />
          {user.phone}
        </div>
        <div>
          <CalendarOutlined style={{ marginRight: 8 }} />
          {format(new Date(user.birthDate), 'PPP')}
        </div>
      </Space>
    </div>
  )

  const rightContent = (
    <div>
      <Descriptions title="Personal Information" bordered column={2}>
        <Descriptions.Item label="Full Name">
          {user.firstName} {user.lastName}
          {user.maidenName && ` (${user.maidenName})`}
        </Descriptions.Item>
        <Descriptions.Item label="Age">
          <Badge count={user.age} style={{ backgroundColor: '#1890ff' }} />
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          <Tag color={user.gender === 'male' ? 'blue' : user.gender === 'female' ? 'pink' : 'default'}>
            {user.gender}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">
          <Tag color="red">{user.bloodGroup}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Height">
          {user.height} cm
        </Descriptions.Item>
        <Descriptions.Item label="Weight">
          {user.weight} kg
        </Descriptions.Item>
        <Descriptions.Item label="Eye Color">
          {user.eyeColor}
        </Descriptions.Item>
        <Descriptions.Item label="Hair">
          {user.hair.color} {user.hair.type}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )

  const fullContent = (
    <>
      <Divider />
      <Descriptions title="Address Information" bordered column={2}>
        <Descriptions.Item label="Address" span={2}>
          {user.address.address}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {user.address.city}
        </Descriptions.Item>
        <Descriptions.Item label="State">
          {user.address.state}
        </Descriptions.Item>
        <Descriptions.Item label="Postal Code">
          {user.address.postalCode}
        </Descriptions.Item>
        <Descriptions.Item label="Coordinates">
          {user.address.coordinates.lat}, {user.address.coordinates.lng}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Company Information" bordered column={2}>
        <Descriptions.Item label="Company Name">
          {user.company.name}
        </Descriptions.Item>
        <Descriptions.Item label="Title">
          {user.company.title}
        </Descriptions.Item>
        <Descriptions.Item label="Department">
          {user.company.department}
        </Descriptions.Item>
        <Descriptions.Item label="Company Address" span={2}>
          {user.company.address.address}, {user.company.address.city}, {user.company.address.state} {user.company.address.postalCode}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Bank Information" bordered column={2}>
        <Descriptions.Item label="Card Type">
          {user.bank.cardType}
        </Descriptions.Item>
        <Descriptions.Item label="Card Number">
          {user.bank.cardNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Card Expire">
          {user.bank.cardExpire}
        </Descriptions.Item>
        <Descriptions.Item label="Currency">
          {user.bank.currency}
        </Descriptions.Item>
        <Descriptions.Item label="IBAN">
          {user.bank.iban}
        </Descriptions.Item>
      </Descriptions>
    </>
  )

  return (
    <DetailLayout
      header={
        <PageHeader
          title="Users"
          backUrl="/users"
          editUrl={`/users/${id}/edit`}
          onDelete={handleDelete}
          showFavorite={false}
        />
      }
      leftContent={leftContent}
      rightContent={rightContent}
      fullContent={fullContent}
    />
  )
}

export default UserDetailPage 