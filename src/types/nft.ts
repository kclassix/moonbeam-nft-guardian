
export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  tokenId: string;
  contract: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
  reported?: boolean;
  reportReason?: string;
  reportStatus?: 'pending' | 'approved' | 'rejected';
}
