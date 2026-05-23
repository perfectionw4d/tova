'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import OrderForm from '@/components/OrderForm';

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

export default function PaintingPage() {
  const params = useParams();
  const paintingId = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const [painting, setPainting] = useState<Painting | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const response = await fetch(`/api/paintings/${paintingId}`);
        if (!response.ok) {
          throw new Error('Painting not found');
        }
        const data = await response.json();
        setPainting(data);
      } catch (error) {
        console.error('Failed to fetch painting:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPainting();
  }, [paintingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900">
        <p className="text-stone-600 dark:text-stone-400">טוען...</p>
      </div>
    );
  }

  if (!painting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/"
            className="inline-block mb-4 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors"
          >
            ← חזרה לעמוד הבית
          </Link>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 text-center">
            <p className="text-stone-600 dark:text-stone-400">הציור לא נמצא</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href={`/category/${painting.categoryId}`}
            className="inline-block mb-4 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors"
          >
            ← חזרה לקטגוריה
          </Link>
          <h1 className="text-4xl font-bold text-stone-900 dark:text-white">
            {painting.name}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Painting Image */}
          <div className="lg:col-span-2">
            <div className="aspect-square bg-gradient-to-br from-stone-300 to-stone-400 dark:from-zinc-600 dark:to-zinc-700 rounded-lg overflow-hidden">
              <img
                src={painting.image}
                alt={painting.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Painting Details */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 space-y-6">
              {/* Price */}
              <div>
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-1">מחיר</p>
                <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">
                  ₪{painting.price}
                </p>
              </div>

              {/* Specifications */}
              <div className="border-t border-stone-200 dark:border-zinc-700 pt-6 space-y-4">
                <div>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">גודל</p>
                  <p className="text-stone-900 dark:text-white font-semibold">
                    {painting.size}
                  </p>
                </div>

                <div>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">טכניקה</p>
                  <p className="text-stone-900 dark:text-white font-semibold">
                    {painting.medium}
                  </p>
                </div>

                <div>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">שנה</p>
                  <p className="text-stone-900 dark:text-white font-semibold">
                    {painting.year}
                  </p>
                </div>

                <div>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">זמינות</p>
                  <p className={`font-semibold ${
                    painting.available
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {painting.available ? 'זמין' : 'לא זמין'}
                  </p>
                </div>
              </div>

              {/* Order Button */}
              {painting.available && (
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="w-full bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  הזמן ציור זה
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 bg-white dark:bg-zinc-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4 text-right">
            על הציור
          </h2>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-right">
            {painting.description}
          </p>
        </div>
      </main>

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          paintingId={painting.id}
          paintingName={painting.name}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
}
