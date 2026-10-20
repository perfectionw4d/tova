import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/serverData';

export async function POST(request: Request) {
  try {
    const { currentPassword, siteName, newPassword } = await request.json();

    if (currentPassword !== getSettings().adminPassword) {
      return NextResponse.json({ error: 'הסיסמה הנוכחית שגויה' }, { status: 401 });
    }

    const patch: { siteName?: string; adminPassword?: string } = {};

    if (typeof siteName === 'string') {
      const trimmed = siteName.trim();
      if (!trimmed) {
        return NextResponse.json({ error: 'נא למלא שם לאתר' }, { status: 400 });
      }
      patch.siteName = trimmed;
    }

    if (typeof newPassword === 'string' && newPassword.length > 0) {
      if (newPassword.length < 4) {
        return NextResponse.json({ error: 'הסיסמה החדשה חייבת להכיל לפחות 4 תווים' }, { status: 400 });
      }
      patch.adminPassword = newPassword;
    }

    const updated = updateSettings(patch);
    return NextResponse.json({ success: true, siteName: updated.siteName });
  } catch (error) {
    return NextResponse.json({ error: 'שגיאה בשמירת ההגדרות' }, { status: 500 });
  }
}
