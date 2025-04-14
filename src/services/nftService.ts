
import { mockNfts } from '@/data/mockNfts';
import { NFT } from '@/types/nft';
import { getEnsName } from 'wagmi/actions';

// Simulated API call to fetch NFTs - in a real app, this would call a blockchain API
export async function fetchNFTs(address: string): Promise<NFT[]> {
  console.log(`Fetching NFTs for address: ${address}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, we would filter NFTs based on the connected address
  // For now, return all mock NFTs
  return mockNfts;
}

// Simulate scanning an NFT for security issues
export async function scanNFT(tokenId: string): Promise<{
  isSafe: boolean;
  issues: string[];
}> {
  console.log(`Scanning NFT with token ID: ${tokenId}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Randomly determine if the NFT is safe (80% chance of being safe)
  const isSafe = Math.random() > 0.2;
  
  // Generate some random issues if the NFT is not safe
  const issues = isSafe ? [] : [
    'Suspicious contract permissions',
    'Potential phishing link in metadata',
    'Contract has unverified source code'
  ];
  
  return { isSafe, issues };
}

// Get ENS name for an address (for display purposes)
export async function getENSName(address: string): Promise<string | null> {
  console.log(`Looking up ENS name for: ${address}`);
  try {
    // Call to Ethereum Mainnet to resolve ENS name
    // getEnsName expects an object with the address property of type `0x${string}`
    const ensName = await getEnsName({
      address: address as `0x${string}`,
      chainId: 1
    });
    return ensName;
  } catch (error) {
    console.error('Error fetching ENS name:', error);
    return null;
  }
}

// Simulate reporting a suspicious NFT
export async function reportNFT(
  tokenId: string, 
  reason: string
): Promise<{ success: boolean; message: string }> {
  console.log(`Reporting NFT ${tokenId} as suspicious. Reason: ${reason}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would send the report to a backend service
  // Always return success for the demo
  return { 
    success: true, 
    message: "Report submitted successfully. Our team will review it." 
  };
}
