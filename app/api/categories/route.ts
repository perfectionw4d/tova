import { NextResponse } from 'next/server';
import { categories, getCategoryCount } from '@/lib/data';

export async function GET() {
  const categoriesWithCount = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    count: getCategoryCount(cat.id),
  }));

  return NextResponse.json(categoriesWithCount);
}
