
import React from 'react';
import { TabsContent } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { CheckCircle } from 'lucide-react';

const MembershipTab = () => {
  return (
    <TabsContent value="membership" className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Membership Plans</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-subtle border-t-4 border-gym-accent">
          <h3 className="text-xl font-bold mb-2">Basic Plan</h3>
          <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gym-muted font-normal">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Gym access (6AM-10PM)</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Basic equipment</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Locker room access</li>
          </ul>
          <Button className="w-full">Select Plan</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-elevated border-t-4 border-gym-primary transform scale-105">
          <div className="bg-gym-primary text-white text-xs px-2 py-1 rounded absolute -top-2 right-4">POPULAR</div>
          <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
          <p className="text-3xl font-bold mb-4">$49<span className="text-sm text-gym-muted font-normal">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 24/7 gym access</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> All equipment</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Group classes included</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 1 personal training session</li>
          </ul>
          <Button className="w-full">Select Plan</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-subtle border-t-4 border-gym-accent">
          <h3 className="text-xl font-bold mb-2">Elite Plan</h3>
          <p className="text-3xl font-bold mb-4">$89<span className="text-sm text-gym-muted font-normal">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 24/7 gym access</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> All premium features</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Unlimited classes</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 4 personal training sessions</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Nutrition consultation</li>
          </ul>
          <Button className="w-full">Select Plan</Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default MembershipTab;
