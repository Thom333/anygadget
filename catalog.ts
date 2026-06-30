src/lib/catalog.ts
// Mock catalog data — replaced by Lovable Cloud in a later turn.
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: number;
  description: string;
  specs: Record<string, string>;
};
export type Category = {
  slug: string;
  name: string;
  icon: string;
  subcategories: string[];
};
export const categories: Category[] = [
  { slug: "phones", name: "Phones", icon: "Smartphone", subcategories: ["Apple", "Samsung", "Google", "Tecno", "Infinix", "Xiaomi", "OnePlus", "Nokia"] },
  { slug: "computers", name: "Computers", icon: "Laptop", subcategories: ["Laptops", "Desktop PCs", "Gaming PCs"] },
  { slug: "audio", name: "Audio", icon: "Headphones", subcategories: ["AirPods", "Earbuds", "Speakers", "Headsets"] },
  { slug: "wearables", name: "Wearables", icon: "Watch", subcategories: ["Smart Watches", "Fitness Bands"] },
  { slug: "gaming", name: "Gaming", icon: "Gamepad2", subcategories: ["PlayStation", "Xbox", "Nintendo"] },
  { slug: "accessories", name: "Accessories", icon: "Cable", subcategories: ["Cases", "Chargers", "Power Banks", "USB Cables"] },
  { slug: "smart-home", name: "Smart Home", icon: "Home", subcategories: ["Speakers", "Lighting", "Security"] },
  { slug: "tablets", name: "Tablets", icon: "Tablet", subcategories: ["iPad", "Galaxy Tab", "Lenovo"] },
];
const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=600&q=70`;
export const products: Product[] = [
  {
    id: "iphone-15-pro-max",
    name: "Apple iPhone 15 Pro Max 256GB — Titanium Blue",
    brand: "Apple",
    category: "phones",
    price: 1299,
    oldPrice: 1499,
    rating: 4.8,
    reviews: 2418,
    image: img("photo-1592750475338-74b7b21085ab"),
    badge: "Best Seller",
    inStock: 24,
    description:
      "The iPhone 15 Pro Max features a titanium design, A17 Pro chip, and a 48MP main camera with 5x telephoto zoom.",
    specs: { Display: "6.7\" Super Retina XDR", Chip: "A17 Pro", Storage: "256GB", RAM: "8GB", Camera: "48MP + 12MP + 12MP", Battery: "4422 mAh", OS: "iOS 17" },
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 512GB — Titanium Black",
    brand: "Samsung",
    category: "phones",
    price: 1199,
    oldPrice: 1399,
    rating: 4.7,
    reviews: 1832,
    image: img("photo-1610945265064-0e34e5519bbf"),
    badge: "-14%",
    inStock: 18,
    description: "Galaxy AI built-in. 200MP camera. Snapdragon 8 Gen 3 for Galaxy.",
    specs: { Display: "6.8\" QHD+ Dynamic AMOLED 2X", Chip: "Snapdragon 8 Gen 3", Storage: "512GB", RAM: "12GB", Camera: "200MP main", Battery: "5000 mAh", OS: "Android 14, One UI 6.1" },
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro 256GB — Obsidian",
    brand: "Google",
    category: "phones",
    price: 899,
    oldPrice: 999,
    rating: 4.6,
    reviews: 942,
    image: img("photo-1598327105666-5b89351aff97"),
    inStock: 31,
    description: "Tensor G3, Magic Editor, and the best Pixel camera ever.",
    specs: { Display: "6.7\" LTPO OLED", Chip: "Tensor G3", Storage: "256GB", RAM: "12GB", Battery: "5050 mAh", OS: "Android 14" },
  },
  {
    id: "tecno-camon-30",
    name: "Tecno Camon 30 Pro 5G 256GB",
    brand: "Tecno",
    category: "phones",
    price: 349,
    oldPrice: 429,
    rating: 4.4,
    reviews: 612,
    image: img("photo-1567581935884-3349723552ca"),
    badge: "-19%",
    inStock: 56,
    description: "50MP Sony LYT-600 main camera, AMOLED 120Hz display.",
    specs: { Display: "6.78\" AMOLED 120Hz", Chip: "Dimensity 8200", Storage: "256GB", RAM: "12GB", Battery: "5000 mAh" },
  },
  {
    id: "infinix-zero-30",
    name: "Infinix Zero 30 5G 256GB",
    brand: "Infinix",
    category: "phones",
    price: 299,
    rating: 4.3,
    reviews: 421,
    image: img("photo-1511707171634-5f897ff02aa9"),
    inStock: 42,
    description: "4K vlog camera, AMOLED 144Hz display, premium leather finish.",
    specs: { Display: "6.78\" AMOLED 144Hz", Chip: "Dimensity 8020", Storage: "256GB", RAM: "12GB", Battery: "5000 mAh" },
  },
  {
    id: "xiaomi-14-pro",
    name: "Xiaomi 14 Pro 512GB — Black",
    brand: "Xiaomi",
    category: "phones",
    price: 999,
    rating: 4.6,
    reviews: 533,
    image: img("photo-1580910051074-3eb694886505"),
    inStock: 15,
    description: "Leica optics, Snapdragon 8 Gen 3, 120W HyperCharge.",
    specs: { Display: "6.73\" LTPO AMOLED", Chip: "Snapdragon 8 Gen 3", Storage: "512GB", RAM: "12GB", Battery: "4880 mAh" },
  },
  {
    id: "macbook-pro-14",
    name: "Apple MacBook Pro 14\" M3 Pro 18GB/512GB",
    brand: "Apple",
    category: "computers",
    price: 1999,
    oldPrice: 2199,
    rating: 4.9,
    reviews: 1102,
    image: img("photo-1517336714731-489689fd1ca8"),
    badge: "Top Rated",
    inStock: 12,
    description: "M3 Pro chip, Liquid Retina XDR display, up to 18 hours battery.",
    specs: { Display: "14.2\" Liquid Retina XDR", Chip: "Apple M3 Pro", RAM: "18GB", Storage: "512GB SSD", OS: "macOS Sonoma" },
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 9530 — Intel i7, 32GB, 1TB, RTX 4060",
    brand: "Dell",
    category: "computers",
    price: 2299,
    oldPrice: 2599,
    rating: 4.6,
    reviews: 487,
    image: img("photo-1593642632559-0c6d3fc62b89"),
    inStock: 8,
    description: "15.6\" OLED creator laptop with RTX 4060 graphics.",
    specs: { Display: "15.6\" 3.5K OLED", CPU: "Intel Core i7-13700H", GPU: "RTX 4060 8GB", RAM: "32GB DDR5", Storage: "1TB NVMe" },
  },
  {
    id: "airpods-pro-2",
    name: "Apple AirPods Pro (2nd Gen) USB-C",
    brand: "Apple",
    category: "audio",
    price: 229,
    oldPrice: 249,
    rating: 4.8,
    reviews: 5821,
    image: img("photo-1606220588913-b3aacb4d2f46"),
    badge: "Hot Deal",
    inStock: 120,
    description: "Active Noise Cancellation, Adaptive Audio, MagSafe charging case.",
    specs: { Connectivity: "Bluetooth 5.3", ANC: "Yes", Case: "USB-C MagSafe", Battery: "Up to 30 hrs with case" },
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    category: "audio",
    price: 349,
    oldPrice: 399,
    rating: 4.7,
    reviews: 3210,
    image: img("photo-1583394838336-acd977736f90"),
    inStock: 45,
    description: "Industry-leading noise cancellation, 30-hour battery, Hi-Res Audio.",
    specs: { Drivers: "30mm", ANC: "Yes", Battery: "30 hrs", Connectivity: "Bluetooth 5.2, NFC" },
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 49mm — Titanium",
    brand: "Apple",
    category: "wearables",
    price: 799,
    rating: 4.8,
    reviews: 612,
    image: img("photo-1546868871-7041f2a55e12"),
    inStock: 20,
    description: "Most rugged Apple Watch. 3000-nit display, 36-hour battery.",
    specs: { Display: "49mm Always-On Retina", Battery: "36 hrs", Water: "100m", GPS: "Dual-frequency" },
  },
  {
    id: "ps5-slim",
    name: "Sony PlayStation 5 Slim — Disc Edition",
    brand: "Sony",
    category: "gaming",
    price: 499,
    rating: 4.9,
    reviews: 8912,
    image: img("photo-1606144042614-b2417e99c4e3"),
    badge: "Trending",
    inStock: 33,
    description: "Slimmer design, 1TB SSD, 4K gaming with ray tracing.",
    specs: { CPU: "AMD Zen 2 8-core", GPU: "RDNA 2 10.28 TFLOPs", Storage: "1TB SSD", Resolution: "Up to 8K" },
  },
];
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getByCategory = (slug: string) => products.filter((p) => p.category === slug);
