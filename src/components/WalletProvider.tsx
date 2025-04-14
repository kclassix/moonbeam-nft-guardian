
import React, { useEffect, useState } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi';
import { WagmiConfig } from 'wagmi';
import { moonbeam, moonbaseAlpha } from 'wagmi/chains';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultWagmiConfig } from '@web3modal/wagmi/react';
import { toast } from "sonner";

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

// Initialize Web3Modal once outside of the component
let web3ModalInitialized = false;

// Immediately try to initialize Web3Modal
(function() {
  try {
    console.log("Immediately initializing Web3Modal...");
    createWeb3Modal({
      wagmiConfig,
      projectId
    });
    web3ModalInitialized = true;
    console.log("Web3Modal initialized successfully immediately");
  } catch (error) {
    console.error("Failed to initialize Web3Modal immediately:", error);
  }
})();

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
  const [isInitialized, setIsInitialized] = useState(web3ModalInitialized);
  const [initAttempts, setInitAttempts] = useState(0);
  const maxAttempts = 5;

  useEffect(() => {
    // If not initialized by the time component mounts, try again
    if (!web3ModalInitialized && initAttempts < maxAttempts) {
      console.log(`WalletProvider mounted, Web3Modal not yet initialized. Attempt ${initAttempts + 1} of ${maxAttempts}...`);
      
      const initialized = initializeWeb3Modal();
      setIsInitialized(initialized);
      
      if (!initialized) {
        // If still not initialized, try again after a delay
        const timer = setTimeout(() => {
          setInitAttempts(prev => prev + 1);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [initAttempts]);

  if (!isInitialized) {
    console.log("Web3Modal not initialized yet, rendering fallback");
    // Render a minimal UI that doesn't use Web3Modal
    return (
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
            <p className="text-center mb-4 text-moonbeam">
              Initializing wallet connection... 
              {initAttempts >= maxAttempts ? " Taking longer than expected." : ""}
            </p>
            {children}
          </div>
        </QueryClientProvider>
      </WagmiConfig>
    );
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
