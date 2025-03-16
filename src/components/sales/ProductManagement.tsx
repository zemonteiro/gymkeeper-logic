
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Product } from '@/types/sales';
import { toast } from 'sonner';
import AddProductDialog from './AddProductDialog';
import ProductTableRow from './ProductTableRow';

interface ProductManagementProps {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  isLoading: boolean;
}

const ProductManagement = ({ 
  products, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  isLoading 
}: ProductManagementProps) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: 'merchandise',
    description: '',
    stockQuantity: 0,
    taxRate: 0.1
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  
  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      price: 0,
      category: 'merchandise',
      description: '',
      stockQuantity: 0,
      taxRate: 0.1
    });
  };
  
  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      toast.error('Please provide a name and valid price');
      return;
    }
    
    addProduct(newProduct);
    resetNewProduct();
    setIsDialogOpen(false);
    toast.success('Product added successfully');
  };
  
  const handleStartEditing = (product: Product) => {
    setIsEditing(product.id);
    setEditedProduct(product);
  };
  
  const handleCancelEditing = () => {
    setIsEditing(null);
    setEditedProduct(null);
  };
  
  const handleSaveEdit = (id: string) => {
    if (!editedProduct) return;
    
    updateProduct(id, editedProduct);
    setIsEditing(null);
    setEditedProduct(null);
    toast.success('Product updated successfully');
  };
  
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted successfully');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Products & Services</h2>
        
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
        
        <AddProductDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          onAddProduct={handleAddProduct}
          isLoading={isLoading}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-subtle">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Tax Rate</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No products available
                  </TableCell>
                </TableRow>
              ) : (
                products.map(product => (
                  <ProductTableRow 
                    key={product.id}
                    product={product}
                    isEditing={isEditing === product.id}
                    editedProduct={editedProduct}
                    setEditedProduct={setEditedProduct}
                    onStartEditing={handleStartEditing}
                    onCancelEditing={handleCancelEditing}
                    onSaveEdit={handleSaveEdit}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
