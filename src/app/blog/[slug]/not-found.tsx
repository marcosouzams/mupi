'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-urbancat-st font-bold text-[#191927] mb-4">404</h1>
          <h2 className="text-2xl font-urbancat-st font-bold text-[#191927] mb-2">
            Post não encontrado
          </h2>
          <p className="text-gray-600 font-inter">
            Desculpe, o post que você está procurando não existe ou foi removido.
          </p>
        </div>

        <button
          onClick={() => router.push('/blog')}
          className="inline-flex items-center gap-2 bg-[#5667fe] hover:bg-[#4556ed] text-white px-6 py-3 rounded-xl transition-colors font-urbancat-st font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o blog</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
