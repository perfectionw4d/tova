import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/serverData';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === getSettings().adminPassword) {
      // Create a simple token
      const token = Buffer.from(`admin-${Date.now()}`).toString('base64');

      return NextResponse.json(
        { token, success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'סיסמה שגויה' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'שגיאה בשרת' },
      { status: 500 }
    );
  }
}
