
import { NFT } from '../types/nft';

export const mockNfts: NFT[] = [
  {
    id: '1',
    name: 'Moonbeam Cosmic #001',
    description: 'A rare cosmic entity from the Moonbeam universe.',
    image: 'https://images.unsplash.com/photo-1528499908559-b8e4c8a15d54?q=80&w=400&h=400&auto=format&fit=crop',
    collection: 'Moonbeam Cosmic Collection',
    tokenId: '1',
    contract: '0x1234567890123456789012345678901234567890',
    attributes: [
      { trait_type: 'Background', value: 'Purple Galaxy' },
      { trait_type: 'Rarity', value: 'Rare' }
    ]
  },
  {
    id: '2',
    name: 'Moonbeam Guardian #042',
    description: 'A guardian of the Moonbeam network with special powers.',
    image: 'https://images.unsplash.com/photo-1614935981447-0592cface44b?q=80&w=400&h=400&auto=format&fit=crop',
    collection: 'Moonbeam Guardians',
    tokenId: '42',
    contract: '0x0987654321098765432109876543210987654321',
    attributes: [
      { trait_type: 'Armor', value: 'Diamond' },
      { trait_type: 'Weapon', value: 'Plasma Sword' }
    ]
  },
  {
    id: '3',
    name: 'Suspicious Airdrop #13',
    description: 'An NFT from an unknown source. Exercise caution.',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=400&h=400&auto=format&fit=crop',
    collection: 'Unknown Origins',
    tokenId: '13',
    contract: '0xabcdef1234567890abcdef1234567890abcdef12',
    attributes: [
      { trait_type: 'Origin', value: 'Unknown' },
      { trait_type: 'Verification', value: 'None' }
    ]
  },
  {
    id: '4',
    name: 'Lunar Landscape #007',
    description: 'A beautiful landscape from the moon featuring Moonbeam city lights.',
    image: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=400&h=400&auto=format&fit=crop',
    collection: 'Moonbeam Landscapes',
    tokenId: '7',
    contract: '0xabcabcabcabcabcabcabcabcabcabcabcabcabca',
    attributes: [
      { trait_type: 'Time', value: 'Night' },
      { trait_type: 'Setting', value: 'City View' }
    ]
  }
];
