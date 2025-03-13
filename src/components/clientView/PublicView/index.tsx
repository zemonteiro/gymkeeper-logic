
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import HomeTab from './HomeTab';
import MembershipTab from './MembershipTab';
import ClassesTab from './ClassesTab';
import ContactTab from './ContactTab';

const PublicView = () => {
  return (
    <Tabs defaultValue="home" className="w-full">
      <TabsList className="w-full justify-start mb-6">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="membership">Membership</TabsTrigger>
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      
      <HomeTab />
      <MembershipTab />
      <ClassesTab />
      <ContactTab />
    </Tabs>
  );
};

export default PublicView;
