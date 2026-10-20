import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/serverData';

// Public: only non-sensitive settings
export async function GET() {
  const { siteName } = getSettings();
  return NextResponse.json({ siteName });
}
