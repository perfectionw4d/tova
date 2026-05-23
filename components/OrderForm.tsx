'use client';

import { useState } from 'react';

interface OrderFormProps {
  paintingId: string;
  paintingName: string;
  onClose: () => void;
}

export default function OrderForm({ paintingId, paintingName, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      setError('נא למלא את כל השדות');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          paintingId,
          paintingName,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit order');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'אירעה שגיאה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white text-right">
            הזמנה
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-right">
          <p className="text-stone-700 dark:text-stone-300">
            <span className="font-semibold">ציור:</span> {paintingName}
          </p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              ההזמנה התקבלה בהצלחה!
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
              נשלחה אליך אישור דוא"ל
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400 text-sm text-right">
                {error}
              </div>
            )}

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-2 text-right">
                שם
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="שם מלא"
                className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white text-right"
              />
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-2 text-right">
                טלפון
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="מספר טלפון"
                className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white text-right"
              />
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-2 text-right">
                דוא"ל
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="כתובת דוא״ל"
                className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white text-right"
              />
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-2 text-right">
                כתובת
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="כתובת הדירה"
                rows={3}
                className="w-full px-4 py-2 border border-stone-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-stone-900 dark:text-white text-right"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-stone-300 dark:border-zinc-600 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-50 dark:hover:bg-zinc-700 transition-colors"
              >
                ביטול
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'שולח...' : 'שלח הזמנה'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
