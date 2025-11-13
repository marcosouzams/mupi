import { fetchPostsForListing, fetchFeaturedPosts, fetchCategories } from '@/services/wordpress';
import BlogPageClient from '@/components/blog/BlogPageClient';

// ISR: Revalidate this page every 1 hour
export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const categoryId = params.category ? Number(params.category) : undefined;
  
  console.log('[Blog Listing] 🔄 Page rendering at:', new Date().toISOString(), {
    page: currentPage,
    category: categoryId
  });
  
  // Fetch posts for current page (12 posts per page)
  const [featuredPosts, { posts, totalPages }, categories] = await Promise.all([
    fetchFeaturedPosts(),
    categoryId 
      ? fetchPostsForListing(currentPage, 12, categoryId)
      : fetchPostsForListing(currentPage, 12),
    fetchCategories(),
  ]);

  console.log('[Blog Listing] ✅ Fetched data:', {
    featuredPostsCount: featuredPosts.length,
    currentPagePostsCount: posts.length,
    currentPage,
    totalPages: totalPages,
    categoriesCount: categories.length,
    latestPostSlug: posts[0]?.slug || 'none'
  });

  return (
    <BlogPageClient 
      featuredPosts={featuredPosts}
      posts={posts}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedCategory={categoryId}
    />
  );
};

export default BlogPage;
