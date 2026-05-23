'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Under Construction Banner */}
      <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 py-3 px-4 text-center border-b border-amber-300 dark:border-amber-700">
        <p className="text-sm font-medium">⚠️ האתר בשלב בנייה - The website is under construction</p>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Artist Profile Section */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Profile Image Placeholder */}
              <div className="w-full sm:w-64 flex-shrink-0">
                <img
                  src="/images/tova.jpg"
                  alt="טובה גיטי זינגר"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Artist Story */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-2">
                  טובה גיטי זינגר
                </h1>
                <p className="text-stone-600 dark:text-stone-300 mb-4 font-semibold">אמנית ציורה</p>

                <div className="prose dark:prose-invert text-right space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    ברוכים הבאים לאתר הציורים של טובה גיטי זינגר. טובה משדברת את נשמתה דרך הצבעים והקווים בציוריה.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    כל ציור מספר סיפור ייחודי, משלב תחושות ורגשות עמוקים בעבודה אמנותית המשקפת את חוקר החיים של האמנית.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
          
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
           
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-8 text-right">
            קטגוריות הציורים
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-stone-600 dark:text-stone-400">טוען...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 text-center">
              <p className="text-stone-600 dark:text-stone-400">אין קטגוריות זמינות כרגע</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-br from-stone-300 to-stone-400 dark:from-zinc-600 dark:to-zinc-700 group-hover:from-stone-400 group-hover:to-stone-500 dark:group-hover:from-zinc-500 dark:group-hover:to-zinc-600 transition-colors flex items-center justify-center">
                    <span className="text-stone-700 dark:text-zinc-300">הקטגוריה: {category.name}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      {category.count} {category.count === 1 ? 'ציור' : 'ציורים'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
