# הצעדים הבאים - מה לעשות עכשיו

## 🎬 עכשיו - בדוק שהכל עובד

### 1. הפעל את שרת הפיתוח

```bash
# בתיקייה tova-art-catalog/
yarn dev
```

אתה צריך לראות:
```
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
  
✓ Ready in 2.5s
```

### 2. בדוק בדפדפן

הקלד: **http://localhost:3000**

בדוק:
- ✅ עמוד בית עם סיפור טובה
- ✅ הודעת "בשלב בנייה" בחלק העליון
- ✅ 2 קטגוריות: "אבסטרקט" ו"טבע"
- ✅ טקסט בעברית (מימין לשמאל)

### 3. בדוק את הניווט

**עמוד בית:**
1. לחץ על קטגוריה "אבסטרקט"
2. צריך להיכנס ל-`/category/abstract`
3. צריך לראות 2 ציורים: "חופש" ו"תהליך"

**עמוד קטגוריה:**
1. לחץ על ציור "חופש"
2. צריך להיכנס ל-`/painting/abstract-1`
3. צריך לראות:
   - שם: "חופש"
   - מחיר: ₪1500
   - גודל: 60 x 80 ס"מ
   - טכניקה: אקריליק על בד
   - שנה: 2024
   - כפתור "הזמן ציור זה"

**עמוד ציור:**
1. לחץ על "הזמן ציור זה"
2. צריך להופיע modal עם טופס הזמנה
3. מלא את הטופס:
   - שם: "דוד כהן"
   - טלפון: "050-1234567"
   - דוא"ל: "david@example.com"
   - כתובת: "תל אביב 123"
4. לחץ "שלח הזמנה"
5. צריך לראות "ההזמנה התקבלה בהצלחה!"

**לוח בקרה:**
1. בדפדפן, הקלד: http://localhost:3000/admin
2. צריך לראות:
   - סיכום: 2 קטגוריות, 4 ציורים
   - טאבים: סיכום, ציורים, קטגוריות, הגדרות

---

## 📸 הוספת תמונות אמיתיות (שבוע 1)

### תמונות של טובה:
1. בחר תמונה אחת לעמוד הבית
2. שמור בשם: `public/images/tova.jpg`
3. ב-`app/page.tsx`, שנה את ה-placeholder:

```tsx
// מ:
<div className="aspect-square bg-gradient-to-br...">
  <span>תמונה של טובה</span>
</div>

// ל:
<img 
  src="/images/tova.jpg" 
  alt="טובה גיטי זינגר" 
  className="w-full h-full object-cover rounded-lg"
/>
```

### תמונות של ציורים:
1. בחר תמונות של הציורים 9 שלך
2. שמור בתיקייה: `public/paintings/`
3. בשם: `freedom.jpg`, `process.jpg`, וכו'
4. עדכן את `lib/data.ts`:

```typescript
{
  id: "abstract-1",
  name: "חופש",
  image: "/paintings/freedom.jpg",  // עדכן את הנתיב
  // ...
}
```

---

## ✉️ הוספת דוא"ל (שבוע 2)

### 1. הגדרת Gmail

1. בדוק שיש לך Gmail account
2. הפעל [2-Step Verification](https://myaccount.google.com/security)
3. ייצר [App Password](https://myaccount.google.com/apppasswords):
   - בחר "Mail" ו-"Windows Computer"
   - תקבל 16 תווים
   - שמור בצד

### 2. התקן Nodemailer

```bash
npm install nodemailer
```

### 3. עדכן `.env.local`

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx    # 16 התווים מ-Gmail
ADMIN_EMAIL=ty.antonir@gmail.com
```

### 4. עדכן `app/api/orders/route.ts`

תחליף את:
```typescript
// For now, just log the order
console.log('New order received:', order);
```

עם קוד דוא"ל. עזרה: קרא `DEVELOPMENT.md`

---

## 🚀 Upload ל-Railway (שבוע 3)

### 1. בחר Git

```bash
cd tova-art-catalog
git init
git add .
git commit -m "Initial commit: Tova's art catalog"
```

### 2. אתחול GitHub

1. פתח GitHub
2. צור repository חדש
3. עקוב אחר ההוראות שם

### 3. Railway Deployment

1. פתח [Railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. בחר את ה-repo
4. הוסף Variables:
   ```
   SMTP_USER=...
   SMTP_PASS=...
   ADMIN_EMAIL=...
   ```
5. Deploy!

---

## 📊 עדכון של אתנים אמיתיים (בזמן הדרך)

כל פעם שיש לך ציורים חדשים:

1. **הוסף תמונה:** בשם ייחודי ב-`public/paintings/`
2. **עדכן `lib/data.ts`:**
   ```typescript
   {
     id: "unique-id",
     name: "שם הציור",
     categoryId: "אבסטרקט", // או "טבע"
     description: "תיאור",
     price: 1500,
     size: "60 x 80 ס\"מ",
     medium: "אקריליק על בד",
     year: 2024,
     image: "/paintings/filename.jpg",
     available: true,
   }
   ```
3. **Deploy חדש:** `git add . && git commit && git push`

---

## ⚙️ עזרה וTroubleshooting

### שגיאות שכיחות:

**"Port 3000 already in use"**
```bash
# Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**"Module not found"**
```bash
rm -rf node_modules
yarn install
```

**"Textarea not scrolling"**
```bash
yarn add react-textarea-autosize
```

**דוא"ל לא שלח**
1. בדוק `.env.local`
2. בדוק App Password בGmail
3. בדוק console לשגיאות (F12)

---

## 📚 קבצים שיעזרו

- 📖 [`QUICKSTART.md`](./QUICKSTART.md) - התחלה
- 📖 [`DEVELOPMENT.md`](./DEVELOPMENT.md) - למתקדמים
- 📖 [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md) - סיכום

---

## ✅ Checklist לפני Deployment

- [ ] כל הציורים עם תמונות
- [ ] דוא"ל מוגדר ועובד
- [ ] בדיקה בעמוד בית
- [ ] בדיקה בעמוד קטגוריה
- [ ] בדיקה בעמוד ציור
- [ ] בדיקה של טופס הזמנה
- [ ] בדיקה של דוא"ל
- [ ] `package.json` עדכן
- [ ] `.env.local.example` מעודכן
- [ ] Git committed

---

## 🎯 קו זמן מומלץ

| זמן | משימה | סטטוס |
|-----|--------|-------|
| היום | בדיקת האתר | ✅ |
| השבוע | הוספת תמונות | 🚧 |
| שבוע 2 | הוספת דוא"ל | 🚧 |
| שבוע 3 | Deployment Railway | 🚧 |
| עתיד | מסד נתונים | 📋 |

---

## 🎉 סיום!

אתה כמעט שם! כל שנותר:
1. **בדיקה** - וודא שהכל עובד
2. **תמונות** - הוסף תמונות אמיתיות
3. **דוא"ל** - הוסף דוא"ל
4. **Deploy** - העלה ל-Railway

**שאלות? אל תהסס ליצור קשר!** 📧

