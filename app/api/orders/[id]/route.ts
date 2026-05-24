import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/serverData';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!['pending', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedOrder = updateOrderStatus(id, status);
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update order';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
