import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { getPaintingById, saveOrder, getOrders } from '@/lib/serverData';

// Initialize SendGrid
const initializeSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY is not set');
  }
  sgMail.setApiKey(apiKey);
  return sgMail;
};

interface OrderRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  paintingId: string;
  paintingName: string;
}

// Orders are now persisted to a JSON file via serverData

// Send email to customer
const sendCustomerEmail = async (order: OrderRequest, painting: any) => {
  try {
    const mail = initializeSendGrid();
    console.log('Sending customer email to:', order.email);
    await mail.send({
      from: 'noreply@shakufbahazit.co.il',
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
    });
    console.log('Customer email sent successfully');
  } catch (error) {
    console.error('Failed to send customer email:', error);
    throw error;
  }
};

// Send email to admin
const sendAdminEmail = async (order: OrderRequest, painting: any) => {
  try {
    const mail = initializeSendGrid();
    const adminEmail = process.env.ADMIN_EMAIL || 'tony@thezebra.co.il';
    console.log('Sending admin email to:', adminEmail);
    await mail.send({
      from: 'noreply@shakufbahazit.co.il',
      to: adminEmail,
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
    });
    console.log('Admin email sent successfully');
  } catch (error) {
    console.error('Failed to send admin email:', error);
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json();
    console.log('Order received:', { paintingId: body.paintingId, name: body.name });

    // Validate required fields
    if (!body.name || !body.phone || !body.email || !body.address || !body.paintingId) {
      console.error('Missing required fields:', body);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.error('Invalid email format:', body.email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get painting details
    const painting = getPaintingById(body.paintingId);
    console.log('Found painting:', painting ? painting.name : 'NOT FOUND');
    if (!painting) {
      console.error('Painting not found for ID:', body.paintingId);
      return NextResponse.json(
        { error: 'Painting not found' },
        { status: 404 }
      );
    }

    // Store the order (persisted to file)
    try {
      saveOrder(body);
      console.log('Order saved to file');
    } catch (saveError) {
      console.error('Failed to save order to file:', saveError);
      return NextResponse.json(
        { error: 'Failed to save order' },
        { status: 500 }
      );
    }

    // Send emails with timeout (don't block order submission)
    if (process.env.SENDGRID_API_KEY) {
      try {
        // Send emails with 10 second timeout
        const emailTimeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email timeout')), 10000)
        );

        await Promise.race([
          Promise.all([
            sendCustomerEmail(body, painting),
            sendAdminEmail(body, painting),
          ]),
          emailTimeout,
        ]);
        console.log('Order emails sent successfully');
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Order is already saved, email failure doesn't block response
        console.log('Email failed but order was saved to file');
      }
    } else {
      console.warn('RESEND_API_KEY not configured - emails skipped');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'ההזמנה נשמרה בהצלחה! נחזור אליך בקרוב.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process order';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint returns all orders (only for admin use)
  // In production, this should require authentication
  return NextResponse.json(getOrders());
}
