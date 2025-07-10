import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Space, 
  Button, 
  Descriptions, 
  Avatar, 
  Tag, 
  Badge,
  Row,
  Col,
  Divider
} from 'antd'
import ErrorCard from '@/components/ErrorCard'
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import { usersApi } from '@/services/api'
import { format } from 'date-fns'

const { Title, Text } = Typography

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

  if (isLoading) {
    return (
      <Card>
        <div>Loading...</div>
      </Card>
    )
  }

  if (error || !user) {
    return <ErrorCard message="User not found or error loading user." />
  }

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/users')}
          >
            Back to Users
          </Button>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => navigate(`/users/${id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => deleteMutation.mutate(user.id)}
          >
            Delete
          </Button>
        </Space>

        <Row gutter={24}>
          <Col span={8}>
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
          </Col>
          <Col span={16}>
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
              <Descriptions.Item label="IBAN" span={2}>
                {user.bank.iban}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Additional Information" bordered column={2}>
              <Descriptions.Item label="Domain">
                {user.domain}
              </Descriptions.Item>
              <Descriptions.Item label="IP Address">
                {user.ip}
              </Descriptions.Item>
              <Descriptions.Item label="MAC Address">
                {user.macAddress}
              </Descriptions.Item>
              <Descriptions.Item label="University">
                {user.university}
              </Descriptions.Item>
              <Descriptions.Item label="EIN">
                {user.ein}
              </Descriptions.Item>
              <Descriptions.Item label="SSN">
                {user.ssn}
              </Descriptions.Item>
              <Descriptions.Item label="Created" span={2}>
                {format(new Date(user.createdAt), 'PPP')}
              </Descriptions.Item>
              <Descriptions.Item label="Updated" span={2}>
                {format(new Date(user.updatedAt), 'PPP')}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default UserDetailPage 