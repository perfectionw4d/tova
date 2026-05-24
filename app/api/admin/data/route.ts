import { NextResponse } from 'next/server';
import { getPaintings, getCategories, setPaintings, setCategories } from '@/lib/serverData';

export async function GET() {
  return NextResponse.json({
    paintings: getPaintings(),
    categories: getCategories(),
  });
}

export async function POST(request: Request) {
  try {
    const { paintings, categories } = await request.json();

    if (paintings) {
      setPaintings(paintings);
    }
    if (categories) {
      setCategories(categories);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
