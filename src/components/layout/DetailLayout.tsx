import React from 'react';
import { Card, Row, Col, Grid } from 'antd';

const { useBreakpoint } = Grid;

interface DetailLayoutProps {
  header?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  fullContent?: React.ReactNode;
  gutter?: number;
}

/**
 * Reusable detail layout component for detail pages
 * 
 * @param header - Header content (usually PageHeader component)
 * @param leftContent - Content for the left column (usually image/avatar)
 * @param rightContent - Content for the right column (usually details)
 * @param fullContent - Full width content (usually descriptions)
 * @param gutter - Gap between columns
 * @returns JSX element containing the detail layout
 */
const DetailLayout: React.FC<DetailLayoutProps> = ({
  header,
  leftContent,
  rightContent,
  fullContent,
  gutter = 24
}) => {
  const screens = useBreakpoint();

  return (
    <div>
      <Card>
        {header}
        
        {leftContent && rightContent ? (
          <Row gutter={screens.xs ? 16 : gutter}>
            <Col xs={24} sm={24} md={12}>
              {leftContent}
            </Col>
            <Col xs={24} sm={24} md={12}>
              {rightContent}
            </Col>
          </Row>
        ) : null}
        
        {fullContent}
      </Card>
    </div>
  );
};

export default DetailLayout; 