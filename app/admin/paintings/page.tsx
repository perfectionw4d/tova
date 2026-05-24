'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { paintings as initialPaintings } from '@/lib/data';

interface Painting {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  size: string;
  medium: string;
  year: number;
  image: string;
  available: boolean;
}

export default function PaintingsAdmin() {
  const router = useRouter();
  const [paintings, setPaintings] = useState<Painting[]>(initialPaintings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState<Painting>({
    id: '',
    name: '',
    categoryId: '',
    description: '',
    price: 0,
    size: '',
    medium: '',
    year: new Date().getFullYear(),
    image: '',
    available: true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      // Load paintings from localStorage if saved
      const savedPaintings = localStorage.getItem('paintings');
      if (savedPaintings) {
        try {
          setPaintings(JSON.parse(savedPaintings));
        } catch (e) {
          console.error('Failed to load paintings:', e);
        }
      }
    }
  }, [router]);

  // Save paintings to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && paintings.length > 0) {
      localStorage.setItem('paintings', JSON.stringify(paintings));
    }
  }, [paintings, isAuthenticated]);

  const handleAddNew = () => {
    setFormData({
      id: '',
      name: '',
      categoryId: '',
      description: '',
      price: 0,
      size: '',
      medium: '',
      year: new Date().getFullYear(),
      image: '',
      available: true,
    });
    setImagePreview('');
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (painting: Painting) => {
    setFormData(painting);
    setImagePreview(painting.image);
    setEditingId(painting.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.categoryId) {
      alert('נא למלא שם וקטגוריה');
      return;
    }

    if (editingId) {
      // Update existing
      setPaintings(paintings.map(p => p.id === editingId ? formData : p));
    } else {
      // Add new
      const newId = `painting-${Date.now()}`;
      setPaintings([...paintings, { ...formData, id: newId }]);
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('האם אתה בטוח שתרצה למחוק את הציור?')) {
      setPaintings(paintings.filter(p => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return <div className="text-center py-12">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
              ניהול ציורים
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                👁️ צפייה באתר
              </button>
              <Link
                href="/admin/dashboard"
                className="text-amber-700 dark:text-amber-400 hover:underline"
              >
                ← חזרה לדשבורד
              </Link>
            </div>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            + הוסף ציור חדש
          </button>
        </div>
      </div>

      {/* Paintings List */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {paintings.length === 0 ? (
          <p className="text-center text-stone-600 dark:text-stone-400">אין ציורים עדיין</p>
        ) : (
          <div className="grid gap-4">
            {paintings.map((painting) => (
              <div
                key={painting.id}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                    {painting.name}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    {painting.description}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>💰 ₪{painting.price}</span>
                    <span>📏 {painting.size}</span>
                    <span>🎨 {painting.medium}</span>
                    <span>📅 {painting.year}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(painting)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    ערוך
                  </button>
                  <button
                    onClick={() => handleDelete(painting.id)}
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">
              {editingId ? 'ערוך ציור' : 'הוסף ציור חדש'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  שם הציור
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
                  קטגוריה
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white"
                >
                  <option value="">בחר קטגוריה</option>
                  <option value="abstract">אבסטרקט</option>
                  <option value="nature">טבע</option>
                </select>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    מחיר (₪)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    גודל
                  </label>
                  <input
                    type="text"
                    placeholder={'למשל: 60x80 ס"מ'}
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    טכניקה
                  </label>
                  <input
                    type="text"
                    placeholder="למשל: שמן על בד"
                    value={formData.medium}
                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    שנה
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  תמונת ציור
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">תצוגה מקדימה:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto max-h-64 object-cover rounded-lg border border-stone-300 dark:border-zinc-600"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="available" className="text-stone-700 dark:text-stone-300">
                  זמין להזמנה
                </label>
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
                onClick={() => {
                  setShowForm(false);
                  setImagePreview('');
                }}
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
