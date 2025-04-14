
import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t py-6">
      <div className="container flex flex-col items-center justify-center space-y-2 px-4 text-center sm:flex-row sm:justify-between sm:space-y-0 sm:text-left">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Moonbeam NFT Guardian. All rights reserved.
        </p>
        
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-warning" />
          <span>for the Moonbeam community</span>
        </div>
      </div>
    </footer>
  );
};
