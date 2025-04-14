
import React, { useEffect } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi';
import { WagmiConfig } from 'wagmi';
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

// IMPORTANT: Initialize Web3Modal immediately before any component rendering
// This ensures it's available before any useWeb3Modal hooks are called
(function initializeWeb3Modal() {
  try {
    console.log("Initializing Web3Modal immediately");
    createWeb3Modal({
      wagmiConfig,
      projectId,
    });
    console.log("Web3Modal initialized successfully at startup");
  } catch (error) {
    console.error("Failed to initialize Web3Modal:", error);
  }
})();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Double-check initialization in component lifecycle as well
    try {
      console.log("WalletProvider mounted, ensuring Web3Modal is initialized");
      createWeb3Modal({
        wagmiConfig,
        projectId,
      });
      console.log("Web3Modal re-initialized or confirmed during component mount");
    } catch (error) {
      // If already initialized, this might throw an error, which is fine
      console.log("Web3Modal was already initialized:", error);
    }
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
