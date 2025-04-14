
import React, { useEffect } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi';
import { WagmiConfig, createConfig } from 'wagmi';
import { moonbeam, moonbaseAlpha } from 'wagmi/chains';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultWagmiConfig } from '@web3modal/wagmi/react';

// 1. Define constants
const projectId = '77de83694f58da9b8a1cbe01e205afdc'; // WalletConnect Cloud project ID

// 2. Create wagmiConfig
const metadata = {
  name: 'Moonbeam NFT Guardian',
  description: 'NFT Security and Management Application for Moonbeam Network',
  url: 'https://moonbeam-nft-guardian.lovable.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [moonbeam, moonbaseAlpha, mainnet] as const;
const wagmiConfig = defaultWagmiConfig({
  projectId, 
  metadata,
  chains
});

// 3. Create a React-Query client
const queryClient = new QueryClient();

// Initialize Web3Modal
// Create this flag to ensure we only initialize once
let initialized = false;

const initWeb3Modal = () => {
  if (!initialized) {
    // Initialize Web3Modal
    createWeb3Modal({
      wagmiConfig,
      projectId,
      // Removing the themes property as it's not supported in the current type definition
    });
    initialized = true;
    console.log("Web3Modal initialized successfully");
  }
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Web3Modal when the component mounts
    initWeb3Modal();
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
