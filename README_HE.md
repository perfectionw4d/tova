# טובה גיטי זינגר - קטלוג ציורים אונליין

> אתר קטלוג מודרני לציוריה של אמנית טובה גיטי זינגר

## 🎨 מה זה?

אתר זה הוא קטלוג דיגיטלי מלא לציורים של טובה. זה כולל:

- 🏠 **עמוד בית** - עם סיפור וקטגוריות
- 🎭 **קטגוריות** - ציורים מארגנים לקבוצות
- 🖼️ **גלריה** - מציג כל ציור עם תמונה גדולה
- 💰 **פרטים** - מחיר, גודל, טכניקה, וכו'
- 📝 **הזמנות** - טופס להזמנת ציור
- 👨‍💼 **ניהול** - לוח בקרה למנהלים

## 🚀 התחלה

### דרישות
- Node.js 18+
- npm או Yarn

### התקנה והפעלה

```bash
# 1. נווט לתיקייה
cd "G:\האחסון שלי\אתר של טובה\tova-art-catalog"

# 2. התקן תלויות
yarn install
# או
npm install

# 3. הפעל שרת פיתוח
yarn dev
# או
npm run dev

# 4. פתח בדפדפן
# http://localhost:3000
```

## 📁 מבנה הפרויקט

```
tova-art-catalog/
├── app/                    # עמודים ו-API
│   ├── page.tsx           # עמוד בית
│   ├── category/[id]/     # עמוד קטגוריה
│   ├── painting/[id]/     # עמוד ציור
│   ├── admin/             # לוח בקרה
│   └── api/               # API endpoints
├── components/            # React components
├── lib/                   # Utilities & data
├── public/                # תמונות וקבצים סטטיים
└── docs/                  # תיעוד
```

## 📖 תיעוד

קרא את אלה לפרטים מלאים:

1. **[QUICKSTART.md](./QUICKSTART.md)** - התחלה מהירה (עברית)
2. **[NEXT_STEPS.md](./NEXT_STEPS.md)** - מה לעשות בהמשך
3. **[DEVELOPMENT.md](./DEVELOPMENT.md)** - מדריך למפתחים
4. **[FILES_CREATED.md](./FILES_CREATED.md)** - רשימת כל הקבצים

## ✨ תכונות

### ✅ כבר בנוי
- עמודים בעברית (RTL)
- ניווט מלא
- טופס הזמנה עם ולידציה
- לוח בקרה למנהלים
- 2 קטגוריות בדיקה
- 4 ציורים לדוגמה
- עיצוב מודרני עם Tailwind CSS
- מצב כהה/בהיר
- API endpoints

### 🚧 עדיין בעבודה
- דוא"ל (צורך Nodemailer setup)
- תמונות אמיתיות
- מסד נתונים אמיתי

## 🛠️ טכנולוגיה

- **Framework:** Next.js 16.2.6
- **Language:** TypeScript
- **UI:** React 19.2.4
- **Styling:** Tailwind CSS 4
- **Features:** RTL, Dark Mode, Responsive

## 📋 Endpoints

### API Routes

```
GET  /api/categories              # רשימת קטגוריות
GET  /api/paintings?category=ID   # ציורים בקטגוריה
GET  /api/paintings/[id]          # ציור בודד
POST /api/orders                  # הגשת הזמנה
```

## 🧪 בדיקה

בדוק את העמודים:

1. **בית:** http://localhost:3000
2. **קטגוריה:** http://localhost:3000/category/abstract
3. **ציור:** http://localhost:3000/painting/abstract-1
4. **ניהול:** http://localhost:3000/admin

## 📸 הוספת תמונות

### תמונה של טובה
```
1. שמור בתמונה: public/images/tova.jpg
2. עדכן: app/page.tsx
```

### תמונות ציורים
```
1. שמור תמונות: public/paintings/
2. עדכן: lib/data.ts
```

## 💌 הגדרת דוא"ל

1. **התקן Nodemailer:**
   ```bash
   npm install nodemailer
   ```

2. **צור App Password בGmail:**
   - https://myaccount.google.com/apppasswords
   - בחר: Mail + Windows Computer

3. **עדכן `.env.local`:**
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ADMIN_EMAIL=admin@example.com
   ```

4. **עדכן `app/api/orders/route.ts`** לשלוח דוא״ל

## 🚀 Deployment ל-Railway

```bash
# 1. אתחול Git
git init
git add .
git commit -m "Initial commit"

# 2. דחוף לGitHub
git push origin main

# 3. Railway.app
# - צור repository
# - חבר ל-Railway
# - הוסף משתנים סביבה
# - Deploy!
```

## 📝 עדכון ציורים

כדי להוסיף ציור חדש:

1. פתח `lib/data.ts`
2. הוסף למערך `paintings`:

```typescript
{
  id: "unique-id",
  name: "שם",
  categoryId: "abstract",
  description: "תיאור",
  price: 1500,
  size: "60 x 80 ס\"מ",
  medium: "אקריליק על בד",
  year: 2024,
  image: "/paintings/image.jpg",
  available: true,
}
```

3. שמור ו-reload דפדפן

## ❓ בעיות?

### "Port 3000 already in use"
```bash
# Mac/Linux
lsof -i :3000 && kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

### "Module not found"
```bash
rm -rf node_modules
yarn install
```

### עמוד לא עדכן
- Ctrl+Shift+R (clear cache)
- או הפעל `yarn dev` מחדש

## 📞 קשר

עבור שאלות:
1. קרא את [QUICKSTART.md](./QUICKSTART.md)
2. קרא את [DEVELOPMENT.md](./DEVELOPMENT.md)
3. בדוק את console בדפדפן (F12)

## 📚 קישורים שימושיים

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Railway.app Docs](https://railway.app/docs)

## 📄 רישיון

פרויקט זה נוצר עבור טובה גיטי זינגר.

---

## ✅ Checklist

- [ ] בדוק `yarn dev`
- [ ] בדוק כל עמודים בדפדפן
- [ ] הוסף תמונות
- [ ] הגדר דוא"ל
- [ ] בדוק טופס הזמנה
- [ ] Deploy ל-Railway
- [ ] בדוק בייצור

---

**כל מוכן! זמן לראות את זה בפעולה!** 🎉

