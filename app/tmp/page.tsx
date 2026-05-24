'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Painting {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
  categoryId: string;
}

export default function CatalogPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [randomPainting, setRandomPainting] = useState<Painting | null>(null);
  const [randomPaintingsByCategory, setRandomPaintingsByCategory] = useState<Record<string, Painting>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch all paintings to pick random ones
        const paintingsData: Painting[] = [];
        const randomByCategory: Record<string, Painting> = {};

        for (const category of categoriesData) {
          const paintingsResponse = await fetch(`/api/paintings?category=${category.id}`);
          const categoryPaintings = await paintingsResponse.json();
          paintingsData.push(...categoryPaintings);

          // Pick a random painting for this category
          if (categoryPaintings.length > 0) {
            const random = categoryPaintings[Math.floor(Math.random() * categoryPaintings.length)];
            randomByCategory[category.id] = random;
          }
        }
        setPaintings(paintingsData);
        setRandomPaintingsByCategory(randomByCategory);

        // Pick a random painting for the featured section
        if (paintingsData.length > 0) {
          const random = paintingsData[Math.floor(Math.random() * paintingsData.length)];
          setRandomPainting(random);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Under Construction Banner */}
      <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 py-4 px-4 border-b border-amber-300 dark:border-amber-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-medium mb-3">🚧 הקטלוג נמצא בשלב בנייה</p>
          <p className="text-sm mb-3">אנא צרו קשר ישירות עם טובה להזמנות:</p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <span className="font-semibold">📱 052-468-7134</span>
            <a
              href="https://wa.me/972524687134"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              💬 שלח הודעה ב-WhatsApp
            </a>
          </div>
        </div>
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

        {/* Featured Painting Hero */}
        {randomPainting && (
          <div className="bg-gradient-to-r from-amber-50 to-stone-100 dark:from-zinc-900 dark:to-black rounded-lg shadow-lg overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-lg shadow-md order-2 md:order-1">
                <img
                  src={randomPainting.image}
                  alt={randomPainting.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="order-1 md:order-2">
                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">
                  ✨ ציור מודגש
                </p>
                <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">
                  {randomPainting.name}
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mb-6 text-lg leading-relaxed">
                  {randomPainting.description}
                </p>
                <Link
                  href={`/painting/${randomPainting.id}`}
                  className="inline-block bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  צפה בפרטים →
                </Link>
              </div>
            </div>
          </div>
        )}

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
              {categories.map((category) => {
                const randomCategoryPainting = randomPaintingsByCategory[category.id];
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="group bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-video bg-gradient-to-br from-stone-300 to-stone-400 dark:from-zinc-600 dark:to-zinc-700 group-hover:from-stone-400 group-hover:to-stone-500 dark:group-hover:from-zinc-500 dark:group-hover:to-zinc-600 transition-colors flex items-center justify-center overflow-hidden">
                      {randomCategoryPainting ? (
                        <img
                          src={randomCategoryPainting.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-stone-700 dark:text-zinc-300">הקטגוריה: {category.name}</span>
                      )}
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
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
