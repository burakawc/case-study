import { FunctionComponent, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import LoadingSpinner from '@/utils/LoadingSpinner'

// Lazy load components
const ProductsLayout = lazy(() => import('@/routes/products/index'))
const ProductsList = lazy(() => import('@/routes/products/list'))
const ProductDetail = lazy(() => import('@/routes/products/detail'))
const AddProduct = lazy(() => import('@/routes/products/add'))
const EditProduct = lazy(() => import('@/routes/products/edit'))
const UsersLayout = lazy(() => import('@/routes/users/index'))
const UsersList = lazy(() => import('@/routes/users/list'))
const UserDetail = lazy(() => import('@/routes/users/detail'))
const EditUser = lazy(() => import('@/routes/users/edit'))
const NotFound = lazy(() => import('@/routes/not-found'))

/**
 * Main application component that defines the routing structure with lazy loading
 * 
 * Routes:
 * - `/` - Dashboard (redirects to products)
 * - `/products` - Products listing page
 * - `/products/new` - Add new product form
 * - `/products/:id` - Product detail page
 * - `/products/:id/edit` - Edit product form
 * - `/users` - Users listing page
 * - `/users/:id` - User detail page
 * - `/users/:id/edit` - Edit user form
 * - `*` - 404 Not Found page
 * 
 * @returns JSX element containing the application routes with lazy loading
 */
const App: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <Suspense fallback={<LoadingSpinner />}>
            <ProductsList />
          </Suspense>
        } />
        
        {/* Products Routes */}
        <Route path="products" element={
          <Suspense fallback={<LoadingSpinner />}>
            <ProductsLayout />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductsList />
            </Suspense>
          } />
          <Route path="new" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AddProduct />
            </Suspense>
          } />
          <Route path=":id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductDetail />
            </Suspense>
          } />
          <Route path=":id/edit" element={
            <Suspense fallback={<LoadingSpinner />}>
              <EditProduct />
            </Suspense>
          } />
        </Route>
        
        {/* Users Routes */}
        <Route path="users" element={
          <Suspense fallback={<LoadingSpinner />}>
            <UsersLayout />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <UsersList />
            </Suspense>
          } />
          <Route path=":id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <UserDetail />
            </Suspense>
          } />
          <Route path=":id/edit" element={
            <Suspense fallback={<LoadingSpinner />}>
              <EditUser />
            </Suspense>
          } />
        </Route>
        
        <Route path="*" element={
          <Suspense fallback={<LoadingSpinner />}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>
  )
}

export default App 