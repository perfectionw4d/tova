'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { categories as initialCategories } from '@/lib/data';

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function CategoriesAdmin() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Category>({
    id: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      // Load categories from localStorage if saved
      const savedCategories = localStorage.getItem('categories');
      if (savedCategories) {
        try {
          setCategories(JSON.parse(savedCategories));
        } catch (e) {
          console.error('Failed to load categories:', e);
        }
      }
    }
  }, [router]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && categories.length > 0) {
      localStorage.setItem('categories', JSON.stringify(categories));
      // Also sync to server
      saveCategoriesToServer(categories);
    }
  }, [categories, isAuthenticated]);

  const saveCategoriesToServer = async (data: Category[]) => {
    try {
      await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: data }),
      });
    } catch (error) {
      console.error('Failed to sync categories to server:', error);
    }
  };

  const handleAddNew = () => {
    setFormData({ id: '', name: '', description: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (category: Category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('נא למלא שם קטגוריה');
      return;
    }

    if (editingId) {
      setCategories(categories.map(c => c.id === editingId ? formData : c));
    } else {
      const newId = `cat-${Date.now()}`;
      setCategories([...categories, { ...formData, id: newId }]);
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('האם אתה בטוח שתרצה למחוק את הקטגוריה?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  if (!isAuthenticated) {
    return <div className="text-center py-12">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
              ניהול קטגוריות
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                👁️ צפייה באתר
              </button>
              <Link href="/admin/dashboard" className="text-amber-700 dark:text-amber-400 hover:underline">
                ← חזרה לדשבורד
              </Link>
            </div>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            + הוסף קטגוריה חדשה
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {categories.length === 0 ? (
          <p className="text-center text-stone-600 dark:text-stone-400">אין קטגוריות עדיין</p>
        ) : (
          <div className="grid gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    ערוך
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    מחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">
              {editingId ? 'ערוך קטגוריה' : 'הוסף קטגוריה חדשה'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  שם הקטגוריה
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  תיאור
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white h-24"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                שמור
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
