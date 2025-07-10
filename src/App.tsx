import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import AddProductPage from '@/pages/AddProductPage'
import EditProductPage from '@/pages/EditProductPage'
import UsersPage from '@/pages/UsersPage'
import UserDetailPage from '@/pages/UserDetailPage'
import EditUserPage from '@/pages/EditUserPage'
import NotFoundPage from '@/pages/NotFoundPage'

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
        <Route index element={<ProductsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/new" element={<AddProductPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="products/:id/edit" element={<EditProductPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />
        <Route path="users/:id/edit" element={<EditUserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App 