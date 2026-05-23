# טובה גיטי זינגר - אתר קטלוג ציורים

## קביעת מטרה

אתר זה נבנה לשיווק ומכירה של ציוריה של אמנית טובה גיטי זינגר. האתר כולל:

- **עמוד בית** - עם סיפור אמנית ורשימת קטגוריות
- **עמודי קטגוריות** - גלריה של ציורים בכל קטגוריה
- **עמודי ציורים** - תיאור מלא של כל ציור עם אפשרות הזמנה
- **טופס הזמנה** - טופס לתיוג פרטים של הקונה
- **לוח בקרה ניהולי** - לניהול ציורים, קטגוריות וגדרות

## תזדרקות טכניות

- **Next.js 16.2.6** - React framework
- **React 19.2.4** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **RTL (Right-to-Left)** - תמיכה בעברית

## תיקייה מבנה

```
tova-art-catalog/
├── app/
│   ├── layout.tsx           # Layout ראשי
│   ├── page.tsx             # עמוד בית
│   ├── globals.css          # סגנון גלובלי
│   ├── category/
│   │   └── [id]/
│   │       └── page.tsx     # עמוד קטגוריה
│   ├── painting/
│   │   └── [id]/
│   │       └── page.tsx     # עמוד ציור
│   ├── admin/
│   │   └── page.tsx         # לוח בקרה
│   └── api/
│       ├── categories/      # API קטגוריות
│       ├── paintings/       # API ציורים
│       └── orders/          # API הזמנות
├── components/
│   ├── Header.tsx          # ניווט עליון
│   ├── OrderForm.tsx       # טופס הזמנה
│   └── Footer.tsx          # תחתון
├── lib/
│   ├── data.ts             # נתונים זמניים (לפני מסד נתונים)
│   └── email.ts            # שירות דוא״ל
├── public/                 # תמונות וקבצים סטטיים
└── package.json
```

## התחלה מהירה

### 1. התקנה

```bash
# המקום: tova-art-catalog/
yarn install
# או
npm install
```

### 2. הפעלת שרת פיתוח

```bash
yarn dev
# או
npm run dev
```

פתח את `http://localhost:3000` בדפדפן.

## עבודה עם הנתונים

### ציורים וקטגוריות

הנתונים כרגע מאוחסנים ב-`lib/data.ts`. זה קובץ זמני עד שנחבר מסד נתונים.

**הוספת ציור חדש:**

1. עדכן את `lib/data.ts`
2. הוסף אובייקט ציור חדש למערך `paintings`

```typescript
{
  id: "unique-id",
  name: "שם הציור",
  categoryId: "category-id",
  description: "תיאור",
  price: 1500,
  size: "60 x 80 ס\"מ",
  medium: "אקריליק על בד",
  year: 2024,
  image: "/paintings/filename.jpg",
  available: true,
}
```

### תמונות

תמונות ציורים צריכות להיות במקום `public/paintings/`. עם זמן, נוכל להוסיף מערכת upload אמיתית.

## עמודים

### / (עמוד בית)
- מציג סיפור של טובה
- רשימה של קטגוריות עם מספר ציורים
- לינקים לקטגוריות שונות

### /category/[id]
- מציג ציורים בקטגוריה
- רשימה של קטגוריות עם תמונה, שם ומחיר
- לינק לעמוד ציור

### /painting/[id]
- תמונה גדולה של הציור
- פרטים: מחיר, גודל, טכניקה, שנה
- טופס הזמנה
- תיאור מלא

### /admin
- סיכום של קטגוריות וציורים
- ניהול ציורים
- ניהול קטגוריות
- הגדרות (שם נמען דוא״ל, וכו')

## API Routes

### GET /api/categories
חזרה רשימה של קטגוריות עם מספר ציורים בכל אחת:

```json
[
  {
    "id": "abstract",
    "name": "אבסטרקט",
    "description": "...",
    "count": 2
  }
]
```

### GET /api/paintings?category=abstract
חזרה רשימה של ציורים בקטגוריה

### GET /api/paintings/[id]
פרטים של ציור בודד

### POST /api/orders
שלח הזמנה חדשה

תוכן בקשה:
```json
{
  "name": "שם",
  "phone": "טלפון",
  "email": "דוא\"ל",
  "address": "כתובת",
  "paintingId": "painting-id",
  "paintingName": "שם הציור"
}
```

## דוא"ל

כרגע, הזמנות מאוחסנות בזיכרון בעלבד. כדי להפעיל דוא״ל:

1. הוסף `Nodemailer` לפרויקט:
```bash
npm install nodemailer
```

2. הוסף משתנים סביבה ב-.env.local:
```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
```

3. עדכן `app/api/orders/route.ts` לשלוח אימיל

## ניסיון

### בדיקה בעמוד בית:
- בדוק שקטגוריות נטענות
- בדוק ש-RTL פועל

### בדיקה בעמוד קטגוריה:
- בדוק שציורים מופיעים
- בדוק שמספר הציורים נכון

### בדיקה בעמוד ציור:
- בדוק שכל הפרטים מופיעים
- נסה טופס הזמנה

## הטמעה

### Railway.app

1. אתחול Git:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. פתח חשבון Railway.app
3. חבר את הפרויקט
4. הוסף משתנים סביבה
5. Deploy!

## עיצוב וצבעים

- **צבע ראשי:** Amber (צהוב)
- **רקע:** Stone/Zinc (אפור בהיר/כהה)
- **RTL:** כל הטקסט מיושר לימין

## בעיות נפוצות

### שגיאה: "Missing script: dev"
- ודא שלך `yarn install` או `npm install`

### עמוד מראה Next.js template
- בדוק שהשנויים שמורים
- Reload דפדפן (Ctrl+R או Cmd+R)

### טופס הזמנה לא עובד
- בדוק console לשגיאות
- ודא שכל השדות מלאים

## עמוד קרא עוד

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

עבור שאלות או בעיות, יצור קשר בדוא״ל.
