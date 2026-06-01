import { NextRequest, NextResponse } from 'next/server';
import blogsData from '@/data/blogs.json';

// GET /api/blog - List all published blogs
export async function GET(request: NextRequest) {
  try {
    const showAll = request.nextUrl.searchParams.get('all') === 'true';

    const blogs = showAll
      ? blogsData
      : blogsData.filter((blog) => blog.published);

    // Sort by date descending
    const sorted = [...blogs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(sorted, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
