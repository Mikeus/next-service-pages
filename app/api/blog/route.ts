import { NextResponse } from 'next/server';

export async function GET() {
  // Stub: fetch AI-generated or CMS-managed blog posts
  return NextResponse.json({
    posts: [],
    message: 'Blog API stub — connect AI content pipeline in production',
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Stub: trigger AI blog generation workflow
  return NextResponse.json(
    {
      success: true,
      message: 'Blog generation queued (stub)',
      data: body,
    },
    { status: 202 },
  );
}
