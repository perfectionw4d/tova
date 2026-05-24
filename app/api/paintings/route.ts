import { NextResponse } from 'next/server';
import { getPaintingsByCategory } from '@/lib/serverData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('category');

  if (!categoryId) {
    return NextResponse.json(
      { error: 'Category ID is required' },
      { status: 400 }
    );
  }

  const paintings = getPaintingsByCategory(categoryId);

  return NextResponse.json(paintings);
}
