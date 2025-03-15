
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ClassPassConfig, getClassPassConfig, saveClassPassConfig } from '@/utils/classpassUtils';

const ClassPassConfiguration: React.FC = () => {
  const [config, setConfig] = useState<ClassPassConfig>(getClassPassConfig());
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveConfig = () => {
    saveClassPassConfig(config);
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>ClassPass Integration</CardTitle>
                <CardDescription>
                  Configure the integration with ClassPass to allow their members to book classes at your gym
                </CardDescription>
              </div>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
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
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ClassPassConfiguration;
