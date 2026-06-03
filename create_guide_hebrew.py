#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_RIGHT

output_path = "/sessions/laughing-blissful-curie/mnt/אתר לטובה/הדרכה_אתר_ציורים.pdf"

doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    rightMargin=0.5*inch,
    leftMargin=0.5*inch,
    topMargin=0.75*inch,
    bottomMargin=0.75*inch
)

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=24,
    textColor='#8B5A00',
    spaceAfter=30,
    alignment=TA_RIGHT,
    fontName='Helvetica-Bold'
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=16,
    textColor='#1a1a1a',
    spaceAfter=12,
    spaceBefore=12,
    alignment=TA_RIGHT,
    fontName='Helvetica-Bold'
)

body_style = ParagraphStyle(
    'CustomBody',
    parent=styles['Normal'],
    fontSize=12,
    alignment=TA_RIGHT,
    spaceAfter=10,
    leading=18
)

small_style = ParagraphStyle(
    'CustomSmall',
    parent=styles['Normal'],
    fontSize=11,
    alignment=TA_RIGHT,
    spaceAfter=8,
    leading=16
)

story = []

story.append(Paragraph("📚 הדרכה לתפעול אתר הציורים", title_style))
story.append(Paragraph("של טובה גיטי זינגר", title_style))
story.append(Spacer(1, 20))

story.append(Paragraph("🎨 ברוכה הבאה!", heading_style))
story.append(Paragraph(
    "זו הדרכה קלה וחמודה איך להוסיף ציורים לאתר שלך. לא צריך לפחד - כולם יכולים לעשות את זה!",
    body_style
))
story.append(Spacer(1, 15))

