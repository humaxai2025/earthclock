import React from 'react';
import { Heart } from 'lucide-react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`mt-8 py-4 text-center border-t transition-colors ${
        isDarkMode ? 'border-slate-700/50 text-slate-400' : 'border-slate-200/50 text-slate-600'
      }`}
    >
      <p className="flex items-center justify-center gap-2 text-sm">
        <span>Built with</span>
        <Heart
          className={`w-4 h-4 ${
            isDarkMode ? 'text-red-400 fill-red-400' : 'text-red-500 fill-red-500'
          } animate-pulse`}
          style={{ animationDuration: '2s' }}
        />
        <span>by Sriram Srinivasan</span>
      </p>
    </footer>
  );
};

export default Footer;
