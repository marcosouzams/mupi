'use client';

import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
    >
      <div className="relative w-6 h-6">
        <Menu className={`w-6 h-6 absolute transition-all duration-300 text-gray-700 ${
          isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
        }`} />
        <X className={`w-6 h-6 absolute transition-all duration-300 text-gray-700 ${
          isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
        }`} />
      </div>
    </button>
  );
}
