

import { Product, FilterOption } from './types/index';

export const PRODUCTS: Product[] = [
  { id: 1, name: "Premium Wireless Headphones", price: 299, category: "Audio", image: "https://picsum.photos/seed/audio1/600/600", rating: 4.8 },
  { id: 2, name: "Minimalist Mechanical Keyboard", price: 159, category: "PC Gaming", image: "https://picsum.photos/seed/kb1/600/600", rating: 4.9 },
  { id: 3, name: "4K OLED Designer Monitor", price: 899, category: "Workspace", image: "https://picsum.photos/seed/mon1/600/600", rating: 4.7 },
  { id: 4, name: "Ergonomic Mesh Chair", price: 450, category: "Furniture", image: "https://picsum.photos/seed/chair1/600/600", rating: 4.6 },
  { id: 5, name: "Studio Quality Microphone", price: 199, category: "Audio", image: "https://picsum.photos/seed/mic1/600/600", rating: 4.5 },
  { id: 6, name: "Smart Ambient Lighting Kit", price: 120, category: "Home", image: "https://picsum.photos/seed/light1/600/600", rating: 4.8 },
  { id: 7, name: "Ultra-Fast NVMe SSD 2TB", price: 210, category: "Storage", image: "https://picsum.photos/seed/ssd1/600/600", rating: 4.9 },
  { id: 8, name: "Leather Desk Mat Pro", price: 65, category: "Workspace", image: "https://picsum.photos/seed/mat1/600/600", rating: 4.4 },
];

export const MAIN_FILTERS: FilterOption[] = [
  { label: "All Products", value: "all" },
  { label: "Audio", value: "audio" },
  { label: "Workspace", value: "workspace" },
  { label: "PC Gaming", value: "pc-gaming" },
];

export const MORE_FILTERS: FilterOption[] = [
  { label: "Furniture", value: "furniture" },
  { label: "Storage", value: "storage" },
  { label: "Home Tech", value: "home" },
  { label: "Photography", value: "photo" },
  { label: "Video Gears", value: "video" },
  { label: "Peripherals", value: "peripherals" },
];