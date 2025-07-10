import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'

/**
 * TanStack Query client configuration
 * 
 * Features:
 * - 5 minute stale time for queries
 * - 10 minute cache time
 * - Single retry on failure
 * - Disabled refetch on window focus
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * Custom Ant Design theme configuration
 * 
 * Customizes:
 * - Primary color: #1890ff (blue)
 * - Border radius: 6px
 * - Font family: System fonts stack
 */
const theme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
}

/**
 * Application entry point
 * 
 * Sets up:
 * - React Strict Mode
 * - Redux Provider with store
 * - TanStack Query Provider with client
 * - Ant Design ConfigProvider with theme
 * - React Router BrowserRouter
 * - React Query DevTools (development only)
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
) 