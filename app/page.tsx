'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-black dark:to-zinc-900 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-2xl w-full">
        {/* Main Construction Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-12 text-center">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-stone-900 dark:text-white mb-2">
              טובה גיטי זינגר
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400">
              קטלוג הציורים
            </p>
          </div>

          {/* Construction Message */}
          <div className="mb-8 py-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-300 dark:border-amber-700">
            <p className="text-3xl mb-3">🚧</p>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200 mb-3">
              הקטלוג בשלב בנייה
            </h2>
            <p className="text-stone-700 dark:text-stone-300">
              אנחנו עובדים קשה כדי להביא לכם את הציורים המדהימים של טובה.
              <br />
              בקרוב הכל יהיה מוכן!
            </p>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
              💬 יצרו קשר ישירות
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              להזמנות ופרטים נוספים:
            </p>

            {/* Phone Display */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 mb-4 border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                📱 מספר הטלפון:
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                052-468-7134
              </p>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/972524687134"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              💬 שלח הודעה ב-WhatsApp
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-stone-600 dark:text-stone-400">
          <p className="text-sm">
            © 2026 טובה גיטי זינגר - כל הזכויות שמורות
          </p>
        </div>
      </div>
    </div>
  );
}
