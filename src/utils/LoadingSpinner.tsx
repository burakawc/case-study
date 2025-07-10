import { FunctionComponent } from 'react'
import { Spin, Card } from 'antd'

/**
 * Loading Spinner Component
 * 
 * A reusable loading component that displays a centered spinner with text.
 * Used for lazy loading fallbacks and loading states.
 * 
 * @returns JSX element containing the loading spinner
 */
const LoadingSpinner: FunctionComponent = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '400px',
    padding: '20px'
  }}>
    <Card style={{ textAlign: 'center', padding: '40px' }}>
      <Spin size="large" />
      <div style={{ marginTop: '16px', color: '#666' }}>
        Loading...
      </div>
    </Card>
  </div>
)

export default LoadingSpinner 