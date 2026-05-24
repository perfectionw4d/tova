'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  paintingId: string;
  paintingName: string;
  createdAt?: string;
  status?: 'pending' | 'completed';
}

export default function OrdersAdmin() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      fetchOrders();
    }
  }, [router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const markOrderComplete = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error marking order as complete:', error);
    }
  };

  const openOrdersCount = orders.filter(o => o.status === 'pending').length;

  if (!isAuthenticated) {
    return <div className="text-center py-12">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
                הזמנות
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-stone-700 dark:text-stone-300">
                  סה"כ: {orders.length}
                </span>
                {openOrdersCount > 0 && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {openOrdersCount} פתוחות
                  </span>
                )}
              </div>
            </div>
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

      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center">טוען הזמנות...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-8 text-center">
            <p className="text-stone-600 dark:text-stone-400 text-lg">אין הזמנות עדיין</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order.id || index}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                    🎨 {order.paintingName}
                  </h3>
                  {order.createdAt && (
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {new Date(order.createdAt).toLocaleString('he-IL')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      <strong>ID ציור:</strong> {order.paintingId}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white mb-2">
                      👤 פרטי לקוח
                    </h4>
                    <p className="text-sm">
                      <strong>שם:</strong> {order.name}
                    </p>
                    <p className="text-sm">
                      <strong>טלפון:</strong> {order.phone}
                    </p>
                    <p className="text-sm">
                      <strong>דוא"ל:</strong> {order.email}
                    </p>
                    <p className="text-sm">
                      <strong>כתובת:</strong> {order.address}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200 dark:border-zinc-700">
                  <div className="flex justify-between items-center">
                    <div className="space-x-3">
                      <a
                        href={`mailto:${order.email}`}
                        className="text-amber-700 dark:text-amber-400 hover:underline text-sm"
                      >
                        שלח דוא"ל ללקוח
                      </a>
                      <span className="mx-2 text-stone-400">•</span>
                      <a
                        href={`tel:${order.phone}`}
                        className="text-amber-700 dark:text-amber-400 hover:underline text-sm"
                      >
                        התקשר ללקוח
                      </a>
                    </div>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => markOrderComplete(order.id || '')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold"
                      >
                        ✓ סימון כטופל
                      </button>
                    )}
                    {order.status === 'completed' && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded text-sm font-semibold">
                        ✓ טופל
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
