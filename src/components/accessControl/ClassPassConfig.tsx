
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ClassPassConfig, getClassPassConfig, saveClassPassConfig } from '@/utils/classpassUtils';

const ClassPassConfiguration: React.FC = () => {
  const [config, setConfig] = useState<ClassPassConfig>(getClassPassConfig());

  const handleSaveConfig = () => {
    saveClassPassConfig(config);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ClassPass Integration</CardTitle>
        <CardDescription>
          Configure the integration with ClassPass to allow their members to book classes at your gym
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch 
            id="classpass-enabled"
            checked={config.isEnabled}
            onCheckedChange={(checked) => setConfig({ ...config, isEnabled: checked })}
          />
          <Label htmlFor="classpass-enabled">Enable ClassPass Integration</Label>
        </div>
        
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="api-key">ClassPass API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your ClassPass API key"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              You can find your API key in your ClassPass partner dashboard
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="venue-id">Venue ID</Label>
            <Input
              id="venue-id"
              placeholder="Enter your ClassPass venue ID"
              value={config.venueId}
              onChange={(e) => setConfig({ ...config, venueId: e.target.value })}
            />
          </div>
        </div>
        
        <Button onClick={handleSaveConfig}>Save Configuration</Button>
      </CardContent>
    </Card>
  );
};

export default ClassPassConfiguration;
