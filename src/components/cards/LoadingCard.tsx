import React from 'react';
import { Card, Spin } from 'antd';

interface LoadingCardProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
}

/**
 * Reusable loading card component for displaying loading states
 * 
 * @param message - Optional message to display with the spinner
 * @param size - Size of the spinner
 * @returns JSX element containing the loading card
 */
const LoadingCard: React.FC<LoadingCardProps> = ({ 
  message = 'Loading...',
  size = 'large'
}) => {
  return (
    <Card>
      <div style={{ 
        textAlign: 'center', 
        padding: '50px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
      }}>
        <Spin size={size} />
        <div style={{ color: '#666' }}>{message}</div>
      </div>
    </Card>
  );
};

export default LoadingCard; 