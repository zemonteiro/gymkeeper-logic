
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ProductForm from './ProductForm';
import { Product } from '@/types/sales';

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: Omit<Product, 'id'>;
  setNewProduct: React.Dispatch<React.SetStateAction<Omit<Product, 'id'>>>;
  onAddProduct: () => void;
  isLoading: boolean;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onOpenChange,
  newProduct,
  setNewProduct,
  onAddProduct,
  isLoading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product or service to the gym inventory
          </DialogDescription>
        </DialogHeader>
        
        <ProductForm
          product={newProduct}
          setProduct={setNewProduct}
          onSubmit={onAddProduct}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
          submitLabel="Add Product"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
