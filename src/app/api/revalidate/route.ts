import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation API Route
 * 
 * This endpoint allows WordPress to trigger revalidation of blog posts
 * immediately when they are published or updated.
 * 
 * Setup:
 * 1. Set REVALIDATE_SECRET in your environment variables (Netlify)
 * 2. Configure WordPress webhook to call this endpoint on post publish/update
 * 
 * WordPress Webhook Configuration:
 * URL: https://yoursite.com/api/revalidate
 * Method: POST
 * Body: { "slug": "post-slug", "secret": "your-secret-key" }
 * 
 * Usage Example:
 * curl -X POST https://yoursite.com/api/revalidate \
 *   -H "Content-Type: application/json" \
 *   -d '{"slug": "my-post", "secret": "your-secret-key"}'
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { slug, secret, action = 'post' } = body;

    // Validate secret key
    const expectedSecret = process.env.REVALIDATE_SECRET;
    
    if (!expectedSecret) {
      console.error('[Revalidate API] REVALIDATE_SECRET not configured');
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          message: 'REVALIDATE_SECRET environment variable not set'
        },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.warn('[Revalidate API] Invalid secret provided');
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Validate slug
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug', message: 'Slug must be a non-empty string' },
        { status: 400 }
      );
    }

    console.log(`[Revalidate API] Revalidating ${action}: ${slug}`);

    // Revalidate specific paths
    const revalidatedPaths: string[] = [];

    if (action === 'post' || action === 'update') {
      // Revalidate the specific post page
      await revalidatePath(`/blog/${slug}`);
      revalidatedPaths.push(`/blog/${slug}`);

      // Also revalidate the blog listing page
      await revalidatePath('/blog');
      revalidatedPaths.push('/blog');
    } else if (action === 'delete') {
      // Only revalidate the blog listing
      await revalidatePath('/blog');
      revalidatedPaths.push('/blog');
    } else {
      return NextResponse.json(
        { error: 'Invalid action', message: 'Action must be: post, update, or delete' },
        { status: 400 }
      );
    }

    console.log(`[Revalidate API] Successfully revalidated:`, revalidatedPaths);

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[Revalidate API] Error:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET method to check if the API is working
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'On-Demand Revalidation API is active',
    usage: 'POST with { slug, secret, action? } to revalidate',
    documentation: '/ISR_MIGRATION.md#on-demand-revalidation',
  });
}
