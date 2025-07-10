import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

interface ErrorCardProps {
  message?: string;
  title?: string;
}

/**
 * Reusable error card component for displaying error messages
 * 
 * @param message - Error message to display
 * @param title - Optional title for the error card
 * @returns JSX element containing the error card
 */
const ErrorCard: React.FC<ErrorCardProps> = ({ 
  message = 'An error occurred. Please try again.',
  title = 'Error'
}) => {
  return (
    <Card>
      <Title level={4} style={{ color: '#f5222d' }}>
        {title}
      </Title>
      <p style={{ color: '#666' }}>{message}</p>
    </Card>
  );
};

export default ErrorCard; 