import React, { useState } from 'react'
import { Button, message } from 'antd'
import { ThunderboltOutlined, ClearOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/es/form'
import { PRODUCT_DUMMY_DATA, USER_DUMMY_DATA } from '@/constants'

interface AutoFillButtonProps {
  form: FormInstance
  pageType: 'product' | 'user'
  className?: string
}

/**
 * AutoFillButton Component
 * 
 * A reusable button component that toggles between filling and clearing forms
 * with dummy data based on the page type.
 * 
 * @param form - Ant Design form instance
 * @param pageType - Type of page ('product' or 'user')
 * @param className - Optional CSS class name
 * @returns JSX element containing the toggle button
 */
const AutoFillButton: React.FC<AutoFillButtonProps> = ({ 
  form, 
  pageType, 
  className 
}) => {
  const [isFilled, setIsFilled] = useState(false)

  const handleToggle = () => {
    if (isFilled) {
      // Clear form
      form.resetFields()
      setIsFilled(false)
      message.success('Form cleared!')
    } else {
      // Fill form with dummy data
      if (pageType === 'product') {
        form.setFieldsValue({
          ...PRODUCT_DUMMY_DATA,
          images: PRODUCT_DUMMY_DATA.images.join(', ')
        })
      } else {
        form.setFieldsValue(USER_DUMMY_DATA)
      }
      
      setIsFilled(true)
      message.success('Form filled with dummy data!')
    }
  }

  return (
    <Button 
      type="dashed"
      icon={isFilled ? <ClearOutlined /> : <ThunderboltOutlined />}
      onClick={handleToggle}
      {...(className && { className })}
    >
      {isFilled ? 'Clear Form' : 'Auto Fill'}
    </Button>
  )
}

export default AutoFillButton 