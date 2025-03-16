
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QRCodeGenerator from '../accessControl/QRCodeGenerator';

const GymAccessTab: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>('');
  
  useEffect(() => {
    // Get the current access code from localStorage
    const storedAccessCode = localStorage.getItem('gymAccessCode');
    if (storedAccessCode) {
      setAccessCode(storedAccessCode);
    }
  }, []);
  
  if (!accessCode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gym Access</CardTitle>
          <CardDescription>Access code not available. Please contact staff.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gym Access QR Code</CardTitle>
        <CardDescription>Use this QR code to enter the gym</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <QRCodeGenerator value={accessCode} size={240} />
        </div>
        <p className="text-center text-base mb-6">
          Place this QR code in front of the gym's QR code reader at the door.
        </p>
        <div className="text-sm text-muted-foreground px-4 py-3 bg-muted rounded-md">
          <p>This QR code is linked to your membership. For security reasons, do not share it with others.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GymAccessTab;
