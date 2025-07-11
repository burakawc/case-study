import type {
  Product,
  User,
  CreateProductRequest,
  UpdateProductRequest,
  CreateUserRequest,
  UpdateUserRequest,
  PaginatedResponse,
} from "@/types";

import { mockProducts, mockUsers } from "@/mock";

// API Client - Currently using mock data, axios client available for future use
// const apiClient = axios.create({
//   baseURL: "/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/**
 * Simulates network delay for realistic API behavior
 * @param ms - Delay time in milliseconds
 * @returns Promise that resolves after the specified delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Products API
export const productsApi = {
  /**
   * Retrieves a paginated list of products with optional search and filtering
   * @param params - Optional parameters for pagination and search
   * @param params.page - Page number (default: 1)
   * @param params.limit - Number of items per page (default: 10)
   * @param params.search - Search term to filter products by title, description, or brand
   * @returns Promise containing paginated product data
   * @example
   * ```typescript
   * const products = await productsApi.getProducts({
   *   page: 1,
   *   limit: 10,
   *   search: 'iPhone'
   * });
   * ```
   */
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Product>> => {
    await delay(500); // Simulate network delay

    let filteredProducts = [...mockProducts];

    if (params?.search) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(params.search!.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(params.search!.toLowerCase()) ||
          product.brand.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProducts.length / limit),
    };
  },

  /**
   * Retrieves a single product by its ID
   * @param id - Product ID
   * @returns Promise containing the product data
   * @throws Error if product is not found
   * @example
   * ```typescript
   * const product = await productsApi.getProduct(1);
   * ```
   */
  getProduct: async (id: number): Promise<Product> => {
    await delay(300);
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },

  /**
   * Creates a new product
   * @param data - Product creation data
   * @returns Promise containing the created product with generated ID and timestamps
   * @example
   * ```typescript
   * const newProduct = await productsApi.createProduct({
   *   title: 'New Product',
   *   price: 99.99,
   *   // ... other fields
   * });
   * ```
   */
  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    await delay(500);
    const newProduct: Product = {
      ...data,
      id: Math.max(...mockProducts.map((p) => p.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  /**
   * Updates an existing product
   * @param data - Product update data including the product ID
   * @returns Promise containing the updated product
   * @throws Error if product is not found
   * @example
   * ```typescript
   * const updatedProduct = await productsApi.updateProduct({
   *   id: 1,
   *   title: 'Updated Product',
   *   price: 149.99
   * });
   * ```
   */
  updateProduct: async (data: UpdateProductRequest): Promise<Product> => {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === data.id);
    if (index === -1) {
      throw new Error("Product not found");
    }

    const { id, ...updateData } = data;
    const updatedProduct: Product = {
      ...mockProducts[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    } as Product;

    mockProducts[index] = updatedProduct;
    return updatedProduct;
  },

  /**
   * Deletes a product by its ID
   * @param id - Product ID to delete
   * @returns Promise that resolves when deletion is complete
   * @throws Error if product is not found
   * @example
   * ```typescript
   * await productsApi.deleteProduct(1);
   * ```
   */
  deleteProduct: async (id: number): Promise<void> => {
    await delay(300);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    mockProducts.splice(index, 1);
  },
};

// Users API
export const usersApi = {
  /**
   * Retrieves a paginated list of users with optional search and filtering
   * @param params - Optional parameters for pagination and search
   * @param params.page - Page number (default: 1)
   * @param params.limit - Number of items per page (default: 10)
   * @param params.search - Search term to filter users by name, email, or username
   * @returns Promise containing paginated user data
   * @example
   * ```typescript
   * const users = await usersApi.getUsers({
   *   page: 1,
   *   limit: 10,
   *   search: 'john'
   * });
   * ```
   */
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<User>> => {
    await delay(500);

    let filteredUsers = [...mockUsers];

    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm)
      );
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit),
    };
  },

  /**
   * Retrieves a single user by their ID
   * @param id - User ID
   * @returns Promise containing the user data
   * @throws Error if user is not found
   * @example
   * ```typescript
   * const user = await usersApi.getUser(1);
   * ```
   */
  getUser: async (id: number): Promise<User> => {
    await delay(300);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  /**
   * Creates a new user
   * @param data - User creation data
   * @returns Promise containing the created user with generated ID and timestamps
   * @example
   * ```typescript
   * const newUser = await usersApi.createUser({
   *   firstName: 'John',
   *   lastName: 'Doe',
   *   email: 'john@example.com',
   *   // ... other fields
   * });
   * ```
   */
  createUser: async (data: CreateUserRequest): Promise<User> => {
    await delay(500);
    const newUser: User = {
      ...data,
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  /**
   * Updates an existing user
   * @param data - User update data including the user ID
   * @returns Promise containing the updated user
   * @throws Error if user is not found
   * @example
   * ```typescript
   * const updatedUser = await usersApi.updateUser({
   *   id: 1,
   *   firstName: 'Jane',
   *   email: 'jane@example.com'
   * });
   * ```
   */
  updateUser: async (data: UpdateUserRequest): Promise<User> => {
    await delay(500);
    const index = mockUsers.findIndex((u) => u.id === data.id);
    if (index === -1) {
      throw new Error("User not found");
    }

    const { id, ...updateData } = data;
    const updatedUser: User = {
      ...mockUsers[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    } as User;

    mockUsers[index] = updatedUser;
    return updatedUser;
  },

  /**
   * Deletes a user by their ID
   * @param id - User ID to delete
   * @returns Promise that resolves when deletion is complete
   * @throws Error if user is not found
   * @example
   * ```typescript
   * await usersApi.deleteUser(1);
   * ```
   */
  deleteUser: async (id: number): Promise<void> => {
    await delay(300);
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    mockUsers.splice(index, 1);
  },
};

// export default apiClient;
