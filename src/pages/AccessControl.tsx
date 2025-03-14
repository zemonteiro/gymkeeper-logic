
import React from 'react';
import Layout from '../components/Layout';
import AccessControlManager from '../components/accessControl/AccessControlManager';
import ClassPassConfiguration from '../components/accessControl/ClassPassConfig';

const AccessControl = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Access Control</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <AccessControlManager />
          <ClassPassConfiguration />
        </div>
      </div>
    </Layout>
  );
};

export default AccessControl;
