
import { NFT } from '../types/nft';
import { mockNfts } from '../data/mockNfts';

// In a real application, this would call blockchain APIs
export const fetchNFTs = async (address: string): Promise<NFT[]> => {
  console.log(`Fetching NFTs for address: ${address}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockNfts;
};

export const reportNFT = async (
  nftId: string, 
  reason: string
): Promise<{ success: boolean; message: string }> => {
  console.log(`Reporting NFT ${nftId} for reason: ${reason}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would call a backend API
  return {
    success: true,
    message: 'NFT reported successfully. Our team will review the report.'
  };
};
