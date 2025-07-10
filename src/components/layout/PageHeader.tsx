import React from 'react';
import { Space, Button, Grid } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DeleteOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/store/favoritesSlice';
import type { RootState } from '@/store';
import type { Product } from '@/types';

const { useBreakpoint } = Grid;

interface PageHeaderProps {
  title: string;
  backUrl: string;
  editUrl?: string;
  onDelete?: () => void;
  showFavorite?: boolean;
  product?: Product;
  showEdit?: boolean;
  showDelete?: boolean;
}

/**
 * Reusable page header component for detail pages
 * 
 * @param title - Title for the back button
 * @param backUrl - URL to navigate back to
 * @param editUrl - URL to navigate to edit page
 * @param onDelete - Function to handle delete action
 * @param showFavorite - Whether to show favorite button
 * @param product - Product data for favorite functionality
 * @param showEdit - Whether to show edit button
 * @param showDelete - Whether to show delete button
 * @returns JSX element containing the page header
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backUrl,
  editUrl,
  onDelete,
  showFavorite = false,
  product,
  showEdit = true,
  showDelete = true
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const favorites = useSelector((state: RootState) => state.favorites.products);

  const isFavorite = product ? favorites.some((fav: Product) => fav.id === product.id) : false;

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product));
    }
  };

  const buttons = [];

  // Back button
  buttons.push(
    <Button 
      key="back"
      icon={<ArrowLeftOutlined />} 
      onClick={() => navigate(backUrl)}
      size={screens.xs ? 'small' : 'middle'}
    >
      Back to {title}
    </Button>
  );

  // Edit button
  if (showEdit && editUrl) {
    buttons.push(
      <Button 
        key="edit"
        type="primary" 
        icon={<EditOutlined />}
        onClick={() => navigate(editUrl)}
        size={screens.xs ? 'small' : 'middle'}
      >
        Edit
      </Button>
    );
  }

  // Delete button
  if (showDelete && onDelete) {
    buttons.push(
      <Button 
        key="delete"
        danger 
        icon={<DeleteOutlined />}
        onClick={onDelete}
        size={screens.xs ? 'small' : 'middle'}
      >
        Delete
      </Button>
    );
  }

  // Favorite button
  if (showFavorite && product) {
    buttons.push(
      <Button 
        key="favorite"
        type={isFavorite ? "primary" : "default"}
        icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
        onClick={handleToggleFavorite}
        size={screens.xs ? 'small' : 'middle'}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    );
  }

  return (
    <Space 
      style={{ 
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: screens.xs ? 8 : 16
      }}
      direction={screens.xs ? 'vertical' : 'horizontal'}
    >
      {buttons}
    </Space>
  );
};

export default PageHeader; 