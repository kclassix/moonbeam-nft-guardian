
import React from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { WagmiConfig } from 'wagmi';
import { mainnet, moonbeam, moonbaseAlpha } from 'wagmi/chains';

// 1. Define constants
const projectId = '77de83694f58da9b8a1cbe01e205afdc'; // Replace with your WalletConnect Cloud project ID

// 2. Create wagmiConfig
const metadata = {
  name: 'Moonbeam NFT Guardian',
  description: 'NFT Security and Management Application for Moonbeam Network',
  url: 'https://moonbeam-nft-guardian.lovable.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [moonbeam, moonbaseAlpha, mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
