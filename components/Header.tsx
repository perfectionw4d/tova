'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between" dir="rtl">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white font-semibold transition-colors"
          >
            ניהול
          </Link>
        </div>

        <Link href="/" className="text-2xl font-bold text-stone-900 dark:text-white">
          טובה גיטי זינגר
        </Link>

        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://shakufbahazit.co.il/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white text-sm transition-colors"
          >
            שקוף בחזית
          </a>
        </div>
      </nav>
    </header>
  );
}