# Section 1: Login
story.append(Paragraph("שלב 1️⃣ - כניסה לאזור הניהול", heading_style))
story.append(Paragraph(
    "<b>מה צריך לעשות:</b>",
    body_style
))
story.append(Paragraph(
    "1. פתח דפדפן (Chrome, Firefox או כל דפדפן אחר)<br/>"
    "2. כתוב בשורת הכתובות:<br/>"
    "<b>https://tova-production-7028.up.railway.app/admin</b><br/>"
    "3. תופיע לך קופסה עם סיסמה - כתוב:<br/>"
    "<b>Tov@202!</b><br/>"
    "4. לחץ על כפתור 'כניסה'<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Section 2: Main Dashboard
story.append(Paragraph("שלב 2️⃣ - דף הבית של הניהול", heading_style))
story.append(Paragraph(
    "<b>אתה תראה 5 כפתורים גדולים:</b>",
    body_style
))
story.append(Paragraph(
    "🎨 <b>ניהול ציורים</b> - כאן אתה מוסיפה ציורים חדשים<br/><br/>"
    "📂 <b>ניהול קטגוריות</b> - כאן אתה מארגנת את הציורים לקבוצות<br/><br/>"
    "📋 <b>הזמנות</b> - כאן אתה רואה מי הזמין מה<br/><br/>"
    "⚙️ <b>הגדרות</b> - כאן אתה משנה את המייל שלך<br/><br/>"
    "👁️ <b>צפיה בקטלוג</b> - כאן אתה רואה איך אתר נראה<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Section 3: Add Painting
story.append(Paragraph("שלב 3️⃣ - הוספת ציור חדש", heading_style))
story.append(Paragraph(
    "<b>איך להוסיף ציור:</b>",
    body_style
))
story.append(Paragraph(
    "1. לחץ על הכפתור 'ניהול ציורים'<br/>"
    "2. לחץ על הכפתור הירוק 'הוסף ציור חדש'<br/>"
    "3. מלא את המידע:<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>שם הציור</b> - למשל 'זריחה על הים'<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>תיאור</b> - מה הציור מספר (כמו סיפור קטן)<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>מחיר</b> - כמה זה עולה (רק המספר)<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>גודל</b> - כמה זה גדול (למשל: 60x80 ס\"מ)<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>טכניקה</b> - במה צייר (שמן על בד, אקריליק וכו')<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>שנה</b> - באיזו שנה צייר<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>קטגוריה</b> - אבסטרקט או טבע?<br/><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• <b>תמונה</b> - בחר תמונה מהמחשב<br/><br/>"
    "4. לחץ על הכפתור 'שמור' וסיימת! ✅<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Section 4: Manage Categories
story.append(PageBreak())
story.append(Paragraph("שלב 4️⃣ - ניהול קטגוריות", heading_style))
story.append(Paragraph(
    "<b>קטגוריות זה פשוט קבוצות:</b>",
    body_style
))
story.append(Paragraph(
    "עכשיו יש 2 קטגוריות:<br/><br/>"
    "🟫 <b>אבסטרקט</b> - ציורים צבעוניים וגיאומטריים<br/><br/>"
    "🌿 <b>טבע</b> - ציורים של פרחים, עצים וטבע<br/><br/>"
    "<b>אם אתה רוצה להוסיף קטגוריה חדשה:</b><br/>"
    "1. לחץ על 'ניהול קטגוריות'<br/>"
    "2. לחץ 'הוסף קטגוריה חדשה'<br/>"
    "3. כתוב את שם הקטגוריה (למשל: 'דיוקנאות')<br/>"
    "4. לחץ 'שמור'<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Section 5: View Orders
story.append(Paragraph("שלב 5️⃣ - צפיה בהזמנות", heading_style))
story.append(Paragraph(
    "<b>אם מישהו הזמין ציור:</b>",
    body_style
))
story.append(Paragraph(
    "1. לחץ על 'הזמנות'<br/>"
    "2. תראה את פרטי המי שהזמין:<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• שם<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• טלפון<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• דוא\"ל<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;• כתובת<br/><br/>"
    "3. כפתור ירוק = סיימת לטפל בהזמנה<br/>"
    "4. כפתור אדום = עדיין צריך לטפל<br/><br/>"
    "<b>עצה:</b> אתה יכול לשלוח מייל או להתקשר ללקוח<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Section 6: Preview
story.append(Paragraph("שלב 6️⃣ - צפיה באתר", heading_style))
story.append(Paragraph(
    "<b>כדי לראות איך אתר נראה:</b>",
    body_style
))
story.append(Paragraph(
    "1. לחץ על הכפתור הירוק 'צפיה בקטלוג'<br/>"
    "2. זה יפתח חלון חדש עם האתר<br/>"
    "3. אתה תראה את כל הציורים שהוספת!<br/><br/>"
    "<b>זה ממש כמו שהציבור רואה את זה</b> 🌐<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Section 7: Tips
story.append(PageBreak())
story.append(Paragraph("💡 טיפים חשובים", heading_style))
story.append(Paragraph(
    "📸 <b>תמונות טובות = אתר יפה</b><br/>"
    "עדיף תמונה ברורה של הציור מלפנים<br/><br/>"
    "✏️ <b>תיאורים טובים מעניינים</b><br/>"
    "כתוב משהו קצר על מה שתרגישי בציור<br/><br/>"
    "🔄 <b>עדכן כל פעם שצייר משהו חדש</b><br/>"
    "אתר עם ציורים חדשים = אתר חי וטרי!<br/><br/>"
    "💰 <b>מחירים הגיוניים</b><br/>"
    "חשוב שהלקוחות יבינו את הערך של העבודה<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Section 8: Troubleshooting
story.append(Paragraph("🆘 בעיות נפוצות", heading_style))
story.append(Paragraph(
    "<b>❌ 'סיסמה שגויה'</b><br/>"
    "✅ וודא שהסיסמה היא: <b>Tov@202!</b> (עם סימנים וריאל)<br/><br/>"
    "<b>❌ תמונה לא הופיעה</b><br/>"
    "✅ וודא שהבחרת תמונה בפורמט JPG או PNG<br/><br/>"
    "<b>❌ לא רואה את הציור החדש באתר</b><br/>"
    "✅ המתן כמה שניות ורענן את הדף (F5)<br/><br/>"
    "<b>❌ כפתורים לא עובדים</b><br/>"
    "✅ נסה דפדפן אחר או ניקוי cookies<br/>",
    small_style
))
story.append(Spacer(1, 15))

# Final message
story.append(Paragraph("🎨 זהו! אתה מוכנה!", heading_style))
story.append(Paragraph(
    "עכשיו אתה יודעת איך:<br/><br/>"
    "✨ להוסיף ציורים חדשים<br/>"
    "✨ לארגן אותם לקטגוריות<br/>"
    "✨ לראות הזמנות מלקוחות<br/>"
    "✨ לצפות באתר שלך<br/><br/>"
    "<b>כל הצלחה עם האתר ועם הציורים שלך!</b> 💚<br/>",
    small_style
))

doc.build(story)
print("✅ ההדרכה נוצרה בהצלחה!")
