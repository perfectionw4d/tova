import { paintings as initialPaintings, categories as initialCategories } from './data';

// Server-side storage (persists across requests in the same process)
let serverPaintings = initialPaintings;
let serverCategories = initialCategories;

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
