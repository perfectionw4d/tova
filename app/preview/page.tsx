'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function PreviewPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [randomPainting, setRandomPainting] = useState<Painting | null>(null);
  const [randomPaintingsByCategory, setRandomPaintingsByCategory] = useState<Record<string, Painting>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('previewAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Tov@202!') {
      setIsAuthenticated(true);
      localStorage.setItem('previewAuth', 'true');
      setError('');
      fetchData();
    } else {
      setError('סיסמה שגויה');
      setPassword('');
    }
  };

  const fetchData = async () => {
    try {
      const categoriesResponse = await fetch('/api/categories');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      const paintingsData: Painting[] = [];
      const randomByCategory: Record<string, Painting> = {};

      for (const category of categoriesData) {
        const paintingsResponse = await fetch(`/api/paintings?category=${category.id}`);
        const categoryPaintings = await paintingsResponse.json();
        paintingsData.push(...categoryPaintings);

        if (categoryPaintings.length > 0) {
          const random = categoryPaintings[Math.floor(Math.random() * categoryPaintings.length)];
          randomByCategory[category.id] = random;
        }
      }
      setPaintings(paintingsData);
      setRandomPaintingsByCategory(randomByCategory);

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

  const handleLogout = () => {
    localStorage.removeItem('previewAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900 flex items-center justify-center p-4" dir="rtl">
        <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-2 text-center">
            טובה גיטי זינגר
          </h1>
          <p className="text-center text-stone-600 dark:text-stone-400 mb-8">
            מצב עדכון - Preview Mode
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-2">
                סיסמה:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="הכנס סיסמה"
                className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white text-right"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 rounded-lg transition-colors"
            >
              כניסה
            </button>
          </form>

          <p className="text-center text-stone-500 dark:text-stone-400 text-sm mt-6">
            זהו מצב עדכון - צופים לא יראו עמוד זה
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            יציאה
          </button>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
            🚧 מצב עדכון
          </h1>
          <Link
            href="/admin/dashboard"
            className="text-amber-700 dark:text-amber-400 hover:underline text-sm"
          >
            לוח הניהול →
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Artist Profile Section */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-full sm:w-64 flex-shrink-0">
                <img
                  src="/images/tova.jpg"
                  alt="טובה גיטי זינגר"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Painting Hero */}
        {randomPainting && (
          <div className="bg-gradient-to-r from-amber-50 to-stone-100 dark:from-zinc-900 dark:to-black rounded-lg shadow-lg overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              <div className="aspect-square overflow-hidden rounded-lg shadow-md order-2 md:order-1">
                <img
                  src={randomPainting.image}
                  alt={randomPainting.name}
                  className="w-full h-full object-cover"
                />
              </div>

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
