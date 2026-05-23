import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

// Create Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send email to customer
const sendCustomerEmail = async (order: OrderRequest, painting: any) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: order.email,
    subject: `הזמנתך על ${painting.name} התקבלה! - טובה גיטי זינגר`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>תודה על הזמנתך! 🎨</h2>
        <p>שלום ${order.name},</p>

        <p>קיבלנו את הזמנתך על הציור <strong>${painting.name}</strong>.</p>

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>פרטי ההזמנה:</h3>
          <p><strong>שם הציור:</strong> ${painting.name}</p>
          <p><strong>מחיר:</strong> ₪${painting.price}</p>
          <p><strong>גודל:</strong> ${painting.size}</p>
          <p><strong>טכניקה:</strong> ${painting.medium}</p>
        </div>

        <h3>פרטי ההתקשרות שלך:</h3>
        <p><strong>שם:</strong> ${order.name}</p>
        <p><strong>טלפון:</strong> ${order.phone}</p>
        <p><strong>דוא"ל:</strong> ${order.email}</p>
        <p><strong>כתובת:</strong> ${order.address}</p>

        <p>אנחנו נחזור אליך בקרוב להסדר פרטי הקבלה והתשלום.</p>

        <p>בברכה,<br/>טובה גיטי זינגר</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send email to admin
const sendAdminEmail = async (order: OrderRequest, painting: any) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `🎨 הזמנה חדשה: ${painting.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>הזמנה חדשה!</h2>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>הזמנה מאת ${order.name}</h3>
        </div>

        <h3>פרטי הציור:</h3>
        <p><strong>שם:</strong> ${painting.name}</p>
        <p><strong>ID:</strong> ${painting.id}</p>
        <p><strong>מחיר:</strong> ₪${painting.price}</p>
        <p><strong>גודל:</strong> ${painting.size}</p>
        <p><strong>טכניקה:</strong> ${painting.medium}</p>

        <h3>פרטי לקוח:</h3>
        <p><strong>שם:</strong> ${order.name}</p>
        <p><strong>טלפון:</strong> ${order.phone}</p>
        <p><strong>דוא"ל:</strong> ${order.email}</p>
        <p><strong>כתובת:</strong> ${order.address}</p>

        <p>צעד הבא: יש לחזור ללקוח עם פרטי תשלום והסדרה.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

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
    orders.push(body);

    // Send emails
    try {
      await sendCustomerEmail(body, painting);
      await sendAdminEmail(body, painting);
      console.log('Order emails sent successfully');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Don't fail the order if email fails - still return success
      // but log the error for debugging
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully! Check your email for confirmation.',
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
