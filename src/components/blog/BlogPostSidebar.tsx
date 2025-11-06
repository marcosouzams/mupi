'use client';

import { User, FolderOpen, Lightbulb, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BlogPostSidebarProps {
  author: {
    name: string;
    avatar?: string;
  };
  categories: Array<{ id: number; name: string; slug: string }>;
  translations: {
    author: string;
    categories: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
}

const BlogPostSidebar = ({ author, categories, translations }: BlogPostSidebarProps) => {
  const router = useRouter();

  return (
    <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
      {/* Author Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-[#5667fe]" />
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-urbancat-st">
            {translations.author}
          </h3>
        </div>
        <div className="flex items-start gap-4">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#5667fe] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-urbancat-st font-bold text-xl">
                {author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="font-urbancat-st font-bold text-[#191927] mb-1">{author.name}</p>
            <p className="text-sm text-gray-600 font-inter">
              Especialista em transformação digital
            </p>
          </div>
        </div>
      </div>

      {/* Categories Card */}
      {categories.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen className="w-4 h-4 text-[#5667fe]" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-urbancat-st">
              {translations.categories}
            </h3>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <span className="text-sm font-inter text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-[#5667fe] rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-3 mb-4">
          <Lightbulb className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <h3 className="text-lg font-urbancat-st font-bold text-white">
            {translations.ctaTitle}
          </h3>
        </div>
        <p className="text-white/90 mb-6 font-inter text-sm leading-relaxed">
          {translations.ctaDescription}
        </p>
        <button
          onClick={() => router.push('/contact')}
          className="w-full bg-white hover:bg-gray-50 text-[#5667fe] px-6 py-3 rounded-xl transition-colors font-urbancat-st font-bold text-sm flex items-center justify-center gap-2"
        >
          <span>{translations.ctaButton}</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default BlogPostSidebar;
