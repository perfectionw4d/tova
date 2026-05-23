'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Painting {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
}

export default function CategoryPage() {
  const params = useParams();
  const categoryId = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch paintings for this category
        const paintingsResponse = await fetch(`/api/paintings?category=${categoryId}`);
        const paintingsData = await paintingsResponse.json();
        setPaintings(paintingsData);

        // Get category name from category list
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        const category = categoriesData.find((c: any) => c.id === categoryId);
        if (category) {
          setCategoryName(category.name);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-block mb-4 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors"
          >
            ← חזרה לעמוד הבית
          </Link>
          <h1 className="text-4xl font-bold text-stone-900 dark:text-white">
            {categoryName || 'קטגוריה'}
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mt-2">
            {paintings.length} {paintings.length === 1 ? 'ציור' : 'ציורים'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-600 dark:text-stone-400">טוען...</p>
          </div>
        ) : paintings.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 text-center">
            <p className="text-stone-600 dark:text-stone-400">אין ציורים בקטגוריה זו כרגע</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((painting) => (
              <Link
                key={painting.id}
                href={`/painting/${painting.id}`}
                className="group bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Painting Image */}
                <div className="aspect-square bg-gradient-to-br from-stone-300 to-stone-400 dark:from-zinc-600 dark:to-zinc-700 overflow-hidden">
                  <img
                    src={painting.image}
                    alt={painting.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Painting Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {painting.name}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mb-3 line-clamp-2">
                    {painting.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700 dark:text-amber-400 font-bold">
                      ₪{painting.price}
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 text-sm">
                      {painting.size}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
