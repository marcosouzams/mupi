interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  return (
    <>
      <style jsx>{`
        .blog-content {
          color: #374151;
        }
        
        .blog-content :global(p),
        .blog-content :global(li),
        .blog-content :global(td),
        .blog-content :global(span) {
          color: #374151 !important;
        }
        
        .blog-content :global(h1),
        .blog-content :global(h2),
        .blog-content :global(h3),
        .blog-content :global(h4),
        .blog-content :global(h5),
        .blog-content :global(h6) {
          color: #191927 !important;
          font-family: 'Urbancat', sans-serif !important;
          font-weight: 700 !important;
        }
        
        .blog-content :global(h1) {
          font-size: 1.875rem !important;
          margin-bottom: 1.5rem !important;
          margin-top: 2rem !important;
        }
        
        .blog-content :global(h2) {
          font-size: 1.5rem !important;
          margin-bottom: 1.25rem !important;
          margin-top: 2rem !important;
        }
        
        .blog-content :global(h3) {
          font-size: 1.25rem !important;
          margin-bottom: 1rem !important;
          margin-top: 1.5rem !important;
        }
        
        .blog-content :global(h4) {
          font-size: 1.125rem !important;
          margin-bottom: 0.75rem !important;
          margin-top: 1.25rem !important;
        }
        
        .blog-content :global(p) {
          line-height: 1.75 !important;
          margin-bottom: 1.5rem !important;
          font-size: 1rem !important;
        }
        
        .blog-content :global(strong),
        .blog-content :global(b) {
          color: #191927 !important;
          font-weight: 700 !important;
        }
        
        .blog-content :global(em),
        .blog-content :global(i) {
          font-style: italic !important;
        }
        
        .blog-content :global(a) {
          color: #5667fe !important;
          font-weight: 500 !important;
          text-decoration: none !important;
        }
        
        .blog-content :global(a:hover) {
          text-decoration: underline !important;
        }
        
        .blog-content :global(ul),
        .blog-content :global(ol) {
          padding-left: 1.5rem !important;
          margin-bottom: 1.5rem !important;
        }
        
        .blog-content :global(ul) {
          list-style-type: disc !important;
        }
        
        .blog-content :global(ol) {
          list-style-type: decimal !important;
        }
        
        .blog-content :global(li) {
          margin-bottom: 0.5rem !important;
          line-height: 1.75 !important;
        }
        
        .blog-content :global(blockquote) {
          border-left: 4px solid #5667fe !important;
          padding-left: 1.5rem !important;
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
          font-style: italic !important;
          color: #4b5563 !important;
          background-color: #f9fafb !important;
          border-radius: 0 0.5rem 0.5rem 0 !important;
          margin: 1.5rem 0 !important;
        }
        
        .blog-content :global(code) {
          color: #5667fe !important;
          background-color: #f3f4f6 !important;
          padding: 0.125rem 0.5rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875rem !important;
          font-family: monospace !important;
        }
        
        .blog-content :global(pre) {
          background-color: #191927 !important;
          color: white !important;
          padding: 1.5rem !important;
          border-radius: 0.75rem !important;
          overflow-x: auto !important;
          margin-bottom: 1.5rem !important;
        }
        
        .blog-content :global(pre code) {
          background-color: transparent !important;
          color: white !important;
          padding: 0 !important;
        }
        
        .blog-content :global(img) {
          border-radius: 0.75rem !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          margin: 2rem 0 !important;
          max-width: 100% !important;
          height: auto !important;
        }
        
        .blog-content :global(hr) {
          border-color: #d1d5db !important;
          margin: 2rem 0 !important;
        }
        
        .blog-content :global(table) {
          border-collapse: collapse !important;
          width: 100% !important;
          margin-bottom: 2rem !important;
        }
        
        .blog-content :global(th) {
          background-color: #f3f4f6 !important;
          text-align: left !important;
          padding: 0.75rem !important;
          font-weight: 700 !important;
          color: #191927 !important;
          border: 1px solid #d1d5db !important;
        }
        
        .blog-content :global(td) {
          padding: 0.75rem !important;
          border: 1px solid #d1d5db !important;
          color: #374151 !important;
        }
        
        .blog-content :global(figure) {
          margin: 2rem 0 !important;
        }
        
        .blog-content :global(figcaption) {
          text-align: center !important;
          font-size: 0.875rem !important;
          color: #6b7280 !important;
          margin-top: 0.5rem !important;
        }

        /* Remove white/light colors that might come from WordPress */
        .blog-content :global([style*="color: white"]),
        .blog-content :global([style*="color: #fff"]),
        .blog-content :global([style*="color: #ffffff"]),
        .blog-content :global([style*="color: rgb(255, 255, 255)"]) {
          color: #374151 !important;
        }

        /* Ensure headings are never white */
        .blog-content :global(h1[style*="color"]),
        .blog-content :global(h2[style*="color"]),
        .blog-content :global(h3[style*="color"]),
        .blog-content :global(h4[style*="color"]),
        .blog-content :global(h5[style*="color"]),
        .blog-content :global(h6[style*="color"]) {
          color: #191927 !important;
        }

        /* External links get target blank via CSS can't do that, but we ensure proper styling */
        .blog-content :global(a[href^="http"]:not([href*="mupisys"])) {
          position: relative;
        }
      `}</style>
      
      <div 
        className="blog-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default BlogPostContent;
