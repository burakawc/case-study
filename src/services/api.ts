import type {
  Product,
  User,
  CreateProductRequest,
  UpdateProductRequest,
  CreateUserRequest,
  UpdateUserRequest,
  PaginatedResponse,
} from "@/types";

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 9",
    description: "Elma gibi olmayan bir elma mobil telefon",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
    ],
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5 inç Super Retina HD ekran, OLED teknolojisi, A12 Bionic çip ile...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/2/1.jpg",
      "https://i.dummyjson.com/data/products/2/2.jpg",
      "https://i.dummyjson.com/data/products/2/3.jpg",
      "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    ],
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description: "Galaxy'yi aşarak Evren'e giden Samsung'un yeni varyantı",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
    createdAt: "2023-01-03T00:00:00.000Z",
    updatedAt: "2023-01-03T00:00:00.000Z",
  },
];

const mockUsers: User[] = [
  {
    id: 1,
    firstName: "Ahmet",
    lastName: "Yılmaz",
    maidenName: "Kaya",
    age: 50,
    gender: "male",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 532 123 4567",
    username: "ahmetyilmaz",
    password: "9uQFF1Lh",
    birthDate: "2000-12-25",
    image: "https://robohash.org/Ahmet.png?set=set4",
    bloodGroup: "A-",
    height: 189,
    weight: 75.4,
    eyeColor: "Kahverengi",
    hair: {
      color: "Siyah",
      type: "Düz",
    },
    domain: "example.com",
    ip: "117.29.86.254",
    address: {
      address: "Atatürk Caddesi No: 123",
      city: "İstanbul",
      coordinates: {
        lat: 41.0082,
        lng: 28.9784,
      },
      postalCode: "34000",
      state: "İstanbul",
    },
    macAddress: "13:69:BA:56:A3:74",
    university: "İstanbul Teknik Üniversitesi",
    bank: {
      cardExpire: "06/22",
      cardNumber: "50380955204220685",
      cardType: "maestro",
      currency: "TL",
      iban: "TR33 0001 0002 3456 7890 1234 56",
    },
    company: {
      address: {
        address: "Levent Mahallesi, Büyükdere Caddesi No: 45",
        city: "İstanbul",
        coordinates: {
          lat: 41.0782,
          lng: 29.0174,
        },
        postalCode: "34330",
        state: "İstanbul",
      },
      department: "Pazarlama",
      name: "Teknoloji A.Ş.",
      title: "Yazılım Geliştirici",
    },
    ein: "20-9487066",
    ssn: "661-64-2976",
    userAgent:
      "Mozilla/5.0 (Windows NT 6.1 WOW64) AppleWebKit/534.54 (KHTML, like Gecko) Chrome/12.0.902.0 Safari/534.54",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    firstName: "Ayşe",
    lastName: "Demir",
    maidenName: "Özkan",
    age: 28,
    gender: "female",
    email: "ayse.demir@example.com",
    phone: "+90 533 987 6543",
    username: "aysedemir",
    password: "CQutx25i8r",
    birthDate: "2003-08-02",
    image: "https://robohash.org/Ayse.png?set=set4",
    bloodGroup: "O+",
    height: 165,
    weight: 58,
    eyeColor: "Kahverengi",
    hair: {
      color: "Kahverengi",
      type: "Dalgalı",
    },
    domain: "example.com",
    ip: "253.240.20.181",
    address: {
      address: "Kızılay Meydanı No: 15",
      city: "Ankara",
      coordinates: {
        lat: 39.9334,
        lng: 32.8597,
      },
      postalCode: "06420",
      state: "Ankara",
    },
    macAddress: "13:F1:C2:37:24:FD",
    university: "Orta Doğu Teknik Üniversitesi",
    bank: {
      cardExpire: "10/23",
      cardNumber: "5355920631952404",
      cardType: "mastercard",
      currency: "TL",
      iban: "TR33 0001 0002 3456 7890 1234 57",
    },
    company: {
      address: {
        address: "Çankaya Mahallesi, Atatürk Bulvarı No: 78",
        city: "Ankara",
        coordinates: {
          lat: 39.9208,
          lng: 32.8541,
        },
        postalCode: "06690",
        state: "Ankara",
      },
      department: "İnsan Kaynakları",
      name: "Danışmanlık Ltd. Şti.",
      title: "İnsan Kaynakları Uzmanı",
    },
    ein: "52-5262907",
    ssn: "447-08-9217",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.3 Safari/534.24",
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
  },
];

// API Client - Currently using mock data, axios client available for future use
// const apiClient = axios.create({
//   baseURL: "/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Products API
export const productsApi = {
  // Get all products with pagination
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

  // Get product by ID
  getProduct: async (id: number): Promise<Product> => {
    await delay(300);
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },

  // Create product
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

  // Update product
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

  // Delete product
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
  // Get all users with pagination
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<User>> => {
    await delay(500);

    let filteredUsers = [...mockUsers];

    if (params?.search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(params.search!.toLowerCase()) ||
          user.lastName.toLowerCase().includes(params.search!.toLowerCase()) ||
          user.email.toLowerCase().includes(params.search!.toLowerCase()) ||
          user.username.toLowerCase().includes(params.search!.toLowerCase())
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

  // Get user by ID
  getUser: async (id: number): Promise<User> => {
    await delay(300);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  // Create user
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

  // Update user
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

  // Delete user
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
