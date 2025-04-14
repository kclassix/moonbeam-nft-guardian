
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { NFTCard } from './NFTCard';
import { fetchNFTs } from '@/services/nftService';
import { NFT } from '@/types/nft';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const NFTGallery = () => {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadNFTs = async () => {
      if (isConnected && address) {
        setIsLoading(true);
        try {
          const fetchedNfts = await fetchNFTs(address);
          setNfts(fetchedNfts);
        } catch (error) {
          console.error('Error fetching NFTs:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadNFTs();
  }, [address, isConnected]);

  const handleReportStatusChange = (id: string, reported: boolean, reason?: string) => {
    setNfts(prevNfts => 
      prevNfts.map(nft => 
        nft.id === id ? { ...nft, reported, reportReason: reason, reportStatus: 'pending' } : nft
      )
    );
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = 
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'reported') return matchesSearch && nft.reported;
    if (filter === 'safe') return matchesSearch && !nft.reported;
    
    return matchesSearch;
  });

  if (!isConnected) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-moonbeam/10">
          <Search className="h-6 w-6 text-moonbeam" />
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">No NFTs to display</h3>
        <p className="mt-1 text-sm text-gray-500">Connect your wallet to view your NFTs.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center p-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-moonbeam" />
        <p className="mt-4 text-moonbeam">Loading your NFTs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search NFTs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All NFTs</SelectItem>
              <SelectItem value="reported">Reported</SelectItem>
              <SelectItem value="safe">Safe</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
          >
            Reset
          </Button>
        </div>
      </div>
      
      {filteredNFTs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onReportStatusChange={handleReportStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-moonbeam/10">
            <Search className="h-6 w-6 text-moonbeam" />
          </div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">No NFTs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filter !== 'all' 
              ? "Try adjusting your search or filter criteria."
              : "You don't have any NFTs in your wallet yet."}
          </p>
        </div>
      )}
    </div>
  );
};
