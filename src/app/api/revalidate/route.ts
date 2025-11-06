import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation API Route
 * 
 * This endpoint accepts webhooks from WP Webhooks plugin to trigger
 * revalidation of blog posts immediately when published or updated.
 * 
 * Setup:
 * 1. Set REVALIDATE_SECRET in Netlify environment variables
 * 2. In WordPress WP Webhooks plugin:
 *    - Add webhook URL: https://yoursite.com/api/revalidate
 *    - Authentication: Bearer Token
 *    - Token: [same as REVALIDATE_SECRET]
 *    - Triggers: post_created, post_updated, post_deleted
 * 
 * The plugin sends standard WordPress post data:
 * {
 *   "post_id": 123,
 *   "post": { "post_name": "my-post", "post_status": "publish", ... },
 *   "post_permalink": "https://...",
 *   ...
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Validate Bearer Token authentication
    const authHeader = request.headers.get('authorization');
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

    // Check Bearer Token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('[Revalidate API] Missing or invalid Authorization header');
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Bearer token required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    if (token !== expectedSecret) {
      console.warn('[Revalidate API] Invalid Bearer token provided');
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid Bearer token' },
        { status: 401 }
      );
    }

    // Parse WP Webhooks payload
    const body = await request.json();
    
    // Extract data from WordPress post object
    const post = body.post;
    const postId = body.post_id;
    
    if (!post || !post.post_name) {
      console.error('[Revalidate API] Invalid payload - missing post data');
      return NextResponse.json(
        { 
          error: 'Invalid payload', 
          message: 'WordPress post data not found in request body' 
        },
        { status: 400 }
      );
    }

    const slug = post.post_name;
    const postStatus = post.post_status;
    const postType = post.post_type;

    // Only process published posts (not pages, drafts, etc.)
    if (postType !== 'post') {
      console.log(`[Revalidate API] Skipping non-post type: ${postType}`);
      return NextResponse.json({
        skipped: true,
        reason: `Only 'post' type is processed, received: ${postType}`,
        timestamp: new Date().toISOString(),
      });
    }

    console.log(`[Revalidate API] Processing post: ${slug} (ID: ${postId}, Status: ${postStatus})`);

    // Revalidate paths
    const revalidatedPaths: string[] = [];

    if (postStatus === 'publish') {
      // Post is published - revalidate both post page and listing
      // Use 'page' type to ensure full page revalidation including all data fetching
      await revalidatePath(`/blog/${slug}`, 'page');
      revalidatedPaths.push(`/blog/${slug}`);

      await revalidatePath('/blog', 'page');
      revalidatedPaths.push('/blog');
      
      console.log(`[Revalidate API] ✅ Published post revalidated: ${slug}`);
    } else {
      // Post is deleted, trashed, or draft - only revalidate listing
      await revalidatePath('/blog', 'page');
      revalidatedPaths.push('/blog');
      
      console.log(`[Revalidate API] ✅ Listing revalidated (post status: ${postStatus})`);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      paths: revalidatedPaths,
      post: {
        id: postId,
        slug: slug,
        status: postStatus,
      },
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
    authentication: 'Bearer Token required',
    usage: 'POST with WP Webhooks standard payload + Bearer token in Authorization header',
    documentation: '/WEBHOOK_SETUP.md',
  });
}
