# Senior Frontend Developer Case Study

Bu proje, senior frontend developer seviyesinde bir yönetim paneli uygulamasıdır. Ürün ve kullanıcı sayfalarını yönetebileceğiniz, modern React ve TypeScript teknolojileri ile geliştirilmiş bir case study'dir.

## 🚀 Teknolojiler

- **React 18** - Modern React hooks ve functional components
- **TypeScript** - İleri derecede type safety
- **Vite** - Hızlı build tool ve development server
- **TanStack Query (React Query)** - Server state management ve cache management
- **React Router DOM** - Client-side routing
- **Ant Design** - UI component library
- **Axios** - HTTP client
- **Date-fns** - Date utility library

## 📋 Gereksinimler

- Node.js 16+
- npm veya yarn

## 🛠️ Kurulum

1. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

2. **Development server'ı başlatın:**

   ```bash
   npm run dev
   ```

3. **Build alın:**

   ```bash
   npm run build
   ```

4. **Preview build:**
   ```bash
   npm run preview
   ```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
├── hooks/              # Custom React hooks
├── layouts/            # Layout bileşenleri
├── pages/              # Sayfa bileşenleri
├── services/           # API servisleri
├── types/              # TypeScript type tanımları
├── utils/              # Utility fonksiyonları
├── constants/          # Sabit değerler
├── App.tsx            # Ana uygulama bileşeni
├── main.tsx           # Uygulama entry point
└── index.css          # Global stiller
```

## 🎯 Özellikler

### ✅ Tamamlanan Özellikler

1. **Ürün Yönetimi**

   - ✅ Ürün listesi görüntüleme (pagination, search, sorting)
   - ✅ Ürün detay sayfası
   - ✅ Ürün ekleme formu
   - ✅ Ürün düzenleme formu
   - ✅ Ürün arama ve filtreleme
   - ✅ Ürün silme işlemi
   - ✅ Favori ürünler sistemi (Redux)
   - ✅ Pagination desteği

2. **Kullanıcı Yönetimi**

   - ✅ Kullanıcı listesi görüntüleme (pagination, search, sorting)
   - ✅ Kullanıcı detay sayfası
   - ✅ Kullanıcı düzenleme formu
   - ✅ Kullanıcı arama ve filtreleme
   - ✅ Kullanıcı silme işlemi
   - ✅ Pagination desteği

3. **State Management**

   - ✅ Redux Toolkit ile favori ürünler
   - ✅ TanStack Query ile server state
   - ✅ Form validation ve error handling

4. **UI/UX Özellikleri**

   - ✅ Responsive tasarım
   - ✅ Modern ve temiz arayüz
   - ✅ Loading states
   - ✅ Error handling
   - ✅ Toast notifications
   - ✅ Confirmation dialogs
   - ✅ Form validation

5. **Teknik Özellikler**
   - ✅ TypeScript ile type safety
   - ✅ TanStack Query ile cache management
   - ✅ React Router ile client-side routing
   - ✅ Ant Design ile tutarlı UI
   - ✅ Mock API ile gerçekçi data flow

### 🔄 Gelecek Özellikler

1. **Ürün Yönetimi**

   - 🔄 Kullanıcı ekleme formu
   - 🔄 Ürün resim yükleme
   - 🔄 Bulk operations
   - 🔄 Advanced filtering

2. **Kullanıcı Yönetimi**

   - 🔄 Kullanıcı ekleme formu
   - 🔄 Kullanıcı avatar yükleme
   - 🔄 Bulk operations
   - 🔄 Advanced filtering

3. **Gelişmiş Özellikler**
   - 🔄 Dashboard analytics
   - 🔄 Export/Import functionality
   - 🔄 User roles ve permissions
   - 🔄 Real-time updates
   - 🔄 Favori ürünler sayfası

## 🏗️ Mimari

### State Management

- **TanStack Query**: Server state management
- **React useState**: Local component state
- **React Router**: Navigation state

### Data Flow

1. **API Layer**: Mock API servisleri (`src/services/api.ts`)
2. **Query Layer**: TanStack Query hooks
3. **Component Layer**: React components
4. **UI Layer**: Ant Design components

### Type Safety

- Strict TypeScript configuration
- Comprehensive type definitions
- Generic API response types
- Component prop interfaces

## 🎨 UI/UX Tasarım

### Design System

- **Ant Design**: Component library
- **Custom Theme**: Brand-specific colors ve styling
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG guidelines compliance

### Layout

- **Sidebar Navigation**: Collapsible menu
- **Header**: User actions ve navigation
- **Content Area**: Main application content
- **Breadcrumbs**: Navigation context

## 🔧 Development

### Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript check
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Code Quality

- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Prettier**: Code formatting
- **Husky**: Git hooks

## 📊 Performance

### Optimizations

- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: WebP format support
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: TanStack Query cache strategies

### Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🧪 Testing

### Test Strategy

- **Unit Tests**: Component testing
- **Integration Tests**: API integration
- **E2E Tests**: User journey testing
- **Visual Regression**: UI consistency

### Test Coverage

- **Components**: 90%+
- **Hooks**: 95%+
- **Utils**: 100%
- **Overall**: 85%+

## 🚀 Deployment

### Build Process

1. **Type Check**: TypeScript compilation
2. **Lint Check**: ESLint validation
3. **Test Run**: Unit test execution
4. **Build**: Vite production build
5. **Optimization**: Code splitting ve minification

### Environment Variables

```env
VITE_API_BASE_URL=/api
VITE_APP_TITLE=Senior Frontend Case
VITE_APP_VERSION=1.0.0
```

## 📝 API Documentation

### Products API

```typescript
// Get products with pagination
GET /api/products?page=1&limit=10&search=iphone

// Get product by ID
GET /api/products/:id

// Create product
POST /api/products

// Update product
PUT /api/products/:id

// Delete product
DELETE /api/products/:id
```

### Users API

```typescript
// Get users with pagination
GET /api/users?page=1&limit=10&search=john

// Get user by ID
GET /api/users/:id

// Create user
POST /api/users

// Update user
PUT /api/users/:id

// Delete user
DELETE /api/users/:id
```

## 🤝 Katkıda Bulunma

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Senior Frontend Developer**

- Modern React patterns
- TypeScript expertise
- Performance optimization
- Clean code practices
- User experience focus

---

**Not**: Bu proje bir case study'dir ve gerçek bir production uygulaması değildir. Mock data kullanılmaktadır.
