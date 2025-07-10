import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Button, 
  Space, 
  Typography, 
  message,
  Row,
  Col,
  Spin,
  Divider
} from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/services/api'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import type { UpdateUserRequest } from '@/types'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUser(Number(id)),
    enabled: !!id,
  })

  const updateMutation = useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: () => {
      message.success('User updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
      navigate('/users')
    },
    onError: () => {
      message.error('Failed to update user')
    },
  })

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        // Flatten nested objects for form
        addressAddress: user.address.address,
        addressCity: user.address.city,
        addressState: user.address.state,
        addressPostalCode: user.address.postalCode,
        addressLat: user.address.coordinates.lat,
        addressLng: user.address.coordinates.lng,
        
        companyName: user.company.name,
        companyTitle: user.company.title,
        companyDepartment: user.company.department,
        companyAddressAddress: user.company.address.address,
        companyAddressCity: user.company.address.city,
        companyAddressState: user.company.address.state,
        companyAddressPostalCode: user.company.address.postalCode,
        companyAddressLat: user.company.address.coordinates.lat,
        companyAddressLng: user.company.address.coordinates.lng,
        
        bankCardType: user.bank.cardType,
        bankCardNumber: user.bank.cardNumber,
        bankCardExpire: user.bank.cardExpire,
        bankCurrency: user.bank.currency,
        bankIban: user.bank.iban,
        
        hairColor: user.hair.color,
        hairType: user.hair.type,
      })
    }
  }, [user, form])

  const onFinish = (values: any) => {
    if (!id) return
    
    // Reconstruct nested objects
    const updateData: UpdateUserRequest = {
      id: Number(id),
      ...values,
      address: {
        address: values.addressAddress,
        city: values.addressCity,
        state: values.addressState,
        postalCode: values.addressPostalCode,
        coordinates: {
          lat: values.addressLat,
          lng: values.addressLng,
        },
      },
      company: {
        name: values.companyName,
        title: values.companyTitle,
        department: values.companyDepartment,
        address: {
          address: values.companyAddressAddress,
          city: values.companyAddressCity,
          state: values.companyAddressState,
          postalCode: values.companyAddressPostalCode,
          coordinates: {
            lat: values.companyAddressLat,
            lng: values.companyAddressLng,
          },
        },
      },
      bank: {
        cardType: values.bankCardType,
        cardNumber: values.bankCardNumber,
        cardExpire: values.bankCardExpire,
        currency: values.bankCurrency,
        iban: values.bankIban,
      },
      hair: {
        color: values.hairColor,
        type: values.hairType,
      },
    }
    
    updateMutation.mutate(updateData)
  }

  const handleCancel = () => {
    navigate('/users')
  }

  if (isLoading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading user...</div>
        </div>
      </Card>
    )
  }

  if (error || !user) {
    return (
      <Card>
        <Title level={4} style={{ color: '#f5222d' }}>
          User not found
        </Title>
      </Card>
    )
  }

  return (
    <Card>
      <Space style={{ marginBottom: 24 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleCancel}
        >
          Back to Users
        </Button>
      </Space>

      <Title level={2}>Edit User: {user.firstName} {user.lastName}</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Title level={4}>Personal Information</Title>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: 'Please enter first name' },
                { min: 2, message: 'First name must be at least 2 characters' }
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: 'Please enter last name' },
                { min: 2, message: 'Last name must be at least 2 characters' }
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="maidenName"
              label="Maiden Name"
            >
              <Input placeholder="Enter maiden name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: 'Please enter age' },
                { type: 'number', min: 0, max: 150, message: 'Age must be between 0 and 150' }
              ]}
            >
              <InputNumber placeholder="Enter age" style={{ width: '100%' }} min={0} max={150} />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender' }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="bloodGroup"
              label="Blood Group"
              rules={[{ required: true, message: 'Please enter blood group' }]}
            >
              <Input placeholder="e.g., A+, B-, O+" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: 'Please enter username' },
                { min: 3, message: 'Username must be at least 3 characters' }
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="birthDate"
              label="Birth Date"
              rules={[{ required: true, message: 'Please enter birth date' }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="height"
              label="Height (cm)"
              rules={[
                { type: 'number', min: 50, max: 300, message: 'Height must be between 50 and 300 cm' }
              ]}
            >
              <InputNumber placeholder="Height" style={{ width: '100%' }} min={50} max={300} />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="weight"
              label="Weight (kg)"
              rules={[
                { type: 'number', min: 10, max: 500, message: 'Weight must be between 10 and 500 kg' }
              ]}
            >
              <InputNumber placeholder="Weight" style={{ width: '100%' }} min={10} max={500} />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="eyeColor"
              label="Eye Color"
            >
              <Input placeholder="Enter eye color" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="hairColor"
              label="Hair Color"
            >
              <Input placeholder="Enter hair color" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="hairType"
              label="Hair Type"
            >
              <Input placeholder="Enter hair type" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Address Information</Title>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="addressAddress"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <TextArea rows={2} placeholder="Enter address" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="addressCity"
              label="City"
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="addressState"
              label="State"
              rules={[{ required: true, message: 'Please enter state' }]}
            >
              <Input placeholder="Enter state" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="addressPostalCode"
              label="Postal Code"
              rules={[{ required: true, message: 'Please enter postal code' }]}
            >
              <Input placeholder="Enter postal code" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="addressLat"
              label="Latitude"
              rules={[{ type: 'number', message: 'Please enter valid latitude' }]}
            >
              <InputNumber placeholder="Latitude" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="addressLng"
              label="Longitude"
              rules={[{ type: 'number', message: 'Please enter valid longitude' }]}
            >
              <InputNumber placeholder="Longitude" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Company Information</Title>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="companyTitle"
              label="Job Title"
              rules={[{ required: true, message: 'Please enter job title' }]}
            >
              <Input placeholder="Enter job title" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="companyDepartment"
              label="Department"
              rules={[{ required: true, message: 'Please enter department' }]}
            >
              <Input placeholder="Enter department" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="companyAddressAddress"
              label="Company Address"
              rules={[{ required: true, message: 'Please enter company address' }]}
            >
              <TextArea rows={2} placeholder="Enter company address" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="companyAddressCity"
              label="Company City"
              rules={[{ required: true, message: 'Please enter company city' }]}
            >
              <Input placeholder="Enter company city" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="companyAddressState"
              label="Company State"
              rules={[{ required: true, message: 'Please enter company state' }]}
            >
              <Input placeholder="Enter company state" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="companyAddressPostalCode"
              label="Company Postal Code"
              rules={[{ required: true, message: 'Please enter company postal code' }]}
            >
              <Input placeholder="Enter company postal code" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="companyAddressLat"
              label="Company Latitude"
              rules={[{ type: 'number', message: 'Please enter valid latitude' }]}
            >
              <InputNumber placeholder="Company latitude" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="companyAddressLng"
              label="Company Longitude"
              rules={[{ type: 'number', message: 'Please enter valid longitude' }]}
            >
              <InputNumber placeholder="Company longitude" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Bank Information</Title>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="bankCardType"
              label="Card Type"
              rules={[{ required: true, message: 'Please enter card type' }]}
            >
              <Input placeholder="e.g., visa, mastercard" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="bankCardNumber"
              label="Card Number"
              rules={[{ required: true, message: 'Please enter card number' }]}
            >
              <Input placeholder="Enter card number" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="bankCardExpire"
              label="Card Expire"
              rules={[{ required: true, message: 'Please enter card expire date' }]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="bankCurrency"
              label="Currency"
              rules={[{ required: true, message: 'Please enter currency' }]}
            >
              <Input placeholder="e.g., USD, EUR" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="bankIban"
              label="IBAN"
              rules={[{ required: true, message: 'Please enter IBAN' }]}
            >
              <Input placeholder="Enter IBAN" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Additional Information</Title>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="domain"
              label="Domain"
              rules={[{ required: true, message: 'Please enter domain' }]}
            >
              <Input placeholder="Enter domain" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="ip"
              label="IP Address"
              rules={[{ required: true, message: 'Please enter IP address' }]}
            >
              <Input placeholder="Enter IP address" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="macAddress"
              label="MAC Address"
              rules={[{ required: true, message: 'Please enter MAC address' }]}
            >
              <Input placeholder="Enter MAC address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="university"
              label="University"
              rules={[{ required: true, message: 'Please enter university' }]}
            >
              <Input placeholder="Enter university" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="ein"
              label="EIN"
              rules={[{ required: true, message: 'Please enter EIN' }]}
            >
              <Input placeholder="Enter EIN" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="ssn"
              label="SSN"
              rules={[{ required: true, message: 'Please enter SSN' }]}
            >
              <Input placeholder="Enter SSN" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="userAgent"
              label="User Agent"
              rules={[{ required: true, message: 'Please enter user agent' }]}
            >
              <Input placeholder="Enter user agent" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              loading={updateMutation.isLoading}
            >
              Update User
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditUserPage 