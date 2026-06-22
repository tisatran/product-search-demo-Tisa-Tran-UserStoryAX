export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
}

export const CATEGORIES: string[] = [
  'Laptops',
  'Accessories',
  'Audio',
  'Monitors',
  'Storage',
  'Networking',
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Stand', description: 'Adjustable aluminum stand for laptops, ergonomic design', category: 'Accessories' },
  { id: 2, name: 'Gaming Laptop', description: 'High performance laptop with RGB keyboard and 17-inch display', category: 'Laptops' },
  { id: 3, name: 'Laptop', description: 'Lightweight everyday laptop, 14-inch display, 8GB RAM', category: 'Laptops' },
  { id: 4, name: 'MacBook Pro', description: 'Apple laptop with M3 chip, 16-inch Retina display', category: 'Laptops' },
  { id: 5, name: 'MacBook Air', description: 'Thin and light Apple laptop, all-day battery life', category: 'Laptops' },
  { id: 6, name: 'Wireless Mouse', description: 'Bluetooth mouse with adjustable DPI and silent clicks', category: 'Accessories' },
  { id: 7, name: 'Mouse', description: 'Wireless Bluetooth mouse with ergonomic grip', category: 'Accessories' },
  { id: 8, name: 'Wireless Keyboard', description: 'Compact Bluetooth keyboard with backlit keys', category: 'Accessories' },
  { id: 9, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with hot-swappable switches', category: 'Accessories' },
  { id: 10, name: 'USB-C Hub', description: '7-in-1 USB-C hub with HDMI, SD card, and 4K-HDMI output', category: 'Accessories' },
  { id: 11, name: 'USB-C Cable', description: 'Braided USB-C to USB-C fast charging cable, 6ft', category: 'Accessories' },
  { id: 12, name: '4K Monitor', description: '27-inch 4K-HDMI monitor with HDR support', category: 'Monitors' },
  { id: 13, name: 'Curved Monitor', description: '34-inch curved ultrawide monitor for productivity', category: 'Monitors' },
  { id: 14, name: 'Monitor Arm', description: 'Dual monitor desk mount, fully adjustable arm', category: 'Accessories' },
  { id: 15, name: 'Wireless Earbuds', description: 'Noise-cancelling wireless earbuds with charging case', category: 'Audio' },
  { id: 16, name: 'Bluetooth Headphones', description: 'Over-ear wireless headphones with 30-hour battery', category: 'Audio' },
  { id: 17, name: 'Studio Headphones', description: 'Wired studio monitor headphones for audio production', category: 'Audio' },
  { id: 18, name: 'Bluetooth Speaker', description: 'Portable wireless speaker, waterproof, 12-hour playback', category: 'Audio' },
  { id: 19, name: 'External SSD', description: '1TB portable solid state drive, USB-C connection', category: 'Storage' },
  { id: 20, name: 'External Hard Drive', description: '4TB USB 3.0 external hard drive for backups', category: 'Storage' },
  { id: 21, name: 'USB Flash Drive', description: '128GB USB-C flash drive, compact and durable', category: 'Storage' },
  { id: 22, name: 'NAS Drive', description: 'Network attached storage, 2-bay, RAID support', category: 'Storage' },
  { id: 23, name: 'Wi-Fi Router', description: 'Dual-band wireless router with mesh networking support', category: 'Networking' },
  { id: 24, name: 'Mesh Router System', description: '3-pack mesh Wi-Fi system for whole-home coverage', category: 'Networking' },
  { id: 25, name: 'Ethernet Cable', description: 'Cat 6 ethernet cable, 25ft, gigabit speed', category: 'Networking' },
  { id: 26, name: 'Network Switch', description: '8-port gigabit ethernet switch, plug and play', category: 'Networking' },
  { id: 27, name: 'Webcam', description: '1080p webcam with built-in microphone and privacy cover', category: 'Accessories' },
  { id: 28, name: 'Ring Light', description: 'LED ring light for video calls and streaming', category: 'Accessories' },
  { id: 29, name: 'Laptop Sleeve', description: 'Padded protective sleeve for 13 to 15-inch laptops', category: 'Accessories' },
  { id: 30, name: 'Docking Station', description: 'USB-C docking station with dual 4K-HDMI output', category: 'Accessories' },
  { id: 31, name: "Men's Backpack", description: 'Water-resistant laptop backpack with USB charging port', category: 'Accessories' },
  { id: 32, name: 'Wireless Charger', description: '15W fast wireless charging pad, Qi compatible', category: 'Accessories' },
  { id: 33, name: 'Graphics Tablet', description: 'Drawing tablet with stylus, pressure sensitive', category: 'Accessories' },
  { id: 34, name: 'Portable Monitor', description: '15.6-inch USB-C portable monitor for laptops', category: 'Monitors' },
  { id: 35, name: 'Gaming Mouse Pad', description: 'Extended RGB mouse pad with non-slip base', category: 'Accessories' },
];
