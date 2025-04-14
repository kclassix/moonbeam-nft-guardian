
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NFTGallery } from '@/components/NFTGallery';
import { Shield, AlertTriangle, Check, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-moonbeam-lighter/30">
      <Header />
      
      <main className="container flex-1 px-4 py-8">
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-bold">NFT Security Dashboard</h2>
          <p className="text-muted-foreground">
            Connect your wallet to view, manage, and report suspicious NFTs on the Moonbeam network.
          </p>
        </section>
        
        <section className="mb-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Scan NFTs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-moonbeam" />
                  <span className="text-2xl font-bold">Connect</span>
                </div>
                <CardDescription className="mt-2">
                  Connect your wallet to scan your NFTs for potential security threats.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Report Suspicious</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
                  <span className="text-2xl font-bold">Flag</span>
                </div>
                <CardDescription className="mt-2">
                  Help the community by reporting suspicious or malicious NFTs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Review Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold">Track</span>
                </div>
                <CardDescription className="mt-2">
                  Track the status of your reported NFTs and security remediation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stay Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold">Learn</span>
                </div>
                <CardDescription className="mt-2">
                  Stay informed about the latest NFT security best practices.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-8">
          <Alert className="border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-800" />
            <AlertTitle className="text-yellow-800">Security Notice</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Always verify NFTs before interacting with them. Reported NFTs will be reviewed by our security team.
            </AlertDescription>
          </Alert>
        </section>
        
        <section>
          <h3 className="mb-4 text-xl font-semibold">Your NFT Collection</h3>
          <NFTGallery />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
