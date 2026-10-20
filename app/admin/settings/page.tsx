'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsAdmin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      fetch('/api/settings')
        .then((r) => r.json())
        .then((data) => {
          if (data.siteName) setSiteName(data.siteName);
        })
        .catch(() => {});
    }
  }, [router]);

  const goToPreview = () => {
    localStorage.setItem('previewAuth', 'true');
    window.open('/preview', '_blank');
  };

  const handleSave = async () => {
    setMessage(null);

    if (!currentPassword) {
      setMessage({ type: 'error', text: 'נא להזין את הסיסמה הנוכחית כדי לשמור שינויים' });
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'הסיסמה החדשה ואימות הסיסמה לא תואמים' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, siteName, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'ok', text: 'ההגדרות נשמרו בהצלחה!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.error || 'שגיאה בשמירה' });
      }
    } catch {
      setMessage({ type: 'error', text: 'שגיאה בתקשורת עם השרת' });
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="text-center py-12">טוען...</div>;
  }

  const inputClass =
    'w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500';
  const labelClass = 'block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2';

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white">הגדרות</h1>
            <div className="flex gap-4">
              <button
                onClick={goToPreview}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-bold"
              >
                👁️ צפיה בקטלוג
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
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8">הגדרות כלליות</h2>

          <div className="space-y-6">
            {/* Site Name */}
            <div>
              <label className={labelClass}>שם האתר</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className={inputClass}
              />
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                השם יופיע בכותרת העליונה של האתר
              </p>
            </div>

            <hr className="border-stone-200 dark:border-zinc-700" />

            {/* Password */}
            <h3 className="font-bold text-stone-900 dark:text-white">שינוי סיסמה</h3>

            <div>
              <label className={labelClass}>סיסמה נוכחית</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass}
              />
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                נדרשת לכל שמירה של ההגדרות
              </p>
            </div>

            <div>
              <label className={labelClass}>סיסמה חדשה (השאר ריק אם לא משנים)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>אימות סיסמה חדשה</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {message && (
              <div
                className={
                  message.type === 'ok'
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded'
                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded'
                }
              >
                {message.text}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'שומר...' : '💾 שמור הגדרות'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
