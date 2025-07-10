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
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA3QUZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgOTwvdGV4dD48L3N2Zz4=",
    images: [
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA3QUZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgOSAtIDE8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA3QUZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgOSAtIDI8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA3QUZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgOSAtIDM8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA3QUZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgOSAtIDQ8L3RleHQ+PC9zdmc+",
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
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzRDNzU5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgWDwvdGV4dD48L3N2Zz4=",
    images: [
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzRDNzU5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgWCAtIDE8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzRDNzU5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgWCAtIDI8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzRDNzU5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgWCAtIDM8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzRDNzU5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5pUGhvbmUgWCAtIDQ8L3RleHQ+PC9zdmc+",
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
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTQyOEEwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TYW1zdW5nIDk8L3RleHQ+PC9zdmc+",
    images: [
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTQyOEEwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TYW1zdW5nIDkgLSAxPC90ZXh0Pjwvc3ZnPg==",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTQyOEEwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TYW1zdW5nIDkgLSAyPC90ZXh0Pjwvc3ZnPg==",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTQyOEEwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TYW1zdW5nIDkgLSAzPC90ZXh0Pjwvc3ZnPg==",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTQyOEEwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TYW1zdW5nIDkgLSA0PC90ZXh0Pjwvc3ZnPg==",
    ],
    createdAt: "2023-01-03T00:00:00.000Z",
    updatedAt: "2023-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    title: "MacBook Pro",
    description: "Apple M1 Pro chip ile güçlendirilmiş profesyonel laptop",
    price: 1999,
    discountPercentage: 10.5,
    rating: 4.8,
    stock: 25,
    brand: "Apple",
    category: "laptops",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY5NTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYWNCb29rIFBybzwvdGV4dD48L3N2Zz4=",
    images: [
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY5NTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYWNCb29rIFBybyAtIDE8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY5NTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYWNCb29rIFBybyAtIDI8L3RleHQ+PC9zdmc+",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY5NTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYWNCb29rIFBybyAtIDM8L3RleHQ+PC9zdmc+",
    ],
    createdAt: "2023-01-04T00:00:00.000Z",
    updatedAt: "2023-01-04T00:00:00.000Z",
  },
  {
    id: 5,
    title: "Samsung Galaxy Tab S8",
    description: "Android tablet'in en iyi örneği, S Pen desteği ile",
    price: 799,
    discountPercentage: 8.2,
    rating: 4.6,
    stock: 42,
    brand: "Samsung",
    category: "tablets",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkYzQjMwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYWxheHkgVGFiPC90ZXh0Pjwvc3ZnPg==",
    images: [
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkYzQjMwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYWxheHkgVGFiIC0gMTwvdGV4dD48L3N2Zz4=",
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkYzQjMwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYWxheHkgVGFiIC0gMjwvdGV4dD48L3N2Zz4=",
    ],
    createdAt: "2023-01-05T00:00:00.000Z",
    updatedAt: "2023-01-05T00:00:00.000Z",
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
