import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/config';
import {
  BookingRequestSchema,
  BookingSuccessResponseSchema,
  parseRequestBody,
  type ApiErrorBody,
} from '@/lib/schemas';

export async function POST(request: Request): Promise<NextResponse> {
  if (!siteConfig.features.onlineBooking) {
    return NextResponse.json<ApiErrorBody>(
      { error: 'Online booking is disabled in site config' },
      { status: 403 },
    );
  }

  const parsed = await parseRequestBody(request, BookingRequestSchema);

  if (!parsed.success) {
    return NextResponse.json<ApiErrorBody>(parsed.error, { status: parsed.status });
  }

  // Stub: integrate with Calendly, Acuity, or custom CRM in production
  const response = BookingSuccessResponseSchema.parse({
    success: true,
    message: 'Booking request received (stub)',
    data: parsed.data,
  });

  return NextResponse.json(response, { status: 201 });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'booking',
    description: 'POST booking requests to this endpoint',
  });
}
