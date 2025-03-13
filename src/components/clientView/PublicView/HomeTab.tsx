
import React from 'react';
import { TabsContent } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { ChevronRight, Dumbbell, Users, Calendar } from 'lucide-react';
import FeatureCard from '../FeatureCard';

const HomeTab = () => {
  return (
    <TabsContent value="home" className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden h-80 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-gym-primary to-transparent opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-10">
          <h2 className="text-4xl font-bold text-white mb-4">Transform Your Life at GymKeeper</h2>
          <p className="text-white text-lg mb-6 max-w-md">Join our state-of-the-art facility with expert trainers and premium equipment to achieve your fitness goals.</p>
          <Button size="lg" className="w-fit">
            Join Now <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Dumbbell className="h-8 w-8" />}
          title="Premium Equipment"
          description="State-of-the-art machines and free weights for every fitness level."
        />
        <FeatureCard 
          icon={<Users className="h-8 w-8" />}
          title="Expert Trainers"
          description="Certified trainers to help you achieve your fitness goals safely."
        />
        <FeatureCard 
          icon={<Calendar className="h-8 w-8" />}
          title="Varied Classes"
          description="From yoga to HIIT, we offer classes for every interest and ability."
        />
      </div>
      
      {/* Testimonials */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6">What Our Members Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-subtle">
            <p className="italic mb-4">"GymKeeper transformed my fitness journey. The trainers are knowledgeable and the equipment is always well-maintained."</p>
            <p className="font-semibold">- Sarah Johnson</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-subtle">
            <p className="italic mb-4">"I've been a member for over a year and the community here is amazing. The classes are challenging and fun!"</p>
            <p className="font-semibold">- Michael Chen</p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default HomeTab;
