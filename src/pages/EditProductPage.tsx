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
  Spin
} from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '@/services/api'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
// import type { UpdateProductRequest } from '@/types'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(Number(id)),
    enabled: !!id,
  })

  const updateMutation = useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: () => {
      message.success('Product updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
      navigate('/products')
    },
    onError: () => {
      message.error('Failed to update product')
    },
  })

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        images: product.images.join(', '),
      })
    }
  }, [product, form])

  const onFinish = (values: any) => {
    if (!id) return
    
    updateMutation.mutate({
      id: Number(id),
      ...values,
      images: values.images ? values.images.split(',').map((img: string) => img.trim()) : [],
    })
  }

  const handleCancel = () => {
    navigate('/products')
  }

  if (isLoading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading product...</div>
        </div>
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
    <Card>
      <Space style={{ marginBottom: 24 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleCancel}
        >
          Back to Products
        </Button>
      </Space>

      <Title level={2}>Edit Product: {product.title}</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Product Title"
              rules={[
                { required: true, message: 'Please enter product title' },
                { min: 3, message: 'Title must be at least 3 characters' }
              ]}
            >
              <Input placeholder="Enter product title" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: 'Please select brand' }]}
            >
              <Select placeholder="Select brand">
                <Option value="Apple">Apple</Option>
                <Option value="Samsung">Samsung</Option>
                <Option value="Google">Google</Option>
                <Option value="Xiaomi">Xiaomi</Option>
                <Option value="Huawei">Huawei</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder="Select category">
                <Option value="smartphones">Smartphones</Option>
                <Option value="laptops">Laptops</Option>
                <Option value="tablets">Tablets</Option>
                <Option value="accessories">Accessories</Option>
                <Option value="wearables">Wearables</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price ($)"
              rules={[
                { required: true, message: 'Please enter price' },
                { type: 'number', min: 0, message: 'Price must be positive' }
              ]}
            >
              <InputNumber 
                placeholder="Enter price" 
                style={{ width: '100%' }}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[
                { required: true, message: 'Please enter rating' },
                { type: 'number', min: 0, max: 5, message: 'Rating must be between 0 and 5' }
              ]}
            >
              <InputNumber 
                placeholder="0-5" 
                style={{ width: '100%' }}
                min={0}
                max={5}
                step={0.1}
              />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="stock"
              label="Stock"
              rules={[
                { required: true, message: 'Please enter stock' },
                { type: 'number', min: 0, message: 'Stock must be positive' }
              ]}
            >
              <InputNumber 
                placeholder="Enter stock" 
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="discountPercentage"
              label="Discount (%)"
              rules={[
                { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100' }
              ]}
            >
              <InputNumber 
                placeholder="0-100" 
                style={{ width: '100%' }}
                min={0}
                max={100}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter description' },
            { min: 10, message: 'Description must be at least 10 characters' }
          ]}
        >
          <TextArea 
            rows={4} 
            placeholder="Enter product description"
          />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail URL"
          rules={[
            { required: true, message: 'Please enter thumbnail URL' },
            { type: 'url', message: 'Please enter a valid URL' }
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item
          name="images"
          label="Image URLs (comma separated)"
          rules={[
            { type: 'url', message: 'Please enter valid URLs' }
          ]}
        >
          <TextArea 
            rows={3} 
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              loading={updateMutation.isLoading}
            >
              Update Product
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

export default EditProductPage 