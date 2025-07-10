import React from 'react';
import { Card, Typography, Tag, Image, Avatar, Space, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ActionButtons from '../ActionButtons';
import type { Product, User } from '@/types';

const { Title } = Typography;

interface DataCardProps {
  data: Product | User;
  type: 'product' | 'user';
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  showFavorite?: boolean;
}

/**
 * Reusable data card component for displaying products or users
 * 
 * @param data - Product or User data to display
 * @param type - Type of data ('product' or 'user')
 * @param onView - Function called when view button is clicked
 * @param onEdit - Function called when edit button is clicked
 * @param onDelete - Function called when delete button is clicked
 * @param onToggleFavorite - Function called when favorite button is clicked
 * @param isFavorite - Whether the item is currently favorited
 * @param showFavorite - Whether to show the favorite button
 * @returns JSX element containing the data card
 */
const DataCard: React.FC<DataCardProps> = ({
  data,
  type,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  isFavorite = false,
  showFavorite = false
}) => {
  const isProduct = type === 'product';
  const product = isProduct ? data as Product : null;
  const user = !isProduct ? data as User : null;

  const renderProductContent = () => {
    if (!product) return null;
    
    return (
      <>
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
      </>
    );
  };

  const renderUserContent = () => {
    if (!user) return null;
    
    return (
      <>
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
      </>
    );
  };

  return (
    <Card
      hoverable
      style={{ marginBottom: 16 }}
      bodyStyle={{ padding: 16 }}
      actions={[
        <ActionButtons
          key="actions"
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
          showFavorite={showFavorite}
          deleteConfirmTitle={`Are you sure you want to delete this ${type}?`}
        />
      ]}
    >
      {isProduct ? renderProductContent() : renderUserContent()}
    </Card>
  );
};

export default DataCard; 