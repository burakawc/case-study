import React from 'react';
import { Button, Space, Tooltip, Popconfirm } from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';

interface ActionButtonsProps {
  onView?: (() => void) | undefined;
  onEdit?: (() => void) | undefined;
  onDelete?: (() => void) | undefined;
  onToggleFavorite?: (() => void) | undefined;
  isFavorite?: boolean;
  showFavorite?: boolean;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  deleteConfirmTitle?: string;
}

/**
 * Reusable action buttons component for CRUD operations
 * 
 * @param onView - Function called when view button is clicked
 * @param onEdit - Function called when edit button is clicked
 * @param onDelete - Function called when delete button is clicked
 * @param onToggleFavorite - Function called when favorite button is clicked
 * @param isFavorite - Whether the item is currently favorited
 * @param showFavorite - Whether to show the favorite button
 * @param showView - Whether to show the view button
 * @param showEdit - Whether to show the edit button
 * @param showDelete - Whether to show the delete button
 * @param deleteConfirmTitle - Title for delete confirmation dialog
 * @returns JSX element containing the action buttons
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  isFavorite = false,
  showFavorite = false,
  showView = true,
  showEdit = true,
  showDelete = true,
  deleteConfirmTitle = 'Are you sure you want to delete this item?'
}) => {
  const buttons = [];

  if (showView && onView) {
    buttons.push(
      <Tooltip key="view" title="View Details">
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={onView}
        />
      </Tooltip>
    );
  }

  if (showEdit && onEdit) {
    buttons.push(
      <Tooltip key="edit" title="Edit">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={onEdit}
        />
      </Tooltip>
    );
  }

  if (showFavorite && onToggleFavorite) {
    buttons.push(
      <Tooltip key="favorite" title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
        <Button
          type="text"
          icon={isFavorite ? <HeartFilled style={{ color: '#f5222d' }} /> : <HeartOutlined />}
          onClick={onToggleFavorite}
        />
      </Tooltip>
    );
  }

  if (showDelete && onDelete) {
    buttons.push(
      <Tooltip key="delete" title="Delete">
        <Popconfirm
          title={deleteConfirmTitle}
          onConfirm={onDelete}
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
    );
  }

  return <Space size="small">{buttons}</Space>;
};

export default ActionButtons; 