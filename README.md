# Buavci CMS

Modern React ve TypeScript teknolojileri ile geliştirilmiş, ürün ve kullanıcı yönetimi için tasarlanmış bir yönetim paneli uygulamasıdır.

## 🚀 Teknolojiler

- **React 18** - Modern React hooks ve functional components
- **TypeScript** - İleri derecede type safety
- **Vite** - Hızlı build tool ve development server
- **TanStack Query (React Query)** - Server state management ve cache management
- **Redux Toolkit** - State management
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
├── components/         # Yeniden kullanılabilir bileşenler
│   ├── ActionButtons.tsx
│   ├── AutoFillButton.tsx
│   ├── SearchBar.tsx
│   ├── cards/         # Kart bileşenleri
│   │   ├── DataCard.tsx
│   │   ├── ErrorCard.tsx
│   │   ├── LoadingCard.tsx
│   │   └── __tests__/ # Test dosyaları
│   │       ├── DataCard.test.tsx
│   │       └── __snapshots__/
│   │           └── DataCard.test.tsx.snap
│   └── layout/        # Layout bileşenleri
│       ├── DetailLayout.tsx
│       └── PageHeader.tsx
├── constants/         # Sabit değerler
│   └── index.ts
├── layouts/           # Ana layout bileşenleri
│   └── MainLayout.tsx
├── routes/            # Sayfa bileşenleri
│   ├── dashboard.tsx
│   ├── not-found.tsx
│   ├── products/      # Ürün sayfaları
│   │   ├── add.tsx
│   │   ├── detail.tsx
│   │   ├── edit.tsx
│   │   ├── index.tsx
│   │   └── list.tsx
│   └── users/         # Kullanıcı sayfaları
│       ├── add.tsx
│       ├── detail.tsx
│       ├── edit.tsx
│       ├── index.tsx
│       └── list.tsx
├── services/          # API servisleri
│   └── api.ts
├── store/             # Redux store
│   ├── favoritesSlice.ts
│   └── index.ts
├── test/              # Test setup
│   └── setup.ts
├── types/             # TypeScript type tanımları
│   └── index.ts
├── utils/             # Yardımcı fonksiyonlar
│   ├── debounce.ts
│   └── LoadingSpinner.tsx
├── App.tsx           # Ana uygulama bileşeni
├── main.tsx          # Uygulama entry point
└── index.css         # Global stiller
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

   - ✅ TanStack Query ile server state
   - ✅ Redux Toolkit ile favori ürünler
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

## 🏗️ Mimari

### State Management

- **TanStack Query**: Server state management
- **Redux Toolkit**: Global state management (favorites)
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

### Layout

- **Sidebar Navigation**: Collapsible menu
- **Header**: User actions ve navigation
- **Content Area**: Main application content
- **Breadcrumbs**: Navigation context

## 🧪 Test

Bu proje **Vitest** ve **React Testing Library** kullanarak unit testler içermektedir.

### Test Teknolojileri

- **Vitest** - Hızlı unit test framework
- **React Testing Library** - React component testing
- **@testing-library/jest-dom** - DOM testing utilities
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - Browser environment simulation

### Test Dosyaları

```
src/
├── components/
│   └── cards/
│       └── __tests__/
│           ├── DataCard.test.tsx    # DataCard component testleri
│           └── __snapshots__/
│               └── DataCard.test.tsx.snap
└── test/
    └── setup.ts                     # Test setup ve mock'lar
```

### Test Komutları

```bash
# Tüm testleri çalıştır
npm test

# Watch mode'da testleri çalıştır
npm run test:watch

# Testleri bir kez çalıştır (watch olmadan)
npm run test:run

# Verbose output ile testleri çalıştır
npm run test:snapshot

# Coverage raporu oluştur
npm run test:coverage

# HTML coverage raporu oluştur
npm run test:coverage:html

# JSON coverage raporu oluştur
npm run test:coverage:json

# Vitest UI'ı aç
npm run test:ui
```

### Test Kapsamı

#### DataCard Component Testleri

- ✅ **Product Card Rendering**: Ürün bilgilerinin doğru gösterilmesi
- ✅ **User Card Rendering**: Kullanıcı bilgilerinin doğru gösterilmesi
- ✅ **Action Buttons**: View, Edit, Delete, Favorite butonları
- ✅ **Edge Cases**: Boş data, eksik prop'lar
- ✅ **Snapshot Tests**: Visual regression testing
- ✅ **Rating Logic**: Farklı rating değerleri için renk kontrolü
- ✅ **Description Truncation**: Uzun açıklamaların kısaltılması
- ✅ **Gender Styling**: Cinsiyet bazlı renk stilleri

### Test Yapısı

```typescript
// Örnek test yapısı
describe("DataCard", () => {
  describe("Product Card", () => {
    it("should render product card correctly", () => {
      // Test implementation
    });
  });

  describe("User Card", () => {
    it("should render user card correctly", () => {
      // Test implementation
    });
  });
});
```

### Mock'lar

- **ActionButtons Component**: Isolated testing için mock'landı
- **Ant Design Components**: Browser compatibility için mock'landı
- **Browser APIs**: matchMedia, ResizeObserver mock'landı

### Snapshot Testing

Snapshot'lar otomatik olarak oluşturulur ve `__snapshots__` klasöründe saklanır. Component değişiklikleri intentional olduğunda snapshot'ları güncelle:

```bash
npm run test:run -- --update-snapshots
```

### Test Best Practices

1. **Isolation**: Her test bağımsız ve diğer testlere bağımlı değil
2. **Descriptive Names**: Test isimleri ne test edildiğini açıkça belirtiyor
3. **Mocking**: External dependencies düzgün mock'lanıyor
4. **Coverage**: Hem happy path hem edge case'ler test ediliyor
5. **Accessibility**: Semantic queries kullanılıyor (getByText, getByTestId)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Burak Avcı**

- Modern React patterns
- TypeScript expertise
- Clean code practices
- User experience focus

---

**Not**: Bu proje mock data kullanmaktadır.
