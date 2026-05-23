# התחלה מהירה - טובה גיטי זינגר - קטלוג ציורים

## ✅ מה שכבר בנוי

### עמודים בוצעו:
1. **עמוד בית** (`/`) - סיפור טובה וקטגוריות
2. **עמוד קטגוריה** (`/category/[id]`) - גלריית ציורים
3. **עמוד ציור** (`/painting/[id]`) - פרטי ציור והזמנה
4. **לוח בקרה** (`/admin`) - ניהול התוכן

### תכונות:
- ✅ עברית (RTL) בכל העמודים
- ✅ הודעת "בשלב בנייה" בחזית
- ✅ טופס הזמנה עם 4 שדות (שם, טלפון, דוא"ל, כתובת)
- ✅ 2 קטגוריות בדיקה (אבסטרקט וטבע)
- ✅ 4 ציורים בדיקה
- ✅ API עבור קטגוריות וציורים

## 🚀 התחלה

### 1. פתח Terminal/Command Prompt

```bash
cd "G:\האחסון שלי\אתר של טובה\tova-art-catalog"
```

### 2. הפעלת שרת פיתוח

```bash
yarn dev
```

או אם אתה משתמש ב-npm:
```bash
npm run dev
```

### 3. בדיקה בדפדפן

פתח: **http://localhost:3000**

צריך לראות:
- סיפור של טובה בעברית
- רשימה של 2 קטגוריות: אבסטרקט וטבע
- הודעת "בשלב בנייה" בחלק העליון

## 🧪 בדיקה

### בדוק את העמודים:

1. **עמוד בית** - http://localhost:3000
   - צריך לראות סיפור וקטגוריות
   - לחץ על קטגוריה → צריך להיכנס לעמוד קטגוריה

2. **עמוד קטגוריה** - http://localhost:3000/category/abstract
   - צריך לראות 2 ציורים (חופש ותהליך)
   - לחץ על ציור → צריך להיכנס לעמוד ציור

3. **עמוד ציור** - http://localhost:3000/painting/abstract-1
   - צריך לראות כל הפרטים: שם, מחיר, גודל, טכניקה, שנה
   - כפתור "הזמן ציור זה"

4. **טופס הזמנה**
   - לחץ על "הזמן ציור זה"
   - הזן: שם, טלפון, דוא"ל, כתובת
   - לחץ "שלח הזמנה"
   - צריך לראות הודעה של הצלחה

5. **לוח בקרה** - http://localhost:3000/admin
   - סיכום של קטגוריות וציורים
   - טאבים: סיכום, ציורים, קטגוריות, הגדרות

## 📝 עדכון ציורים וקטגוריות

הנתונים כרגע בקובץ `lib/data.ts`.

### הוסף ציור חדש:

1. פתח `lib/data.ts`
2. מצא את המערך `paintings`
3. הוסף אובייקט חדש:

```typescript
{
  id: "your-unique-id",
  name: "שם הציור",
  categoryId: "abstract", // או "nature"
  description: "תיאור קצר של הציור",
  price: 1500,
  size: "60 x 80 ס\"מ",
  medium: "אקריליק על בד",
  year: 2024,
  image: "/paintings/image.jpg",
  available: true,
}
```

### הוסף קטגוריה חדשה:

1. פתח `lib/data.ts`
2. מצא את המערך `categories`
3. הוסף:

```typescript
{
  id: "new-category",
  name: "שם הקטגוריה",
  description: "תיאור הקטגוריה",
}
```

## 🖼️ הוספת תמונות

1. שים תמונות בתיקייה `public/paintings/`
2. עדכן את ה-`image` בקובץ `lib/data.ts`

דוגמה:
```typescript
image: "/paintings/freedom.jpg"
```

## 📧 הוספת דוא"ל (הקדמי)

כרגע, הזמנות מאוחסנות בזיכרון בלבד. כדי להוסיף דוא״ל:

1. **התקן Nodemailer:**
```bash
npm install nodemailer
```

2. **עדכן `.env.local`:**
```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
```

עבור Gmail, אתה צריך [App Password](https://myaccount.google.com/apppasswords).

3. **עדכן `app/api/orders/route.ts`** כדי לשלוח דוא״ל

## 🌐 העלאה ל-Railway

1. **אתחול Git:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **פתח Railway.app ויצור פרויקט**

3. **חבר את ה-GitHub repository**

4. **הוסף משתנים סביבה:**
   - `SMTP_USER`
   - `SMTP_PASS`
   - `ADMIN_EMAIL`

5. **Deploy!**

## 📞 צור קשר

אם יש בעיות:
1. בדוק את `DEVELOPMENT.md` לפרטים נוספים
2. בדוק את console בדפדפן (F12)
3. בדוק terminal להודעות שגיאה

## ✍️ הערות חשובות

- הנתונים כרגע זמניים (בקובץ `lib/data.ts`)
- למסדי נתונים אמיתיים (Supabase, MongoDB, וכו'), דרוש עדכון API
- תמונות מציורים צריכות להיות בתיקייה `public/paintings/`
- דוא"ל דורש הגדרה נוספת עם Nodemailer

---

**יצרת פרויקט מדהים! עכשיו זה זמן לנסות את זה בדפדפן.** 🎨

