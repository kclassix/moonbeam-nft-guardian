
import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut, Wallet } from 'lucide-react';

export const ConnectWallet = () => {
  const { open } = useWeb3Modal();
  const { isConnected, address, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnecting) {
    return (
      <Button variant="outline" className="border-moonbeam bg-moonbeam/10 text-moonbeam" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="border-moonbeam bg-moonbeam/10 text-moonbeam"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {formatAddress(address)}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => disconnect()} 
          className="text-moonbeam hover:bg-moonbeam/10"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect} 
      className="bg-moonbeam hover:bg-moonbeam-dark text-white"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
};
