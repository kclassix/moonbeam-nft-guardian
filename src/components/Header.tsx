
import React from 'react';
import { ConnectWallet } from './ConnectWallet';
import { MoonIcon, ShieldAlert } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-moonbeam p-1.5">
            <ShieldAlert className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-moonbeam">Moonbeam</span> NFT Guardian
          </h1>
        </div>
        
        <ConnectWallet />
      </div>
    </header>
  );
};
