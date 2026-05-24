import { NextResponse } from 'next/server';
import { getPaintingById } from '@/lib/serverData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const painting = getPaintingById(id);

  if (!painting) {
    return NextResponse.json(
      { error: 'Painting not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(painting);
}
