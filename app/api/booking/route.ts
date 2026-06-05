import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Stub: integrate with Calendly, Acuity, or custom CRM in production
  return NextResponse.json(
    {
      success: true,
      message: 'Booking request received (stub)',
      data: body,
    },
    { status: 201 },
  );
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'booking',
    description: 'POST booking requests to this endpoint',
  });
}
