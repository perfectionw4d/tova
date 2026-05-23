// Mock data structure - will be replaced with database later
export interface Painting {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  size: string; // e.g., "60x80 cm"
  medium: string; // e.g., "oil on canvas"
  year: number;
  image: string; // placeholder for image URL
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

// Temporary test categories
export const categories: Category[] = [
  {
    id: "abstract",
    name: "אבסטרקט",
    description: "ציורים אבסטרקטיים המבטאים תחושות ורגשות באמצעות צבעים וקווים",
  },
  {
    id: "nature",
    name: "טבע",
    description: "ציורים המשקפים את יופיה של הטבע והנוף הישראלי",
  },
];

// Temporary test paintings
export const paintings: Painting[] = [
  {
    id: "abstract-1",
    name: "חופש",
    categoryId: "abstract",
    description: "ציור אבסטרקטי המבטא את תחושת החופש והשחרור מכבלים פנימיים",
    price: 1500,
    size: "60 x 80 ס\"מ",
    medium: "אקריליק על בד",
    year: 2024,
    image: "/paintings/freedom.jpg",
    available: true,
  },
  {
    id: "abstract-2",
    name: "תהליך",
    categoryId: "abstract",
    description: "המחשה של תהליך השיקום והגדילה האישית",
    price: 1800,
    size: "70 x 90 ס\"מ",
    medium: "אקריליק על בד",
    year: 2024,
    image: "/paintings/process.jpg",
    available: true,
  },
  {
    id: "nature-1",
    name: "זריחה",
    categoryId: "nature",
    description: "זריחה על ים כנרת - סימל של תחילה חדשה",
    price: 2000,
    size: "80 x 100 ס\"מ",
    medium: "שמן על בד",
    year: 2023,
    image: "/paintings/sunrise.jpg",
    available: true,
  },
  {
    id: "nature-2",
    name: "בשדה",
    categoryId: "nature",
    description: "שדה פרחים בעונת הקיץ - משקף את קסם הטבע הפשוט",
    price: 1600,
    size: "50 x 70 ס\"מ",
    medium: "אקריליק על בד",
    year: 2024,
    image: "/paintings/field.jpg",
    available: true,
  },
];

export function getCategoryCount(categoryId: string): number {
  return paintings.filter((p) => p.categoryId === categoryId).length;
}

export function getPaintingsByCategory(categoryId: string): Painting[] {
  return paintings.filter((p) => p.categoryId === categoryId);
}

export function getPaintingById(id: string): Painting | undefined {
  return paintings.find((p) => p.id === id);
}
