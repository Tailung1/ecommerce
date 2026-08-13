import { apiClient } from "../../api/client.api";

export default async function getCategories() {
  return apiClient("/categories", { method: "GET" });
}

export const defaultCategoriesData = [
  {
    id: 1,
    name: "Smartphones",
    slug: "smartphones",
    children: [
      { id: 2, name: "iPhone", slug: "iphone" },
      { id: 3, name: "Samsung", slug: "samsung" },
      { id: 4, name: "Xiaomi", slug: "xiaomi" },
      { id: 5, name: "Google Pixel", slug: "google-pixel" },
    ],
  },
  {
    id: 6,
    name: "Computers",
    slug: "computers",
    children: [
      { id: 7, name: "Laptops", slug: "laptops" },
      { id: 8, name: "Desktop PCs", slug: "desktop-pcs" },
      { id: 9, name: "Monitors", slug: "monitors" },
      { id: 10, name: "PC Components", slug: "pc-components" },
    ],
  },
  {
    id: 11,
    name: "TV & Audio",
    slug: "tv-audio",
    children: [
      { id: 12, name: "Televisions", slug: "televisions" },
      { id: 13, name: "Headphones", slug: "headphones" },
      { id: 14, name: "Speakers", slug: "speakers" },
      { id: 15, name: "Soundbars", slug: "soundbars" },
    ],
  },
  {
    id: 16,
    name: "Gaming",
    slug: "gaming",
    children: [
      { id: 17, name: "Gaming Consoles", slug: "gaming-consoles" },
      { id: 18, name: "Gaming Accessories", slug: "gaming-accessories" },
      { id: 19, name: "Gaming Chairs", slug: "gaming-chairs" },
    ],
  },
  {
    id: 20,
    name: "Smart Devices",
    slug: "smart-devices",
    children: [
      { id: 21, name: "Smart Watches", slug: "smart-watches" },
      { id: 22, name: "Smart Home", slug: "smart-home" },
      { id: 23, name: "Cameras", slug: "cameras" },
    ],
  },
  {
    id: 24,
    name: "Accessories",
    slug: "accessories",
    children: [
      { id: 25, name: "Chargers", slug: "chargers" },
      { id: 26, name: "Cables", slug: "cables" },
      { id: 27, name: "Power Banks", slug: "power-banks" },
      { id: 28, name: "Cases & Covers", slug: "cases-covers" },
    ],
  },
];
