'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return <div className="text-center py-12">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
            לוח ניהול - טובה גיטי זינגר
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            התנתקות
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Paintings Management */}
          <Link
            href="/admin/paintings"
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              🎨 ניהול ציורים
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              הוסף, ערוך או מחק ציורים מהאתר
            </p>
            <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition-colors w-full">
              פתח
            </button>
          </Link>

          {/* Categories Management */}
          <Link
            href="/admin/categories"
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              📂 ניהול קטגוריות
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              ארגן את הציורים לקטגוריות שונות
            </p>
            <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition-colors w-full">
              פתח
            </button>
          </Link>

          {/* Orders */}
          <Link
            href="/admin/orders"
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              📋 הזמנות
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              ראה את כל ההזמנות שהגיעו
            </p>
            <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition-colors w-full">
              פתח
            </button>
          </Link>

          {/* Settings */}
          <Link
            href="/admin/settings"
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              ⚙️ הגדרות
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              עדכן מייל מינהל וכתובת
            </p>
            <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition-colors w-full">
              פתח
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
