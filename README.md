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
├── layouts/            # Layout bileşenleri
├── pages/              # Sayfa bileşenleri
├── services/           # API servisleri
├── store/              # Redux store
├── types/              # TypeScript type tanımları
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
