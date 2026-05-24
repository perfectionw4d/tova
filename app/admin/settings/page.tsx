'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsAdmin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState({
    adminEmail: 'tony@thezebra.co.il',
    siteName: 'טובה גיטי זינגר',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      // Load settings from localStorage or environment
      const savedEmail = localStorage.getItem('adminEmail');
      if (savedEmail) {
        setSettings(prev => ({ ...prev, adminEmail: savedEmail }));
      }
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('adminEmail', settings.adminEmail);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isAuthenticated) {
    return <div className="text-center py-12">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
              הגדרות
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
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8">
            הגדרות כלליות
          </h2>

          <div className="space-y-6">
            {/* Admin Email */}
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                מייל מינהל (לקבלת הזמנות)
              </label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                הודעות על הזמנות חדשות ישלחו לכתובת זו
              </p>
            </div>

            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                שם האתר
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                disabled
                className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-gray-100 dark:bg-zinc-600 text-stone-900 dark:text-white opacity-50 cursor-not-allowed"
              />
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                (לא ניתן לשינוי כרגע)
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
                ℹ️ מידע נוסף
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• הודעות על הזמנות חדשות ישלחו לכתובת דוא"ל זו</li>
                <li>• לקוחות יקבלו אישור הזמנה בדוא"ל שלהם</li>
                <li>• הגדרות נשמרות בהתקן שלך</li>
              </ul>
            </div>

            {/* Save Button */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                💾 שמור הגדרות
              </button>
            </div>

            {saved && (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded">
                ✅ ההגדרות נשמרו בהצלחה!
              </div>
            )}
          </div>
        </div>

        {/* API Info */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-yellow-900 dark:text-yellow-200 mb-4">
            ⚙️ מידע API (למתקדמים)
          </h3>
          <div className="text-sm text-yellow-800 dark:text-yellow-300 space-y-2 font-mono">
            <p><strong>Orders API:</strong> GET /api/orders</p>
            <p><strong>Categories API:</strong> GET /api/categories</p>
            <p><strong>Paintings API:</strong> GET /api/paintings</p>
            <p><strong>Single Painting:</strong> GET /api/paintings/[id]</p>
          </div>
        </div>
      </main>
    </div>
  );
}
