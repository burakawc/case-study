/**
 * Application constants and dummy data
 */

// Product dummy data for autofill
export const PRODUCT_DUMMY_DATA = {
  title: "Samsung Galaxy S24 Ultra",
  description:
    "En yeni Samsung Galaxy serisi, S Pen desteği ile gelişmiş kamera sistemi ve uzun pil ömrü sunar. 200MP ana kamera, 5x optik zoom ve 8K video kayıt özelliği ile profesyonel fotoğrafçılık deneyimi.",
  price: 12999,
  discountPercentage: 15,
  rating: 4.8,
  stock: 45,
  brand: "Samsung",
  category: "smartphones",
  thumbnail:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8b3b3a2a1f83?w=800&h=600&fit=crop",
  ],
};

// User dummy data for autofill
export const USER_DUMMY_DATA = {
  // Personal Information
  firstName: "Mehmet",
  lastName: "Özkan",
  maidenName: "Yıldız",
  age: 32,
  gender: "male" as const,
  email: "mehmet.ozkan@example.com",
  phone: "+90 532 456 7890",
  username: "mehmetozkan",
  password: "Güvenli123!",
  birthDate: "1992-06-15",
  image: "https://robohash.org/MehmetOzkan.png?set=set4",
  bloodGroup: "B+",
  height: 182,
  weight: 78,
  eyeColor: "Kahverengi",
  hairColor: "Siyah",
  hairType: "Düz",

  // Address Information
  addressAddress: "Kadıköy Mahallesi, Moda Caddesi No: 45, Daire: 8",
  addressCity: "İstanbul",
  addressState: "İstanbul",
  addressPostalCode: "34710",
  addressLat: 40.9909,
  addressLng: 29.0303,

  // Company Information
  companyName: "Teknoloji Çözümleri A.Ş.",
  companyTitle: "Senior Full Stack Developer",
  companyDepartment: "Yazılım Geliştirme",
  companyAddressAddress: "Beşiktaş Mahallesi, Barbaros Bulvarı No: 123, Kat: 5",
  companyAddressCity: "İstanbul",
  companyAddressState: "İstanbul",
  companyAddressPostalCode: "34353",
  companyAddressLat: 41.0422,
  companyAddressLng: 29.0083,

  // Bank Information
  bankCardType: "mastercard",
  bankCardNumber: "5555555555554444",
  bankCardExpire: "12/26",
  bankCurrency: "TL",
  bankIban: "TR33 0001 0002 3456 7890 1234 59",

  // Additional Information
  domain: "example.com",
  ip: "192.168.1.100",
  macAddress: "00:1B:44:11:3A:B7",
  university: "İstanbul Teknik Üniversitesi",
  ein: "12-3456789",
  ssn: "123-45-6789",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

// Product categories
export const PRODUCT_CATEGORIES = [
  { value: "smartphones", label: "Akıllı Telefonlar" },
  { value: "laptops", label: "Dizüstü Bilgisayarlar" },
  { value: "tablets", label: "Tabletler" },
  { value: "accessories", label: "Aksesuarlar" },
  { value: "wearables", label: "Giyilebilir Teknolojiler" },
  { value: "audio", label: "Ses Sistemleri" },
  { value: "cameras", label: "Kamera ve Fotoğraf" },
  { value: "gaming", label: "Oyun ve Eğlence" },
];

// Product brands
export const PRODUCT_BRANDS = [
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
  { value: "Google", label: "Google" },
  { value: "Xiaomi", label: "Xiaomi" },
  { value: "Huawei", label: "Huawei" },
  { value: "OnePlus", label: "OnePlus" },
  { value: "Sony", label: "Sony" },
  { value: "LG", label: "LG" },
  { value: "Asus", label: "Asus" },
  { value: "Lenovo", label: "Lenovo" },
];

// User blood groups
export const BLOOD_GROUPS = [
  { value: "A+", label: "A Rh+" },
  { value: "A-", label: "A Rh-" },
  { value: "B+", label: "B Rh+" },
  { value: "B-", label: "B Rh-" },
  { value: "AB+", label: "AB Rh+" },
  { value: "AB-", label: "AB Rh-" },
  { value: "O+", label: "O Rh+" },
  { value: "O-", label: "O Rh-" },
];

// User genders
export const USER_GENDERS = [
  { value: "male", label: "Erkek" },
  { value: "female", label: "Kadın" },
  { value: "other", label: "Diğer" },
];

// Hair colors
export const HAIR_COLORS = [
  { value: "Siyah", label: "Siyah" },
  { value: "Kahverengi", label: "Kahverengi" },
  { value: "Sarı", label: "Sarı" },
  { value: "Kızıl", label: "Kızıl" },
  { value: "Gri", label: "Gri" },
  { value: "Beyaz", label: "Beyaz" },
];

// Hair types
export const HAIR_TYPES = [
  { value: "Düz", label: "Düz" },
  { value: "Dalgalı", label: "Dalgalı" },
  { value: "Kıvırcık", label: "Kıvırcık" },
  { value: "Kısa", label: "Kısa" },
  { value: "Uzun", label: "Uzun" },
];

// Bank card types
export const CARD_TYPES = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "maestro", label: "Maestro" },
  { value: "amex", label: "American Express" },
];

// Currencies
export const CURRENCIES = [
  { value: "TL", label: "Türk Lirası (TL)" },
  { value: "USD", label: "Amerikan Doları (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "İngiliz Sterlini (GBP)" },
];
