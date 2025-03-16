
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/sales';

interface ProductFormProps {
  product: Omit<Product, 'id'>;
  setProduct: React.Dispatch<React.SetStateAction<Omit<Product, 'id'>>>;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}

export const PRODUCT_CATEGORIES = [
  { value: 'merchandise', label: 'Merchandise' },
  { value: 'rental', label: 'Rental' },
  { value: 'supplement', label: 'Supplement' },
  { value: 'service', label: 'Service' },
  { value: 'food', label: 'Food & Beverage' }
];

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  setProduct, 
  onSubmit, 
  onCancel, 
  isLoading,
  submitLabel
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">Price ($)</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">Category</Label>
        <Select
          value={product.category}
          onValueChange={(value) => setProduct({ ...product, category: value })}
        >
          <SelectTrigger id="category" className="col-span-3">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="stock" className="text-right">Stock Quantity</Label>
        <Input
          id="stock"
          type="number"
          min="0"
          value={product.stockQuantity}
          onChange={(e) => setProduct({ 
            ...product, 
            stockQuantity: parseInt(e.target.value) 
          })}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tax" className="text-right">Tax Rate</Label>
        <Input
          id="tax"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={product.taxRate}
          onChange={(e) => setProduct({ 
            ...product, 
            taxRate: parseFloat(e.target.value) 
          })}
          className="col-span-3"
        />
        <span className="col-span-4 text-right text-sm text-gym-muted">
          Enter as decimal (e.g., 0.1 for 10%)
        </span>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Input
          id="description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="col-span-3"
        />
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSubmit} disabled={isLoading}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
