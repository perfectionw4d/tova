import { paintings as initialPaintings, categories as initialCategories } from './data';
import * as fs from 'fs';
import * as path from 'path';

// Data file paths
const dataDir = path.join(process.cwd(), 'data');
const paintingsFilePath = path.join(dataDir, 'paintings.json');
const categoriesFilePath = path.join(dataDir, 'categories.json');
const ordersFilePath = path.join(dataDir, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Server-side storage (loads from files)
let serverPaintings = initialPaintings;
let serverCategories = initialCategories;

// Load paintings from file
function loadPaintings() {
  try {
    if (fs.existsSync(paintingsFilePath)) {
      const data = fs.readFileSync(paintingsFilePath, 'utf-8');
      return JSON.parse(data || '[]');
    }
    return initialPaintings;
  } catch (error) {
    console.error('Failed to load paintings:', error);
    return initialPaintings;
  }
}

// Load categories from file
function loadCategories() {
  try {
    if (fs.existsSync(categoriesFilePath)) {
      const data = fs.readFileSync(categoriesFilePath, 'utf-8');
      return JSON.parse(data || '[]');
    }
    return initialCategories;
  } catch (error) {
    console.error('Failed to load categories:', error);
    return initialCategories;
  }
}

// Initialize from files
serverPaintings = loadPaintings();
serverCategories = loadCategories();

export function getPaintings() {
  return serverPaintings;
}

export function getCategories() {
  return serverCategories;
}

export function setPaintings(data: any[]) {
  try {
    serverPaintings = data;
    fs.writeFileSync(paintingsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to save paintings:', error);
  }
}

export function setCategories(data: any[]) {
  try {
    serverCategories = data;
    fs.writeFileSync(categoriesFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to save categories:', error);
  }
}

export function getPaintingsByCategory(categoryId: string) {
  return serverPaintings.filter(p => p.categoryId === categoryId);
}

export function getCategoryCount(categoryId: string) {
  return serverPaintings.filter(p => p.categoryId === categoryId).length;
}

export function getPaintingById(id: string) {
  return serverPaintings.find(p => p.id === id);
}

// Site settings (admin password + site name)
const settingsFilePath = path.join(dataDir, 'settings.json');
const DEFAULT_SETTINGS = {
  adminPassword: '123456',
  siteName: 'טובה גיטי זינגר',
};

export function getSettings() {
  try {
    if (fs.existsSync(settingsFilePath)) {
      const data = JSON.parse(fs.readFileSync(settingsFilePath, 'utf-8') || '{}');
      return { ...DEFAULT_SETTINGS, ...data };
    }
  } catch (error) {
    console.error('Failed to read settings:', error);
  }
  return { ...DEFAULT_SETTINGS };
}

export function updateSettings(patch: Partial<typeof DEFAULT_SETTINGS>) {
  const next = { ...getSettings(), ...patch };
  fs.writeFileSync(settingsFilePath, JSON.stringify(next, null, 2));
  return next;
}

// Orders management
export function getOrders() {
  try {
    if (fs.existsSync(ordersFilePath)) {
      const data = fs.readFileSync(ordersFilePath, 'utf-8');
      return JSON.parse(data || '[]');
    }
    return [];
  } catch (error) {
    console.error('Failed to read orders:', error);
    return [];
  }
}

export function saveOrder(order: any) {
  try {
    const orders = getOrders();
    const orderWithTimestamp = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    orders.push(orderWithTimestamp);
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
    return orderWithTimestamp;
  } catch (error) {
    console.error('Failed to save order:', error);
    throw error;
  }
}

export function updateOrderStatus(orderId: string, status: 'pending' | 'completed') {
  try {
    const orders = getOrders();
    const orderIndex = orders.findIndex((o: any) => o.id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    orders[orderIndex].status = status;
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
    return orders[orderIndex];
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw error;
  }
}

export function getOpenOrdersCount() {
  try {
    const orders = getOrders();
    return orders.filter((o: any) => o.status === 'pending').length;
  } catch (error) {
    console.error('Failed to get open orders count:', error);
    return 0;
  }
}
