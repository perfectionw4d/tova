import { NextResponse } from 'next/server';
import { getCategories, getCategoryCount } from '@/lib/serverData';

export async function GET() {
  const categories = getCategories();
  const categoriesWithCount = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    count: getCategoryCount(cat.id),
  }));

  return NextResponse.json(categoriesWithCount);
}
