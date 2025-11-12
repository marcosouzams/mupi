'use client';

import { X, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  title: string;
  excerpt: string;
  onClose: () => void;
}

const ShareModal = ({ title, excerpt, onClose }: ShareModalProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform animate-slideUp">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-urbancat-st font-bold text-[#191927]">
              Compartilhar artigo
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialShare('facebook')}
              className="w-full flex items-center gap-4 p-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Facebook className="w-5 h-5 fill-current" />
              </div>
              <span className="font-urbancat-st font-medium">Compartilhar no Facebook</span>
            </button>

            <button
              onClick={() => handleSocialShare('twitter')}
              className="w-full flex items-center gap-4 p-4 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Twitter className="w-5 h-5 fill-current" />
              </div>
              <span className="font-urbancat-st font-medium">Compartilhar no Twitter</span>
            </button>

            <button
              onClick={() => handleSocialShare('linkedin')}
              className="w-full flex items-center gap-4 p-4 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Linkedin className="w-5 h-5 fill-current" />
              </div>
              <span className="font-urbancat-st font-medium">Compartilhar no LinkedIn</span>
            </button>

            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="w-full flex items-center gap-4 p-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-urbancat-st font-medium">Compartilhar no WhatsApp</span>
            </button>
          </div>

          {/* Copy Link Section */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 font-inter mb-3">Ou copie o link</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={typeof window !== 'undefined' ? window.location.href : ''}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-inter focus:outline-none focus:ring-2 focus:ring-[#5667fe]/20"
              />
              <button
                onClick={handleCopyLink}
                className={`px-6 py-3 rounded-lg font-urbancat-st font-medium transition-all ${
                  isCopied
                    ? 'bg-green-500 text-white'
                    : 'bg-[#5667fe] hover:bg-[#5667fe]/90 text-white'
                }`}
              >
                {isCopied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {isCopied && (
              <p className="text-sm text-green-600 font-inter mt-2 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Link copiado com sucesso!
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ShareModal;
