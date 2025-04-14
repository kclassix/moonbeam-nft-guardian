
import React from 'react';
import { createWeb3Modal } from '@web3modal/wagmi';
import { WagmiConfig } from 'wagmi';
import { moonbeam, moonbaseAlpha } from 'wagmi/chains';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultWagmiConfig } from '@web3modal/wagmi/react';
import { toast } from "sonner";

// 1. Define constants
const projectId = '71284d4eebb94119e15d9281752b6c88'; // WalletConnect Cloud project ID

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

// Initialize Web3Modal immediately at module level
// This ensures it's available before any components render
try {
  console.log("Initializing Web3Modal at module level...");
  createWeb3Modal({
    wagmiConfig,
    projectId
  });
  console.log("Web3Modal initialized successfully");
} catch (error) {
  console.error("Failed to initialize Web3Modal:", error);
  if (error instanceof Error) {
    // We can't use toast here as it's outside React context
    console.error(`Web3Modal initialization failed: ${error.message}`);
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
