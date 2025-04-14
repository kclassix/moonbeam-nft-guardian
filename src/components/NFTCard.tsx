
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, ExternalLink, CheckCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { NFT } from '@/types/nft';
import { reportNFT } from '@/services/nftService';
import { useToast } from '@/components/ui/use-toast';

interface NFTCardProps {
  nft: NFT;
  onReportStatusChange: (id: string, reported: boolean, reason?: string) => void;
}

export const NFTCard = ({ nft, onReportStatusChange }: NFTCardProps) => {
  const [reportReason, setReportReason] = useState('');
  const [reportType, setReportType] = useState('scam');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleReport = async () => {
    if (!reportReason) {
      toast({
        title: "Error",
        description: "Please provide details about why you're reporting this NFT.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const fullReason = `${reportType}: ${reportReason}`;
      const result = await reportNFT(nft.id, fullReason);

      if (result.success) {
        toast({
          title: "Report Submitted",
          description: result.message,
        });
        onReportStatusChange(nft.id, true, fullReason);
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={nft.image} 
          alt={nft.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        {nft.reported && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center text-white">
              <AlertTriangle className="mx-auto h-10 w-10 text-warning" />
              <p className="mt-2 font-medium">Reported as Suspicious</p>
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg">{nft.name}</CardTitle>
        <CardDescription className="line-clamp-1">{nft.collection}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">{nft.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2 p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs"
          onClick={() => window.open(`https://moonscan.io/token/${nft.contract}?a=${nft.tokenId}`, '_blank')}
        >
          <ExternalLink className="mr-1 h-3 w-3" />
          View Details
        </Button>
        
        {nft.reported ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="border-green-500 bg-green-50 text-xs text-green-700"
            disabled
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Reported
          </Button>
        ) : (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-warning text-xs text-warning hover:bg-warning/10"
              >
                <Shield className="mr-1 h-3 w-3" />
                Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Suspicious NFT</DialogTitle>
                <DialogDescription>
                  Report this NFT if you believe it's fraudulent, stolen, or potentially harmful.
                  Our team will review your report and take appropriate action.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>What type of issue are you reporting?</Label>
                  <RadioGroup
                    value={reportType}
                    onValueChange={setReportType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scam" id="scam" />
                      <Label htmlFor="scam">Scam or Phishing Attempt</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="stolen" id="stolen" />
                      <Label htmlFor="stolen">Stolen Content</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="harmful" id="harmful" />
                      <Label htmlFor="harmful">Harmful or Inappropriate Content</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other Issue</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-details">Additional Details</Label>
                  <Textarea
                    id="report-details"
                    placeholder="Please provide specific details about the issue..."
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button 
                  onClick={handleReport} 
                  className="bg-warning hover:bg-warning-hover"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Shield className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Submit Report
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};
