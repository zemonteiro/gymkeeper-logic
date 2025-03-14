
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RefreshCw, Download } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import { useToast } from '@/hooks/use-toast';

const AccessControlManager = () => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { toast } = useToast();
  const [accessCode, setAccessCode] = useState<string>('');

  // On mount, check if there's a stored access code
  useEffect(() => {
    const storedAccessCode = localStorage.getItem('gymAccessCode');
    const storedLastUpdated = localStorage.getItem('gymAccessCodeLastUpdated');
    
    if (storedAccessCode) {
      setAccessCode(storedAccessCode);
    } else {
      // Generate a new one if there isn't
      generateNewAccessCode();
    }
    
    if (storedLastUpdated) {
      setLastUpdated(storedLastUpdated);
    }
  }, []);

  // Generate a new random access code
  const generateNewAccessCode = () => {
    const timestamp = Date.now().toString();
    const randomPart = Math.random().toString(36).substring(2, 10);
    const newCode = `GYMKEY-${timestamp.slice(-6)}-${randomPart.toUpperCase()}`;
    
    setAccessCode(newCode);
    const now = new Date().toISOString();
    setLastUpdated(now);
    
    // Save to localStorage for persistence
    localStorage.setItem('gymAccessCode', newCode);
    localStorage.setItem('gymAccessCodeLastUpdated', now);
    
    toast({
      title: "Access Code Updated",
      description: "The gym access QR code has been successfully updated.",
    });
  };

  // Format the lastUpdated date for display
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    
    const date = new Date(lastUpdated);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gym Access QR Code</CardTitle>
        <CardDescription>
          Generate and manage QR codes for gym door access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="qrcode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qrcode">QR Code</TabsTrigger>
            <TabsTrigger value="history">Access Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="qrcode" className="space-y-6">
            <div className="mt-6 flex flex-col items-center justify-center space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {accessCode && <QRCodeGenerator value={accessCode} size={240} />}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mt-2">
                  Last updated: {formatLastUpdated()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Code: {accessCode}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">
                Access log functionality will be implemented in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={generateNewAccessCode} 
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Generate New Code
        </Button>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => {
            if (accessCode) {
              // Create a download link for the QR code
              const canvas = document.querySelector("canvas");
              if (canvas) {
                const link = document.createElement('a');
                link.download = `gym-access-qr-${new Date().toISOString().split('T')[0]}.png`;
                link.href = canvas.toDataURL();
                link.click();
              }
            }
          }}
        >
          <Download className="h-4 w-4" />
          Download QR
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccessControlManager;
