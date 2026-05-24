import { paintings as initialPaintings, categories as initialCategories } from './data';
import * as fs from 'fs';
import * as path from 'path';

// Server-side storage (persists across requests in the same process)
let serverPaintings = initialPaintings;
let serverCategories = initialCategories;

// Orders file path
const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export function getPaintings() {
  return serverPaintings;
}

export function getCategories() {
  return serverCategories;
}

export function setPaintings(data: any[]) {
  serverPaintings = data;
}

export function setCategories(data: any[]) {
  serverCategories = data;
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
