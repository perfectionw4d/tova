import { NextResponse } from 'next/server';
import { getPaintingById } from '@/lib/data';

interface OrderRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  paintingId: string;
  paintingName: string;
}

// Simple in-memory storage for orders (will be replaced with database)
const orders: OrderRequest[] = [];

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.email || !body.address || !body.paintingId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get painting details
    const painting = getPaintingById(body.paintingId);
    if (!painting) {
      return NextResponse.json(
        { error: 'Painting not found' },
        { status: 404 }
      );
    }

    // Store the order
    const order = {
      id: `order-${Date.now()}`,
      ...body,
      timestamp: new Date().toISOString(),
    };

    orders.push(body);

    // TODO: Send email notifications
    // 1. Send to customer
    // 2. Send to admin (from .env.local ADMIN_EMAIL)
    // This requires Nodemailer configuration

    // For now, just log the order
    console.log('New order received:', order);

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully. Admin will contact you soon.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint returns all orders (only for admin use)
  // In production, this should require authentication
  return NextResponse.json(orders);
}
