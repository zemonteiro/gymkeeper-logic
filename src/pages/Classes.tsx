
import React from 'react';
import Layout from '@/components/Layout';
import ClassBooking from '@/components/ClassBooking';
import ClassPassConfiguration from '@/components/accessControl/ClassPassConfig';

const Classes = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-12">
        <ClassPassConfiguration />
        <ClassBooking />
      </div>
    </Layout>
  );
};

export default Classes;
