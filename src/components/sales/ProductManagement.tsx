
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/sales';
import { toast } from 'sonner';

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
  
  const categories = [
    { value: 'merchandise', label: 'Merchandise' },
    { value: 'rental', label: 'Rental' },
    { value: 'supplement', label: 'Supplement' },
    { value: 'service', label: 'Service' },
    { value: 'food', label: 'Food & Beverage' }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Products & Services</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product or service to the gym inventory
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger id="category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock Quantity
                </Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({ 
                    ...newProduct, 
                    stockQuantity: parseInt(e.target.value) 
                  })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tax" className="text-right">
                  Tax Rate
                </Label>
                <Input
                  id="tax"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={newProduct.taxRate}
                  onChange={(e) => setNewProduct({ 
                    ...newProduct, 
                    taxRate: parseFloat(e.target.value) 
                  })}
                  className="col-span-3"
                />
                <span className="col-span-4 text-right text-sm text-gym-muted">
                  Enter as decimal (e.g., 0.1 for 10%)
                </span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddProduct} disabled={isLoading}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <TableRow key={product.id}>
                    {isEditing === product.id ? (
                      <>
                        <TableCell>
                          <Input
                            value={editedProduct?.name}
                            onChange={(e) => setEditedProduct({ 
                              ...editedProduct!, 
                              name: e.target.value 
                            })}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editedProduct?.category}
                            onValueChange={(value) => setEditedProduct({ 
                              ...editedProduct!, 
                              category: value 
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            value={editedProduct?.stockQuantity}
                            onChange={(e) => setEditedProduct({ 
                              ...editedProduct!, 
                              stockQuantity: parseInt(e.target.value) 
                            })}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editedProduct?.price}
                            onChange={(e) => setEditedProduct({ 
                              ...editedProduct!, 
                              price: parseFloat(e.target.value) 
                            })}
                            className="text-right"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            min="0"
                            max="1"
                            step="0.01"
                            value={editedProduct?.taxRate}
                            onChange={(e) => setEditedProduct({ 
                              ...editedProduct!, 
                              taxRate: parseFloat(e.target.value) 
                            })}
                            className="text-right"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={handleCancelEditing}
                            >
                              <X size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleSaveEdit(product.id)}
                            >
                              <Save size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.stockQuantity !== undefined ? product.stockQuantity : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {(product.taxRate * 100).toFixed(0)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleStartEditing(product)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
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
