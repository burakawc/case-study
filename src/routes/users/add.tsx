import React from 'react'
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
  Col
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/services/api'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import type { CreateUserRequest } from '@/types'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

/**
 * Add User Page Component
 * 
 * Features:
 * - Form for creating new users
 * - Form validation with Ant Design
 * - Complex nested object handling (address, company, bank, hair)
 * - Responsive layout with Row/Col grid
 * - Integration with React Query for API calls
 * - Navigation back to users list
 * 
 * @returns JSX element containing the add user form
 */
const AddUserPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const createMutation = useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      message.success('User created successfully!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/users')
    },
    onError: () => {
      message.error('Failed to create user')
    },
  })

  const onFinish = (values: any) => {
    // Reconstruct nested objects
    const createData: CreateUserRequest = {
      ...values,
      address: {
        address: values.addressAddress,
        city: values.addressCity,
        state: values.addressState,
        postalCode: values.addressPostalCode,
        coordinates: {
          lat: values.addressLat || 0,
          lng: values.addressLng || 0,
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
            lat: values.companyAddressLat || 0,
            lng: values.companyAddressLng || 0,
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
    
    createMutation.mutate(createData)
  }

  const handleCancel = () => {
    navigate('/users')
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

      <Title level={2}>Add New User</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          gender: 'male',
          bloodGroup: 'A+',
          hairColor: 'Siyah',
          hairType: 'Düz',
          bankCardType: 'visa',
          bankCurrency: 'TL',
        }}
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
              <Input placeholder="Enter maiden name (optional)" />
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
                { type: 'number', min: 0, max: 120, message: 'Age must be between 0 and 120' }
              ]}
            >
              <InputNumber 
                placeholder="Enter age" 
                style={{ width: '100%' }}
                min={0}
                max={120}
              />
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
              rules={[{ required: true, message: 'Please select blood group' }]}
            >
              <Select placeholder="Select blood group">
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
              </Select>
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
              rules={[
                { required: true, message: 'Please enter phone number' }
              ]}
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
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="height"
              label="Height (cm)"
              rules={[
                { required: true, message: 'Please enter height' },
                { type: 'number', min: 50, max: 250, message: 'Height must be between 50 and 250 cm' }
              ]}
            >
              <InputNumber 
                placeholder="Enter height" 
                style={{ width: '100%' }}
                min={50}
                max={250}
              />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="weight"
              label="Weight (kg)"
              rules={[
                { required: true, message: 'Please enter weight' },
                { type: 'number', min: 20, max: 200, message: 'Weight must be between 20 and 200 kg' }
              ]}
            >
              <InputNumber 
                placeholder="Enter weight" 
                style={{ width: '100%' }}
                min={20}
                max={200}
              />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="eyeColor"
              label="Eye Color"
              rules={[{ required: true, message: 'Please enter eye color' }]}
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
              rules={[{ required: true, message: 'Please select hair color' }]}
            >
              <Select placeholder="Select hair color">
                <Option value="Siyah">Siyah</Option>
                <Option value="Kahverengi">Kahverengi</Option>
                <Option value="Sarı">Sarı</Option>
                <Option value="Kızıl">Kızıl</Option>
                <Option value="Gri">Gri</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="hairType"
              label="Hair Type"
              rules={[{ required: true, message: 'Please select hair type' }]}
            >
              <Select placeholder="Select hair type">
                <Option value="Düz">Düz</Option>
                <Option value="Dalgalı">Dalgalı</Option>
                <Option value="Kıvırcık">Kıvırcık</Option>
                <Option value="Kısa">Kısa</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="birthDate"
          label="Birth Date"
          rules={[{ required: true, message: 'Please enter birth date' }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Profile Image URL"
          rules={[
            { required: true, message: 'Please enter image URL' },
            { type: 'url', message: 'Please enter a valid URL' }
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

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
            >
              <InputNumber 
                placeholder="Enter latitude" 
                style={{ width: '100%' }}
                step={0.0001}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="addressLng"
          label="Longitude"
        >
          <InputNumber 
            placeholder="Enter longitude" 
            style={{ width: '100%' }}
            step={0.0001}
          />
        </Form.Item>

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
            >
              <InputNumber 
                placeholder="Enter company latitude" 
                style={{ width: '100%' }}
                step={0.0001}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="companyAddressLng"
          label="Company Longitude"
        >
          <InputNumber 
            placeholder="Enter company longitude" 
            style={{ width: '100%' }}
            step={0.0001}
          />
        </Form.Item>

        <Title level={4}>Bank Information</Title>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="bankCardType"
              label="Card Type"
              rules={[{ required: true, message: 'Please select card type' }]}
            >
              <Select placeholder="Select card type">
                <Option value="visa">Visa</Option>
                <Option value="mastercard">Mastercard</Option>
                <Option value="maestro">Maestro</Option>
                <Option value="amex">American Express</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="bankCardNumber"
              label="Card Number"
              rules={[
                { required: true, message: 'Please enter card number' },
                { min: 13, max: 19, message: 'Card number must be between 13 and 19 digits' }
              ]}
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
              rules={[{ required: true, message: 'Please select currency' }]}
            >
              <Select placeholder="Select currency">
                <Option value="TL">Turkish Lira (TL)</Option>
                <Option value="USD">US Dollar (USD)</Option>
                <Option value="EUR">Euro (EUR)</Option>
                <Option value="GBP">British Pound (GBP)</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="bankIban"
              label="IBAN"
              rules={[
                { required: true, message: 'Please enter IBAN' },
                { min: 15, max: 34, message: 'IBAN must be between 15 and 34 characters' }
              ]}
            >
              <Input placeholder="Enter IBAN" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              loading={createMutation.isLoading}
            >
              Create User
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

export default AddUserPage 