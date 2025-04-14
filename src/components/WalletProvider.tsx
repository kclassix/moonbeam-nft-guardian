
import React, { useEffect, useState } from 'react';
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

// Initialize Web3Modal once outside of the component
let web3ModalInitialized = false;

function initializeWeb3Modal() {
  if (web3ModalInitialized) return true;
  
  try {
    console.log("Initializing Web3Modal...");
    createWeb3Modal({
      wagmiConfig,
      projectId
    });
    web3ModalInitialized = true;
    console.log("Web3Modal initialized successfully");
    return true;
  } catch (error) {
    console.error("Failed to initialize Web3Modal:", error);
    if (error instanceof Error) {
      toast.error(`Web3Modal initialization failed: ${error.message}`);
    }
    return false;
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Try to initialize Web3Modal when component mounts
    initializeWeb3Modal();
    setIsInitializing(false);
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
