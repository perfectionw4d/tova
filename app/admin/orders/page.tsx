'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  name: string;
  phone: string;
  email: string;
  address: string;
  paintingId: string;
  paintingName: string;
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

  if (!isAuthenticated) {
    return <div className="text-center py-12">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900" dir="rtl">
      <div className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
              הזמנות ({orders.length})
            </h1>
            <Link href="/admin/dashboard" className="text-amber-700 dark:text-amber-400 hover:underline">
              ← חזרה לדשבורד
            </Link>
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
                key={index}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-4">
                      🎨 {order.paintingName}
                    </h3>
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
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
