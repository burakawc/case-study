import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ProductsLayout from '@/routes/products/index'
import ProductsList from '@/routes/products/list'
import ProductDetail from '@/routes/products/detail'
import AddProduct from '@/routes/products/add'
import EditProduct from '@/routes/products/edit'
import UsersLayout from '@/routes/users/index'
import UsersList from '@/routes/users/list'
import UserDetail from '@/routes/users/detail'
import EditUser from '@/routes/users/edit'
import NotFound from '@/routes/not-found'

/**
 * Main application component that defines the routing structure
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
 * @returns JSX element containing the application routes
 */
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ProductsList />} />
        
        {/* Products Routes */}
        <Route path="products" element={<ProductsLayout />}>
          <Route index element={<ProductsList />} />
          <Route path="new" element={<AddProduct />} />
          <Route path=":id" element={<ProductDetail />} />
          <Route path=":id/edit" element={<EditProduct />} />
        </Route>
        
        {/* Users Routes */}
        <Route path="users" element={<UsersLayout />}>
          <Route index element={<UsersList />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path=":id/edit" element={<EditUser />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App 