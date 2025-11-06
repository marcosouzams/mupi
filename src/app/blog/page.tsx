import { fetchAllPostsForListing, fetchFeaturedPosts, fetchCategories } from '@/services/wordpress';
import BlogPageClient from '@/components/blog/BlogPageClient';

// ISR: Revalidate this page every 1 hour
export const revalidate = 3600;

const BlogPage = async () => {
  console.log('[Blog Listing] 🔄 Page rendering at:', new Date().toISOString());
  
  // Fetch all data at build time (optimized without full content)
  const [featuredPosts, posts, categories] = await Promise.all([
    fetchFeaturedPosts(),
    fetchAllPostsForListing(), // Optimized: without content field
    fetchCategories(),
  ]);

  console.log('[Blog Listing] ✅ Fetched data:', {
    featuredPostsCount: featuredPosts.length,
    totalPostsCount: posts.length,
    categoriesCount: categories.length,
    latestPostSlug: posts[0]?.slug || 'none'
  });

  const totalPostsCount = posts.length;

  return (
    <BlogPageClient 
      featuredPosts={featuredPosts}
      posts={posts}
      categories={categories}
      totalPostsCount={totalPostsCount}
    />
  );
};

export default BlogPage;
