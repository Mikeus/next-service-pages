import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET(): Promise<NextResponse> {
  const posts = getAllPosts();

  return NextResponse.json({
    posts,
    count: posts.length,
  });
}
