import { NextRequest, NextResponse } from 'next/server';
import blogsData from '@/data/blogs.json';

// GET /api/blog/[slug] - Get a single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = blogsData.find((b) => b.slug === slug);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // If not published, only allow access via admin (showAll param)
    if (!blog.published) {
      const showAll = request.nextUrl.searchParams.get('all') === 'true';
      if (!showAll) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(blog, {
      headers: {
        'Cache-Control': blog.published
          ? 'public, s-maxage=60, stale-while-revalidate=300'
          : 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
