
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSalesManagement } from '@/hooks/useSalesManagement';
import PointOfSale from './PointOfSale';
import SalesHistory from './SalesHistory';
import ProductManagement from './ProductManagement';
import ReportingExport from './ReportingExport';

const SalesManagement = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const { 
    products,
    salesHistory,
    addProduct,
    updateProduct,
    deleteProduct,
    addSale,
    isLoading,
    totalRevenue,
    revenueByCategory,
    revenueByProduct
  } = useSalesManagement();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sales Management</h1>
        <p className="text-gym-muted">Manage gym products, process sales, and view reports</p>
      </div>

      <Tabs defaultValue="pos" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="history">Sales History</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="reports">Reports & Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pos" className="space-y-6">
          <PointOfSale 
            products={products} 
            addSale={addSale}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <SalesHistory 
            salesHistory={salesHistory}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <ProductManagement 
            products={products}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <ReportingExport 
            salesHistory={salesHistory}
            totalRevenue={totalRevenue}
            revenueByCategory={revenueByCategory}
            revenueByProduct={revenueByProduct}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesManagement;
