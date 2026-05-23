'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Painting {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  size: string;
  available: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}

export default function AdminPanel() {
  const [tab, setTab] = useState<'dashboard' | 'paintings' | 'categories' | 'settings'>('dashboard');
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [adminEmail, setAdminEmail] = useState('ty.antonir@gmail.com');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load categories with paintings
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Load all paintings (would need a proper API endpoint)
        // For now, just show summary
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-block text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors"
          >
            ← חזרה לאתר
          </Link>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
            לוח בקרה מנהלים
          </h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0">
            {(['dashboard', 'paintings', 'categories', 'settings'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                  tab === t
                    ? 'border-amber-700 text-amber-700 dark:border-amber-400 dark:text-amber-400'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {t === 'dashboard' && 'סיכום'}
                {t === 'paintings' && 'ציורים'}
                {t === 'categories' && 'קטגוריות'}
                {t === 'settings' && 'הגדרות'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {tab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-8 text-right">
              סיכום
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md">
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-2 text-right">
                  קטגוריות
                </p>
                <p className="text-4xl font-bold text-amber-700 dark:text-amber-400">
                  {categories.length}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md">
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-2 text-right">
                  סה"כ ציורים
                </p>
                <p className="text-4xl font-bold text-amber-700 dark:text-amber-400">
                  {categories.reduce((sum, cat) => sum + cat.count, 0)}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md">
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-2 text-right">
                  דוא"ל ניהול
                </p>
                <p className="text-sm font-mono text-stone-900 dark:text-white text-right">
                  {adminEmail}
                </p>
              </div>
            </div>

            <div className="mt-12 bg-white dark:bg-zinc-800 rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-4 text-right">
                קטגוריות וציורים
              </h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-4 bg-stone-50 dark:bg-zinc-700 rounded-lg"
                  >
                    <div className="text-right">
                      <p className="font-semibold text-stone-900 dark:text-white">
                        {cat.name}
                      </p>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {cat.description}
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'paintings' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <button className="px-6 py-2 bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors">
                + הוסף ציור
              </button>
              <h2 className="text-3xl font-bold text-stone-900 dark:text-white">
                ניהול ציורים
              </h2>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 shadow-md text-center">
              <p className="text-stone-600 dark:text-stone-400 text-lg">
                תכונת הוספת ציורים תהיה זמינה בקרוב
              </p>
              <p className="text-stone-500 dark:text-stone-500 text-sm mt-2">
                כרגע ניתן לערוך את הציורים בקובץ lib/data.ts
              </p>
            </div>
          </div>
        )}

        {tab === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <button className="px-6 py-2 bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors">
                + הוסף קטגוריה
              </button>
              <h2 className="text-3xl font-bold text-stone-900 dark:text-white">
                ניהול קטגוריות
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <button className="px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        ערוך
                      </button>
                      <button className="px-4 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                        מחק
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-stone-900 dark:text-white">
                        {cat.name}
                      </p>
                      <p className="text-stone-600 dark:text-stone-400 text-sm">
                        {cat.description}
                      </p>
                      <p className="text-stone-500 dark:text-stone-500 text-sm mt-1">
                        {cat.count} ציורים
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div>
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-8 text-right">
              הגדרות
            </h2>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 shadow-md max-w-2xl mr-0">
              <div className="mb-6">
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-2 text-right">
                  דוא"ל ניהול (לקבלת הודעות הזמנות)
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white text-right"
                />
              </div>

              <div className="flex gap-4 justify-start">
                <button className="px-6 py-2 bg-gray-300 dark:bg-zinc-700 text-stone-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-zinc-600 transition-colors font-semibold">
                  ביטול
                </button>
                <button className="px-6 py-2 bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg transition-colors font-semibold">
                  שמור
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
