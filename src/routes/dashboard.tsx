import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { productsApi, usersApi } from '@/services/api';

/**
 * Dashboard page showing high-level statistics.
 * This page is independent from the product list and can be extended with more widgets.
 */
const Dashboard: React.FC = () => {
  // Product stats
  const { data: productsData, isLoading: loadingProducts } = useQuery({
    queryKey: ['products', { page: 1, limit: 1 }],
    queryFn: () => productsApi.getProducts({ page: 1, limit: 1 }),
  });
  // User stats
  const { data: usersData, isLoading: loadingUsers } = useQuery({
    queryKey: ['users', { page: 1, limit: 1 }],
    queryFn: () => usersApi.getUsers({ page: 1, limit: 1 }),
  });

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Toplam Ürün" value={productsData?.total ?? 0} loading={loadingProducts} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Toplam Kullanıcı" value={usersData?.total ?? 0} loading={loadingUsers} />
          </Card>
        </Col>
      </Row>
      {/* Future dashboard widgets can be added here */}
    </div>
  );
};

export default Dashboard; 